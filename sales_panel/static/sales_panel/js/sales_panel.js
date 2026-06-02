list_products = document.querySelector('#list_products')

fetch('/api/products/')
  .then(response => response.json())

  .then(data => {
    data.products.forEach(product => {
      const card = document.createElement('div');
      
      card.innerHTML = `
      <img src='${product.image}'>
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>R$ ${product.price}</p>
      <p>Estoque: ${product.stock}</p>
      `
    list_products.appendChild(card);
    }); 
  });
