import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
    const accessToken = req.cookies.get('accessToken'); // Retrieve token from cookies

    if (!accessToken) {
        return NextResponse.redirect('/login'); // Redirect if no access token
    }

    try {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET); // Decode using backend secret
        const userRole = decodedToken.role;

        const pathname = req.nextUrl.pathname;

        if (pathname.startsWith('/dashboard') && userRole !== 'admin') {
            return NextResponse.redirect('/home');
        }


        if (pathname.startsWith('/home') && userRole === 'admin') {
            return NextResponse.redirect('/dashboard');
        }

    } catch (error) {
        return NextResponse.redirect('/login'); // Handle invalid token
    }

    return NextResponse.next(); // Proceed to the requested route
}

export const config = {
    matcher: ['/dashboard/:path*', '/home/:path*'], // Define protected routes
};
