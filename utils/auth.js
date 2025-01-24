import jsonwebtoken from "jsonwebtoken";

export const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' }); 
};

export const verifyToken = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Token required' });
        }

        const decoded = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
};

export const permit = (...allowedRoles) => {
    return (req, res, next) => {
        const { role } = req.user;
        console.log(role);
        console.log(allowedRoles);
        if (allowedRoles.includes(role)) {
            next();
        } else {
            res.status(403).json({ error: 'Forbidden: You do not have the necessary permissions' });
        }
    };
};
