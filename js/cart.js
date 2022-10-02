// Nav&Header
const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburer) {
  hamburer.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}



if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
  updateCartTotal()
    var removeCartItemButtons = document.getElementsByClassName('cart-delete')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-buttons')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('bx bx-heart')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('checkout btn')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked() {
  alert('Makasih Duitnya')
  var cartContainer = document.getElementsByTagName('table')[0]
  for(var i = 1;i<cartContainer.rows.length;){
    cartContainer.deleteRow(i);
  }

  updateCartTotal()
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
  updateCartTotal()
  document.getElementsByClassName('checkout btn')[0].addEventListener('click', purchaseClicked)
}

function addToCart(event) {
	var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
    }
    updateCartTotal()
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
		<tr>
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
    </tr>
	`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('bx bx-trash')[0].addEventListener('click', removeCartItem)
	  cartRow.getElementsByClassName('bx bx-cart')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
  document.getElementsByClassName('checkout btn')[0].addEventListener('click', purchaseClicked)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByTagName('table')[0]
  var total = 0
  var subtotal = 0
  var tax = (5 * subtotal)/100


  for (var i = 1, row; row = cartItemContainer.rows[i]; i++) {
    console.log(i)
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

