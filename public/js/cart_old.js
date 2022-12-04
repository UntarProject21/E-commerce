const { localsName } = require("ejs");
const express = require("express");
const router = express.Router();

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  let total_price = 0;
  var html = '';

  for (var i = 0; i < cart.length; i++) {
      //let request = new XMLHttpRequest();
      //request.open('GET', `api/getProduct?id=${cart[i].product_id}`, false); DATABASE OK
      //request.send(null);

      //if (request.status === 200) {
          let data = JSON.parse(request.responseText);
          total_price += parseInt(data[0].PRICE * cart[i].quantity);
          html += `
          <div class="card">
              <div class="card-body">
                  <div class="row">
                      <div class="col-sm-7 col-md-6 col-lg-4">
                          <img alt="placeholder image" class="img-fluid lazyload" src="img/${data[0].IMAGE}"
                              width="180px" height="180px" />
                      </div>
                      <div class="col-sm-5 col-md-6 col-lg-8">
                          <h2>${data[0].TITLE}</h2>
                          <h4>Size : ${data[0].SIZE}</h4>
                          <h6>Qty</h6>
                          <div style="display: flex;">
                              <span class="input-group-btn">
                                  <button type="button" class="btn btn-default btn-number" style="color: white;"
                                      onclick="minus('${cart[i].product_id}', '${data[0].PRICE}')"><i class="far fa-minus-square"></i></button>
                              </span>
                              <input class="box" type="text" disabled="disabled" value="${cart[i].quantity}"
                                  class="form-control input-number" id="${cart[i].product_id}" />
                              <span class="input-group-btn">
                                  <button type="button" class="btn btn-default btn-number" style="color: white;"
                                      onclick="add('${cart[i].product_id}', '${data[0].PRICE}')"><i class="far fa-plus-square"></i></button>
                              </span>
                          </div>
                          <br>
                          <p id="${cart[i].product_id}-price" class="price">Rp ${data[0].PRICE * cart[i].quantity}</p>
                          <a href="javascript:;" onclick='return remove("${cart[i].product_id}")' style="color:red;"><i class="far fa-trash-alt" color="red"></i> <u>Remove</u></a>
                          <br><br>
                      </div>
                  </div>
              </div>
          </div>
          `;
      }
  //}
  document.getElementById("view-cart").innerHTML = html;
  document.getElementById("total-price").innerHTML = 'Rp ' + total_price;
  // updateCartTotal()
    // var removeCartItemButtons = document.getElementsByClassName('cart-delete')
    // for (var i = 0; i < removeCartItemButtons.length; i++) {
    //     var button = removeCartItemButtons[i]
    //     button.addEventListener('click', removeCartItem)
    // }
    // var quantityInputs = document.getElementsByClassName('cart-buttons')
    // for (var i = 0; i < quantityInputs.length; i++) {
    //     var input = quantityInputs[i]
    //     input.addEventListener('change', quantityChanged)
    // }
    // var addToCartButtons = document.getElementsByClassName('bx bx-heart')
    // for (var i = 0; i < addToCartButtons.length; i++) {
    //     var button = addToCartButtons[i]
    //     button.addEventListener('click', addToCartClicked)
    // }
    // document.getElementsByClassName('checkout btn')[0].addEventListener('click', showModal)
}

function purchaseClicked() {
  alert("Thank you for your purchase!")
  modal.style.display = "none"
  var cartContainer = document.getElementsByTagName('table')[0]
  for(var i = 1;i<cartContainer.rows.length;){
    cartContainer.deleteRow(i)
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
  updateCartTotal()
  document.getElementsByClassName('checkout btn')[0].addEventListener('click', showModal)
}

function addToCart(product) {
     if (localStorage.getItem("cart") === null) {
         localStorage.setItem("cart", "[]");
     }
     var cart = JSON.parse(localStorage.getItem("cart"));
     var filtered_cart = cart.filter( x => x.product == product);
     if (filtered_cart.length === 0) {
         cart.push({
             product: product,
             quantity: 1
         });
     } else {
         filtered_cart[0].quantity++;
         cart = cart.filter( x => {
             if (x.product != product) {
                 return x;
             }
        });
         cart.push(filtered_cart[0]);
     }
     localStorage.setItem("cart", JSON.stringify(cart));
}


function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-info')[0].innerText
    var price = shopItem.getElementsByClassName('product-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('product-thumb')[1].src
    addItemToCart(title, price, imageSrc)
    //updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('tr')
    cartRow.classList.add('cart-info')
    var cartItems = document.getElementsByClassName('container cart')[0]
    var cartItemNames = cartItems.getElementsByClassName('product-info')
    for (var i = 0; i < cartItemNames.length; i++) {
       if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
          <td>
            <div class="cart-info">
              <img src="${imageSrc}" alt="" />
              <div>
                <p>${title}</p>
                <span>${price}</span> <br />
				<input type="number" value="1" min="1" />
              </div>
            </div>
          </td>
          <td>
		 	<div class="wish-action">
			  <i class="bx bx-trash"></i>
			  <i class="bx bx-cart"></i>
			</div>
		  </td>
	`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('bx bx-trash')[0].addEventListener('click', removeCartItem)
	  cartRow.getElementsByClassName('bx bx-cart')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function checkoutItems() {
  var cartItemContainers = document.getElementsByTagName('table')[0]
  var cartItemContainer = document.getElementsByTagName('table')[2]
  for (var i = 1, row; row = cartItemContainers.rows[i]; i++) {
    console.log(i)
    var cartRows = cartItemContainers.rows[i]
    console.log(cartRows)
    var nameElement = cartRows.getElementsByTagName('p')[0]
    var priceElement = cartRows.getElementsByTagName('span')[1]
    var imageElement = cartRows.getElementsByTagName('img')[0]
    var quantityElement = cartRows.getElementsByClassName('cart-quantity-input')[0]

    var names = nameElement.innerText
    var prices = parseFloat(priceElement.innerText.replace('IDR ', ''))
    var quantities = quantityElement.value
    var images = imageElement.src

    var checkRow = document.createElement('tr')
    var checkRowContents = `
    <tr>
      <td>
        <div class="cart-info">
          <img src="${images}" alt="" />
        </div>
      </td>
      <td>
        <span class="checkout-quantity">x${quantities}</span>
      </td>
      <td>
        <p>${names}</p>
      </td>
      <td>
        <span>IDR ${prices*quantities}</span>  
      </td>
    </tr>
    `
    checkRow.innerHTML = checkRowContents
    cartItemContainer.append(checkRow)
  }
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
  document.getElementsByClassName('checkout btn')[0].addEventListener('click', showModal)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByTagName('table')[0]
  var total = 0
  var subtotal = 0
  var tax = (5 * subtotal)/100


  for (var i = 1, row; row = cartItemContainer.rows[i]; i++) {
    //console.log(i)
    var cartRows = cartItemContainer.rows[i]

    var priceElement = cartRows.getElementsByTagName('span')[1]
    var quantityElement = cartRows.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('IDR ', ''))
    var quantity = quantityElement.value
    subtotal += (price * quantity)
  }

  tax = (5 * subtotal)/100
  subtotal = Math.round(subtotal * 100) / 100
  total = subtotal + tax
  //document.getElementsByClassName('total-price')[0].innerText = 'Total $' + total
  document.getElementsByClassName('total-price')[0].innerHTML =
  `        
  <table>
  <tr>
    <td>Subtotal</td>
    <td>IDR ${subtotal}</td>
  </tr>
  <tr>
    <td>Tax (5%)</td>
    <td>IDR ${tax}</td>
  </tr>
  <tr>
    <td>Total</td>
    <td>IDR ${total}</td>
  </tr>
  </table>
  <a class="checkout btn">Proceed To Checkout</a>`
}

function checkoutTotal() {
  var cartItemContainer = document.getElementsByTagName('table')[0]
  var total = 0
  var subtotal = 0
  var tax = (5 * subtotal)/100
  var shipping = 20000

  for (var i = 1, row; row = cartItemContainer.rows[i]; i++) {
    var cartRows = cartItemContainer.rows[i]
    //console.log(cartRows)
    var priceElement = cartRows.getElementsByTagName('span')[1]
    var quantityElement = cartRows.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('IDR ', ''))
    var quantity = quantityElement.value
    subtotal += (price * quantity)
  }
  tax = (5 * subtotal)/100
  subtotal = Math.round(subtotal * 100) / 100
  total = subtotal + tax
  document.getElementsByClassName('final-price')[0].innerHTML =
  `        
  Total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: IDR ${total}
  <br/>Shipping : IDR ${shipping}<br/><br/>
  Final &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: IDR ${total+shipping}`
} 

// Get the modal
var modal = document.getElementById("myModal");
var contentmodal = document.getElementsByClassName("modal-content");

// When the user clicks on the button, open the modal
function showModal() {
  document.getElementsByClassName('close')[0].addEventListener('click', closeModal)
  document.getElementsByClassName('submit-btn')[0].addEventListener('click', purchaseClicked)
  modal.style.display = "block";
  checkoutItems();
  checkoutTotal();
}

function closeModal() {
  var cartItemContainer = document.getElementsByTagName('table')[2]
  for(var i = 0;i<cartItemContainer.rows.length;){
    cartItemContainer.deleteRow(i);
  }
  modal.style.display = "none";

}


module.exports = addToCart
