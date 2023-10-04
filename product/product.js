const url = "https://striveschool-api.herokuapp.com/api/product/";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let myHeaders = new Headers()
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiZjY1MzM5MzI3YzAwMThkM2EyYzgiLCJpYXQiOjE2OTYzMzEzNDcsImV4cCI6MTY5NzU0MDk0N30.eBm-Zar-IK06I2wuKIz5gEdcJRr6e7fX0RqGRUVx6E0");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

async function loadData(id) {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, requestOptions)
      const data = await response.json()
  
      return data
    } catch (error) {
      console.log(error)
  }
  }
  

  function displayProduct (data) {
    let cont = document.querySelector("#main-row");
    
          cont.innerHTML += ` 
                       <div class="container d-flex">
                         <img class="image col-12 col-lg-3" src="${data.imageUrl}" alt="">
                         <div class="d-flex flex-column ms-5 info">
                           <h1 class="name">${data.name}</h1>
                           <h4 class="description">${data.description}</h4>
                           <h4 class="brand">${data.brand}</h4>
                           <h3 class="price">Price: ${data.price} €</h3>
                         </div>
                       </div>`;
    }

    window.onload = async function () {
      try {
          const productData = await loadData(id)
          displayProduct(productData)
      } catch (error) {
          console.log(error)
      }
  }

/*let myHeaders = new Headers()
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiZjY1MzM5MzI3YzAwMThkM2EyYzgiLCJpYXQiOjE2OTYzMzEzNDcsImV4cCI6MTY5NzU0MDk0N30.eBm-Zar-IK06I2wuKIz5gEdcJRr6e7fX0RqGRUVx6E0");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};   

const url = "https://striveschool-api.herokuapp.com/api/product/";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, requestOptions)
.then(response => response.json())
.then(displayProduct)

function displayProduct(data) {
let cont = document.querySelector("#main-row");

      cont.innerHTML += ` 
      <div class="container d-flex">
      <img class="image col-12 col-lg-3" src="${data.imageUrl}" alt="">
      <div class="d-flex flex-column ms-5 info">
        <h1 class="name">${data.name}</h1>
        <h4 class="description">${data.description}</h4>
        <h4 class="brand">${data.brand}</h4>
        <h3 class="price">Price: ${data.price} €</h3>
      </div>
    </div>`;
}*/