let myHeaders = new Headers()
let name = document.querySelector('#inputName')
let description = document.querySelector('#inputDescription')
let brand = document.querySelector('#inputBrand')
let imageUrl = document.querySelector('#inputImage')
let price = document.querySelector('#inputPrice')
let row = document.querySelector("#main-row")
let resultsContainer = document.querySelector("#main-row > div");

myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiZjY1MzM5MzI3YzAwMThkM2EyYzgiLCJpYXQiOjE2OTc5MTI0NTgsImV4cCI6MTY5OTEyMjA1OH0.Blq_SpHYM6SJI29Hj5RF2fv5KGTH4sQ5N1Lkh0kffvw");

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

 row.innerHTML = /*html*/`
 <div class="jelly"></div>

 <svg width="0" height="0" class="jelly-maker">
   <defs>
     <filter id="uib-jelly-ooze">
       <feGaussianBlur
         in="SourceGraphic"
         stdDeviation="6.25"
         result="blur"
       />
       <feColorMatrix
         in="blur"
         mode="matrix"
         values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
         result="ooze"
       />
       <feBlend in="SourceGraphic" in2="ooze" />
     </filter>
   </defs>
 </svg>`
  
  function displayData(data) {

    row.innerHTML = data.map(({name, description, brand, imageUrl, price, _id}) => /*html*/`

    <div class="card col-3" id="funko${_id}" style="width: 18rem;" >
    <img src="${imageUrl}" class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column align-items-start">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${description}</p>
      <p class="card-text"> ${brand}</p>
      <p class="card-text badge bg-dark">${price} €</p>
      <div class="d-flex justify-content-between">
      <a href="#" class="btn btn-outline-primary" onclick="addToCart('${name}', '${price}', '${imageUrl}', '${_id}')">Add to cart</a>
      <a href="product/product.html?id=${_id}" class="ms-5"> <button class="btn btn-outline-info">Details</button></a>
      </div>
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


const addToCart = (name, price, imageUrl, _id) => {
  const card = document.querySelector("#funko" + _id);
  card.style.opacity = "0.5";
  const cart = document.querySelector(".list-group");
  cart.innerHTML += `
  <li class="list-group-item"> 
    <div class="d-flex flex-nowrap">
      <img src="${imageUrl}"/>
      <div class="ms-2">
         <p class="name">${name}</p>
         <p>${price} €</p>
         <p>Quantity: <span class="quantity">1</span></p>
         <button class="btn btn-outline-secondary align-self-center" onclick='removeFromCart(event, "${_id}", "${price}")'> X </button>
      </div>   
    </div>    
  </li>`;
  const totale = document.querySelector("h1 span");
  totale.innerText = (Number(totale.innerHTML) + Number(price)).toFixed(2);

  const counter = document.querySelector(".counter");
  counter.innerText = document.getElementById('carrello').getElementsByTagName('li').length;

};


/*const addQuantity = () => {
  const quantity = document.querySelector(".quantity");
  const item = document.querySelector(".name");
  const cart = document.querySelector(".list-group-item");
  if (item === data.name) {
    cart.innerHTML = ''
    quantity.innerText++
  } else {
    quantity.innerText = 1
  }};*/




//funzione per aumentare la quantità di un prodotto nel carrello se già presente

/*let products = [];

$.ajax({
  url: "products.json",
  dataType: "json",
  success: function(data) {
    products = data;
  }
});

const addQuantity = (id) => {
  const cart = document.querySelector(".list-group");
  const check = cart.every((item) => {
    return item.id !== id;
  });
  const cartData = products.filter((el) => {
    return el.id === id;
  });
  if (check) {
    setCart([...cart, ...cartData]);
  } else {
    const itemForCountIncrease = cart.find((item) => item.id == id);
    itemForCountIncrease.count += 1;
    setCart([...cart.filter((item) => item.id != id), itemForCountIncrease]);
  }
};*/


const removeFromCart = (event, _id, price) => {
  event.target.closest("li").remove();
  const totale = document.querySelector("h1 span");
  totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2);
  const book = document.querySelector("#funko" + _id);
  book.style.opacity = "1";

  const counter = document.querySelector(".counter");
  counter.innerText = document.getElementById('carrello').getElementsByTagName('li').length;
};
     

const emptyCart = () => {
  document.querySelector(".list-group").innerHTML = "";
  document
    .querySelectorAll(".card")
    .forEach((card) => (card.style.opacity = "1"));
  const totale = document.querySelector("h1 span");
  totale.innerText = "0";

  const counter = document.querySelector(".counter");
  counter.innerText = document.getElementById('carrello').getElementsByTagName('li').length;
};


/*const searchProduct = (ev) => {
  let query = ev.target.value;
  let allNames = document.querySelectorAll(".card-title");
  console.log(
    query,
    allNames[0].innerText.toLowerCase().includes(query.toLowerCase())
  );
  allNames.forEach((name) => {
    const currCard = name.parentElement.parentElement.parentElement;
    if (!name.innerHTML.toLowerCase().includes(query.toLowerCase())) {
      currCard.style.display = "none";
    } else {
      currCard.style.display = "block";
    }
  });
};*/

const searchProduct = (ev) =>{
  let research = document.getElementById("input-query")
  const input = research.value;
  const name = document.getElementsByClassName('card-title');
  const user = document.getElementsByClassName('card');
  for (let i = 0; i < name.length; i++) {
    if (name[i].innerHTML.toLowerCase().indexOf(input.toLowerCase()) > -1) {
      user[i].style.display = '';
    } else {
      user[i].style.display = 'none';
    }
  }
}


