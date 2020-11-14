import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";
 
export function IsUnixTimeStamp(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsUnixTimeStamp",
            target: object.constructor,
            options: validationOptions,
            propertyName: propertyName,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    let date= new Date(value)
                    return (date instanceof Date && (date. getTime() > 0));
                }
            }
        });
   };
}