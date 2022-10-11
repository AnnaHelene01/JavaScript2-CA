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

const user = document.getElementById("user");
const welcome = localStorage.getItem('username');
const editTitle = document.getElementById("editTitle");
const editContent = document.getElementById("editContent");
const editMedia = document.getElementById("editMedia");
const editBtn = document.getElementById("updatePost");


//Liste ut alle poster på html siden
function listData(post, out){
    user.innerHTML = "@" + welcome;
    console.log ("List:", post);
    editTitle.innerHTML = `${post.title}`;
    editContent.innerHTML = `${post.body}`;
    editMedia.innerHTML = `${post.media}`;
}



// UPDATE POST
const updateEndPoint = '/api/v1/social/posts/'; 
const updateURL = `${API_BASE_URL}${updateEndPoint}`;

async function updatePost (id) {
    const data = {
        title: editTitle.value.trim(),
        body: editContent.value.trim(),
    };

    if (editMedia.value != "") {
        const media = editMedia.value;
    } else {
        delete media;
    }


    console.log("Input data:", data);
    console.log(id);
    const upUrl = `${updateURL}${id}`;
     try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'PUT', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        };
        console.log(upUrl, options);

        const response = await fetch(upUrl, options); 
        console.log(response);
        const posts = await response.json();
        console.log(posts);
        if (response.status === 200) window.location = './main.html';
    } catch(error) {
         console.warn(error);
    }
}
        
editBtn.addEventListener("click", () => {
    console.log(id);
    updatePost(id);
    //window.location = `./main.html`;
})

