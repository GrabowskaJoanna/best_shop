const inputQuantity = document.querySelector("#products");
const ordersNumber = document.querySelector("#orders");
const choosePackage = document.querySelector(".select__input");
const selectOptions = document.querySelectorAll(".select__dropdown li");
const totalPriceElement = document.querySelector("#total-price");
const accounting = document.querySelector("#accounting");
const paymentTerminal = document.querySelector("#terminal")
let total = 0;

class Products {
    products = 0.5;
    orders = 0.25;
    accounting = 35;
    terminal = 5;
}
class Summary {
    products = 0;
    orders = 0;
    accounting = 0;
    terminal = 0;
    packages= 0;
}
const summary = new Summary();
const products = new Products();

const packages = [
    {
        id: "basic",
        price: 20,
        name: "Basic"
    },
    {
        id: "professional",
        price: 40,
        name: "Professional"
    },
    {
        id: "premium",
        price: 60,
        name: "Premium",
    }
]

packages.forEach((el) => {
    console.log(`${el.id}, price: ${el.price}, nazwa produktu: ${el.name}`);
})




const handleSelect = () => {
    document.querySelector(".calc__select").classList.add("open");
}

selectOptions.forEach((el) => {
    el.addEventListener("click", () => {
        const value = el.getAttribute("data-value");
        const summaryElement = document.querySelector('[data-id=package]');
        const calculationElement = summaryElement.querySelector(".item__calc")
        const itemPriceElement = summaryElement.querySelector(".item__price");
        choosePackage.innerHTML = el.innerText;
        document.querySelector(".calc__select").classList.remove("open");
        const selectedOption = packages.find((e) => e.id === value)
        summaryElement.classList.add("open");
        calculationElement.innerHTML = `${selectedOption.name}`
        itemPriceElement.innerHTML = `$${selectedOption.price}`
        summary.packages = selectedOption.price;
        calculateSummary();

    })
});


choosePackage.addEventListener("click", handleSelect);

function addEvent(element) {
    element.addEventListener("change", (event) => {
        const id = event.currentTarget.id;
        const idsToValidate = ["products", "orders"];
        const summaryElement = document.querySelector(`[data-id=${id}]`);
        const calculationElement = summaryElement.querySelector(".item__calc")
        let itemPrice = 0;
        const itemPriceElement = summaryElement.querySelector(".item__price");

        if (idsToValidate.includes(id)) {
            const value = event.currentTarget.value;

            if (value <= 0) {
                event.currentTarget.value = 0;
                summaryElement.classList.remove("open");
            } else {
                calculationElement.innerHTML = `${value} * $${products[id]}` //wyciąganie wartości z konkretnego pola w obiekcie, np. products.orders jeżeli id = orders
                itemPrice = value * products[id];
                summaryElement.classList.add("open");
            }

        } else {
            const isChecked = event.currentTarget.checked;

            if (isChecked) {
                itemPrice = products[id];
                summaryElement.classList.add("open");
            } else {
                summaryElement.classList.remove("open");
            }

        }

        summary[id] = itemPrice;
        itemPriceElement.innerHTML = `$${itemPrice}`;

        calculateSummary();
    });
}

const calculateSummary = function () {
    total = summary.products + summary.orders + summary.accounting + summary.terminal + summary.packages;

    if (total > 0) {
        totalPriceElement.classList.add("open");
        totalPriceElement.lastElementChild.innerHTML = `$${total}`;
    } else {
        totalPriceElement.classList.remove("open");
    }

}

addEvent(inputQuantity);
addEvent(ordersNumber);
addEvent(accounting);
addEvent(paymentTerminal);

