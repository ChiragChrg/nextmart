import { connectDB } from "@utils/database"
import User from "@models/UserModal"
import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server"

interface RequestBody {
    name: string,
    email: string,
    password: string
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
        if (!body?.name || !body?.email || !body?.password) {
            return new NextResponse("Missing Fields", { status: 400 })
        }

        await connectDB()
        const userExists = await User.findOne({ email: body?.email })
        if (userExists) {
            return new NextResponse("User already Exists!", { status: 400 })
        }

        await User.create({
            name: body?.name,
            email: body?.email,
            hashedPassword: await bcrypt.hash(body?.password, 10)
        })

        return new NextResponse("User Registered Successfully!", { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}