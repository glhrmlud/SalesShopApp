function createProductCard(product) {
    const div = document.createElement('div');
    div.classList = 'product-card square card blur'
    if (!product.image) {
      product.image = '/media/products_image/default.png'
    }
    const desc = product.description
    if (desc.length >= 30) {
      product.description = desc.slice(0, 30) + '...';
      console.log(product.description)
    }

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
  if (name.length >= 16) {
    name = name.slice(0, 13) + '...';
  } 
  return `
    <div class="line" data-id="${id}" style="align-items: center; margin-bottom: 8px;">
      <p class="item-name text"><span data-quant='1'>1</span> X ${name}</p>
      <div style="display: flex; align-items: center; gap: 10px;">
        <p class="item-price text" data-price='${price}'>R$${price}</p>
        <div class="remove-btn" data-id="${id}" style="color: #ff4d4d; font-weight: bold; cursor: pointer; padding: 0 5px; font-size: 16px;">×</div>
      </div>
    </div>
  `;
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
 .then(response => {
    if (!response.ok) {
      console.log('Erro na resposta do servidor ao criar cliente');
      return false;
    }
    return response.json();
  })
  .then(data => {
    if (data && data.boolean) {
      return data;
    }
    return false;
  })
  .catch(error => {
    console.error('Erro crítico no cadastro de cliente:', error);
    return false;
  });
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

  let currentCustomerId = null;

  getProducts();
  document.addEventListener('click', async (event) => {
    const e = event.target;
    if (e.classList.contains('add-btn')) {
      await getProductAdd(getData(e));
      updateSubtotal();
      updateTotal();
    }
    else if (e.classList.contains('remove-btn')) {
        const idDoProduto = e.dataset.id;

        if (cartProducts[idDoProduto]) {
            delete cartProducts[idDoProduto];
        }

        const linhaDoItem = document.querySelector(`.container-order .line[data-id="${idDoProduto}"]`);
        if (linhaDoItem) {
            linhaDoItem.remove();
        }

        const possuiItensRestantes = document.querySelectorAll('.container-order .line').length > 0;
        if (possuiItensRestantes) {
            updateSubtotal();
            updateTotal();
        } else {
            document.querySelector('.subtotal-value').textContent = 'R$0.00';
            document.querySelector('.subtotal-value').dataset.subtotal = '0';
            document.querySelector('.total-value').textContent = 'R$0.00';
        }
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
    modalForm.reset();

    inputs.forEach((input) => {
      input.style.display = 'none'
      input.querySelector('input').removeAttribute('required')
    });
    submitModal.dataset.action = 'login';
    modalForm.dataset.type = 'login';
    submitModal.textContent = 'Login';
  });

  document.querySelector('.modal-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const modalDataSet = modalForm.dataset.type;
    if (modalDataSet == 'login' && submitModal.dataset.action == 'login') {
      const cpfElement = modalForm.querySelector('#cpf');
      const cpf = cpfElement.value;
      const justNumber = /^\d+$/.test(cpf);
      cpfElement.setCustomValidity(""); 
      if (cpf === '' || cpf.length !== 11 || !justNumber) {
        cpfElement.setCustomValidity("O CPF deve ter um formato válido!");
        cpfElement.reportValidity();
        return;
      }

      const data_customer = await getCustomer(cpf);

      if (data_customer && data_customer.boolean) {

        currentCustomerId = data_customer.id;

        activate(modalOverlay);

        await enviarVendaDefinitiva(currentCustomerId);
        return;
      }
  
      modalForm.dataset.type = 'sign-up';
      submitModal.dataset.action = 'sign-up';
      submitModal.textContent = 'Cadastre'
      inputs.forEach((input) => {
        input.querySelector('.form-input').id == 'name' ? input.querySelector('.form-input').required = true : undefined;
        input.style.display = 'flex';
      });
    } else if (modalDataSet == 'sign-up' && submitModal.dataset.action == 'sign-up') {
      const formData = new FormData(modalForm);
      const customerObject = Object.fromEntries(formData);
      const customer = await createCustomer(customerObject);

      if (customer && customer.boolean) {
        currentCustomerId = customer.id;
        activate(modalOverlay);

        await enviarVendaDefinitiva(currentCustomerId);
      } else {
        alert("Não foi possível realizar o cadastro. Verifique os campos informados.");
      }
    }
  });

  async function enviarVendaDefinitiva(customerId) {
    const itensFormatados = Object.keys(cartProducts).map(productId => {
        return {
            id: parseInt(productId),
            quantidade: cartProducts[productId]
        };
    });

    if (itensFormatados.length === 0) {
        alert("O carrinho esta vazio.");
        return;
    }

    try {
        const response = await fetch('/salesPanel/finalizar-venda/', {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            body: JSON.stringify({
                customer_id: customerId,
                items: itensFormatados
            })
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert(`Venda #${data.sale_id} processada e salva com sucesso!`);
            window.location.reload();
        } else {
            alert("Erro ao salvar venda: " + data.mensagem);
        }
    } catch (error) {
        console.error("Erro na requisição da venda:", error);
        alert("Erro crítico ao tentar salvar a venda.");
    }
  }

  document.getElementById('btn-receipt').addEventListener('click', () => {

    const possuiItens = Object.keys(cartProducts).length > 0;
    if (!possuiItens) {
        alert("O carrinho está vazio! Adicione produtos para gerar um recibo.");
        return;
    }

    window.print();
  })

  const inputCpf = document.querySelector('#cpf');

  inputCpf.addEventListener('input', function() {
    this.setCustomValidity(""); 
  });

  //ESTILO ORDERED ITEMS
  const orderedItems = document.querySelector('.ordered-items');
  if (orderedItems.clientHeight == 275) {
    orderedItems.style.overflowY = 'scroll';
  }
});