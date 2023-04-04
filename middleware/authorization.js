
module.exports = (...role) => {
    return (req, res, next)=> {
        const userRole = req.user.role; // its come from verifyToken
        if (!role.includes(userRole)) {
            return res.status(403).json({
                status: "fail",
                error: " You are not authorized to access this"
            });
        }

        next();
    }
    
}