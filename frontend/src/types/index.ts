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
   bookingDate: Date;
   address : Address;
   customer: Customer;
}
