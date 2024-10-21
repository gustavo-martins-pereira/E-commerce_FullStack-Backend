import jsonwebtoken from "jsonwebtoken";

function verifyJwtAccessToken(request, response, next) {
    const authHeader = request.headers.authorization || request.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) return response.status(401).json({ error: "No token provided" });

    const accessToken = authHeader.split(" ")[1];
    jsonwebtoken.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
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

export default verifyJwtAccessToken;