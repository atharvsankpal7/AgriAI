const jwt = require("jsonwebtoken");
const JWT_SECRET = "ThisIsSecretKeyForToken";

const fetchUser = (req, res, nextFunction) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send("Unauthorized access");
        return;
    }

    try {
        // Decode the token and extract user information
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        nextFunction();
    } catch (err) {
        res.status(401).send("Unauthorized access");
    }
};

module.exports = fetchUser;
