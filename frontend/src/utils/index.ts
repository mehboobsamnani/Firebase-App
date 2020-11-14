import { Timestamp } from "../types";

export const getFormattedDate = (date: number, type: string = 'label') => {
    if (!date) return "N/A";

    var a = new Date(date * 1000);
    var year = a.getFullYear();
    var mm = String(a.getMonth() + 1).padStart(2, '0');
    var dd = String(a.getDate()).padStart(2, '0');
    
    if (type == 'input') {
        return year + '-' + mm + '-' + dd;
    } else
        return mm + '.' + dd + '.' + year;
}