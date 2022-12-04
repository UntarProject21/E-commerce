// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready()
// }

function view_cart() {
    var cartItems = document.getElementsByClassName('containertable')[0]
    var cart = JSON.parse(localStorage.getItem("cart"));
    let total_price = 0;
    let final_price = 0;
    var product;

    for (var i = 0; i < cart.length; i++) {
        var cartRow = document.createElement('tr');
        console.log(i);
        console.log(cart[i]);
        total_price = parseInt(cart[i].price * cart[i].quantity);
        final_price += parseInt(cart[i].price * cart[i].quantity);
        console.log(cart[i].product);
        //console.log()
        var cartRowContents = 
        `
        <tr>
          <td>
            <div class="cart-info">
              <img src="/images/${cart[i].image}" alt="" />
              <div>
                <p>${cart[i].name}</p>
                <span id="product-price">IDR ${cart[i].price}</span> <br />
                <button class="cart-delete" type="button" onclick='removeCartItem("${cart[i].product}")'><i class="bx bx-trash"></i> Remove</button>
                
              </div>
            </div>
          </td>
          <td>
            <span>
                <button class="cart-add" type="button" onclick="add('${cart[i].product}', '${cart[i].price}')"><i class="bx bx-plus"></i></button>
            </span>
            <div class="cart-buttons">
              <input class="cart-quantity-input" type="text" disabled="disabled" value="${cart[i].quantity}" min="1" id="${cart[i].product}">
            </div>
            <span>
                <button class="cart-reduce" type="button" onclick="reduce('${cart[i].product}', '${cart[i].price}')"><i class="bx bx-minus"></i></button>
            </span>
          </td>     
          <td>
            <span id="${cart[i].product}-price" class="product-price">IDR ${total_price}</span>
          </td>
        </tr>
        `;

        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        //cartRow.getElementsByClassName('bx bx-trash')[i].addEventListener('click', removeCartItem(cart[i].product));
	    //cartRow.getElementsByClassName('bx bx-cart')[0].addEventListener('click', removeCartItem)
        //cartRow.getElementsByClassName('cart-quantity-input')[i].addEventListener('change', quantityChanged)
    }
    document.getElementsByClassName('total-price')[0].innerHTML =
    `        
    <table>
    <tr>
      <td>Total</td>
      <td>IDR ${final_price}</td>
    </tr>
    </table>
    <a class="checkout btn" onclick="showModal()">Proceed To Checkout</a>`  
}

function add(product_id, price) {
    var inputCount = document.getElementById(product_id);
    inputCount.value++;
    document.getElementById(product_id + '-price').innerHTML = 'IDR ' + price * inputCount.value;
    set_total_price();
    addToCart(product_id);
}

function reduce(product_id, price) {
    var inputCount = document.getElementById(product_id);
    if (inputCount.value > 1) {
        inputCount.value--;
        document.getElementById(product_id + '-price').innerHTML = 'IDR ' + price * inputCount.value;
        set_total_price();
        removeFromCart(product_id);
    }
}

function set_total_price() {
    let price = document.getElementsByClassName("product-price");
    let total_price = 0;
    for (let i = 0; i < price.length; i++) {
        total_price += parseInt(price[i].innerHTML.substr(3));
    }
    document.getElementsByClassName("total-price")[0].innerHTML = `        
    <table>
    <tr>
      <td>Total</td>
      <td>IDR ${total_price}</td>
    </tr>
    </table>
    <a class="checkout btn">Proceed To Checkout</a>`  
}


function removeCartItem(product_id) {
    console.log("clicked" + product_id);
    var cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter( x => {
        if (x.product != product_id) {
            return x;
        }
        location.reload();
        console.log("filter else")
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("clicked end" + product_id);
}


function removeFromCart(product_id) {
    if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", "[]");
    } else {
        var cart = JSON.parse(localStorage.getItem("cart"));
        var filtered_cart = cart.filter( x => x.product_id == product_id);
        if (filtered_cart.length > 0) {
            filtered_cart[0].quantity--;
            if (filtered_cart[0].quantity === 0) {
                cart = cart.filter( x => {
                    if (x.product_id != product_id) {
                        return x;
                    }
                    location.reload();
                });
            } else {
                cart = cart.filter( x => {
                    if (x.product_id != product_id) {
                        return x;
                    }
                });
                cart.push(filtered_cart[0]);
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}


//product == _id

function addToCart(product,name,price,image) {
    if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", "[]");
    }
    var cart = JSON.parse(localStorage.getItem("cart"));
    var filtered_cart = cart.filter( x => x.product == product);
    if (filtered_cart.length === 0) {
        cart.push({
            product: product,
            name: name,
            price: price,
            image: image,
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

    console.log(quantityElement)
    var names = nameElement.innerText
    var prices = parseFloat(priceElement.innerText.replace('IDR ', ''))
    var quantities = quantityElement.value
    var images = imageElement.src
    //console.log(prices)
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
  //console.log("show modal!")
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

function purchaseClicked() {
    alert("Thank you for your purchase!")
    modal.style.display = "none"
    var cartContainer = document.getElementsByTagName('table')[0]
    for(var i = 1;i<cartContainer.rows.length;){
      cartContainer.deleteRow(i)
    }
    updateCartTotal();
  }

view_cart();

//module.exports = addToCart;
