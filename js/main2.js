const d = document;
const contactForm = () => { //function for select html-elements.
    const $form = d.querySelector(".contact-form"),
        $inputRequired = d.querySelectorAll(".contact-form [required]");
    console.log($form);
    $inputRequired.forEach(input => { //Creating span for error and fill.
        const $span = d.createElement("span");
        $span.id = input.name, //set id span with name input.
            $span.textContent = input.title;
        $span.classList.add("contact-form-error", "none"); //add class form-error.
        input.insertAdjacentElement("afterend", $span); //insert afterend span.
    })

    d.addEventListener("keyup", e => {
        if (e.target.matches(".contact-form [required]")) { //search in element contactform  all  elements  in class required.
            let $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern; //spreet operator  if $input validate or $textarea validate .

            if (pattern && $input.value !== "") { // if regular expression send for user == value
                let regex = new RegExp(pattern); //create new regulasr expression.
                return !regex.exec($input.value) ? // return  comparing evaluated (regExp)  ?true :false. 
                    d.getElementById($input.name).classList.add("is-active") : // else
                    d.getElementById($input.name).classList.remove("is-active") //remove class

            }
            if (!pattern) { //not pattern not regular expression.
                return $input.value = "" ?

                    d.getElementById($input.name).classList.add("is-active") :
                    d.getElementById($input.name).classList.remove("is-active");

            }
        }
    })

    d.addEventListener("submit", e => {
        e.preventDefault();
        const $loader = d.querySelector(".contact-form-loader"),
            $response = d.querySelector(".contact-form-response");
        $loader.classList.remove("none"); //change status class none



        fetch("server/send_mail.php", {
                method: "POST",
                body: new FormData(e.target) //Creating new form in bass at the form html.
            }).then(resp => resp.ok ? resp.json() : Promise.reject(resp)) //wait promisse
            .then(json => {
                $loader.classList.add("none");
                $response.classList.remove("none")
                $response.innerHTML = `<p>${json.message}</p>`;
                $form.reset()
            })
            .catch(err => {
                console.log(err);
                let message = err.statusText || "Ocurrio un error, intente nuevamente";
                $response.innerHTML = `<p>Error ${err.status} ,${message}</p>`
            }).finally(() =>
                setTimeout(() => { //disapear into of 3 seconds and empty var response .
                    $response.classList.add("none")
                    $response.innerHTML = ""
                }, 3000)
            )
    })
}

d.addEventListener('DOMContentLoaded', contactForm);