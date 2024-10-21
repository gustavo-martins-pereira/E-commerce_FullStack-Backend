import jsonwebtoken from "jsonwebtoken";

function verifyJwtRefreshToken(request, response, next) {
    const refreshToken = request.cookies.refreshToken;
    if(!refreshToken) return response.status(401).json({ error: "No token provided" });

    jsonwebtoken.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
            if(error) {
                if(error.name === "TokenExpiredError") {
                    return response.status(401).json({ error: "Token expired" });
                } else if (error.name === "JsonWebTokenError") {
                    return response.status(403).json({ error: "Invalid token" });
                } else {
                    return response.status(403).json({ error: "Unauthorized" });
                }
            }

            request.user = decoded.username;
            request.role = decoded.role;

            next();
        }
    );
}

export default verifyJwtRefreshToken;