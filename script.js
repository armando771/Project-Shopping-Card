function addLoading() {
  const load = document.querySelector('.loading');
  load.innerHTML = 'loading...';
  } 
  
  function removeLoading() {
    const load = document.querySelector('.loading');
    load.remove();
  }
  
  let sum = 0;
  let removeSum = 0;
  
  function createProductImageElement(imageSource) {
    const img = document.createElement('img');
    img.className = 'item__image';
    img.src = imageSource;
    return img;
  }
  
  function createCustomElement(element, className, innerText) {
    const e = document.createElement(element);
    e.className = className;
    e.innerText = innerText;
    return e;
  }
  
  function createProductItemElement(sku, name, image) {
    const section = document.createElement('section');
    section.className = 'item';
  
    section.appendChild(createCustomElement('span', 'item__sku', sku));
    section.appendChild(createCustomElement('span', 'item__title', name));
    section.appendChild(createProductImageElement(image));
    section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
    return section;
  }
  
  function getSkuFromProductItem(item) {
    return item.querySelector('span.item__sku').innerText;
  }
  
  function cartItemClickListener(event) {
   const allPrice = document.getElementsByClassName('total-price')[0];
   const priceLi = event.target.textContent.split('$')[1];
   const convert = Number(priceLi);
   removeSum = convert;
   sum -= removeSum;
   allPrice.innerHTML = sum;
    event.target.remove(); 
  }
  
  function SumPrices(price) {
    sum += price;
    return sum;
  }
  
  function createCartItemElement(sku, name, salePrice) {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
    li.addEventListener('click', cartItemClickListener);
    return li;
  }
  
  function addToScreen() {
  const api = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  
  const fet = fetch(api)
  .then((element) => element.json())
  .then((index) => index.results.forEach((element) => {
    const func = createProductItemElement(element.id, element.title, element.thumbnail);
    document.querySelector('.items').appendChild(func);
  }));
    return fet;
  }
  
  function addToCart() {
    const buttons = document.querySelectorAll('.item__add');
    for (let index = 0; index < buttons.length; index += 1) {
      buttons[index].addEventListener('click', () => {
       const id = document.querySelectorAll('.item__sku')[index].textContent;
        const api = `https://api.mercadolibre.com/items/${id}`;
         fetch(api)
         .then((element) => element.json())
         .then((indx) => {
           const func = createCartItemElement(indx.id, indx.title, indx.price);
           document.querySelector('.cart__items').appendChild(func);
           document.querySelector('.total-price').innerHTML = SumPrices(indx.price);  
         });
      });
  }
  }
  
  function removeToCart() {
    const cart = document.querySelectorAll('.cart__item');
    for (let index = 0; index < cart.length; index += 1) {
      cart[index].addEventListener('click', cartItemClickListener);
    }  
  }
  
  function removeAllCart() {
   const rm = document.querySelector('.empty-cart');
   rm.addEventListener('click', () => {
   const li = document.querySelectorAll('.cart__item');
     for (let index = 0; index < li.length; index += 1) {
         li[index].remove();
     }
   const fsecc = document.querySelector('.total-price');
     fsecc.innerHTML = '';
     sum = 0;
   });
  }
  
  window.onload = function onload() { 
    addToScreen().then(() => addToCart()).then(() => removeLoading());
    removeToCart();
    removeAllCart();
  };