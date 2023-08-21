import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname
    console.log("trying to access: " + path)
    const token = request.cookies.get('current_user')?.value || ''
    if (token) {
        if (path != '/profile') {
            return NextResponse.redirect(new URL('/profile', request.nextUrl))
        }
    }
    else {
        if (path != '/login' && path != '/signup') {
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        }
    }
}

export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/login',
        '/signup',
    ]
}