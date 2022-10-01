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
    var removeCartItemButtons = document.getElementsByClassName('bx bx-trash')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
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
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
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

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('container cart')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-info')
  var total = 0
  var subtotal = 0
  var tax = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      var quantity = quantityElement.value
      subtotal = subtotal + (price * quantity)
  }
  subtotal = Math.round(subtotal * 100) / 100
  total = subtotal - tax
  //document.getElementsByClassName('total-price')[0].innerText = 'Total $' + total
  document.getElementsByClassName('total-price')[0].innerHTML =
  `        <table>
  <tr>
    <td>Subtotal</td>
    <td>$${subtotal}</td>
  </tr>
  <tr>
    <td>Tax</td>
    <td>$${tax}</td>
  </tr>
  <tr>
    <td>Total</td>
    <td>$${total}</td>
  </tr>
</table>`
}