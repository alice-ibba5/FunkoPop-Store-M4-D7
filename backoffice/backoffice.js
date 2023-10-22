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
  
    <div id="_${_id}" class="mediaQuery d-flex justify-content-between align-items-center mb-2">
    <div class="col-lg-1" id="funko${_id}">
      <img src="${imageUrl}" alt="...">
    </div>
    <div class="col-lg-3 align-self-center">
      ${name}
    </div>
    <div class="col-lg-3 align-self-center">
      <p>${description}</p>
    </div>
    <div class="col-lg-2 align-self-center">
      <p>${brand}</p>
    </div>
    <div class="col-lg-2 align-self-center">
      <p>${price} €</p>
    </div>
    <div class="col-lg-1 d-flex justify-content-lg-between justify-content-between align-items-center align-self-center mb-2">
      <button class="btn btn-info px-2 mx-2" onclick="handleEdit('${_id}')"><i class="bi bi-pencil-square"></i></button>
      <button class="btn btn-dark px-2 mx-2" onclick="handleDelete('${_id}')"><i class="bi bi-trash"></i></button>
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


async function addProduct(event) {
  event.preventDefault()

  const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiZjY1MzM5MzI3YzAwMThkM2EyYzgiLCJpYXQiOjE2OTYzMzEzNDcsImV4cCI6MTY5NzU0MDk0N30.eBm-Zar-IK06I2wuKIz5gEdcJRr6e7fX0RqGRUVx6E0",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          name: name.value,
          description: description.value,
          brand: brand.value,
          imageUrl: imageUrl.value,
          price: price.value,
          
      })
  })

  if (response.ok) { 
      alert("Added Product!")

      for (const field of [name, description, brand, imageUrl, price]) {
          field.value = ''
      }
  } else {
      console.error("Cannot send")
  }

  displayData(await loadData())
}


async function handleEdit(id) {
    const getProducts = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, requestOptions) 
    const getProductsJson = await getProducts.json()

    const { name, description, brand, imageUrl, price } = getProductsJson

    const getProductRow = document.querySelector(`#_${id}`)

    getProductRow.innerHTML = /*html*/`
        <form class="container d-flex justify-content-between form-sostitutivo" onsubmit="handleEditSubmit(event, '${id}')">
        <div class="row">
          
          <div class="form d-flex justify-content-between p-0 productForm" >
            <div class="col-lg-2 mb-2">
              <label for="name" class="name">Name</label>
              <input type="text" class="form-control" value="${name}" name="name">
            </div>
    
            <div class="col-lg-2 mb-2">
              <label for="description" class="description">Description</label>
              <input type="text" class="form-control" value="${description}" name="description">
            </div>
    
            <div class="col-lg-2 mb-2">
              <label for="brand" class="brand">Brand</label>
              <input type="text" class="form-control" value="${brand}" name="brand">
            </div>
    
            <div class="col-lg-2 mb-2">
              <label for="image" class="image">ImageURL</label>
              <input type="url" class="form-control" value="${imageUrl}" name="imageUrl">
            </div>
    
            <div class="col-lg-2 mb-2">
              <label for="price" class="price">Price</label>
              <input type="text" class="form-control" value="${price}" name="price">
            </div>
        
                <div class="col-1 d-flex align-items-center justify-content-between">
                    <button type="submit" class="btn btn-success mx-2">
                        <i class="bi bi-check-square-fill"></i>
                    </button>
                    <button type="button" class="btn btn-danger mx-2" onclick="handleEditCancel()">
                        <i class="bi bi-x-square-fill"></i>
                    </button>
                </div>
                </div>
        </form>
        
    `

}

async function handleEditSubmit(e, id) {
    e.preventDefault();

    e.target.classList.add("pe-none")

    e.target.querySelector("button[type=submit]").innerHTML = /*html*/`
      <div class="d-flex justify-content-center">
        <div class="dot-spinner">
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
        </div>
      </div>
    `

    const name = document.querySelector(`#_${id} [name='name']`);
    const description = document.querySelector(`#_${id} [name='description']`);
    const brand = document.querySelector(`#_${id} [name='brand']`);
    const imageUrl = document.querySelector(`#_${id} [name='imageUrl']`);
    const price = document.querySelector(`#_${id} [name='price']`);

    const updatedProduct = {
        name: name.value,
        description: description.value,
        brand: brand.value,
        imageUrl: imageUrl.value,
        price: price.value,
        
    }

    try {

        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiZjY1MzM5MzI3YzAwMThkM2EyYzgiLCJpYXQiOjE2OTYzMzEzNDcsImV4cCI6MTY5NzU0MDk0N30.eBm-Zar-IK06I2wuKIz5gEdcJRr6e7fX0RqGRUVx6E0",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })

        if (response.ok) {
            displayData(await loadData())
            alert("Product updated")
        } else {
            alert("Something went wrong, cannot update. Check network tab.")
        }

    } catch {
        alert("You are offline.")
    }

}

async function handleEditCancel() {
    displayData(await loadData())
}


async function handleDelete(id) {

    if (!confirm("Are you sure you want to delete this product?")) {
        return
    }

    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiZjY1MzM5MzI3YzAwMThkM2EyYzgiLCJpYXQiOjE2OTYzMzEzNDcsImV4cCI6MTY5NzU0MDk0N30.eBm-Zar-IK06I2wuKIz5gEdcJRr6e7fX0RqGRUVx6E0",
        },
    })

    if (response.ok) {
        alert("Product " + id + " deleted!")
        displayData(await loadData())
    } else {
        alert("Can't delete this product. Try again later")
    }

    displayData(await loadData())
}

window.onload = async function () {
    try {
        const productData = await loadData()
        displayData(productData)
    } catch (error) {
        console.log(error)
    }
}