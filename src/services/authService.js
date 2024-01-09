const { ROLES } = require("../util/enums");
const { generateHash, getPasswordHash } = require('../util/hash')
const User = require('../models/user');
const jwt = require('jsonwebtoken');

class AuthService {
    userDirectory;
    constructor(userDB) {
        this.userDirectory = userDB;
    }

    async getUser(username) {
        try {
            const user = await this.userDirectory.findOne({ $or: [{ username }, { email: username }] }).lean();
            if (user) return user
        } catch (err) {
            console.log(err)
        }
        return false;
    }

    async createUser({ username = '', email, password, access = ROLES.MEMBER } = {}) {
        const { hash, salt } = getPasswordHash(password);
        return this.userDirectory.create({ username, email, hash, salt, access });
    }

    validatePassword(password, hash, salt) {
        const passwordHash = generateHash(password, salt);
        return hash === passwordHash;
    }

    issueJWT(user) {
        const _id = user._id;
        const expiresIn = '2h';
        const payload = {
            sub: _id,
            iat: Math.floor(Date.now() / 1000),
            access: user.access,
        }
        const signedToken = jwt.sign(payload, process.env.SECRET, { expiresIn })
        return {
            token: signedToken,
            expiresIn,
        };
    }
}

const authService = new AuthService(User);

module.exports = authService;