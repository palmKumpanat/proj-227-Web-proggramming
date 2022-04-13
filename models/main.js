// cart
let cart = document.querySelector(".cart");
let cartIcon = document.querySelector("#cart-icon");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active"); 
};

