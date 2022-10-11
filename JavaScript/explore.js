//Hente alle profier - method: GET
// Endpoints
const API_BASE_URL = "https://nf-api.onrender.com";
const allUsersEndpoint = '/api/v1/social/profiles';


const getAllUsersURL = `${API_BASE_URL}${allUsersEndpoint}`;

let collection = [];

async function getAllUsers (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        console.log(url, options);

        const response = await fetch(url, options); 
        console.log(response);
        const users = await response.json();
        collection = users;
        console.log("Collection:", collection);
        console.log(users);
        listData(users, outElement) 
    } catch(error) {
        console.warn(error);
    }
}

getAllUsers(getAllUsersURL);

const outElement = document.getElementById("post-container");

//Liste ut alle poster på html siden
function listData(list, out){
    //console.log ("List:", list);
    out.innerHTML = "";
    let newDivs = "";
    for (let user of list) {
        //console.log(card);
        newDivs += `<div class="col mb-5">
          <div class="card h-100">
            <div class="card-body p-4">
               <div class="text-center">
                  <h2>@${user.name}</h2>
                  <p><strong>Email:</strong> ${user.email}</p>
               </div>
            </div>
          </div>
        </div>`;
    }
    out.innerHTML = newDivs;
}

    //Filtrere posts / search input
    const inputField = document.getElementById("queryString");
    inputField.addEventListener("keyup", filterUsers);

    function filterUsers () {
        const filterUsers = inputField.value.toLowerCase();
        //console.log(filterUsers);

        const filtered = collection.filter((user)=> {
            //console.log(post.author.name, filterPosts);
            //console.log(post.author.name.toUpperCase().indexOf(filterPosts.toUpperCase()) > -1);
            //console.log(collection.length);
            const name = user.name.toLowerCase();
            const email = user.email.toLowerCase();
            //console.log(name, email);
            if (name.indexOf(filterUsers) > -1) return true;
            if (email.indexOf(filterUsers) > -1) return true;
            return false;
        })

        listData(filtered, outElement);
    }