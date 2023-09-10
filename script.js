const fileDropArea = document.getElementById("file-drop-area");
const fileInput = document.getElementById("file-input");

fileDropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileDropArea.classList.add("drag-over");
});

fileDropArea.addEventListener("dragleave", () => {
    fileDropArea.classList.remove("drag-over");
});

fileDropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    fileDropArea.classList.remove("drag-over");

    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener("change", (e) => {
    const files = e.target.files;
    handleFiles(files);
});

function handleFiles(files) {
    for (const file of files) {
        if (file.type.startsWith("image/")) {
            // Handle image file
            const reader = new FileReader();
            reader.onload = function () {
                addImageToBlog(reader.result);
            };
            reader.readAsDataURL(file);
        } else if (file.type.startsWith("video/")) {
            // Handle video file
            addVideoToBlog(URL.createObjectURL(file));
        }
    }
}

function addImageToBlog(imageUrl) {
    const blogPost = document.createElement("div");
    blogPost.classList.add("blog-post");
    blogPost.innerHTML = `
        <h2>Blog Post Title</h2>
        <p>Published on: ${new Date().toLocaleDateString()}</p>
        <img src="${imageUrl}" alt="Image">
    `;
    document.querySelector(".container").appendChild(blogPost);
}

function addVideoToBlog(videoUrl) {
    const blogPost = document.createElement("div");
    blogPost.classList.add("blog-post");
    blogPost.innerHTML = `
        <h2>Blog Post Title</h2>
        <p>Published on: ${new Date().toLocaleDateString()}</p>
        <video controls>
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
    document.querySelector(".container").appendChild(blogPost);
}

function addBlogPost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").value;
    const video = document.getElementById("video").value;

    const blogPost = document.createElement("div");
    blogPost.classList.add("blog-post");
    blogPost.innerHTML = `
        <h2>${title}</h2>
        <p>Published on: ${new Date().toLocaleDateString()}</p>
        <p>${content}</p>
        <img src="${image}" alt="${title}">
        <iframe src="${video}" frameborder="0" allowfullscreen></iframe>
    `;

    document.querySelector(".container").appendChild(blogPost);

    // Clear the form inputs
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("image").value = "";
    document.getElementById("video").value = "";
}
let draggedItem = null;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    draggedItem = event.target;
}

function drop(event) {
    event.preventDefault();
    const itemType = draggedItem.getAttribute("data-type");
    const contentDiv = document.createElement("div");
    contentDiv.className = "content-item";
    contentDiv.textContent = itemType === "text" ? "Text Element" : "Image Element";
    event.target.appendChild(contentDiv);
}

function saveBlog() {
    const blogContent = document.getElementById("blog-content").innerHTML;
    // Send the content to your server for storage
    alert("Blog content saved!");
}
