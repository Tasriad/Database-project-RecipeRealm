import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export async function GET(request) {
    const token = request.cookies.get('current_user')?.value || ''
    if (token) {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return NextResponse.json({ data: decodedToken }, { status: 200 })
    }
    else {
        return NextResponse.json({ msg: "no token" }, { status: 200 })
    }
}