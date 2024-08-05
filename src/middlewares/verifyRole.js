function verifyRole(...allowedRoles) {
    return (request, response, next) => {
        if(!request?.role) return response.status(401).json({ error: "No role provided" });

        const role = request.role;
        if(!allowedRoles.includes(role)) return response.status(403).json({ error: "Unauthorized" });

        next();
    };
}

export default verifyRole;
