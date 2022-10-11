//Hente alle profier - method: GET
// Endpoints
const API_BASE_URL = "https://nf-api.onrender.com";
const allUsersEndpoint = '/api/v1/social/profiles';


const getAllUsersURL = `${API_BASE_URL}${allUsersEndpoint}`;


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
        //posts = posts.post;
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