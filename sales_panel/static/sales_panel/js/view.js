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

function updateOrderedItems(id, line) {
  // ALTERAR QUANTIDADE DO ITEM
  const quantLine = line.querySelector('.item-name span');
  const intQuant = parseInt(quantLine.textContent);
  quantLine.innerHTML = `${intQuant + 1}`;
  quantLine.dataset.quant = parseFloat(quantLine.dataset.quant) + 1;
  // ALTERAR VALOR TOTAL DOS ITENS
  const priceLine = line.querySelector('.item-price');
  const floatPrice = parseFloat(priceLine.textContent.slice(2, -1));
  priceLine.innerHTML = `R$${floatPrice + parseFloat(priceLine.dataset.price)}.00`;
  cartProducts[id] += 1;
}

function itemExist(id) {
  const line = document.querySelector(`.container-order .line[data-id="${id}"]`);
  if (line) {
    return line
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
    const id = data.id
    const isLine = itemExist(id);
    if (isLine) {
      updateOrderedItems(id, isLine);
    } else {
      item = createItemOrderedItems(data.id, data.name, data.price);
      document.querySelector('.ordered-items').innerHTML += item;
      cartProducts[id] = 1;
    }
  });
}

async function createCustomer(inputsValues) {
  return fetch('/api/createCustomer/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
    },
    body: JSON.stringify(inputsValues)
  })
  .then(response => response.json())
  .then(data => {
    if (!data.boolean) {
      console.log('Error create customer');
      return false
    }
    return data
  })
}

async function getCustomer(cpf) {
  return fetch('/api/verifyCustomer/', {
    method: 'POST',
    headers: {
      'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,  
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({'cpf': cpf})
  })
  .then(response => {
    if (!response.ok) {
      console.log('Cliente não encontrado ou erro na validação:', errData.message);
      return false;
    }
    return response.json();
  }
  )
  .then(data => {
    if (data && data.boolean) {
      return data;
    } 
  })
  .catch (error => {
    console.error('Erro crítico na rede ou servidor fora do ar!!', error);
    return false
  });
}

function activate(element) {
  element.classList.toggle('ativo')
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
    }
  });

  // FORMULÁRIOS 
  const modalForm = document.querySelector('.modal-form');
  const submitModal = modalForm.querySelector('.btn-submit');
  const modalOverlay = document.querySelector('.modal-overlay');
  const inputs = [...modalOverlay.querySelectorAll('.form-group')].slice(1);

  document.querySelector('#form-order').addEventListener('submit', (e) => {
    e.preventDefault();
    activate(modalOverlay);

    inputs.forEach((input) => {
      input.style.display = 'none'
      input.querySelector('input').removeAttribute('required')
    });
    submitModal.dataset.action = 'login';
    modalForm.dataset.type = 'login';
  });

  document.querySelector('.modal-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const modalDataSet = modalForm.dataset.type;
    if (modalDataSet == 'login' && submitModal.dataset.action == 'login') {
      const cpf = modalForm.querySelector('#cpf').value;
      if (cpf != '' && cpf.length == 11) {
        const data_customer = await getCustomer(cpf);
        console.log(data_customer)
        if ( data_customer && data_customer.boolean == true) {
          activate(modalOverlay);
          console.log('OK')
          return;
        }
        modalForm.dataset.type = 'sign-up';
        submitModal.dataset.action = 'sign-up';
        inputs.forEach((input) => {
          if (input.id == 'name') {
            input.setAttribute('required');
          }
          input.style.display = 'flex';
        })
      }
    } else if (modalDataSet == 'sign-up' && submitModal.dataset.action == 'sign-up') {
      console.log('AQUi')
      const formData = new FormData(modalForm);
      const customerObject = Object.fromEntries(formData);
      const customer = await createCustomer(customerObject);
      console.log(customer);
    }
  });

  //ESTILO ORDERED ITEMS
  const orderedItems = document.querySelector('.ordered-items');
  if (orderedItems.clientHeight == 275) {
    orderedItems.style.overflowY = 'scroll';
  }
});