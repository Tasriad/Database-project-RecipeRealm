import { NextResponse } from "next/server";
import runQuery from "@/utils/database_manager";

export async function POST(request) {
    const reqBody = await request.json()
    console.log(reqBody)
    return NextResponse.json({ success: true,message:"doing fine" }, { status: 200 })
}