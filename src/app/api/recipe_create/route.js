import { NextRequest, NextResponse } from "next/server";
import runQuery from "@/utils/database_manager";

export async function POST(request) {
    const reqBody = await request.json();
    console.log(reqBody);
    try {
        return NextResponse.json({ success: true });
    }
    catch (err) {
        return NextResponse.json({ success: false });
    }
}