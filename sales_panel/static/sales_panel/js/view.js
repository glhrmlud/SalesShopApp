function createProductCard(product) {
    const div = document.createElement('div');
    div.classList = 'product-card square card blur'
    div.innerHTML = `
          <img class='product-image square' src='${product.image}'>
          <h2 class='product-name text'>${product.name}</h2>
          <p class='product-desc text'>${product.description}</p>
          <p class='product-stock text'> stock: ${product.stock}</p>
          <div class='price-add'>
            <p class='product-price text'> R$ ${product.price}</p>
            <div class='add-btn circle' data-id='${product.id}'> + </div>
          </div>
          ` 
    return div;
  }

function getProducts() {
    fetch('/api/products/')
      .then(response => response.json())

      .then(data => {
        data.products.forEach(product => {
          listProducts.appendChild(createProductCard(product));
        });
      });
  }

function getData(element) {
  return {
    'id': element.dataset.id,
  }
}

function createItemOrderedItems(id, name, price) {
  if (name.length > 16) {
    name = name.slice(0, 13) + '...';
  } 
  return `
    <div class="line" data-id="${id}">
      <p class="item-name text"><span data-quant='1'>1</span> X ${name}</p>
      <p class="item-price text" data-price='${price}'>R$${price}</p>
    </div>
  `
}

function itemExist(id) {
  const line = document.querySelector(`.container-order .line[data-id="${id}"]`);
  if (line) {
    // ALTERAR QUANTIDADE DO ITEM
    const quantLine = line.querySelector('.item-name span');
    const intQuant = parseInt(quantLine.textContent);
    quantLine.innerHTML = `${intQuant + 1}`
    quantLine.dataset.quant = parseFloat(quantLine.dataset.quant) + 1
    // ALTERAR VALOR TOTAL DOS ITENS
    const priceLine = line.querySelector('.item-price');
    const floatPrice = parseFloat(priceLine.textContent.slice(2, -1));
    priceLine.innerHTML = `R$${floatPrice + parseFloat(priceLine.dataset.price)}.00`
    cartProducts[id] += 1
    return true
  }
  return false
}

function updateSubtotal() {
  const allLineItems = document.querySelectorAll('.container-order .line');

  const listPrice = Array.from(allLineItems).map(element => {

    const priceElement = element.querySelector('.item-price');
    const price = parseFloat(priceElement.dataset.price);

    const quantElement = element.querySelector('.item-name span');
    const quant = parseInt(quantElement.dataset.quant);
    return price * quant;
  });

  const subtotalElement = document.querySelector('.subtotal-value');
  const subtotal = listPrice.reduce((total, item) => total + item).toFixed(2);
  subtotalElement.dataset.subtotal = subtotal;
  subtotalElement.textContent = `R$${subtotal}`;
}

function updateTotal() {
  const subtotalElement = document.querySelector('.subtotal-value');
  const totalValue = document.querySelector('.total-value');
  totalValue.textContent = `R$${subtotalElement.dataset.subtotal}`;

}

async function getProductAdd(dataElement) {
  return fetch('/api/verifyProductAdd/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
    },
    body: JSON.stringify(dataElement)
  })
  .then(response => response.json())
  .then(data => {
    if (!itemExist(data.id)) {
      item = createItemOrderedItems(data.id, data.name, data.price);
      document.querySelector('.ordered-items').innerHTML += item;
      cartProducts[data.id] = 1;
    }
    
  });
}

document.addEventListener("DOMContentLoaded", () => {
  listProducts = document.querySelector('.list-products');
  cartProducts = {};
  getProducts();
  document.addEventListener('click', async (event) => {
    const e = event.target;
    if (e.classList.contains('add-btn')) {
      await getProductAdd(getData(e));
      updateSubtotal();
      updateTotal();
      console.log(cartProducts);
    }
  });

  //ESTILO ORDERED ITEMS
  const orderedItems = document.querySelector('.ordered-items');
  if (orderedItems.clientHeight == 275) {
    orderedItems.style.overflowY = 'scroll';
  }
});