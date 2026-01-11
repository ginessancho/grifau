import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber, initializeDatabase } from '@/lib/db';

// Initialize database on first request
let initialized = false;

export async function POST(request: NextRequest) {
    try {
        if (!initialized) {
            await initializeDatabase();
            initialized = true;
        }

        const body = await request.json();
        const { email } = body;

        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { success: false, message: 'Valid email required' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Invalid email format' },
                { status: 400 }
            );
        }

        const result = await addSubscriber(email.toLowerCase().trim());

        return NextResponse.json(result, {
            status: result.success ? 200 : 409
        });
    } catch (error) {
        console.error('Subscribe error:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
