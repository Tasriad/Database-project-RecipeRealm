import { NextRequest, NextResponse } from "next/server";

export function POST(request) {
    const { message } = request.json();
    return NextResponse.json({ message: "Hello World", success: true });
}