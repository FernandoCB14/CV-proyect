const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "debugkey");
        
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({code: 401, message: "Usuario no autorizado"});
        
    }
}