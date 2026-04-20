const username = "A1VERMAN"

const profile_picture = document.getElementById("profile_picture");
const pseudo = document.getElementById("pseudo");
const bio = document.getElementById("bio");
const nb_repositories = document.getElementById("nb_repositories");
const followers = document.getElementById("Followers");
const following = document.getElementById("Following");

const repositories_holder = document.getElementById("repositories");

async function fetch_user_info(user){
    const url = `https://api.github.com/users/${user}`;

    let fetch_info = await fetch(url);
    let data = await fetch_info.json();

    console.log(data);
    if (data.avatar_url != null){profile_picture.src = data.avatar_url;}
    if (data.login != null && data.html_url != null){pseudo.innerHTML = `<a href=${data.html_url}>${data.login}</a>`;}
    if (data.bio != null){bio.textContent = data.bio;}
    if (data.public_repos != null){nb_repositories.textContent = `${data.public_repos} public repositories`}
    if (data.followers != null){followers.textContent = `${data.followers} followers`}
    if (data.following != null){following.textContent = `${data.following} followings`}
}

async function fetch_repositories(username){
    const url = `https://api.github.com/users/${username}/repos`

    let fetch_info = await fetch(url);
    let data = await fetch_info.json();

    data.forEach(element => {
        const article = document.createElement("article");
        article.classList.add("box");
        article.classList.add("repository_box");

        const title = document.createElement("h3");
        const link = document.createElement("a");
        link.textContent = element.name;
        link.href = element.html_url;
        title.classList.add("repository_title");
        title.appendChild(link);

        const description = document.createElement("p");
        description.textContent = element.description;

        const primary_language = document.createElement("p");
        primary_language.textContent = `Primary language: ${element.language}`;

        const star_count = document.createElement("p");
        star_count.textContent = `Stargazers count: ${element.stargazers_count}`

        const forks_count = document.createElement("p");
        forks_count.textContent = `Forks count: ${element.forks_count}`

        article.appendChild(title);
        article.append(description);
        article.append(primary_language);
        article.append(star_count);
        article.append(forks_count);
        repositories_holder.appendChild(article);
    });

    console.log(data);
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetch_user_info(username);
    fetch_repositories(username);
});