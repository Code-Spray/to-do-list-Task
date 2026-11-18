function renderPosts(posts) {
  let content = ""
  posts.forEach(post => {
    content += `
                <section class="card" style="max-width: 300px">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}}</p>
                    </div>
                </section>
    `
  });
  document.querySelector(".cards-container").innerHTML = content
}

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://dummyjson.com/posts", true);
xhr.setRequestHeader("Accept", "application/json");

xhr.onreadystatechange = () => {
  if (xhr.readyState !== 4) {
    return
  }
  if (xhr.status < 200 || xhr.status >= 300) {
    return
  }
  const data = JSON.parse(xhr.responseText);
  let posts = data.posts
  console.log(data);
  renderPosts(posts)
};

xhr.onerror = function () {
  console.error("Network Error");
};

xhr.send();
