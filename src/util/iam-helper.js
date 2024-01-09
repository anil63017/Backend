const PERMISSIONS = {
    NO_ACCESS: Symbol('NO_ACCESS'),
    READ: Symbol('READ_ACCESS'),
    WRITE: Symbol('WRITE_ACCESS'),
}

const RESOURCES = {
    VENDOR_DIRECTORY: Symbol("VENDOR_DIRECTORY"),
    CLIENT_DIRECTORY: Symbol("CLIENT_DIRECTORY"),
    WORKING_DIRECTORY: Symbol("WORKING_DIRECTORY"),
    IMMIGRATION_DIRECTORY: Symbol("IMMIGRATION_DIRECTORY"),
    EMPLOYEE_DIRECTORY: Symbol("EMPLOYEE_DIRECTORY"),
    REGISTER_USER: Symbol("REGISTER_USER"),
}


const ROLES = {
    ADMIN: {
        [RESOURCES.VENDOR_DIRECTORY]: PERMISSIONS.WRITE,
        [RESOURCES.WORKING_DIRECTORY]: PERMISSIONS.WRITE,
        [RESOURCES.IMMIGRATION_DIRECTORY]: PERMISSIONS.WRITE,
        [RESOURCES.EMPLOYEE_DIRECTORY]: PERMISSIONS.WRITE,
        [RESOURCES.REGISTER_USER]: PERMISSIONS.WRITE,
        [RESOURCES.CLIENT_DIRECTORY]: PERMISSIONS.WRITE,
    },
    MANAGER: {
        [RESOURCES.VENDOR_DIRECTORY]: PERMISSIONS.READ,
        [RESOURCES.WORKING_DIRECTORY]: PERMISSIONS.READ,
        [RESOURCES.IMMIGRATION_DIRECTORY]: PERMISSIONS.READ,
        [RESOURCES.EMPLOYEE_DIRECTORY]: PERMISSIONS.READ,
        [RESOURCES.REGISTER_USER]: PERMISSIONS.NO_ACCESS,
        [RESOURCES.CLIENT_DIRECTORY]: PERMISSIONS.NO_ACCESS,
    },
    ACCOUNTS: {
        [RESOURCES.VENDOR_DIRECTORY]: PERMISSIONS.WRITE,
        [RESOURCES.WORKING_DIRECTORY]: PERMISSIONS.WRITE,
        [RESOURCES.EMPLOYEE_DIRECTORY]: PERMISSIONS.READ,
        [RESOURCES.IMMIGRATION_DIRECTORY]: PERMISSIONS.NO_ACCESS,
        [RESOURCES.REGISTER_USER]: PERMISSIONS.NO_ACCESS,
        [RESOURCES.CLIENT_DIRECTORY]: PERMISSIONS.NO_ACCESS,
    },
    IMMIGRATION: {
        [RESOURCES.VENDOR_DIRECTORY]: PERMISSIONS.NO_ACCESS,
        [RESOURCES.WORKING_DIRECTORY]: PERMISSIONS.NO_ACCESS,
        [RESOURCES.IMMIGRATION_DIRECTORY]: PERMISSIONS.WRITE,
        [RESOURCES.EMPLOYEE_DIRECTORY]: PERMISSIONS.READ,
        [RESOURCES.REGISTER_USER]: PERMISSIONS.NO_ACCESS,
        [RESOURCES.CLIENT_DIRECTORY]: PERMISSIONS.NO_ACCESS,
    },
    HR: {
        [RESOURCES.VENDOR_DIRECTORY]: PERMISSIONS.NO_ACCESS,
        [RESOURCES.WORKING_DIRECTORY]: PERMISSIONS.NO_ACCESS,
        [RESOURCES.IMMIGRATION_DIRECTORY]: PERMISSIONS.NO_ACCESS,
        [RESOURCES.EMPLOYEE_DIRECTORY]: PERMISSIONS.WRITE,
        [RESOURCES.REGISTER_USER]: PERMISSIONS.NO_ACCESS,
        [RESOURCES.CLIENT_DIRECTORY]: PERMISSIONS.NO_ACCESS,
    },
}

function getAccessLevel(role, resource) {
    const userRole = ROLES[role];
    if (userRole) {
        return userRole[resource];
    } else {
        return PERMISSIONS.NO_ACCESS;
    }
}

function hasAccess(role, resource, permission_level) {
    return [permission_level, PERMISSIONS.WRITE].includes(getAccessLevel(role, resource));
}

module.exports = {
    PERMISSIONS,
    RESOURCES,
    hasAccess,
}