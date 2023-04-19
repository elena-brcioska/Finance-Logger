import { Invoice } from './classes/Invoice'
import { ListTemplate } from './classes/ListTemplate';
import { Payment } from './classes/Payment'
import { HasFormatter } from './interfaces/HasFormatter'
import { filterFInances, getItemsFromLocalStorage } from './utils/utils';

// list template instancees

const ul = document.querySelector('ul')!;
const list = new ListTemplate(ul)

// Set items

let finances: any = getItemsFromLocalStorage();
console.log(finances);

if (finances.length > 0) {
    list.render(finances)
} else {
    list.render(null)
}


// form

const form = document.querySelector('.new-item-form') as HTMLFormElement;

// inputs

const type = document.querySelector('#type') as HTMLSelectElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLSelectElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

console.log(amount.value.length, "AMOUNT")

tofrom.addEventListener("change", (e: Event)=> {

    const tofromEl = e.target as HTMLInputElement

    if(tofromEl.value === "") {
        tofrom.style.border = "1px solid red"
    } else {
        tofrom.style.border = "1px solid black"
    }
})

details.addEventListener("change", (e: Event)=> {

    const detailsEl = e.target as HTMLInputElement

    if(detailsEl.value === "") {
        details.style.border = "1px solid red"
    }else {
        details.style.border = "1px solid black"
    }
})

amount.addEventListener("change", (e: Event)=> {

    const amountEl = e.target as HTMLInputElement
    if(amountEl.value === "") {
        amount.style.border = "1px solid red"
    } else {
        amount.style.border = "1px solid black"
    }
})



form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    // get time
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    let isValid: boolean;
    const errorMsg = document.querySelector(".error-msg") as HTMLParagraphElement;

        if (tofrom.value === "" || details.value === "" || amount.value === "") {

            if(tofrom.value === "") {
                tofrom.style.border = "1px solid red"
            }

            if(details.value === "") {
                details.style.border = "1px solid red"
            }

            if(amount.value.length <= 0 ) {

                amount.style.border = "1px solid red"
            }

        isValid = false;

    } else {
        isValid = true;
    }


    if (isValid) {

        errorMsg.style.visibility = "hidden"

        let values: [string, string, string, number, string] = [type.value, tofrom.value, details.value, amount.valueAsNumber, datetime]
        let doc: HasFormatter;

        if (type.value === 'invoice') {
            doc = new Invoice(...values)
        } else {
            doc = new Payment(...values)
        }

        console.log(doc);
        finances.push(doc);
        console.log(finances, 'finances');
        localStorage.setItem('finances', JSON.stringify(finances))


        list.render(finances)

        tofrom.value = "";
        details.value = "";
        amount.value = "";
    } else {
        
        errorMsg.style.visibility = "visible"
        errorMsg.innerText = "All fields are required"
    }



})

// filter results

let isInvoiceClicked = false;

const btnAll = document.querySelector<HTMLButtonElement>('.btn-all')!;
const btnInvoices = document.querySelector<HTMLButtonElement>('.btn-invoices')!;
const btnPayments = document.querySelector<HTMLButtonElement>('.btn-payments')!;

console.log(btnInvoices)

btnAll.addEventListener('click', () => {
    isInvoiceClicked = false;

    btnAll.style.background = '#3c486b'
    btnAll.style.color = '#ffffff'

    btnInvoices.style.background = 'transparent'
    btnInvoices.style.color = '#3c486b'

    btnPayments.style.background = 'transparent'
    btnPayments.style.color = '#3c486b'

    list.render(finances)
})

btnInvoices.addEventListener('click', () => {
    isInvoiceClicked = true;

    btnInvoices.style.background = '#3c486b'
    btnInvoices.style.color = '#ffffff'

    btnPayments.style.background = 'transparent'
    btnPayments.style.color = '#3c486b'

    btnAll.style.background = '#ffffff'
    btnAll.style.color = '#3c486b'

    const invoices = filterFInances(isInvoiceClicked, finances);

    list.render(invoices);
})

btnPayments.addEventListener('click', () => {
    isInvoiceClicked = false;

    btnPayments.style.background = '#3c486b'
    btnPayments.style.color = '#ffffff'

    btnInvoices.style.background = 'transparent'
    btnInvoices.style.color = '#3c486b'

    btnAll.style.background = '#ffffff'
    btnAll.style.color = '#3c486b'

    const payments = filterFInances(isInvoiceClicked, finances);
    list.render(payments)
})

// clear log

const btnClear = document.querySelector<HTMLButtonElement>('.btn-clear')!;

btnClear.addEventListener("click", () => {
    const proceed = confirm(
        "Are you sure you want to clear the list?"
    );

    if (proceed) {
        list.render(null)
        localStorage.removeItem("finances")
        finances = [];
    }
})