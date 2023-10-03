let name = document.querySelector('#inputName')
let description = document.querySelector('#inputDescription')
let brand = document.querySelector('#inputBrand')
let imageUrl = document.querySelector('#inputImage')
let price = document.querySelector('#inputPrice')

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

  if (response.ok) { // response.ok == true se status è 2xx, altrimenti falso, se 4xx o 5xx
      alert("Added Product!")

      for (const field of [name, description, brand, imageUrl, price]) {
          field.value = ''
      }
  } else {
      console.error("Cannot send")
  }
}