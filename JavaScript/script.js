// REGISTER USER TEST
//Hente ut elementer
const form = document.querySelector("form#registerForm");
const usernameInput = document.querySelector("input#inputUsername");
const emailInput = document.querySelector("input#inputEmail");
const passwordInput = document.querySelector("input#inputPassword");
const submitButton = document.querySelector("button#submitBtn")

console.log(form, usernameInput, emailInput, passwordInput, submitButton);


//Hente p taggene for å skrive ut beskjed ved validering
const usernameMsg = document.querySelector("#usernameMsg");
const emailMsg = document.querySelector("#emailMsg");
const passwordMsg = document.querySelector("#passwordMsg");

//Validate form 
submitButton.addEventListener('click', validateForm);
function validateForm() {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const submittedName = username;
    console.log('Name: ' + submittedName);
    if (submittedName.length < 2) {
        usernameMsg.innerHTML += 'The name must be at least 2 characters long!';
    }
    let usernamePattern = /^[A-Za-z0-9_]+$/;
    if (!usernamePattern.test(submittedName)) { // And make sure it don't contain any digits
        usernameMsg.innerHTML += "The name can only contain characters, digits and underscore! ";
      }

    const submittedEmail = email;
     console.log('Email: ' + submittedEmail);
     let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!emailPattern.test(submittedEmail)) {
     emailMsg.innerHTML += "Please enter a valid email";
     }
     
    const submittedPassword = password;
    if (submittedPassword.length < 8) {
        passwordMsg.innerHTML += 'The password must be at least 5 characters long!';
    }

      if (usernameMsg.innerHTML === "" && emailMsg.innerHTML === "" && passwordMsg.innerHTML === "") {
        console.log("Form is submitted!");
        //form.submit(); ///for å submitte skjema 
     }
     else {
        console.log("You still have validation errors");
    }
}

 // Endpoints
 const APIurl = "https://nf-api.onrender.com/api/v1";
 const registerEndpoint = "/social/auth/register"; // POST
 const loginEndpoint = "/social/auth/login"; // POST

 const registerUrl = `${APIurl}${registerEndpoint}`;

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

     const username = usernameInput.value.trim();
     const email = emailInput.value.trim();
     const password = passwordInput.value.trim();

    const newUserData = {
        name: username,
        email: email,
        password: password,
    }
    console.log(newUserData);

    localStorage.setItem("email", email);


    registerNewUser(registerUrl, newUserData);
};

async function registerNewUser(url, data) {
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
        if (response.status === 201) {
            window.location = "/index.html";
        } else if (answer.message === "Profile already exists") {
            errorMsg.innerHTML = answer.message;
        }
    } catch(error) {
        console.warn(error);
    }
}

const errorMsg = document.querySelector("#errorMsg");




