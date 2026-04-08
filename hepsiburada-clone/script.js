//LOGIN SCRIPTLERİ//
if(document.body.className.includes("lp")){
    let loginForm = document.querySelector(".login-form")

    loginForm.addEventListener("click", (e) => {

        if (e.target.classList.contains("signin")) {
            loginForm.innerHTML = `
                        <div class="login-links">
                            <p class="login">Giriş Yap</p>
                            <p class="signin">Üye Ol</p>
                        </div>
                        <div class="signin-inputs">
                            <input type="password" placeholder="E-posta adresi veya GSM numarası">
                        </div>
                        <div class="forgot-password">
                        </div>
                        <div class="signin-buttons">
                            <button class="login-button">Devam Et</button>
                        </div>
                        <div class = "login-d">
                            Kişisel verileriniz, Aydınlatma Metni kapsamında işlenmektedir. 
                            “Devam et” veya “Sosyal Hesap” butonlarından birine basarak Üyelik 
                            Sözleşmesi’ni ve Gizlilik Politikası’nı okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.
                        </div> 
                `;
            return;
        }

        if (e.target.classList.contains("login")) {
            loginForm.innerHTML = `
                    <div class="login-links">
                        <p class="login">Giriş Yap</p>
                        <p class="signin">Üye Ol</p>
                    </div>
                    <div class="invalid-password">
                        <div class="invalid-password-top">
                            <div class="invalid-password-img">
                                <img src="icons/error-message.png">
                            </div>
                            <div class="invalid-password-d">
                                Girdiğiniz şifre eksik veya hatalı.
                            </div>
                            <div class="invalid-password-c">
                                <img class="close-invalid-password" src="icons/cross.png">
                            </div>
                        </div>
                        <div class="invalid-password-bottom">
                            Kontrol edip tekrar deneyin.
                        </div>
                    </div>
                    <div class="login-inputs">
                        <input class="email-input" type="email" placeholder="E-posta adresi">
                        <p class = "invalid-email">Geçerli bir e-posta girmelisiniz</p>
                        <input class="password-input" type="password" placeholder="Şifre">
                    </div>
                    <div class="forgot-password">
                        <a class="forgot-password-link">Şifremi unuttum</a>
                    </div>
                    <div class="login-buttons">
                        <button class="login-button">Giriş Yap</button>
                        <button class="phone-login">Telefon numarası ile giriş yap</button>
                    </div>
                `;
            return;
        }

        if (e.target.classList.contains("login-button")) {

            let emailValid = false
            let passwordValid = false

            const emailInput = document.querySelector(".email-input");
            const passwordInput = document.querySelector(".password-input");
            const emailMessage = document.querySelector(".invalid-email");
            const passwordMessage = document.querySelector(".invalid-password");

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!email || !email.includes("@")) {
                emailMessage.style.display = "block";
            } 
            else if(email === "melih1kostak@gmail.com"){
                emailMessage.style.display = "none";
                emailValid = true
            }

            if (!password) {
                passwordMessage.style.display = "block";
            } 
            else if(password === "Kostak") {
                passwordMessage.style.display = "none";
                passwordValid = true
            }

            if(emailValid && passwordValid){
                window.location.href = "index.html"
            }


        }

    }); 
}

//HOME PAGE//
if (document.body.className.includes("hp")) {
    let productContainers = document.querySelectorAll(".p-product-container");

    const fırsat = document.querySelector(".fırsat");
    const backBtn = document.querySelector(".fırsat-back-button button");
    const forwardBtn = document.querySelector(".fırsat-forward-button button");

    setInterval(() => {
        fırsat.scrollBy({ left: 727, behavior: "smooth" });
    }, 5000);
   

    backBtn.addEventListener("click", () => {
        fırsat.scrollBy({ left: -727, behavior: "smooth" });
    });

    forwardBtn.addEventListener("click", () => {
        fırsat.scrollBy({ left: 727, behavior: "smooth" });
    });

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

            let productCard = document.querySelectorAll(".top");

            productCard.forEach((item,index) => {
                item.addEventListener("click",function(){
                    window.location.href = `product-detail.html?id=${index+1}`;
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
                    const productBottom = this.closest(".p-product-container").querySelector(".bottom")

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
                    }, 3000);

                   const originalBottomText = productBottom.innerHTML;

                    productBottom.innerHTML = `
                        <p class="basket-added-info">Sepete Eklendi</p>
                    `;

                    setTimeout(() => {
                        productBottom.innerHTML = originalBottomText;
                    }, 3000);
            })
        })    
    });

    const questionsContainer = document.querySelector(".questions-container")
    const question = questionsContainer.querySelector(".questions")
    const questionTitle = question.querySelectorAll("h3")
    const answers = document.querySelectorAll(".questions-answer")

    questionTitle.forEach((item,index) =>{
        item.addEventListener("click",()=>{
           answers[index].classList.toggle("questions-answer-active");
        })
    })

    const popularSearchContainer = document.querySelector(".p-searchs")
    const popularSearch = popularSearchContainer.querySelectorAll("li")
    
    popularSearch.forEach(item => {
        item.addEventListener("click",()=>{
            window.location.href = `category.html?${item.textContent}`
        })
    })

    const brandContainer = document.querySelector(".brands")
    const popularBrands = brandContainer.querySelectorAll("li")

    popularBrands.forEach(item => {
        item.addEventListener("click",()=>{
            window.location.href = `category.html?${item.textContent}`
        })
    })
}


//BASKET//
if(document.body.className.includes("bp")){
    let pro = JSON.parse(localStorage.getItem("Products")) || [];
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
    }
}

//PRODUCT DETAIL//
if(document.body.className.includes("pd")){
    const URL = new URLSearchParams(window.location.search);
    const productId = URL.get("id");
    
    let productPhoto = document.querySelector(".photo")
    let productName = document.querySelector(".product-name")
    let productScore = document.querySelector(".score")
    let commentNumber = document.querySelector(".c-num")
    let stars = document.querySelector(".stars")
    
    
    fetch("product.json")
        .then(res => res.json())
        .then(data=>{
            productPhoto.src = data.products[productId].image;
            productName.textContent = data.products[productId].name;
            productScore.textContent = data.products[productId].score;
            commentNumber.textContent = data.products[productId].comment
            
            ıntScore = Math.floor(data.products[productId].score);
            stars.innerHTML =""

            for (let i = 0; i < ıntScore; i++){
                stars.innerHTML += `<img src="icons/star.png">`;
            }

            for (let i = ıntScore; i < 5; i++){
                stars.innerHTML += `<img src="icons/empty-star.png">`;
            } 

            

        })


}














    


