export class ListTemplate {
    constructor(private container: HTMLUListElement) { }

    render(finances: any) {

        this.container.innerHTML="";

        if (finances) {
            finances.map((finance: any) => {

                const li = document.createElement('li');
                const h4 = document.createElement('h4')
                h4.innerText = finance.type;
                li.append(h4);
    
                const time = document.createElement('span');
                time.innerText = finance.time
    
                li.append(time)
    
    
                const p = document.createElement('p');
                if (finance.type === 'invoice') {
                    p.innerText = `${finance.client} paid $${finance.amount} for ${finance.details}`
                } else {
                    p.innerText = `${finance.recipient} has been paid $${finance.amount} for ${finance.details}`
                }
    
                
    
                li.append(p)
    
                this.container.append(li)
    
            })
        } else {
            const h1 = document.createElement('h1')
            h1.innerText = "The log is empty"
            this.container.append(h1)
        }

        

    }
}