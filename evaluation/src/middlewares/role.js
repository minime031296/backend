function checkRole(allowedRoles) {
    return async (req, res, next) => {
        // Ensure req.user exists
        if (!req.user || !req.user.roles) {
            return res.status(403).json({ success: false, message: 'User not authenticated' });
        }

        // Extract user roles
        const userRoles = req.user.roles.map(role => role.name);

        // Check if the user has any of the allowed roles
        const hasRole = allowedRoles.some(role => userRoles.includes(role));

        if (!hasRole) {
            return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role' });
        }
        
        // Proceed to the next middleware
        next();
    };
}

module.exports = checkRole;
