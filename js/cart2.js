let carts = document.querySelectorAll('.buy');

let products = [
  {
    name: 'Melnik Jubilee 1300',
    tag: 'Melnik Jubilee 1300',
    price: 10,
    img: './images/1300.jpg',
    inCart: 0
  },
  {
    name: 'Melnik55',
    tag: 'Melnik55',
    price: 15,
    img: './images/Melnik55.jpg',
    inCart: 0
  },
  {
    name: 'Cabarnet',
    tag: 'Cabarnet',
    price: 13,
    img: './images/Cabarnet.jpg',
    inCart: 0
  },
  {
    name: 'Merlot',
    tag: 'Merlot',
    price: 17,
    img: './images/Merlot.jpg',
    inCart: 0
  },
]

for (let i=0; i < carts.length; i++){
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
  }) 
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }

}

function cartNumbers(products) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;

  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }

  setItems(products);
}

function setItems(products){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null) {

    if(cartItems[products.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [products.tag]: products
      }
    }
    cartItems[products.tag].inCart += 1; 
  } else {
    products.inCart = 1;
    cartItems = {
      [products.tag]: products
    }

  }
  localStorage.setItem('productsInCart', JSON.stringify (cartItems));
}

function totalCost (products){
  let cartCost = localStorage.getItem('totalCost');

  if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + products.price );
  } else{
    localStorage.setItem('totalCost', products.price);
  }

}

function displayCart() {
    
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector('.products');
  let cartCost = localStorage.getItem('totalCost');
  
  if(cartItems && productContainer) {
    productContainer.innerHTML = '';
    let cartIndex = 0;
    Object.values(cartItems).map(products => {
      productContainer.innerHTML += `
      <div class="product-cart"> 
        <div class="product"> 
          <ion-icon class="btn-remove" name="close-circle-outline"></ion-icon>
          <img src="${products.img}" width = "75" height = "100"> 
         <span class="item-name">${products.name}</span>
         <div class="item-price">$${products.price}</div>
         <div class="item-quantity"></div>
          <ion-icon onclick="quantityChange()" class="decrease" name="arrow-back-circle"></ion-icon>
          <span>${products.inCart}</span>
          <ion-icon onclick="quantityChange()" class="increase" name="arrow-forward-circle"></ion-icon>
          
          <div class="item-total">
            $${products.inCart * products.price},00
          </div>
        </div>
      </div>
      `
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
          Total Price &nbsp
        </h4>
        <h4 class="basketTotal">
          $${cartCost},00
        </h4>
      </div>
    `
  }

};

function removeItem(){
  let removeItem = document.getElementsByClassName('btn-remove');
  console.log(removeItem)
  for (let i = 0; i < removeItem.length; i++){
        let button = removeItem[i]
  button.addEventListener('click',function(event){
    console.log('clicked')
  let removeItem = event.target
  removeItem.parentElement.remove();

});
}}

function quantityChange(products) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  
  if(document.querySelector('.increase'))
  {
    cartItems[products.tag].inCart += 1;
    console.log("inc");
  }
  else if (document.querySelector('.decrease'))
  {
    products.inCart = products.inCart - 1;
    console.log("dec");
  }
}

  
onLoadCartNumbers();
displayCart();
removeItem();
quantityChange();



