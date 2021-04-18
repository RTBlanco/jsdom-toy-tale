let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = toyFormContainer.firstElementChild
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
  toyForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    console.log(e)
    createToy(e)
  })
});
      
function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} Likes`;
    }))
}

function createToy(e) {
  const obj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0
    })
  }

  fetch("http://localhost:3000/toys", obj)
  .then(resp => resp.json())
  .then(toy => console.log(toy))
}

function createCards(array) {
  const toyCollection = document.getElementById('toy-collection')

  for ( const obj of array) {
    let div = document.createElement('div')
    div.innerHTML = `
    <h2>${obj.name}</h2>
    <img src=${obj.image} class="toy-avatar" />
    <p>${obj.likes} Likes </p>
    `
    let btn = document.createElement("button")
    btn.classList.add('like-btn')
    btn.id = obj.id
    btn.innerText = "like"

    div.classList.add("card")
    div.append(btn)
    toyCollection.append(div)
    btn.addEventListener("click", (e)=>{
      e.preventDefault();
      console.log(e)
      likes(e)
    })
  }
}

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(obj => createCards(obj))
}