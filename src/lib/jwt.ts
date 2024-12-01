import * as jose from 'jose'
import type { JWTPayload } from 'jose'

export async function SignToken(payload: JWTPayload) {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    const alg = 'HS256'

    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secretKey)

    return token
}

export async function VerifyToken(token: string) {
    try {
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
        // const decoded = jwt.verify(token, secretKey as string)
        const { payload, protectedHeader } = await jose.jwtVerify(token, secretKey, {
            issuer: 'urn:example:issuer',
            audience: 'urn:example:audience',
        })
        console.log("JWT_Verification : ", { payload, protectedHeader })
        return { payload, protectedHeader }
    } catch (error) {
        return null
    }
}