import firebase from 'firebase';

export const getFormattedDate = (date: number | firebase.firestore.Timestamp = Date.now() , type: string = 'label') => {
    if (!date) return "N/A";
    let a = new Date();
    if (date && typeof date === 'object') {
        a = date.toDate()
    } else {
        a = new Date(date as number);
    }
    var year = a.getFullYear();
    var mm = String(a.getMonth() + 1).padStart(2, '0');
    var dd = String(a.getDate()).padStart(2, '0');
    
    if (type === 'input') {
        return year + '-' + mm + '-' + dd;
    } else
        return mm + '.' + dd + '.' + year;
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/