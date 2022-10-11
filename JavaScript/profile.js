//Legge til brukerens navn
const welcome = localStorage.getItem('username');
console.log(welcome);
const userName = document.getElementById('user-name');

userName.innerHTML = welcome;

//Hente alle poster - method: GET
// Endpoints
const API_BASE_URL = "https://nf-api.onrender.com";
const myPostsEndpoint = `/api/v1/social/profiles/${welcome}?_posts=true`;


const getMyPostsURL = `${API_BASE_URL}${myPostsEndpoint}`;
//let posts = [];

async function getMyPosts (url) {
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
        const profile = await response.json()
        console.log("Profil: ", profile)
        console.log("Profil > navn: ", profile.name)
        console.log("Profil > epost: ", profile.email)
        console.log("Posts:", profile.posts);
        const myOwnPosts = profile.posts
        listData(myOwnPosts, outElement)
    } catch(error) {
        console.warn(error);
    }
}   

getMyPosts(getMyPostsURL);

const outElement = document.getElementById("post-container");

//Liste ut mine poster på html siden
function listData(list, out){
    console.log("List: ", list)
    console.log("Out: ", out)
    out.innerHTML = "";
    let newDivs = "";

    for (let post of list) {
        console.log("Post: ", post);
        const delBtn = `<button class="btnDelete btn btn-outline-primary" data-delete="${post.id}">DELETE</button>`;
        const updateBtn = `<button class="btnUpdate btn btn-primary text-white" data-update="${post.id}">UPDATE</button>`;
        newDivs += `<div class="col mb-5">
               <div class="card h-100">
                  <div class="card-body p-4">
                      <div class="text-center">
                        <div class="d-flex">
                           <div class="col-6">
                             <p><strong>@${post.owner}</strong></p>
                           </div>
                           <div class="col-6">
                             <p>${post.created}</p>
                           </div>
                        </div>
                         <h2>${post.title}</h2>
                         <p>${post.body}</p>
                         <img src="${post.media}" class="img-fluid" alt="">
                         <a href="post-details.html?id=${post.id}"> <p>Click to read more</p></a>
                      <div>
                        ${localStorage.getItem('username') === post.author.name ? delBtn : ""}
                        ${localStorage.getItem('username') === post.author.name ? updateBtn : ""}
                     </div>
               </div>
            </div>
          </div>
        </div>`;
    }
    //if (${localStorage.getItem('username') === post.author.name}) { }
        out.innerHTML = newDivs;


        //Delete posts
        const btns = document.querySelectorAll("button.btnDelete");
        //console.log(btns);
        for (let btnDelete of btns){
             btnDelete.addEventListener("click", () => {
                console.log(btnDelete.getAttribute('data-delete'));
                if ( confirm('Are you totally sure?')){
                    deletePost(btnDelete.getAttribute('data-delete'));
                }
          }) 
        }
        //Update posts
        const updatebtns = document.querySelectorAll("button.btnUpdate");
        //console.log(updatebtns);
        for (let btnUpdate of updatebtns) {
            btnUpdate.addEventListener("click", () => {
                console.log(btnUpdate.getAttribute('data-update'));
                const updateId = btnUpdate.getAttribute('data-update');
                window.location =`./post-edit.html?id=${updateId}`;
            })
}
}

// DELETE POST
const deleteEndPoint = '/api/v1/social/posts/'; 
const deleteURL = `${API_BASE_URL}${deleteEndPoint}`;

async function deletePost (id) {
    console.log(id);
    const url = `${deleteURL}${id}`;
     try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'DELETE', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        console.log(url, options);

        const response = await fetch(url, options); 
        console.log(response);
        const posts = await response.json();
        console.log(posts);
        if (response.status === 200) window.location = './main.html';
    } catch(error) {
         console.warn(error);
    }
}

//Hente create post verdier:
const form = document.getElementById("create-container");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const postMedia = document.getElementById("post-media");
const submitPost = document.getElementById("submitPost");


//Create a new post - method: POST
const createPost = `${API_BASE_URL}${myPostsEndpoint}`;

async function createNewPost (url, data) {
    const postData = {
        title: postTitle.value.trim(),
        body: postContent.value.trim(),
        media: postMedia.value.trim(),
       };

    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'POST', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(postData),
        };
        console.log(url, data, options);

        const response = await fetch(url, options); 
        console.log(response);
        const posts = await response.json();
        console.log(posts);
    if (response.status === 200) window.location='./main.html';
    } catch(error) {
        console.warn(error);
    }
}

//createNewPost(createPost);

submitPost.addEventListener("click", () => {
    
       createNewPost(createPost);
});



