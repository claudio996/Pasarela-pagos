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


Promise.all([
        fetch("https://api.stripe.com/v1/products", $fecthOption),
        fetch("https://api.stripe.com/v1/prices", $fecthOption),
    ])
    .then(responses => Promise.all(responses.map(resp => resp.json()))) //map-> created new array with response in json.
    .then(json => {
        products = json[0].data;
        prices = json[1].data;

        console.log(products, prices);

        //prommise products get name, image, from promise prices the prices and id.
        prices.forEach(element => {
            let productData = products.filter(product => product.id === element.product)
            console.log(productData);
            $template.querySelector('.pastel').setAttribute("data-prices", element.id);
            $template.querySelector("img").src = productData[0].images[0];
            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
        });

        $pastel.appendChild($fragment);

    })
    .catch(err => {

        let message = err.statusText || "Ocurrio un error al conectarese con la api de stripe";
        $pastel.innerHTML = `<p>Error ${err.status}: ${message} </p>`

    });