import KEYS from "./strype-keys.js"
const d = document,
    $pastel = d.getElementById("pastel-choclo"),
    $template = d.getElementById("pastel-template").content,
    $fragment = d.createDocumentFragment();

fetch("https://api.stripe.com/v1/products", { //call api.
    headers: {
        Authorization: `Bearer ${KEYS.secret}`,
    }
}).then(resp => {
    return resp.json()
}).then(json => {
    console.log(json);
})

fetch("https://api.stripe.com/v1/prices", { //call api.
    headers: {
        Authorization: `Bearer ${KEYS.secret}`,
    }
}).then(resp => {
    return resp.json()
}).then(json => {
    console.log(json);
})