import { connectDB } from "@utils/database"
import User from "@models/UserModal"
import * as bcrypt from "bcrypt"
import { SignToken } from "@utils/jwt"

interface RequestBody {
    email: string,
    password: string
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        await connectDB()
        console.log("LogIn_Route", body)

        const userExists = await User.findOne({ email: body?.email })
        const matchPassword = await bcrypt.compare(body?.password, userExists?.hashedPassword)

        // If no user or If user exists but incorrect password, throw error
        if (!userExists || !matchPassword) throw new Error("Invalid Email or Password")

        const userData = {
            uid: userExists?._id,
            name: userExists?.name,
            email: userExists?.email,
            image: userExists?.image,
            emailVerified: userExists?.emailVerified,
        }

        const accessToken = SignToken(userData)
        const result = { ...userData, accessToken }
        console.log("LogIn_RouteRes", result)

        return new Response(JSON.stringify(result))
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(err))
    }
}