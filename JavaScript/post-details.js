//Henter div-en fra html hvor innholdet skal
const outElement = document.getElementById("container");

//Hente en post - method: GET
// Endpoints
const API_BASE_URL = "https://nf-api.onrender.com";
const singlePostsEndpoint = '/api/v1/social/posts/';

let params = new URLSearchParams(document.location.search);
let id = params.get("id"); 

const getSinglePostsURL = `${API_BASE_URL}${singlePostsEndpoint}${id}`;
//let posts = [];
console.log(id);


async function getSinglePosts (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        console.log(url, options);

        const response = await fetch(url, options); 
        console.log(response);
        const post = await response.json();
        console.log(post);
        listData(post, outElement)
    } catch(error) {
        console.warn(error);
        outElement.innerHTML = `Could not fetch data...`;
    }
}

getSinglePosts(getSinglePostsURL);


//Liste ut alle poster på html siden
function listData(post, out){
    console.log ("List:", post);
    out.innerHTML = "";
    let newDivs = "";
        newDivs += `<div class="col-6 mb-5 m-auto">
          <div class="card h-100 ">
            <div class="card-body p-4">
               <div class="text-center ">
                  <h2>${post.title}</h2>
                  <p>From: ${post.body}</p>
                  <img src="${post.media}" class="img-fluid">
               </div>
            </div>
          </div>
        </div>`;
    out.innerHTML = newDivs;
}
