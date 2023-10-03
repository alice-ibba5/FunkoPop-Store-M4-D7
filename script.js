let myHeaders = new Headers()
let name = document.querySelector('#inputName')
let description = document.querySelector('#inputDescription')
let brand = document.querySelector('#inputBrand')
let imageUrl = document.querySelector('#inputImage')
let price = document.querySelector('#inputPrice')
let row = document.querySelector("#main-row")

myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiZjY1MzM5MzI3YzAwMThkM2EyYzgiLCJpYXQiOjE2OTYzMzEzNDcsImV4cCI6MTY5NzU0MDk0N30.eBm-Zar-IK06I2wuKIz5gEdcJRr6e7fX0RqGRUVx6E0");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

async function loadData() {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", requestOptions)
      const data = await response.json()
  
      return data
    } catch (error) {
      console.log(error)
  }
  }
  
  function displayData(data) {
    row.innerHTML = data.map(({name, description, brand, imageUrl, price}) => /*html*/`

    <div class="card" style="width: 18rem;">
    <img src="${imageUrl}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${description}</p>
      <p class="card-text"> ${brand}</p>
      <p class="card-text">${price} €</p>
      <a href="#" class="btn btn-outline-primary">Add to cart</a>
    </div>
  </div>   
  
    `).join("")
}

window.onload = async function () {
    try {
        const productData = await loadData()
        displayData(productData)
    } catch (error) {
        console.log(error)
    }
}




/*fetch("https://striveschool-api.herokuapp.com/api/product/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiZjY1MzM5MzI3YzAwMThkM2EyYzgiLCJpYXQiOjE2OTYzMzEzNDcsImV4cCI6MTY5NzU0MDk0N30.eBm-Zar-IK06I2wuKIz5gEdcJRr6e7fX0RqGRUVx6E0"
}
})*/



const login = (event) => {
    let email = document.querySelector('#email')
    let password = document.querySelector('#password')
    let button = document.querySelector('#buttonSignIn')

    if (email.value && password.value === "admin") {
        button = window.location.href="backoffice/backoffice.html"
    } else {
        alert("Email and password are wrong!")
    }
}






     