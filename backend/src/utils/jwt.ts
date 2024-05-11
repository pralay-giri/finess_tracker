import jwt from 'jsonwebtoken'

export const generateAccessToken = (payload: {}) => {
    const expiresIn = Number(process.env.ACCESS_TOKEN_EXPIRY_DAY as string)
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
        // * expiresIn 2 days
        expiresIn: expiresIn * 24 * 3600,
    })
}

export const generateRefressToken = (payload: {}) => {
    const expiresIn = Number(process.env.REFRESH_TOKEN_EXPIRY_DAY as string)
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
        // * expiresIn 30 days
        expiresIn: expiresIn * 24 * 3600,
    })
}

export const verifyToken = (
    token: string,
    secret: string,
): string | jwt.JwtPayload | null => {
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null
    }
}
