//Hente alle poster - method: GET
// Endpoints
const API_BASE_URL = "https://nf-api.onrender.com";
const allPostsEndpoint = '/api/v1/social/posts?_author=true&_comments=true&_reactions=true';


const getAllPostsURL = `${API_BASE_URL}${allPostsEndpoint}`;
//let posts = [];
let collection = [];

async function getAllPosts (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        //console.log(url, options);

        const response = await fetch(url, options); 
        //console.log(response);
        const posts = await response.json();
        //console.log("Posts:", posts);
        collection = posts;
        //console.log("Collection:", collection);
        listData(posts, outElement)
    } catch(error) {
        console.warn(error);
    }
}   

getAllPosts(getAllPostsURL);

const outElement = document.getElementById("post-container");

//Liste ut alle poster på html siden
function listData(list, out){
    //console.log ("List:", list);
    out.innerHTML = "";
    let newDivs = "";

    const welcome = localStorage.getItem('username');
    const htmlUsername = document.getElementById('html-username');

    htmlUsername.innerHTML = welcome;

    for (let post of list) {
        //console.log(card);
        const delBtn = `<button class="btnDelete btn btn-outline-primary" data-delete="${post.id}">DELETE</button>`;
        const updateBtn = `<button class="btnUpdate btn btn-primary text-white " data-update="${post.id}">UPDATE</button>`;

        let date = new Date(post.created);
        let ourDate = date.toLocaleString("default", {
            day: "numeric", 
            month: "long", 
            hour: "2-digit", 
            minute: "2-digit"
        });

        newDivs += `<div class="col mb-5">
               <div class="card h-100">
                  <div class="card-body p-4">
                      <div class="text-center">
                        <div class="d-flex">
                           <div class="col-6 d-flex">
                             <img src="./images/icons8-circled-user-female-skin-type-6-30.png" class="user-icon" alt="user">
                             <p><strong>@${post.author.name}</strong></p>
                           </div>
                           <div class="col-6">
                             <p>${ourDate}</p>
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
                     <div class="justify-content-start w-25">
                        <a href=""><img src="comment-icon.png" alt="comment-icon"></a>
                     </div>
               </div>
            </div>
          </div>
        </div>`;
    }
    out.innerHTML = newDivs;
    //Delete posts
    const btns = document.querySelectorAll("button.btnDelete");
    //console.log(btns);
    for (let btnDelete of btns){
         btnDelete.addEventListener("click", () => {
            //console.log(btnDelete.getAttribute('data-delete'));
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
            //console.log(btnUpdate.getAttribute('data-update'));
            const updateId = btnUpdate.getAttribute('data-update');
            window.location =`./post-edit.html?id=${updateId}`;
        })
    }
}

    //Filtrere posts / search input
    const inputField = document.getElementById("queryString");
    inputField.addEventListener("keyup", filterPosts);

    function filterPosts () {
        const filterPosts = inputField.value.toLowerCase();
        //console.log(filterPosts);

        const filtered = collection.filter((post)=> {
            //console.log(post.author.name, filterPosts);
            //console.log(post.author.name.toUpperCase().indexOf(filterPosts.toUpperCase()) > -1);
            //console.log(collection.length);
            const author = post.author.name.toLowerCase();
            const title = post.title.toLowerCase();
            const published = post.created.toString();
            //console.log(author, title, published);
            if (author.indexOf(filterPosts) > -1) return true;
            if (title.indexOf(filterPosts) > -1) return true;
            if (published.indexOf(filterPosts) > -1) return true;
            return false;
        })

        listData(filtered, outElement);
    }


// DELETE POST
const deleteEndPoint = '/api/v1/social/posts/'; 
const deleteURL = `${API_BASE_URL}${deleteEndPoint}`;

async function deletePost (id) {
    //console.log(id);
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
        //console.log(url, options);

        const response = await fetch(url, options); 
        //console.log(response);
        const posts = await response.json();
        //console.log(posts);
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
const createPost = `${API_BASE_URL}${allPostsEndpoint}`;

async function createNewPost (url, data) {
    const title = postTitle.value.trim();
    const body = postContent.value.trim();
    let media = postMedia.value.trim();
    if (media === "") media = "https://www.pngkey.com/maxpic/u2w7r5y3a9o0w7t4/";

    const postData = {
        title: title,
        body: body,
        media: media,
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
        //console.log(url, data, options);

        const response = await fetch(url, options); 
        //console.log(response);
        const posts = await response.json();
        //console.log(posts);
    if (response.status === 200) window.location='./main.html';
    } catch(error) {
        console.warn(error);
    }
}

submitPost.addEventListener("click", () => {
       createNewPost(createPost);
});



//Hente p taggene for å skrive ut beskjed ved validering
const titleMsg = document.getElementById("titleMsg");
const bodyMsg = document.getElementById("bodyMsg");
const mediaMsg = document.getElementById("mediaMsg");

//console.log(titleMsg, bodyMsg, mediaMsg);

//Validate form 
submitPost.addEventListener('click', validateForm);
function validateForm() {
    const title = postTitle.value.trim();
    const body = postContent.value.trim();
    const media = postMedia.value.trim();

    const submittedTitle = title;
    titleMsg.innerHTML = "";
     if (submittedTitle.length < 1) {
     titleMsg.innerHTML = 'Your title has to be at least 1 or more characters.';
     }
     
     bodyMsg.innerHTML = "";
    const submittedBody = body;
    if (submittedBody.length < 1) {
        bodyMsg.innerHTML = 'Your title has to be at least 1 or more characters.';
    }

    mediaMsg.innerHTML = "";
    const submittedMedia = media;
    if (submittedMedia === "") {
        mediaMsg.innerHTML = 'You must add a real URL';
    }

      if (titleMsg.innerHTML === "" && bodyMsg.innerHTML === "" && mediaMsg.innerHTML === "") {
        //console.log("Form is submitted!");
        //form.submit(); ///for å submitte skjema 
     }
     else {
        console.log("You still have validation errors");
    }
}