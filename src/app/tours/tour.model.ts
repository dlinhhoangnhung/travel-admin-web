export interface Tour {
    _id:          string;
    title:        string;
    image_url:    string;
    descriptions: string;
    activities:   Activity[];
    vehicle:      string;
    day:          number;
    night:        number;
    adult_price:  number;
    child_price:  number;
    map_location: string;
    created_at:   Date;
    updated_at:   Date;
}
export interface Activity {
    _id:  string;
    num:  string;
    desc: string;
}
