export interface Booking {
    _id:           string;
    uid:           string;
    status:        string;
    booking_items: BookingItem[];
    updated_at:    Date;
    created_at:    Date;
    __v:           number;
    total:         number;
}

export interface BookingItem {
    _id:      string;
    tour_id:  string;
    type:     string;
    quantity: number;
}
