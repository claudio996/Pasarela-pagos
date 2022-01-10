import KEYS from "./strype-keys.js"
const d = document,
    $pastel = d.getElementById("pastel-choclo"),
    $template = d.getElementById("pastel-template").content,
    $fragment = d.createDocumentFragment(),
    $fecthOption = {
        headers: {
            Authorization: `Bearer ${KEYS.secret}`,
        }
    }
let prices, products;

const moneyFormat = n => `$${n.slice(0,-3)}.`;

const peso = number => (new Intl.NumberFormat("CL", { style: "currency", currency: "CLP" }).format(number));

Promise.all([
        fetch("https://api.stripe.com/v1/products", $fecthOption),
        fetch("https://api.stripe.com/v1/prices", $fecthOption),
    ])
    .then(responses => Promise.all(responses.map(resp => resp.json()))) //map-> created new array with response in json.
    .then(json => {
        products = json[0].data;
        prices = json[1].data;

        console.log(prices);

        //prommise products get name, image, from promise prices the prices and id.
        prices.forEach(element => {
            let productData = products.filter(product => product.id === element.product)
            console.log(productData);
            $template.querySelector('.pastel').setAttribute("data-prices", element.id);
            $template.querySelector("img").src = productData[0].images[0];
            $template.querySelector("img").alt = productData[0].name;
            $template.querySelector("figcaption").innerHTML = `
            ${productData[0].name}<br>
            ${peso(element.unit_amount_decimal)} ${element.currency}`

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
        });

        $pastel.appendChild($fragment);

    })
    .catch(err => {

        let message = err.statusText || "Ocurrio un error al conectarese con la api de stripe";
        $pastel.innerHTML = `<p>Error ${err.status}: ${message} </p>`

    });

d.addEventListener("click", e => {
    if (e.target.matches(".pastel *")) {
        let price = e.target.parentElement.getAttribute("data-prices");
        //console.log(priceId);
        Stripe(KEYS.public).redirectToCheckout({
            lineItems: [{ price, quantity: 1 }],
            mode: "subscription",
            successUrl: "http://127.0.0.1:5500/assets/stripe-success.html",
            cancelUrl: "http://127.0.0.1:5500/assets/stripe-cancel.html",

        }).then(res => {
            if (res.error) {
                console.log(res.error);
                $pastel.insertAdjacentHTML("afterend", res.err.message);
            }
        })
    }
})