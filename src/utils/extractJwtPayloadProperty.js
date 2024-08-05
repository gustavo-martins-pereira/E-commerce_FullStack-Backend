import JsonWebToken from "jsonwebtoken";

function extractJwtPayloadProperty(request, propertyName) {
    return JsonWebToken.decode(request.headers.authorization.split("Bearer ")[1])[propertyName];
}

export default extractJwtPayloadProperty;