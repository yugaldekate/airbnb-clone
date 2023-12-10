import ListingClient from "./ListingClient";
import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";


interface IParams {
    listingId?: string;
}

const ListingPage = async ( { params }: { params: IParams } ) => {

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <EmptyState />
        );
    }

    return ( 
        <ListingClient
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
        />
    );
}
 
export default ListingPage;