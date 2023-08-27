import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname
    if(path ==='/')
        return NextResponse.redirect(new URL('/home',request.nextUrl))
    console.log("trying to access: " + path)
    const token = request.cookies.get('current_user')?.value || ''
    if (token === '' && path !== '/login' && path !== '/signup') {
        console.log("redirecting to login")
        if(path !== '/login' || path !== '/signup')
        return NextResponse.redirect(new URL('/login',request.nextUrl))
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