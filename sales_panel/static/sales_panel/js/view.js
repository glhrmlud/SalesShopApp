document.addEventListener("DOMContentLoaded", () => {
  list_products = document.querySelector('.list-products')


  fetch('/api/products/')
    .then(response => response.json())

    .then(data => {
      data.products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList = 'product-card square border card'
        productCard.innerHTML = `
        <img class='product-image square' src='${product.image}'>
        <h2 class='product-name text'>${product.name}</h2>
        <p class='product-desc text'>${product.description}</p>
        <p class='product-stock text'> stock: ${product.stock}</p>
        <div class='price-add'>
        <p class='product-price text'> R$ ${product.price}</p>
        <div class='add-btn circle' id='cart-add'> + </div>
        </div>
       
        `
      list_products.appendChild(productCard);
      }); 
    });
});