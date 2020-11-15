import { Type } from 'class-transformer';
import {
    IsDate,
    IsDateString,
    IsEmail,
    IsISO8601,
    IsNumberString,
    IsOptional,
    IsString,
    Length,
    Matches,
    IsPhoneNumber,
    MinLength,
    IsNumber,
    ValidateNested,
    IsNotEmpty,

} from 'class-validator';
import { IsUnixTimeStamp } from './isUnixTime';

export class Address {
    @MinLength(3)
    readonly city: string;

    @IsString()
    readonly street: string;

    @IsString()
    readonly country: string;

    @IsString()
    readonly zip: string;
}

export class Customer {
    @IsEmail()
    readonly email: string;

    @MinLength(3)
    readonly name: string;

    @IsPhoneNumber(null)
    readonly phone: string;
}

export class UpdateOrder {

    @MinLength(3)
    readonly title: string;

    @IsNumber()
    @IsUnixTimeStamp({
        message: "Not a Valid Timestamp"
    })
    readonly bookingDate: number;
}

export class CreateOrder {

    @MinLength(3)
    readonly title: string;

    @IsUnixTimeStamp()
    readonly bookingDate: number;

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => Customer)
    readonly customer: Customer;

    @ValidateNested()
    @Type(() => Address)
    @IsNotEmpty()
    readonly address: Address;
}

export class FindOneParams {
    @IsString()
    id: string;
}
