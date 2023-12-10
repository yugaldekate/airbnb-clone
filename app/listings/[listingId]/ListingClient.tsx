'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { Range } from "react-date-range";

import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";

import { SafeListing, SafeReservation, SafeUser } from "@/types";

import Container from "@/components/Container";
import { categories } from "@/components/navbar/Categories";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";

import useLoginModal from "@/hooks/useLoginModal";

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ( { listing, reservations = [], currentUser } ) => {

    const router = useRouter();
    const loginModal = useLoginModal();

    const category = useMemo(() => {
        return categories.find((items) => (items.label === listing.category) );
    }, [listing.category]);

    const initialDateRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    };

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
    
        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });
        
            dates = [...dates, ...range];
        });
    
        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [daysCount, setDaysCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const days = differenceInCalendarDays(
                dateRange.endDate, 
                dateRange.startDate
            );
            
            if (days && listing.price) {
                setDaysCount(days);
                setTotalPrice(days * listing.price);
            } else {
                setDaysCount(1);
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
          return loginModal.onOpen();
        }

        setIsLoading(true);
  
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success('Listing reserved!');
            setDateRange(initialDateRange);
            // todo - redirect to trips
            router.refresh();
        })
        .catch(() => {
            toast.error('Something went wrong.');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

   
    return ( 
        <Container>
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                daysCount={daysCount}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
 
export default ListingClient;