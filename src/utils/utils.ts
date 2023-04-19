export const filterFInances = (type: boolean, values: any) => {

    console.log(type, "TYPE");


    if (type) {
        return values.filter((value: any) => {

            return value.type === 'invoice'
        })
    } else if (!type) {
        return values.filter((value: any) => value.type === 'payment')
    } else {
        return values;
    }
}

export const getItemsFromLocalStorage = () => {
    if (localStorage.getItem("finances")) {
        return JSON.parse(localStorage.getItem("finances") || "");
    } else {
        return [];
    }
}