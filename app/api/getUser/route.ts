// import { getServerSession } from "next-auth"
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

export async function GET() {
    const session = await getServerSession(authOptions)
    console.log("ServerSession", session)

    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }))
    }

    return new Response(JSON.stringify({ session }))
}