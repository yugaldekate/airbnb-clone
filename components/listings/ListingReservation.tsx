'use client';

import { Range } from "react-date-range";

import CustomButton from "../CustomButton";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
    price: number;
    daysCount: Number
    dateRange: Range,
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({ price, daysCount, dateRange, totalPrice, onChangeDate, onSubmit, disabled, disabledDates }) => {
    return ( 
        <div className=" bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden ">
            <div className=" flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    $ {price}
                </div>
                <div className="font-light text-neutral-600">
                    night
                </div>
            </div>

            <hr />

            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value:any) => onChangeDate(value.selection)}
            />

            <hr />

            <div className="p-4">
                <CustomButton 
                    disabled={disabled} 
                    label="Reserve" 
                    onClick={onSubmit}
                />
            </div>

            <hr />

            <div className="p-4 flex flex-row items-center justify-between text-lg">
                <div className="underline underline-offset-auto font-normal">
                    {`$${price.toLocaleString()} x ${daysCount} ${daysCount==1 ? "night" : "nights"}`}
                </div>
                <div className="font-semibold" >
                    ${totalPrice.toLocaleString('en-US')}
                </div>
            </div>
        </div>
    );
}
 
export default ListingReservation;