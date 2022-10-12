// REGISTER USER TEST
//Hente ut elementer
const form = document.querySelector("form#loginForm");
const emailLogin = document.querySelector("input#loginEmail");
const passwordLogin = document.querySelector("input#loginPassword");
const submitButton = document.querySelector("button#submitBtn")

console.log(form, emailLogin, passwordLogin, submitButton);


//Hente p taggene for å skrive ut beskjed ved validering
const emailMsg = document.querySelector("#emailMsg");
const passwordMsg = document.querySelector("#passwordMsg");

//Validate form 
submitButton.addEventListener('click', validateForm);
function validateForm() {
    const email = emailLogin.value.trim();
    const password = passwordLogin.value.trim();

    const submittedEmail = email;
     console.log('Email: ' + submittedEmail);
     let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!emailPattern.test(submittedEmail)) {
     emailMsg.innerHTML += "Please enter a valid email";
     } if (submittedEmail !== localStorage.getItem("email")){
        emailMsg.innerHTML = "This email does not exist! Please register";
     }

    
     
    const submittedPassword = password;
    if (submittedPassword.length < 8) {
        passwordMsg.innerHTML += 'The password must be at least 5 characters long!';
    }

      if (emailMsg.innerHTML === "" && passwordMsg.innerHTML === "") {
        console.log("Form is submitted!");
        //form.submit(); ///for å submitte skjema 
     }
     else {
        console.log("You still have validation errors");
    }
}

 // Endpoints
 const APIurl = "https://nf-api.onrender.com/api/v1";
 const loginEndpoint = "/social/auth/login"; // POST

 const loginUrl = `${APIurl}${loginEndpoint}`;

//Get form-data on the register btn, validate and process
submitButton.addEventListener("click", validateAndProcess) 

function validateAndProcess(event) {    
    event.preventDefault();
    console.log("You've pressed submit bro");
    /**
     * 
     * @param {string} url URL to API endpoint
     * @param {object} data Object with the data for new user
     */

     const email = emailLogin.value.trim();
     const password = passwordLogin.value.trim();

    const loginData = {
        email: email,
        password: password,
    }
    console.log(loginData);

    loginUser(loginUrl, loginData);
};

async function loginUser(url, data) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        console.log(url, data, options)

        const response = await fetch (url, options);
        console.log(response);
        const answer = await response.json();
        console.log(answer);
        if (response.status === 200) {
            localStorage.setItem('username', answer.name);
            localStorage.setItem('accessToken', answer.accessToken);
            window.location = "/main.html";
        } else if (answer.message === "This profile does not exist! Go and register") {
            errorMsg.innerHTML = answer.message;
        }
    } catch(error) {
        console.warn(error);
    }
}

//loginUser(loginUrl, loginData);

const errorMsg = document.querySelector("#errorMsg");
