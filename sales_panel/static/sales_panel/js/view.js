document.addEventListener("DOMContentLoaded", () => {
  list_products = document.querySelector('.list-products')

  fetch('/api/products/')
    .then(response => response.json())

    .then(data => {
      data.products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card')
        productCard.innerHTML = `
        <img class='product-image' src='${product.image}'>
        <h2 class='product-name text'>${product.name}</h2>
        <p class='product-desc text'>${product.description}</p>
        <p class='product-stock text'> ${product.stock}</p>
        <div class='price-add'>
          <p class='product-price text'> R$ ${product.price}</p>
          <div class='circle add-btn'> {% include 'sales_panel/svg_layout/edit.svg' %} </div>
        </div>
        `
      list_products.appendChild(productCard);
      }); 
    });
});