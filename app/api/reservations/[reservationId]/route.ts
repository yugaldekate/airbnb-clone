import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
    reservationId?: string;
}

export async function DELETE( request: Request, { params }: { params: IParams } ) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    //the user who reserved the listing or the creater of the listing i.e owner of property can cancel a reservation
    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [ 
                { userId: currentUser.id }, 
                { listing: { userId: currentUser.id } }
            ]
        }
    });

    return NextResponse.json(reservation);
}
