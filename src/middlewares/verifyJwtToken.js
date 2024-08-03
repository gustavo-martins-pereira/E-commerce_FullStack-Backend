import jsonwebtoken from "jsonwebtoken";

function verifyJwtToken(request, response, next) {
    const authHeader = request.headers["authorization"];
    if(!authHeader) return response.status(403).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    jsonwebtoken.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error, user) => {
            if(error) return response.status(401).json({ error: "Unauthorized" });
            request.user = user.username;
            next();
        }
    );
}

export default verifyJwtToken;