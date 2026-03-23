import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        price,
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc
    } = body;

    const requiredFields = ['title', 'description', 'price', 'category', 'location', 'guestCount', 'roomCount', 'bathroomCount', 'imageSrc'];
    
    for (const field of requiredFields) {
        if (body[field] === undefined || body[field] === null || body[field] === '') {
            return NextResponse.json(
                { error: `Missing required field: ${field}` },
                { status: 400 }
            );
        }
    }

    try {
        const locationValue = location?.value || location;

        const listing = await prisma.listing.create({
            data: {
                title,
                description, 
                price: parseInt(price, 10),
                category,
                locationValue,
                guestCount,
                roomCount,
                bathroomCount,
                imageSrc,
                userId: currentUser.id
            }
        });

        return NextResponse.json(listing);
    } catch (error) {
        console.error('Listing creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create listing' },
            { status: 500 }
        );
    }
}
