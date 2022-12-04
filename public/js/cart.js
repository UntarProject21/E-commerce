const addToCart = require("./cart_old");

function add(product_id, price) {
    var inputCount = document.getElementById(product_id);
    inputCount.value++;
    document.getElementById(product_id + '-price').innerHTML = 'Rp ' + price * inputCount.value;
    set_total_price();
    addToCart(product_id);
}

function minus(product_id, price) {
    var inputCount = document.getElementById(product_id);
    if (inputCount.value > 0) {
        inputCount.value--;
        document.getElementById(product_id + '-price').innerHTML = 'Rp ' + price * inputCount.value;
        set_total_price();
        removeFromcartaddToCart(product_id);
    }
}

function remove(product_id) {
    var cartaddToCart = JSON.parse(localStorage.getItem("cartaddToCart"));
    cartaddToCart = cartaddToCart.filter( x => {
        if (x.product_id != product_id) {
            return x;
        }
        location.reload();
    });
    localStorage.setItem("cartaddToCart", JSON.stringify(cartaddToCart));
}

function addToCart(product_id) {
    if (localStorage.getItem("cartaddToCart") === null) {
        localStorage.setItem("cartaddToCart", "[]");
    }
    var cartaddToCart = JSON.parse(localStorage.getItem("cartaddToCart"));
    var filtered_cartaddToCart = cartaddToCart.filter( x => x.product_id == product_id);
    if (filtered_cartaddToCart.length === 0) {
        cartaddToCart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        filtered_cartaddToCart[0].quantity++;
        cartaddToCart = cartaddToCart.filter( x => {
            if (x.product_id != product_id) {
                return x;
            }
        });
        cartaddToCart.push(filtered_cartaddToCart[0]);
    }
    localStorage.setItem("cartaddToCart", JSON.stringify(cartaddToCart));
}

function removeFromcartaddToCart(product_id) {
    if (localStorage.getItem("cartaddToCart") === null) {
        localStorage.setItem("cartaddToCart", "[]");
    } else {
        var cartaddToCart = JSON.parse(localStorage.getItem("cartaddToCart"));
        var filtered_cartaddToCart = cartaddToCart.filter( x => x.product_id == product_id);
        if (filtered_cartaddToCart.length > 0) {
            filtered_cartaddToCart[0].quantity--;
            if (filtered_cartaddToCart[0].quantity === 0) {
                cartaddToCart = cartaddToCart.filter( x => {
                    if (x.product_id != product_id) {
                        return x;
                    }
                    location.reload();
                });
            } else {
                cartaddToCart = cartaddToCart.filter( x => {
                    if (x.product_id != product_id) {
                        return x;
                    }
                });
                cartaddToCart.push(filtered_cartaddToCart[0]);
            }
        }
        localStorage.setItem("cartaddToCart", JSON.stringify(cartaddToCart));
    }
}

function set_total_price() {
    let price = document.getElementsByClassName("price");
    let total_price = 0;
    for (let i = 0; i < price.length; i++) {
        total_price += parseInt(price[i].innerHTML.substr(3));
    }
    document.getElementById("total-price").innerHTML = 'Rp ' + total_price;
}

function view_cartaddToCart() {
    var cartaddToCart = JSON.parse(localStorage.getItem("cartaddToCart"));
    let total_price = 0;
    var html = '';

    for (var i = 0; i < cartaddToCart.length; i++) {
        let request = new XMLHttpRequest();
        request.open('GET', `api/getProduct?id=${cartaddToCart[i].product_id}`, false);
        request.send(null);

        if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            total_price += parseInt(data[0].PRICE * cartaddToCart[i].quantity);
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
                                        onclick="minus('${cartaddToCart[i].product_id}', '${data[0].PRICE}')"><i class="far fa-minus-square"></i></button>
                                </span>
                                <input class="box" type="text" disabled="disabled" value="${cartaddToCart[i].quantity}"
                                    class="form-control input-number" id="${cartaddToCart[i].product_id}" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-default btn-number" style="color: white;"
                                        onclick="add('${cartaddToCart[i].product_id}', '${data[0].PRICE}')"><i class="far fa-plus-square"></i></button>
                                </span>
                            </div>
                            <br>
                            <p id="${cartaddToCart[i].product_id}-price" class="price">Rp ${data[0].PRICE * cartaddToCart[i].quantity}</p>
                            <a href="javascript:;" onclick='return remove("${cartaddToCart[i].product_id}")' style="color:red;"><i class="far fa-trash-alt" color="red"></i> <u>Remove</u></a>
                            <br><br>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
    document.getElementById("view-cartaddToCart").innerHTML = html;
    document.getElementById("total-price").innerHTML = 'Rp ' + total_price;
}

view_cartaddToCart();