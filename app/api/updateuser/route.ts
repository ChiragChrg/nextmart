import { connectDB } from "@utils/database"
import UserModel from "@models/UserModel"
import { NextResponse } from "next/server"

interface RequestBody {
    email: string,
    phone?: string,
    dob?: Date
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()
    console.log("UpdateRouteBody", body)
    try {
        if (!body?.email) {
            return new NextResponse("Missing Email ID", { status: 400 })
        }

        let phoneValue = body?.phone
        let dobValue = body?.dob

        await connectDB()
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: body?.email },
            { $set: { phone: phoneValue, dob: dobValue } },
            { new: true }
        );

        return new NextResponse(JSON.stringify({ user: updatedUser, message: "User Updated Successfully!" }), { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), { status: 500 })
    }
}