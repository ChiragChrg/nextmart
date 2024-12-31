import * as jose from 'jose'
import type { JWTPayload } from 'jose'

export async function SignToken(payload: JWTPayload, expiryTime: string) {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    const alg = 'HS256'

    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(expiryTime)
        .sign(secretKey)

    return token
}

export async function VerifyToken(token: string) {
    try {
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
        const { payload, protectedHeader } = await jose.jwtVerify(token, secretKey)
        console.log("JWT_Verification : ", { payload, protectedHeader })
        return { payload, protectedHeader }
    } catch (error) {
        return null
    }
}