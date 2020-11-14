export interface UserDetails {
    username: string;
    password: string;
}

export interface Address {
    city: string;
    street: string;
    country: string;
    zip: string;
}

export interface Customer {
    email: string;
    name: string;
    phone: string;
}
export interface Order {
   id?: string;
   title : string;
   bookingDate: number | Timestamp;
   address : Address;
   customer: Customer;
}

export interface Timestamp {
    nanoseconds: number
    seconds: number
}