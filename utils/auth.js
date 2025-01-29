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
    } catch (e) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
};

export const permit = (...allowedRoles) => {
    try {
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
    } catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
    
};

export const verifyApiKey = (req, res, next) => {
    try {
        const api_key = req.headers['x-api-key'];

        if (!api_key) {
            return res.status(401).json({ error: 'API key required' });
        }

        if (api_key !== process.env.API_KEY) {
            return res.status(401).json({ error: 'Invalid API key' });
        }

        next();
    } catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}