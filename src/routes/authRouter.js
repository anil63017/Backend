const { Router } = require("express");
const authService = require("../services/authService");
const authMiddleware = require("../middleware/authMiddleware");
const accessMiddleware = require("../middleware/accessMiddleware");
const { RESOURCES, PERMISSIONS } = require("../util/iam-helper");

const authRouter = Router();

authRouter.post('/register', authMiddleware, accessMiddleware(RESOURCES.REGISTER_USER, PERMISSIONS.WRITE), async (req, res) => {
    try {
        const { username, email, password, access } = req.body;
        if (email && password) {
            const user = await authService.createUser({ username, email, password, access });
            res.status(200).json({
                status: true,
                username: user.username,
                email: user.email,
                access: user.access,
            });
        } else {
            res.status(400).json({ message: 'Email and Password are required!', status: false });
        }
    } catch (err) {
        res.status(500).json({ message: 'something went wrong!', status: false });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const user = await authService.getUser(username);
            if (!user) {
                return res.status(200).json({ message: 'User not found!', status: false });
            }
            if (authService.validatePassword(password, user.hash, user.salt)) {
                const { token, expiresIn } = authService.issueJWT(user);
                res.status(200).json({ token, expiresIn, user, status: true });
            } else {
                res.status(200).json({ message: 'Invalid Password', status: false });
            }
        } else {
            res.status(400).json({ messag: 'username and password required!', status: false })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'something went wrong!', status: false });
    }

});

authRouter.post('/validate', authMiddleware, (req, res) => {
    res.status(200).json({ status: true, hasAccess: true, user: req.user })
})

authRouter.post('/refresh', authMiddleware, (req, res) => {
    try {
        const { token, expiresIn } = authService.issueJWT(req.user);
        res.status(200).json({ token, expiresIn, status: true });
    } catch (err) {
        res.status(500).json({ message: "something went wrong!", status: false })
    }
})


module.exports = authRouter