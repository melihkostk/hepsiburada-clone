//LOGIN SCRIPTLERİ//
/*
let signIn = document.querySelector(".signin")
let logIn = document.querySelector(".login")
let loginForm = document.querySelector(".login-form")


loginForm.addEventListener("click", (e) => {
    

    if (e.target.classList.contains("signin")) {
        loginForm.innerHTML = `
             <div class="login-links">
                    <p class="login">Giriş Yap</p>
                    <p class="signin">Üye Ol</p>
                </div>
                <div class="login-inputs">
                    <input type="password" placeholder="E-posta adresi veya GSM numarası">
                </div>
                <div class="forgot-password">
                </div>
                <div class="login-buttons">
                    <button class="login-button">Devam Et</button>
                </div>
                <div class = "login-d">
                    Kişisel verileriniz, Aydınlatma Metni kapsamında işlenmektedir. 
                    “Devam et” veya “Sosyal Hesap” butonlarından birine basarak Üyelik 
                    Sözleşmesi’ni ve Gizlilik Politikası’nı okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.
                </div> 
        `;
    }

    if (e.target.classList.contains("login")) {

        loginForm.innerHTML = `
            <div class="login-links">
                    <p class="login">Giriş Yap</p>
                    <p class="signin">Üye Ol</p>
                </div>
                <div class="login-inputs">
                    <input type="email" placeholder="E-posta adresi">
                    <input type="password" placeholder="Şifre">
                </div>
                <div class="forgot-password">
                    <a class="forgot-password-link">Şifremi unuttum</a>
                </div>
                <div class="login-buttons">
                    <button class="login-button">Giriş Yap</button>
                    <button class="phone-login">Telefon numarası ile giriş yap</button>
                </div>
        `;
    }

});*/

//HOME PAGE//
let productContainers = document.querySelectorAll(".p-product-container");

fetch("product.json")
    .then(res => res.json())
    .then(data => {

        productContainers.forEach((item, index) => {
            const product = data.products[index];

            item.innerHTML = `
                <div class="top">
                    <img src="${product.image}">
                    <p class="product-d">${product.name}</p>
                    <div class="all-ratings">
                        <img class="star" src="icons/star.png">
                        <p class="rating">${product.score}</p>
                        <p class="comment-number">${product.comment}</p>
                    </div>
                </div>
                <div class="bottom">
                    <p class="p-cost">${product.price} <span>TL</span></p>
                    <img class="shop-card" src="icons/black-shopping-cart.png">
                </div>
            `;
        });

    });




let productCard = document.querySelectorAll(".top");

productCard.forEach(item => {
    item.addEventListener("click",function(){
        
        const productName = this.closest(".p-product-container").querySelector(".product-d").textContent;
        const productImage = this.closest(".p-product-container").querySelector("img").src;
        window.location.href = `product-detail.html?${productName}`;
    })
})

let sale = document.querySelector(".sale-container");
let saleItem = sale.querySelectorAll("img");

saleItem.forEach(item => {
    item.addEventListener("click",()=>{
        window.location.href = "offers.html";
    })
})

let shoppingCard = document.querySelectorAll(".shop-card");
let closeIcon = document.querySelector(".close-added-info")
let addedInfo = document.querySelector(".added-info")

let products = JSON.parse(localStorage.getItem("Products")) || [];
let productNumber = document.querySelector(".total-amount");

if (products.length > 0) {
    productNumber.textContent = products.length;
    productNumber.style.backgroundColor = "#FF6000";
    productNumber.style.color = "#fff";
} 
else {
    productNumber.textContent = 0;
}

shoppingCard.forEach(item => {
    item.addEventListener("click",function(){

        const productName = this.closest(".p-product-container").querySelector(".product-d").textContent;
        const productRating = this.closest(".p-product-container").querySelector(".rating").textContent;
        const productPrice = this.closest(".p-product-container").querySelector(".p-cost").textContent;
        const productImage = this.closest(".p-product-container").querySelector("img").src;
        
        let products = JSON.parse(localStorage.getItem("Products")) || [];

        products.push({
            name: productName,
            rating: productRating,
            price: productPrice,
            photo: productImage
        });

        localStorage.setItem("Products", JSON.stringify(products));
        let productNumber = document.querySelector(".total-amount");

        if(products.length > 0){
            productNumber.textContent = products.length;
            productNumber.style.backgroundColor = "#FF6000"
            productNumber.style.color = "#fff"
        }

        else{
            productNumber.textContent = 0;
        }

        addedInfo.style.visibility = "visible";
        
        setTimeout(() => {
            addedInfo.style.visibility = "hidden";
        }, 5000);

    })
})


//BASKET//
/*let pro = JSON.parse(localStorage.getItem("Products")) || [];
const basketInfo = document.querySelector(".basket-info");

if(pro.length > 0){
    basketInfo.innerHTML = `
        <div class="cupon-area">
            <div class="cupon-area-left">
                <img src="icons/coupon.png">
                <span class="cupon-t">Kuponlarım</span>
            </div>
            <div class="cupon-area-right">
                <a>Kupon kodu ekle</a>
                <img class="plus" src="icons/add.png">
            </div>
        </div>
        <div class="product-area">
            <div class="product-area-top">
                <div class="product-top-left">
                    <span class="slr">Satıcı:</span>
                    <span class = "slr-c">Royal Mum</span>
                </div>
                <div class="product-top-right">
                    <div>
                        <span>Kargonuzun bedava olması için <b>171 TL'lik</b>  ürün daha ekleyin.</span>
                    </div>
                </div>
            </div>
            <div class="product-area-bottom">
                <div class="shipping">
                    <img src="icons/bus.png">
                    <span>Yarın kargoda</span>
                </div>
                <div class="basket-product">
                    <div class="basket-product-left">
                        <input type="checkbox">
                        <img src="images/çay.webp">
                    </div>
                    <div class="basket-product-right">
                        <div class="basket-product-top">
                            <a>Royal Mum Beyaz Sabun Kokulu Kese</a>
                            <span>Beyaz - Sabun - Kokusu/3 Adet</span>
                        </div>
                        <div class="basket-product-bottom">
                            <div class="quantity">
                                <img src ="icons/delete.png">
                                <span>1</span>
                                <img src="icons/add.png">
                                
                            </div>
                            <div>
                                <span>129TL</span>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    
    `;
}*/














    


