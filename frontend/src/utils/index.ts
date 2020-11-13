export const getFormattedDate = (date : Date , type :string = 'label' ) => {
    if(!date) return "N/A"; 
    let d = new Date(date);
    var dd = String(d.getDate()).padStart(2, '0');
    var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = d.getFullYear();
    if(type == 'input') {
        return yyyy + '-' + mm + '-' + dd; 
    } else
        return mm + '.' + dd + '.' + yyyy;
}