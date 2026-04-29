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
                            <input type="text" placeholder="E-posta adresi veya GSM numarası">
                        </div>
                        <div class="forgot-password">
                        </div>
                        <div class="signin-buttons">
                            <button class="continue-button">Devam Et</button>
                        </div>
                        <div class = "login-d">
                            Kişisel verileriniz, Aydınlatma Metni kapsamında işlenmektedir. 
                            “Devam et” veya “Sosyal Hesap” butonlarından birine basarak Üyelik 
                            Sözleşmesi’ni ve Gizlilik Politikası’nı okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.
                        </div> 
                `;
            

            let email = document.querySelector(".signin-inputs input")
            let continueBottom = document.querySelector(".continue-button") 
            
            continueBottom.addEventListener("click",()=>{
                let mail = email.value;
                if(mail === "melih1kostak@gmail.com"){
                    window.location.href = "create-acount.html"
                }
                
            })
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
                emailInput.style.border = "3px solid rgba(249, 0, 0, 0.08)"
                
            } 
            else if(email === "melih1kostak@gmail.com"){
                emailMessage.style.display = "none";
                emailValid = true
            }

            if (!password) {
                passwordMessage.style.display = "block";
                passwordInput.style.border = "3px solid rgba(249, 0, 0, 0.08)"
                
                let close = document.querySelector(".close-invalid-password");
                close.addEventListener("click",()=>{
                    passwordMessage.style.display = "none";
                })
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

let loged = false
//CREATE ACCOUNT//
if(document.body.className==="ca"){
    let createAccountButton = document.querySelector(".create-account-bottom button")
    
    createAccountButton.addEventListener("click",()=>{
        let nameInput = document.querySelector(".name-i");
        let surnameInput = document.querySelector(".surname-i");
        let passwordInput = document.querySelector(".password-i");
        let back = document.querySelector(".return-to")

        if(nameInput.value && surnameInput.value && passwordInput.value){
            let users = JSON.parse(localStorage.getItem("Users")) || [];

            users.push({
                name:nameInput.value,
                surname:surnameInput.value,
                password:passwordInput.value
            });

            localStorage.setItem("Users", JSON.stringify(users));
            loged = true;
            window.location.href = "index.html"
        }

        else{
            return
        }
    })

    let back = document.querySelector(".return")
    back.addEventListener("click",()=>{
        window.location.href = "login.html"
    })


}

//HOME PAGE//
if (document.body.className.includes("hp")) {

    let addedInfo = document.querySelector(".added-info")
    let advC = document.querySelectorAll(".adv-slider .product-container")
    
    advC.forEach(item => {
    item.addEventListener("click", (e) => {

        if (e.target.closest(".rb-b")) {
            let productName = item.querySelector(".ad-na");
            let productPrice = item.querySelector(".cost")
            let commentNumber = item.querySelector(".stars p")
            let productScore = item.querySelectorAll(".stars img")
            let productImage = item.querySelector(".left-part img")

            let starCount = 0;
            productScore.forEach(item=>{
                
                if (item.src.includes("icons/star.png")) {
                    starCount++;
                }
            })

            let products = JSON.parse(localStorage.getItem("Products")) || [];

            products.push({
                name: productName.textContent,
                rating: starCount,
                price: productPrice.textContent,
                photo: productImage.src,
                quantity:1
                });
            

            localStorage.setItem("Products", JSON.stringify(products));
            addedInfo.style.visibility = "visible";
                    
            setTimeout(() => {
                addedInfo.style.visibility = "hidden";
            }, 3000);
            
            
        }
    });
});
    
   
    
    const locationSelect = document.querySelector(".select-location")
    let citySelect;
    let districtSelect;
    let city;
    let district;
    
    const locationFilter = document.querySelector(".location-filter")
    locationFilter.addEventListener("click",()=>{
        locationSelect.style.display = "flex";
    })

    locationSelect.addEventListener("click",(e)=>{

        if(e.target.className === "close-select-location"){
            e.stopPropagation();
            locationSelect.style.display = "none";
        }

        if(e.target.className === "save-location"){
            citySelect = document.getElementsByName("city")
            citySelect.forEach(item=>{
                city = item.value;
                
            })

            districtSelect = document.getElementsByName("ilçe")
            districtSelect.forEach(item=>{
                district = item.value;
                
            })

            document.querySelector(".location-select").textContent = `${city}/${district}`
        }
    })

    const advBack = document.querySelector(".adv-back")
    const advForward = document.querySelector(".adv-forward")
    const advSlider = document.querySelector(".adv-slider")
    const advItem = document.querySelector(".adv-slider .product-container")
    let advItemWidth = advItem.offsetWidth;
    
    advBack.addEventListener("click",()=>{
        advSlider.scrollBy({
            top:0,
            left:-advItemWidth,
            behavior:"smooth",
        })
    })

    advForward.addEventListener("click",()=>{
        advSlider.scrollBy({
            top:0,
            left:advItemWidth,
            behavior:"smooth",
        })
    })

    const searchProduct = document.querySelector(".search-text")
    const searchPopUp = document.querySelector(".search-pop-up")
    
    searchProduct.addEventListener("click",()=>{
        searchPopUp.style.display = "flex";
    })

    const closeSearchPopUp = document.querySelector(".search-pop-up-close")
    
    closeSearchPopUp.addEventListener("click",()=>{
        searchPopUp.style.display = "none";
    })

    const bottom = document.querySelector(".search-pop-up-bottom");
    bottom.addEventListener("click",(e)=>{
        
        if(e.target.className === "filter-result"){
            let productId = e.target.dataset.id;
            window.location.href = `product-detail.html?id=${productId-1}`;
            
        }

        else if(e.target.className === "filter-items"){
            let productId = e.target.dataset.id;
            window.location.href = `product-detail.html?id=${productId-1}`;
        }

        else{
            return
        }
    })

    const filterSearch = document.querySelector(".search-input");
    filterSearch.addEventListener("input",()=>{
        bottom.innerHTML = "";
        fetch("product.json")
            .then(res=>res.json())
            .then(data => {
                data.products.forEach(item=>{
                    if(filterSearch.value){
                        if(item.name.toLowerCase().includes(filterSearch.value.toLowerCase())){
                            //data-id ekleme fikrini internetten aldım
                            bottom.innerHTML += `
                                <div class = "filter-result" data-id="${item.id}"> 
                                    ${item.name}
                                </div>
                            `;
                        }
                    }
                    
                    else{
                        bottom.innerHTML = `
                            <h3>Popüler Aramalar</h3>
                            <div class="filter-items-flex">
                                <div class="filter-items">
                                    <img src="icons/search-icon.png" alt="">
                                    asılabilir kağıt havlu
                                </div>
                                <div class="filter-items">
                                    <img src="icons/search-icon.png" alt="">
                                    iphone 17
                                </div>
                                <div class="filter-items">
                                    <img src="icons/search-icon.png" alt="">
                                    iphone 15
                                </div>
                                <div class="filter-items">
                                    <img src="icons/search-icon.png" alt="">
                                    lego
                                </div>
                                <div class="filter-items">
                                    <img src="icons/search-icon.png" alt="">
                                    erkek spor ayakkabısı
                                </div>
                                <div class="filter-items">
                                    <img src="icons/search-icon.png" alt="">
                                    stanley
                                </div>
                                <div class="filter-items">
                                    <img src="icons/search-icon.png" alt="">
                                    adidas
                                </div>
                                <div class="filter-items">
                                    <img src="icons/search-icon.png" alt="">
                                    iphone 16
                                </div>
                                <div class="filter-items">
                                    <img src="icons/search-icon.png" alt="">
                                    hopfrög
                                </div>
                                <div class="filter-items">
                                    <img src="icons/search-icon.png" alt="">
                                    iphone 17 pro max
                                </div>
                            </div>
                        `;
                    }
                })
            })
        })

    const fırsat = document.querySelector(".fırsat");
    const backBtn = document.querySelector(".fırsat-back-button button");
    const forwardBtn = document.querySelector(".fırsat-forward-button button");
    const currentPage = document.querySelector(".current-page");
    const totalPage = document.querySelector(".page-number");
    const images = document.querySelectorAll(".a-img")
    let pageValue = currentPage.textContent;

    totalPage.textContent = images.length;


    setInterval(() => {
        fırsat.scrollBy({ left: 727, behavior: "smooth" });
        
        if(pageValue <= images.length){
            pageValue = Number(pageValue) + 1;
            currentPage.textContent = pageValue
        }
        else{
            return
        }
    }, 5000);
   

    backBtn.addEventListener("click", () => {
        fırsat.scrollBy({ left: -727, behavior: "smooth" });
        if(pageValue > 1){
            pageValue = Number(pageValue) - 1;
            currentPage.textContent = pageValue
        }
    });

    forwardBtn.addEventListener("click", () => {
        fırsat.scrollBy({ left: 727, behavior: "smooth" });

        if(pageValue < totalPage.textContent){
            pageValue = Number(pageValue) + 1;
            currentPage.textContent = pageValue
        }
       
    });

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

            let productCard = document.querySelectorAll(".top");

            productCard.forEach((item,index) => {
                item.addEventListener("click",function(){
                    window.location.href = `product-detail.html?id=${index}`;
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
                        photo: productImage,
                        quantity:1
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
                   const originalBottomColor = productBottom.style.backgroundColor;

                    productBottom.innerHTML = `
                        <p class="basket-added-info">Sepete Eklendi</p>
                    `;

                    productBottom.style.backgroundColor = "#e6ffe6"


                    setTimeout(() => {
                        productBottom.innerHTML = originalBottomText;
                        productBottom.style.backgroundColor = originalBottomColor;
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

    let popUpMenu = document.querySelectorAll(".moda-pop-up-menu")
    
    popUpMenu.forEach(menu=>{
        let links = menu.querySelectorAll("a")
        links.forEach(item=>{
            item.addEventListener("click",()=>{
                let cate = item.textContent;
                window.location.href = `category.html?category=${cate.trim()}`
            })
        })

    })

    const goToTop = document.querySelector(".go-to-top")

    window.addEventListener("scroll",()=> {
    if (window.scrollY >= 600) {
        goToTop.style.display = "block";
    } 
    
    else {
        goToTop.style.display = "none";
    }
    });

    let cateFilter = document.querySelectorAll(".brand-cate")
    
    cateFilter.forEach(item=>{
        let cateLink = item.querySelectorAll("li")
        cateLink.forEach(link => {
            link.addEventListener("click",()=>{
                window.location.href = `category.html?category=${link.textContent}`
            })
        })
    })

    let backButton = document.querySelectorAll(".b-b")
    let forwardButton = document.querySelectorAll(".f-b")
    let productCard = document.querySelector(".p-product-container")
    let productCardWidth = productCard.offsetWidth

    backButton.forEach(item=>{
        item.addEventListener("click",function(){
            let slider = this.closest(".p-container")
            slider.scrollBy({
                top:0,
                left:-productCardWidth + 3,
                behavior:"smooth",
            });
        })
    })

    forwardButton.forEach(item=>{
        item.addEventListener("click",function(){
            let slider = this.closest(".p-container")
            slider.scrollBy({
                top:0,
                left:productCardWidth + 3,
                behavior:"smooth",
            });
        })
    })

}


//BASKET//
if(document.body.className.includes("bp")){

    let pro = JSON.parse(localStorage.getItem("Products")) || [];
    const basketInfo = document.querySelector(".basket-info");
    
    if(pro.length > 0){

        let header = document.querySelector("header")
        header.innerHTML += `
            <div class = "info-header">
                <div class = "info-header-container">
                    <div class = "info-header-left">
                        Sepetim <span>(${pro.length} ürün)</span>
                    </div>
                    <div class = "info-header-right">
                        Ürünleri Sil
                        <img src = "icons/delete.png">
                    </div>
                </div>
            </div>
        `;

        let trash = document.querySelector(".info-header-right");
        trash.addEventListener("click",()=>{
            document.querySelector(".confirm").style.display = "flex"
        })

        let cancel = document.querySelector(".cancel");
        cancel.addEventListener("click",()=>{
            document.querySelector(".confirm").style.display = "none"
        })

        let deleteAll = document.querySelector(".delete-all")
        deleteAll.addEventListener("click",()=>{
            let allProducts = document.querySelectorAll(".product-area");
            let overall = document.querySelector(".overall");
            overall.remove()
            
            allProducts.forEach(item => {
                item.remove()
            })

            let header = document.querySelector(".info-header")
            header.remove()
            
            localStorage.clear();

            document.querySelector(".confirm").style.display = "none"

        })

        basketInfo.innerHTML = ""
        
        pro.forEach(item=>{
            basketInfo.innerHTML += `

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
                                <img src=${item.photo}>
                            </div>
                            <div class="basket-product-right">
                                <div class="basket-product-top">
                                    <a>${item.name}</a>
                                    <span>Beyaz - Sabun - Kokusu/3 Adet</span>
                                </div>
                                <div class="basket-product-bottom">
                                    <div class="quantity">
                                        <img class="delete-product" src ="icons/delete.png">
                                        <span class = "product-quantity">${item.quantity}</span>
                                        <img class="add-quantity" src="icons/add.png">
                                    </div>
                                    <div>
                                        <span class = "product-cost">${item.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        })

        let overallCost = 0;

        pro.forEach(item=>{
            overallCost += parseInt(item.price) * parseInt(item.quantity);  
        })

        let basket = document.querySelector(".basket-container")

            basket.innerHTML += `
                <div class = "overall">
                    <div class = "overall-top">
                        <span class = "selected-products">SEÇİLEN ÜRÜNLER (${pro.length})</span>
                        <span class = "overall-cost">${overallCost + 100}<span class = "tl">TL</span></span>
                        <button>Alışverişi Tamamla</button>
                    </div>
                    <div class = "overall-mid">
                        <img src="images/premium-new-logo.png">
                        <p>Premium'a geç, kargo bedava ve Hepsipara avantajları ile tasarruf et.</p>
                        <button>
                            <a href = "premium.html">Şimdi Geç</a>
                        </button>
                    </div>
                    <div class = "overall-bottom">
                        <div class = "bottom-item">
                            <p>Ürünler</p>
                            <p>${overallCost} TL</p>
                        </div>

                        <div class = "bottom-item">
                            <p>Kargo</p>
                            <p>100 TL</p>
                        </div>
                    </div>
                </div>
            `;

        let continueShopping = document.querySelector(".overall-top button")
        continueShopping.addEventListener("click",()=>{
            window.location.href = "buy.html";
        })

        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("add-quantity")) {

                let product = e.target.closest(".product-area")
                let index = [...product.parentNode.children].indexOf(product); //bu satırı kendim yazmadım

                const container = e.target.parentElement;
                const quantity = container.querySelector(".product-quantity");

                let value = parseInt(quantity.textContent);
                value++;
                pro[index].quantity = value;
                localStorage.setItem("Products", JSON.stringify(pro));

                if (value >= 2) {
                    
                    container.innerHTML = `
                        <img class="decrease-quantity" src="icons/minus.png">
                        <span class="product-quantity">${pro[index].quantity}</span>
                        <img class="add-quantity" src="icons/add.png">
                        <img class="delete-product" src="icons/delete.png">
                    `;
                }
                
                else {
                    container.innerHTML = `
                        <img class="delete-product" src="icons/delete.png">
                        <span class="product-quantity">${pro[index].quantity}</span>
                        <img class="add-quantity" src="icons/add.png">
                    `;
                }

            }

            if(e.target.classList.contains("decrease-quantity")){

                let product = e.target.closest(".product-area")
                let index = [...product.parentNode.children].indexOf(product);
                
                const container = e.target.parentElement;
                const quantity = container.querySelector(".product-quantity");

                if(quantity.textContent >= 2){
                    let value = parseInt(quantity.textContent) - 1;
                    quantity.textContent = value;
                    pro[index].quantity = value;
                    localStorage.setItem("Products", JSON.stringify(pro)); 
                }
                else{
                    quantity.textContent = 1;
                }

            }

            if(e.target.classList.contains("delete-product")){
                
                let product = e.target.closest(".product-area")
                let index = [...product.parentNode.children].indexOf(product); 
                product.remove()
                pro.splice(index,1)
                localStorage.setItem("Products", JSON.stringify(pro));
            }
    });
   
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
    let productPrice = document.querySelector(".stb-bottom")
    let initialPrice = document.querySelector(".initial-price")
    initialPrice.remove()
    let gain = document.querySelector(".gain")
    gain.remove()
    let addedInfo = document.querySelector(".added-info")

    let addToBasket = document.querySelector(".add-to-basket")
    addToBasket.addEventListener("click",()=>{
        
        let products = JSON.parse(localStorage.getItem("Products")) || [];

        let productName = document.querySelector(".product-name").textContent;
        let productRating = document.querySelector(".score").textContent;
        let productPrice = document.querySelector(".stb-bottom").textContent;
        let productImage = document.querySelector(".photo").src;
    
        products.push({
            name: productName,
            rating: productRating,
            price: productPrice,
            photo: productImage,
            quantity:1
        });

        localStorage.setItem("Products", JSON.stringify(products));
        addedInfo.style.visibility = "visible"

        setTimeout(()=>{
            addedInfo.style.visibility = "hidden"
        },3000)
    })

    let pro = JSON.parse(localStorage.getItem("Products")) || [];

    let totalAmount = document.querySelector(".total-amount");
    totalAmount.textContent = pro.length;

    if(pro.length > 0){
        totalAmount.style.backgroundColor = "#FF6000"
        totalAmount.style.color = "#fff"
    }

    fetch("product.json")
        .then(res => res.json())
        .then(data=>{
            productPhoto.src = data.products[productId].image;
            productName.textContent = data.products[productId].name;
            productScore.textContent = data.products[productId].score;
            commentNumber.textContent = data.products[productId].comment
            productPrice.textContent = data.products[productId].price + "TL"

            
            ıntScore = Math.floor(data.products[productId].score);
            stars.innerHTML =""

            for (let i = 0; i < ıntScore; i++){
                stars.innerHTML += `<img src="icons/star.png">`;
            }

            for (let i = ıntScore; i < 5; i++){
                stars.innerHTML += `<img src="icons/empty-star.png">`;
            } 
        })

        let formLinksContainer = document.querySelector(".form-links")
        let creditCard = document.querySelector(".credit-carts")

        formLinks = document.querySelectorAll(".form-links a")
        
        
        
        formLinksContainer.addEventListener("click",(e)=>{

            formLinks.forEach(item=>{
                item.classList.remove("clicked")
            })

            const target = e.target.closest("a");

            if(target){
                target.classList.add("clicked");
            }
            
            if(e.target.textContent === "İptal ve İade Koşulları"){
                creditCard.innerHTML = `
                    <div class="return">
                        <h4>Kolay iade süreci nasıl başlatılır?</h4>
                        <div class = "return-col">
                            <img src="images/iadetalebi.svg">
                            <h5>İade talebi oluştur</h5>
                            <p>
                                Siparişlerim sayfasından iade etmek istediğin 
                                ürünü bul ve İade ve diğer talepler'e tıkla.
                            </p>
                            <div class="iade-link">
                                <a>Kolay İade nedir?</a>
                            </div>
                        </div>
                        <div class = "return-col">
                            <img src="images/iadeyontemi.svg">
                            <h5>İade yöntemini seç</h5>
                            <p>
                                İade etmek istediğin ürünü kapında iade ile kolayca iade et ya da Hepsimat 
                                noktasına iade ve kargoya teslim seçeneklerinden birini seç.
                            </p>
                            <div class="iade-link">
                                <a>Kapıda İade nedir?</a>
                            </div> 
                        </div>
                        <div class = "return-col">
                            <img src="images/kargokodu.svg">
                            <h5>Kargo kodunu not et</h5>
                            <p>
                                Yönlendirmeleri tamamla ve ekranda çıkan 
                                kargo gönderi kodunu not et.
                            </p>
                            <div class="iade-link">
                                <a>Kargo koduna nasıl ulaşırım?</a>
                            </div>
                        </div>
                        <div class = "return-col">
                            <img src="images/urunteslimi.svg">
                            <h5>Ürünü teslim et</h5>
                            <p>
                                Ürünü tüm aparatlarıyla eksiksiz bir şekilde paketle ve 
                                kargo gönderi koduyla teslim et.
                            </p>
                            <div class="iade-link">
                                <a>Ürünü nereye teslim edebilirim?</a>
                            </div>
                        </div>
                        <div class = "return-col">
                            <img src="images/iadeonayi.svg">
                            <h5 class = "green-title">İadeniz onaylansın</h5>
                            <p>
                                Ürünü tüm aparatlarıyla eksiksiz bir şekilde paketle ve 
                                kargo gönderi koduyla teslim et.
                            </p>
                        </div>
                        <div class = "return-col">
                            <p>
                                * Bu üründen toplu/çoklu sipariş verilmesi, 
                                siparişin ticari alım olduğunun tespit edilmesi veya 
                                farklı kullanıcı adı, rumuz, kimlik ve iletişim 
                                bilgileri ile verilen siparişlerde fatura adresi, 
                                teslimat adresi, ödeme bilgisi, ticari unvanı, 
                                vergi numarası gibi unsurların aynı olması durumunda 
                                Hepsiburada siparişleri iptal etme hakkını saklı tutar.
                            </p>
                        </div>
                `;
            }

            if(e.target.textContent === "Hepsifinans"){
                creditCard.innerHTML = `
                    <div class="hepsifinans-table">
                        <div class = "hepsifinans-top">
                            <div class = "hepsifinans-title">
                                <h3>Hepsifinans</h3>
                                <p>Hepsifinans ile 12 aya varan taksit</p>
                            </div>
                            <div class="hepsifinans-table">
                                <table>
                                    <tbody>
                                        <tr class = "table-title">
                                            <td>Taksit</td>
                                            <td>Aylık Tutar</td>
                                            <td>Toplam Tutar</td>
                                        </tr>
                                        <tr class="">
                                            <td>3 taksit </td>
                                            <td>616,14 TL</td>
                                            <td>1.848,42 TL</td>
                                        </tr>
                                        <tr class="">
                                            <td>6 taksit </td>
                                            <td>334,23 TL</td>
                                            <td>2.005,36 TL</td>
                                        </tr>
                                        <tr class="">
                                            <td>12 taksit </td>
                                            <td>195,29 TL</td>
                                            <td>2.343,53 TL</td>
                                        </tr>
                                        <tr class="">
                                            <td>36 taksit </td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div class = "hepsifinans-bottom">
                            <h3>Önemli Bilgiler</h3>
                            <ul>
                                <li>
                                    Ödeme planı sepetteki ürünlere ve sepet tutarına 
                                    göre farklılık gösterebilir.
                                </li>
                                <li>
                                    Maksimum vade; bilgisayarlarda 12, tabletlerde 6 aydır. 
                                    20.000 TL ve altındaki cep telefonlarında maksimum vade 
                                    12 ay, 20.000 TL üzerindeki cep telefonlarında 3 aydır.
                                </li>
                                <li>
                                    Ödeme planı sepetteki ürünlere ve sepet tutarına göre 
                                    farklılık gösterebilir.
                                </li>
                                <li>
                                    Örneğin, sepetinizde 20.600 TL ve 19.500 TL değerinde 
                                    iki ayrı telefon varsa kullanabileceğiniz maksimum vade 3 aydır.
                                </li>
                            </ul>
                        </div>
                    </div>
                
                
                
                `;
            }

            if(e.target.textContent === "Ürün Açıklaması"){
                creditCard.innerHTML = `
                    <div class = "p-d">
                        <div class = "p-d-top">
                            <h3>
                                Yüksek Kalite Kadın Kol Çantası M (Yurt Dışından)
                            </h3>
                            <p>
                                Çantamız yüksek kaliteli çantadır. 
                            </p>
                        </div>
                        <div class="p-feature">
                            <h3>Ürün özellikleri</h3>
                            <div class = "p-feature-list">
                                <div class = "p-feature-item">
                                    <p>Kumaş Teknolojisi</p>
                                    <p>Su Dayanıklı</p>
                                </div>
                                <div class = "p-feature-item">
                                    <p>İçindeki Parçalar</p>
                                    <p>Ayarlanabilir Askılı</p>
                                </div>
                                <div class = "p-feature-item">
                                    <p>Stok Adedi</p>
                                    <p>50 adetten az</p>
                                </div>
                                <div class = "p-feature-item">
                                    <p>Ürün Aksesuarı</p>
                                    <p>Charm</p>
                                </div>
                                <div class = "p-feature-item">
                                    <p>Menşei</p>
                                    <p>TR - ( Türkiye )</p>
                                </div>
                            </div>
                            <h3>Diğer</h3>
                            <div class="other">
                                <div class="p-feature-item"">
                                    <p>Yurt Dışı Satış</p>
                                    <p>Yok</p>
                                </div>
                                <div class="p-feature-item"">
                                    <p>Stok Kodu</p>
                                    <p>HBCV0000C7WMWZ</p>
                                </div>
                            </div>
                        </div>
                        <div class = "report">
                            Hatalı içerik bildir
                        </div>
                    </div>
                `;
            }

            if(e.target.innerHTML === "Değerlendirmeler<span>1112</span>"){

                let product = document.querySelector(".photo").src
                creditCard.innerHTML = `
                    <div class = "reviews">
                        <div class = "reviews-top">
                            <h1>Yüksek Kalite Kadın  Kol Çantası M (Yurt Dışından)  Değerlendirmeleri</h1>
                        </div>
                        <div class = "reviews-bottom">
                            <div class = "reviews-bottom-left">
                                <img src= "${product}">
                            </div>
                            <div class = "reviews-bottom-right">
                                <div class = "reviews-bottom-right-top">
                                    <h3>Henüz değerlendirme yok</h3>
                                    <p>
                                        Siz de değerlendirmenizle milyonlarca 
                                        Hepsiburada müşterisinin karar vermesine 
                                        yardımcı olmaya ne dersiniz?
                                    </p>
                                </div>
                                <div class = "reviews-bottom-right-bottom">
                                    <button>
                                        <img src="icons/evaluate.png">
                                        Değerlendir
                                    </button>
                                    <a>Yorum Yayınlama Kriterleri</a>
                                    <p>Değerlendirme yapabilmek için bu ürünü satın almış olmalısınız.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            if(e.target.innerHTML === "Soru Cevap<span>586</span>"){
           
                creditCard.innerHTML = `
                    <div class = "qa">
                        <div class = "qa-filter">
                            <div class = "qa-filter-left">
                                <input class="search-qa" type = "text" placeholder = "Soru ve cevaplarda ara">
                                <div class="sort-select">
                                    <label for="sort" class="sort-labels">Sırala</label>
                                    <select name = "sort" class="sort">
                                        <option value="Varsayılan">Varsayılan</option>
                                        <option value="En faydalı soru & cevap">En faydalı soru & cevap</option>
                                        <option value="En yeni soru & cevap">En yeni soru & cevap</option>
                                        <option value="En eski soru & cevap">En eski soru & cevap</option>
                                    </select>
                                </div>
                            </div>
                            <div class="qa-filter-right">
                                <button>
                                    Satıcıya Sor
                                </button>
                            </div>
                        </div>
                        <div class="asked-question-container">
                            <h5>Soru</h5>
                            <div class="asked-questions">
                                
                            </div>
                        </div>
                        <div class="gived-answer-container">
                            <h5>Cevap</h5>
                            <div class="gived-answer">
                                Merhaba 27/25 yaklaşık olarak
                            </div>
                            <div class="answer-info">
                                <div class="answer-date">
                                    17 Ocak • 39 dakika  içerisinde cevapladı
                                </div>
                                <div class="answer-evaluate">
                                    <p>Bu cevap faydalı mı?</p>
                                    <div class="like-unlike">
                                        <img class = "like" src="icons/like.png">
                                        <p class = "like-number">0</p>
                                        <img class="dislike" src="icons/like.png">
                                        <p class = "dislike-number">0</p> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                const qForm = document.querySelector(".a-seller")
                const askSeller = document.querySelector(".qa-filter-right button");
                
                askSeller.addEventListener("click",()=>{
                    qForm.style.display = "block"
                })

                const close = qForm.querySelector(".close-a-seller");
                close.addEventListener("click",()=>{
                    qForm.style.display = "none"
                })

                document.querySelector(".asked-question-container").innerHTML = ""
                document.querySelector(".gived-answer-container").innerHTML = ""

                const submitQuestion = document.querySelector(".a-seller-bottom button");

                submitQuestion.addEventListener("click", () => {
                    let qInput = document.querySelector(".a-seller-mid input");
                    let userQ = qInput.value;

                    let questions = JSON.parse(localStorage.getItem("Question")) || [];

                    questions.push({
                        content: userQ,
                    });

                    localStorage.setItem("Question", JSON.stringify(questions));

                    const question = document.createElement("div");
                    question.classList.add("asked-question");

                    question.innerHTML = `
                        <h5>Soru</h5>
                        <div class="asked-questions">
                            ${userQ}
                        </div>
                    `;

                    document.querySelector(".asked-question-container").appendChild(question);

                    qInput.value = ""; 
                });

                let likeButton = document.querySelector(".like")
                let likeNumber = document.querySelector(".like-number")
                let liked = false
                let disliked = false;
                
                likeButton.addEventListener("click",()=>{
                    if (!liked && !disliked){
                        likeNumber.textContent++;
                        liked = true
                    }
                    else{
                        return
                    }
                })

                let dislikeButton = document.querySelector(".dislike")
                let dislikeNumber = document.querySelector(".dislike-number")
                
                dislikeButton.addEventListener("click",()=>{
                    if(liked || disliked){
                        return
                        
                    }

                    else{
                        dislikeNumber.textContent++;
                        disliked = true
                    }
                })

            }

            if(e.target.textContent === "Kredikartı Taksitleri"){
                creditCard.innerHTML = `
                <div class="credit-cart-title">
                <img src="icons/credit-cart.png">
                <div class="">
                    <p class="kk">Kredi Kartı</p>
                    <p class="py">Peşin fiyatına 3 x <span> 863 TL</span></p>
                </div>
            </div>
            <div class="credit-cart-warning">
                <img src="icons/info.png">
                <p>Peşin fiyatına 9 taksit seçeneği, Premium üyelere ve Premium Worldcard ödemelerine özeldir.</p>
            </div>
            <div class="credit-cart-installment">
                <div class="credit-cart-item">
                    <div class="top">
                        <img src="images/yapı-kredi.png">
                    </div>
                    <div class="bottom">
                        <table>
                            <tr>
                                <th>Taksit</th>
                                <th>Aylık Tutar</th>
                                <th>Toplam Tutar</th>
                            </tr>
                            <tr>
                                <td>2 taksit</td>
                                <td>1.295,00 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>3 taksit</td>
                                <td>863,33 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>6 taksit</td>
                                <td>530,09 TL</td>
                                <td>3.180,52 TL</td>
                            </tr>
                            <tr>
                                <td>9 taksit</td>
                                <td>382,74 TL</td>
                                <td>3.444,70 TL</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="credit-cart-item">
                    <div class="top">
                        <img src="images/yapı-kredi.png">
                    </div>
                    <div class="bottom">
                        <table>
                            <tr>
                                <th>Taksit</th>
                                <th>Aylık Tutar</th>
                                <th>Toplam Tutar</th>
                            </tr>
                            <tr>
                                <td>2 taksit</td>
                                <td>1.295,00 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>3 taksit</td>
                                <td>863,33 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>6 taksit</td>
                                <td>530,09 TL</td>
                                <td>3.180,52 TL</td>
                            </tr>
                            <tr>
                                <td>9 taksit</td>
                                <td>382,74 TL</td>
                                <td>3.444,70 TL</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="credit-cart-item">
                    <div class="top">
                        <img src="images/kuveyt.png">
                    </div>
                    <div class="bottom">
                        <table>
                            <tr>
                                <th>Taksit</th>
                                <th>Aylık Tutar</th>
                                <th>Toplam Tutar</th>
                            </tr>
                            <tr>
                                <td>2 taksit</td>
                                <td>1.295,00 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>3 taksit</td>
                                <td>863,33 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>6 taksit</td>
                                <td>471,38 TL</td>
                                <td>2.828,28 TL</td>
                            </tr>
                            <tr>
                                <td>9 taksit</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </table>
                        
                    </div>
                </div>
                <div class="credit-cart-item">
                    <div class="top">
                        <img src="images/indir.png">
                    </div>
                    <div class="bottom">
                        <table>
                            <tr>
                                <th>Taksit</th>
                                <th>Aylık Tutar</th>
                                <th>Toplam Tutar</th>
                            </tr>
                            <tr>
                                <td>2 taksit</td>
                                <td>1.295,00 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>3 taksit</td>
                                <td>863,33 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>6 taksit</td>
                                <td>473,11 TL</td>
                                <td>2.838,64 TL</td>
                            </tr>
                            <tr>
                                <td>9 taksit</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="credit-cart-item">
                    <div class="top">
                        <img src="images/paraf.png">
                    </div>
                    <div class="bottom">
                        <table>
                            <tr>
                                <th>Taksit</th>
                                <th>Aylık Tutar</th>
                                <th>Toplam Tutar</th>
                            </tr>
                            <tr>
                                <td>2 taksit</td>
                                <td>1.295,00 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>3 taksit</td>
                                <td>863,33 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>6 taksit</td>
                                <td>480,36 TL</td>
                                <td>2.882,15 TL</td>
                            </tr>
                            <tr>
                                <td>9 taksit</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="credit-cart-item">
                    <div class="top">
                        <img src="images/maximum.png">
                    </div>
                    <div class="bottom">
                        <table>
                            <tr>
                                <th>Taksit</th>
                                <th>Aylık Tutar</th>
                                <th>Toplam Tutar</th>
                            </tr>
                            <tr>
                                <td>2 taksit</td>
                                <td>1.429,55 TL</td>
                                <td>2.859,10 TL</td>
                            </tr>
                            <tr>
                                <td>3 taksit</td>
                                <td>977,64 TL</td>
                                <td>2.932,92 TL</td>
                            </tr>
                            <tr>
                                <td>6 taksit</td>
                                <td>526,63 TL</td>
                                <td>3.159,80 TL</td>
                            </tr>
                            <tr>
                                <td>9 taksit</td>
                                <td>380,73 TL</td>
                                <td>3.426,57 TL</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="credit-cart-item">
                    <div class="top">
                        <img src="images/qnb.png">
                    </div>
                    <div class="bottom">
                        <table>
                            <tr>
                                <th>Taksit</th>
                                <th>Aylık Tutar</th>
                                <th>Toplam Tutar</th>
                            </tr>
                            <tr>
                                <td>2 taksit</td>
                                <td>1.295,00 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>3 taksit</td>
                                <td>863,33 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>6 taksit</td>
                                <td>507,86 TL</td>
                                <td>3.047,14 TL</td>
                            </tr>
                            <tr>
                                <td>9 taksit</td>
                                <td>363,18 TL</td>
                                <td>3.268,58 TL</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="credit-cart-item">
                    <div class="top">
                        <img src="images/advantage.png">
                    </div>
                    <div class="bottom">
                          <table>
                            <tr>
                                <th>Taksit</th>
                                <th>Aylık Tutar</th>
                                <th>Toplam Tutar</th>
                            </tr>
                            <tr>
                                <td>2 taksit</td>
                                <td>1.295,00 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>3 taksit</td>
                                <td>863,33 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>6 taksit</td>
                                <td>507,86 TL</td>
                                <td>3.047,14 TL</td>
                            </tr>
                            <tr>
                                <td>9 taksit</td>
                                <td>363,18 TL</td>
                                <td>3.268,58 TL</td>
                            </tr>
                        </table>
                    </div>

                </div>
                <div class="credit-cart-item">
                    <div class="top">
                        <img src="images/ziraat.png">
                    </div>
                    <div class="bottom">
                          <table>
                            <tr>
                                <th>Taksit</th>
                                <th>Aylık Tutar</th>
                                <th>Toplam Tutar</th>
                            </tr>
                            <tr>
                                <td>2 taksit</td>
                                <td>1.295,00 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>3 taksit</td>
                                <td>968,66 TL</td>
                                <td>2.905,98 TL</td>
                            </tr>
                            <tr>
                                <td>6 taksit</td>
                                <td>528,15 TL</td>
                                <td>3.168,87 TL</td>
                            </tr>
                            <tr>
                                <td>9 taksit</td>
                                <td>361,59 TL</td>
                                <td>3.254,34 TL</td>
                            </tr>
                        </table>
                    </div>

                </div>
                <div class="credit-cart-item">
                    <div class="top">
                        <img src="images/bonus-card.jpg">
                    </div>
                    <div class="bottom">
                        <table>
                            <tr>
                                <th>Taksit</th>
                                <th>Aylık Tutar</th>
                                <th>Toplam Tutar</th>
                            </tr>
                            <tr>
                                <td>2 taksit</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>3 taksit</td>
                                <td>863,33 TL</td>
                                <td>2.590,00 TL</td>
                            </tr>
                            <tr>
                                <td>6 taksit</td>
                                <td>532,25 TL</td>
                                <td>3.193,47 TL</td>
                            </tr>
                            <tr>
                                <td>9 taksit</td>
                                <td>383,61 TL</td>
                                <td>3.452,47 TL</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="important-info">
                <h3>Önemli Bilgiler</h3>
                <ul>
                    <li><p>Yapı Kredi Bankası için vade tutarları ortalama değerlerdir, ödeme adımında değişkenlik gösterebilir.</p></li>
                    <li><p>Kredi kartı ile peşin fiyatına yapılabilecek en yüksek taksit sayısı, ürün kategorilerine ilişkin yasal sınırlamalara ve sepet tutarı üzerinden ilgili banka tarafından sunulan taksit seçeneklerine göre değişiklik gösterebilir.</p></li>
                    <li><p>Bazı vade tutarları ortalama değerlerdir, ödeme adımında ürünlerin KDV’lerinin farklılıklarından dolayı değişkenlik gösterebilir.</p></li>
                    <li><p>Vade tutarları, ödeme adımında satıcı bazlı değişkenlik gösterebilir.</p></li>
                    <li><p>Güncel taksit baremlerine buradan ulaşabilirsiniz.</p></li>
                </ul>
            </div>
                
                `;
            }
        })
}

//CATEGORY PAGE//
if(document.body.className==="cap"){
    
    let returnHome = document.querySelector(".return-home")

    let URL = new URLSearchParams(window.location.search);
    let productCategory = URL.get("category")
    let cateProduct = document.querySelector(".en-container");

    let cateNameContainer = document.querySelector(".cate-name-left")
    let cateName = cateNameContainer.querySelector("h1")

    let productNumber = document.querySelector(".product-number");
    

    returnHome.addEventListener("click",()=>{
        window.location.href = "index.html";
    })

    const brandSliderContainer = document.querySelector(".b-slider");
    const backButton = brandSliderContainer.querySelector(".back-button button");
    const forwardButton = brandSliderContainer.querySelector(".forward-button button")
    const brandSlider = document.querySelector(".s-items")
    brandSlider.innerHTML = ""
    const brandFilter = document.querySelector(".brand-filter")
    brandFilter.innerHTML = ""
    const filter = document.querySelector(".p-filter-left")
    const colorFilter = document.querySelector(".color-filter")
    const filterItem = document.querySelectorAll(".with-sale")

    const colorMap = new Map([
        ["Siyah","#000000"],
        ["Gri","#9b9b9b"],
        ["Krem","#ffccaf"],
        ["Kahverengi","#690000"],
        ["Kırmızı","#ed242c"],
        ["Yeşil","#5ad363"],
        ["Mavi","#53bfe6"],
        ["Sarı","#f3a027"],
        ["Turuncu","#ff6000"],
        ["Beyaz","#ffffff"],
        ["Turkuaz","#00CED1"],
        ["Bordo","#8B0000"],
        ["Lacivert","#00008B"]
    ]);
    
    fetch("product.json")
        .then(res => res.json())
        .then(data => {
            cateProduct.innerHTML = "";

            data.products.forEach(item => {
                
                if (item.category.includes(productCategory)) {

                    cateName.textContent = `${productCategory}`;

                    cateProduct.innerHTML += `
                    <div class="p-product-container">
                        <div class="top">
                            <img src="${item.image}">
                            <p class="product-d">${item.name}</p>
                            <div class="all-ratings">
                                <img class="star" src="icons/star.png">
                                <p class="rating">${item.score}</p>
                            </div>
                        </div>
                        <div class="bottom">
                            <p class="p-cost">${item.price}<span> TL</span></p>
                            <img src="icons/black-shopping-cart.png">
                        </div>
                    </div>
                    `;
                }

            });

            data.categories.forEach(item=>{
                if(item.name === productCategory.trim()){
                    item.brands.forEach(brand=>{
  
                        brandSlider.innerHTML += `
                            <a>${brand}</a>
                        `;

                        brandFilter.innerHTML += `
                            <div class="brand-item">
                                <input type="checkbox">
                                <p>${brand}</p>
                            </div>
                        `;
                    })

                    item.size.forEach(size=>{
                        document.querySelector(".size-menu").innerHTML += `
                            <div class = "size-menu-item">
                                <input type = "checkbox">
                                <a>${size}</a>
                            </div>
                        `;
                    })

                    item.color.forEach(color=>{
                        document.querySelector(".color-menu").innerHTML += `
                            <div class = "color-menu-item">
                                <input type = "checkbox">
                                <div class = "display-color">
                                </div>
                                <a>${color}</a>
                            </div>
                        `; 
                    })

                    

                    item.material.forEach(material=>{
                        
                    })

                    

                    item.style.forEach(type=>{
                        document.querySelector(".product-variety-menu").innerHTML += `
                            <div class = "product-variety-menu-item">
                                <input type = "checkbox">
                                <a>${type}</a>
                            </div>
                        `; 
                    })
                    
                }
            })

            let colorDisplayer = document.querySelectorAll(".color-menu-item a");
            let colorShow = document.querySelectorAll(".display-color");

            colorDisplayer.forEach((item, index) => {
                let color = colorMap.get(item.textContent);
                colorShow[index].style.backgroundColor = color;
            });

            let p = document.querySelectorAll(".en-container .p-product-container")
            let pNumber = p.length;
            productNumber.textContent = `(${pNumber} Ürün)`

            let brandText = document.querySelectorAll(".brand-item")
            brandText.forEach(item=>{
                item.addEventListener("click",()=>{
                    console.log(item.textContent.trim())
                })
            })
        });

        backButton.addEventListener("click",()=>{
            brandSlider.scrollBy(-700,0)
        })

        forwardButton.addEventListener("click",()=>{
            brandSlider.scrollBy(700,0)
        })

}

//BUY//
if(document.body.className.includes("buy")){
    let pro = JSON.parse(localStorage.getItem("Products")) || [];
    let buyedItemContainer = document.querySelector(".item-container")
    let totalPrice = document.querySelector(".pay-cost")
    let addAdressButton = document.querySelector(".add-adress button")
    let adressInput = document.querySelector(".adress-input-area")
    let productPrice = document.querySelector(".pay-bottom-price");
   

    buyedItemContainer.innerHTML = ""

    pro.forEach(item=>{
        buyedItemContainer.innerHTML += `
            <div class="buyed-item">
                <div class="buyed-item-top">
                    <img src="${item.photo}" alt="">
                    <p class="buyed-item-name">${item.name}</p>
                </div>
                <div class="buyed-item-bottom">
                    <p class="st">Standart Teslimat</p>
                    <p class="tat">
                        Tahmini teslim
                        <b>18 Nisan</b>
                    </p>
                </div>
            </div>
        `
        let overallCost = 0;

        pro.forEach(item=>{
            overallCost += parseInt(item.price) * parseInt(item.quantity);  
        })

        totalPrice.textContent = overallCost+100 + " TL"
        productPrice.textContent = overallCost + " TL"

    })

    addAdressButton.addEventListener("click",()=>{
        adressInput.style.display = "block"
    })

    adressInput.addEventListener("click",(e)=>{
        
        if(e.target.className === "cancel-adress-input"){
            adressInput.style.display = "none"
        }

        if(e.target.className === "save-adress"){
            let nameInput = document.querySelector(".buy-name")
            let surnameInput = document.querySelector(".buy-surname")
            let telInput = document.querySelector(".buy-tel")
            let adressInput = document.querySelector(".buy-adress")
            let cityInput = document.querySelector("#cites")
            let adressNameInput = document.querySelector(".adress-name")
            let neighbourhoodInput = document.querySelector(".neighbourhood-name")
            let districtInput = document.querySelector(".district-name")

            let name = nameInput.value;
            let surname = surnameInput.value;
            let tel = telInput.value;
            let adress = adressInput.value;
            let city = cityInput.value
            let adressName = adressNameInput.value;
            let neighbourhood = neighbourhoodInput.value
            let district = districtInput.value

            let userAdress = {
                name: name,
                surname: surname,
                tel: tel,
                adress: adress,
                city:city,
                adressName: adressName,
                neighbourhood:neighbourhood,
                district:district
            };

            localStorage.setItem("Adresses", JSON.stringify(userAdress));
            window.location.reload();
        }
    })

    let userAdress = JSON.parse(localStorage.getItem("Adresses"));

    if (userAdress) {
        let addedAdress = document.createElement("div");
        addedAdress.className = "added-adress-container";

        addedAdress.innerHTML = `
            <div class="added-adress-top">
                <div class="added-adress-top-left">
                    ${userAdress.city} / ${userAdress.district}
                </div>
                <div class="added-adress-top-right">
                    Ekle / Değiştir
                </div>
            </div>
            <div class="added-adress-bottom">
                ${userAdress.adressName}
            </div>
        `;
        document.querySelector(".add-adress").appendChild(addedAdress);
        document.querySelector(".add-adress button").remove()

        let bill = document.createElement("div")
        bill.className = "add-bill-container"
            bill.innerHTML = `
                <p>
                Fatura bilgilerim:
                <span>${userAdress.city} / ${userAdress.district}<span>
                <p> 
            `;

        document.querySelector(".add-adress").appendChild(bill);

    }
    
    let editPage = document.querySelector(".edit-adress")
    let edit = document.querySelector(".added-adress-top-right");
    let editLink = document.querySelector(".edit-adress-right")
    let hiddenEdit = document.querySelector(".hidden-edit")
    let building = document.querySelector(".edit-adress-left .building")
    let location = document.querySelector(".edit-adress-left .loc")

    building.textContent = userAdress.adressName;
    location.textContent = userAdress.city + " / " + userAdress.district

    let cardPage = document.querySelector(".card-input")
    let contract = document.querySelector(".w-contract")

    let finish = document.querySelector(".finish-shopping")

    let cardNumber = document.querySelector(".card-number");
    let cardYear = document.querySelector(".card-year");
    let cardCVV = document.querySelector(".card-cvv");
    let nameSurname = document.querySelector(".name-surname")


    let openCardPage = document.querySelector(".add-card");
    openCardPage.addEventListener("click",()=>{
        cardPage.style.display = "block"
    })

    cardPage.addEventListener("click",(e)=>{
        if(e.target.className === "close-card-input"){
            cardPage.style.display = "none"
        }

        if(e.target.className === "finish-shopping"){
            if(!contract.checked){
                
                let notChecked = document.createElement("div");
                notChecked.className = "checked-error"

                notChecked.innerHTML = `
                    <p>Hepsipay Cüzdan Sözleşmesi’ni kabul etmelisiniz.</p>
                `;

                document.querySelector(".card-input-mid").appendChild(notChecked);
            }
            else{
                
                let userCard = {
                    number: cardNumber.value,
                    year: cardYear.value,
                    CVV: cardCVV.value,
                    name: nameSurname.value,
                };

                localStorage.setItem("Card", JSON.stringify(userCard));
                
                let card = JSON.parse(localStorage.getItem("Card"))

                let cardContainer = document.querySelector(".card-credit")
                cardContainer.innerHTML = ""
                cardContainer.innerHTML = `
                    <div class = "credit-card">
                        <div class = "credit-top">
                            <p>${card.number}</p>
                            <a>Ekle / Değiştir</a>
                        </div>
                        <div class = "credit-bottom">
                            <p>${card.name}</p>
                        </div>
                    </div>
                `;

            }  
        }  
    })

    let buy = document.querySelector(".confirm-buy")
    let shoppingSuccess = document.querySelector(".shopping-success")

    buy.addEventListener("click",()=>{
        let cardContainer = document.querySelector(".credit-card")
        let adressContainer = document.querySelector(".added-adress-container")
        
        if(cardContainer && adressContainer){
            shoppingSuccess.style.display = "flex"
            localStorage.removeItem("Products")

            setInterval(()=>{
                window.location.href = "index.html"
            },3000)
        }

        else{
            return
        }
    })

    shoppingSuccess.addEventListener("click",(e)=>{
        if(e.target.className === "close-shopping"){
            shoppingSuccess.style.display = "none"
        }
    })

    
    edit.addEventListener("click",()=>{
        editPage.style.display = "block"
    })

    editPage.addEventListener("click",(e)=>{
        
        if(e.target.className === "edit-close"){
            editPage.style.display = "none"
        }

        if(e.target.className === "new-adress"){
            editPage.style.display = "none"
            adressInput.style.display = "block"
        }

        if(e.target.className === "edit-icon"){
            if(hiddenEdit.style.display = "none"){
                hiddenEdit.style.display = "flex"
            }
            else{
                hiddenEdit.style.display = "none"
            }
        }

        if(e.target.className === "hidden-edit"){
            editPage.style.display = "none"
            adressInput.style.display = "block"
        }
    })
}

//CUSTOMER SERVICE
if(document.body.className.includes("csp")){
    let content = document.querySelector(".content")

    let subTitles = document.querySelector(".sub-sections");
    subTitles.addEventListener("click",(e)=>{
        
        const clickedItem = e.target.closest(".sub-section-item");
        
        document.querySelectorAll(".sub-section-item").forEach(item => {
            item.classList.remove("active");
        });

        clickedItem.classList.add("active");
        
        if(e.target.textContent === "İptal / İade ve Diğer Talepler"){
            content.innerHTML = `
                <div class = "sub-cate">
                    <div class = "sub-cate-container">
                        <h3>İptal ve iade talebi</h3>
                        <div class = "sub-cate-item">
                            Kurumsal iade faturası nasıl kesebilirim ?
                        </div>
                        <div class = "sub-cate-item">
                            Ürünümü iptal edebilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            Ürünüm için iade/değişim talebinde nasıl bulunabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            İade/değişim koşulları nelerdir?
                        </div>
                        <div class = "sub-cate-item">
                            Kapında iade nedir?
                        </div>
                        <div class = "sub-cate-item">
                            İade talebimden vazgeçebilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            İptal işlemini geri alabilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            Servis / arıza başvurusunu nasıl yapabilirim?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>İptal ve iade talebi</h3>
                        <div class = "sub-cate-item">
                            Siparişim neden iptal edildi?
                        </div>
                        <div class = "sub-cate-item">
                            Bilgim olmadan ürünüm iptal edilmiş.
                        </div>
                        <div class = "sub-cate-item">
                            İade talebim neden reddedildi?
                        </div>
                        <div class = "sub-cate-item">
                            İade/değişim talebimin durumunu nasıl öğrenebilirim?
                        </div>
                        <div class = "sub-cate-item">
                            İade / iptal ettiğim bir ürünün para iadesi nasıl yapılır?
                        </div>
                        <div class = "sub-cate-item">
                            İade/değişim talebimden vazgeçebilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            Hakem heyeti raporum var. Ne yapmalıyım?
                        </div>
                        <div class = "sub-cate-item">
                            Kargo elime ulaşmadan iadeye düştü.
                        </div>
                        <div class = "sub-cate-item">
                            Hesabıma eksik para iadesi yapıldı.
                        </div>
                        <div class = "sub-cate-item">
                            Taksitle aldığım ürünün geri ödemesi neden taksitle yapılıyor?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Kargo işlemleri</h3>
                        <div class = "sub-cate-item">
                            Kargo firması iade/değişim gönderimi almaya gelmiyor
                        </div>
                        <div class = "sub-cate-item">
                            İade/değişim/arıza talebi için verilen kargo gönderi koduyla ilgili sorun yaşıyorum
                        </div>
                    </div> 
                </div>
            `;
            let titles = document.querySelectorAll(".sub-cate-item")
            let q = document.querySelector(".chat-answer")
            let chat = document.querySelector(".chat")
            titles.forEach(item => {
                item.addEventListener("click",(e)=>{
                    chat.style.display = "flex";
                    q.textContent = e.target.textContent;
                })
            })

            let closeChat = document.querySelector(".close-chat")
            let confirmClose = document.querySelector(".confirm-close")
            
            closeChat.addEventListener("click",()=>{
                confirmClose.style.display = "flex";
            })

            confirmClose.addEventListener("click",(e)=>{
                if(e.target.className === "yes-close"){
                    confirmClose.style.display = "none";
                    chat.style.display = "none";

                }

                if(e.target.className === "no-cancel"){
                    confirmClose.style.display = "none";
                }
            })
        }

        if(e.target.textContent === "Teslimat ve kargo"){
            content.innerHTML = `
                <div class = "sub-cate">
                    <div class = "sub-cate-container">
                        <h3>Kargo Takibi</h3>
                        <div class = "sub-cate-item">
                            Ürünüm ne zaman kargoya verilir?
                        </div>
                        <div class = "sub-cate-item">
                            Kargom ne zaman gelir?
                        </div>
                        <div class = "sub-cate-item">
                            Kargom bana ulaşmadı ancak teslim edildi görünüyor
                        </div>
                        <div class = "sub-cate-item">
                            Siparişim geldi ancak teslim edildi görünmüyor.
                        </div>
                        <div class = "sub-cate-item">
                            Teslimat adresimi değiştirebilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            Kargo takip numaramı nasıl görüntüleyebilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Siparişimi nasıl takip edebilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Kargo şirketi kapıya teslim yapmıyor.
                        </div>
                        <div class = "sub-cate-item">
                            Bugün kapında olarak verdiğim siparişim aynı gün içerisinde neden teslim edilmedi?
                        </div>
                        <div class = "sub-cate-item">
                            Ürünümün teslimatı yanlış adrese / kişiye yapılmış.
                        </div>
                        <div class = "sub-cate-item">
                            Kargo teslimat adresinde beni bulamazsa ne olur?
                        </div>
                        <div class = "sub-cate-item">
                            Adresime kargo dağıtımı yapılıyor mu?
                        </div>
                        <div class = "sub-cate-item">
                            Kargomu teslim alırken nelere dikkat etmeliyim?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Eksik / hatalı teslimat</h3>
                        <div class = "sub-cate-item">
                            İptal edildi/Teslim edilemedi görünen ürün teslim edildi
                        </div>
                        <div class = "sub-cate-item">
                            Siparişimde eksik ürün var.
                        </div>
                        <div class = "sub-cate-item">
                            Ürünüm hasarlı olarak geldi.
                        </div>
                        <div class = "sub-cate-item">
                            Sipariş ettiğim ürün yerine farklı bir ürün geldi.
                        </div>
                        <div class = "sub-cate-item">
                            Ürünün aparatı / aksesuarı eksik.
                        </div>
                        <div class = "sub-cate-item">
                            Satın aldığım ürünün orijinal olmadığını düşünüyorum, ne yapmalıyım?
                        </div>
                        <div class = "sub-cate-item">
                            Hediye ürünüm gelmedi, ne yapmalıyım?
                        </div>
                        <div class = "sub-cate-item">
                            Fazla ürün gönderilmiş, iade etmek istiyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Fazla ürün gönderilmiş, parasını ödemek istiyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Kullanılmış ürün gönderilmiş.
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Teslimat seçenekleri</h3>
                        <div class = "sub-cate-item">
                           Gecikme telafisi hakkında bilgi almak istiyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Teslimat tarihini değiştirebilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                           Siparişim belli bir saat aralığı / tarihte teslim edilebilir mi?
                        </div>
                        <div class = "sub-cate-item">
                            "Hepsimat teslimat noktası" nedir?
                        </div>
                        <div class = "sub-cate-item">
                            Teslimatımı yapacak kargo firmasını değiştirebilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            Yarın kapında nedir?
                        </div>
                        <div class = "sub-cate-item">
                            Randevulu Bugün Kapında / Randevulu Yarın Kapında nedir?
                        </div>
                        <div class = "sub-cate-item">
                            Kargomu şubeden teslim alabilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            Siparişimdeki ürünler farklı adreslere teslim edilebilir mi?
                        </div>
                        <div class = "sub-cate-item">
                            Ayrı siparişlerim aynı kargoyla topluca gönderilebilir mi?
                        </div>
                        <div class = "sub-cate-item">
                            Siparişimdeki ürünler aynı anda teslim edilebilir mi?
                        </div>
                    </div>
                    
                </div>
            `;
            let titles = document.querySelectorAll(".sub-cate-item")
            let q = document.querySelector(".chat-answer")
            let chat = document.querySelector(".chat")
            titles.forEach(item => {
                item.addEventListener("click",(e)=>{
                    chat.style.display = "flex";
                    q.textContent = e.target.textContent;
                })
            })

            let closeChat = document.querySelector(".close-chat")
            let confirmClose = document.querySelector(".confirm-close")
            
            closeChat.addEventListener("click",()=>{
                confirmClose.style.display = "flex";
            })

            confirmClose.addEventListener("click",(e)=>{
                if(e.target.className === "yes-close"){
                    confirmClose.style.display = "none";
                    chat.style.display = "none";

                }

                if(e.target.className === "no-cancel"){
                    confirmClose.style.display = "none";
                }
            })
        }

        if(e.target.textContent === "Sipariş ve ödeme"){
             content.innerHTML = `
                <div class = "sub-cate">
                    <div class = "sub-cate-container">
                        <h3>Sipariş oluşturma</h3>
                        <div class = "sub-cate-item">
                            Nasıl sipariş verebilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Sipariş verirken nelere dikkat etmeliyim?
                        </div>
                        <div class = "sub-cate-item">
                            Sipariş numaramı nasıl öğrenebilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Satın aldığım ürüne hediye paketi yaptırabilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            Sepetime yeni ürün ekleyemiyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Üye olmadan sipariş verebilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            Siparişimi müşteri temsilcisi aracılığıyla verebilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            Siparişimi müşteri temsilcisi aracılığıyla verebilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            Hesabımdan bilgim dışında sipariş oluşturulmuş.
                        </div>
                        <div class = "sub-cate-item">
                            Ön sipariş nedir?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Ödeme</h3>
                        <div class = "sub-cate-item">
                            Ödeme aşamasında "İşleminiz Onaylanmadı."hatası alıyorum
                        </div>
                        <div class = "sub-cate-item">
                            Ödeme aşamasında siparişi onayla butonu çalışmıyor
                        </div>
                        <div class = "sub-cate-item">
                            Ödeme ekranında hata alıyorum, ne yapmalıyım?
                        </div>
                        <div class = "sub-cate-item">
                            Kredi kartımdan çekim yapılmış ancak siparişim görünmüyor.
                        </div>
                        <div class = "sub-cate-item">
                            Sipariş verirken hangi ödeme yöntemlerini kullanabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Kredi kartımdan bilgim dışında çekim yapılmış.
                        </div>
                        <div class = "sub-cate-item">
                            Siparişim neden “Ödeme Bekliyor” durumunda görünüyor?
                        </div>
                        <div class = "sub-cate-item">
                            Kredi kartımdan fazla para çekilmiş.
                        </div>
                        <div class = "sub-cate-item">
                            Sepetimdeki ürünlere neden taksit seçeneği çıkmıyor?
                        </div>
                        <div class = "sub-cate-item">
                            Kredi kartı taksit sayım yanlış görünüyor, ne yapmalıyım?
                        </div>
                        <div class = "sub-cate-item">
                            Alışverişimi sonradan taksitlendirebilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                            Doğrulama kodum gelmiyor, ne yapmalıyım?
                        </div>
                        <div class = "sub-cate-item">
                            Alışveriş kredisi nedir? Nasıl kullanırım?
                        </div>
                        <div class = "sub-cate-item">
                            KDV muafiyetinden nasıl yararlanabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Yanlış kartla ödeme yaptım, nasıl değiştirebilirim?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Fatura</h3>
                        <div class = "sub-cate-item">
                           Faturalarıma nasıl ulaşırım?
                        </div>
                        <div class = "sub-cate-item">
                            Fatura bilgilerimi yanlış girdim. Değişiklik yapabilir miyim?
                        </div>
                        <div class = "sub-cate-item">
                           Faturamda hata var
                        </div>
                        <div class = "sub-cate-item">
                            Faturam gelmedi, sevk irsaliyesi fatura yerine geçer mi?
                        </div>
                        <div class = "sub-cate-item">
                            Faturamın teslim edileceği adresi değiştirmek istiyorum.
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Yurt dişi siparişleri</h3>
                        <div class = "sub-cate-item">
                           Yurt dışına nasıl sipariş verebilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Yurt dışı siparişlerimde gümrükte sorun yaşar mıyım?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Hepsiburada Market ve Su</h3>
                        <div class = "sub-cate-item">
                           Hepsiburada Market ve Su hakkında bilgi almak istiyorum.
                        </div>
                    </div>
                </div>
            `;
            let titles = document.querySelectorAll(".sub-cate-item")
            let q = document.querySelector(".chat-answer")
            let chat = document.querySelector(".chat")
            titles.forEach(item => {
                item.addEventListener("click",(e)=>{
                    chat.style.display = "flex";
                    q.textContent = e.target.textContent;
                })
            })

            let closeChat = document.querySelector(".close-chat")
            let confirmClose = document.querySelector(".confirm-close")
            
            closeChat.addEventListener("click",()=>{
                confirmClose.style.display = "flex";
            })

            confirmClose.addEventListener("click",(e)=>{
                if(e.target.className === "yes-close"){
                    confirmClose.style.display = "none";
                    chat.style.display = "none";

                }

                if(e.target.className === "no-cancel"){
                    confirmClose.style.display = "none";
                }
            })
        }

        if(e.target.textContent === "Hepsipay"){
             content.innerHTML = `
                <div class = "sub-cate">
                    <div class = "sub-cate-container">
                        <h3>Hesap ve Giriş İşlemleri</h3>
                        <div class = "sub-cate-item">
                            Hepsipay kampanya bildirim tercihlerimi nasıl değiştirebilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Hepsipay nedir? Hepsipay'in avantajları nelerdir?
                        </div>
                        <div class = "sub-cate-item">
                            Hepsipay nasıl kullanılır? Nerelerde kullanılır?
                        </div>
                        <div class = "sub-cate-item">
                            Hepsipay'e giriş işleminde sorun yaşıyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Hepsipay'imi nasıl kapatabilirim?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>İptal ve İade</h3>
                        <div class = "sub-cate-item">
                           İptal /iade ettiğim bir ürünün para iadesi Hepsipay hesabıma nasıl aktarılır?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Para Transferi</h3>
                        <div class = "sub-cate-item">
                           Geri Gönderilebilir Bakiye Nedir?
                        </div>
                        <div class = "sub-cate-item">
                            Hepsipay'e nasıl para yükleyebilirim?
                        </div>
                        <div class = "sub-cate-item">
                           Hepsipay ile nasıl para gönderebilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Transfer ettiğim tutar Hepsipay hesabıma geçmedi. Ne yapmalıyım?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Hepsiburada Limiti</h3>
                        <div class = "sub-cate-item">
                           Hepsifinans nedir? Hepsifinans kredisini kimler kullanabilir?
                        </div>
                        <div class = "sub-cate-item">
                            Hepsifinans'a kayıtlı telefon numaramı nasıl değiştirebilirim?
                        </div>
                        <div class = "sub-cate-item">
                           Hepsifinans kredisini nasıl kullanabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Hepsifinans kimlik doğrulama sürecinde nelere dikkat etmeliyim?
                        </div>
                        <div class = "sub-cate-item">
                           Hepsifinans Kredi taksitim için ödeme yaptım ancak kredi tutarımdan düşmedi. Ne yapmalıyım?
                        </div>
                        <div class = "sub-cate-item">
                           Hepsifinans ödemelerimi nasıl yaparım ve nereden takip edebilirim?
                        </div>
                        <div class = "sub-cate-item">
                           Hepsiburada Limiti nedir? Limitimi nasıl öğrenebilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Findeks Nedir? Telefon numaramı doğrulama adımında sorun yaşıyorum.
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Hepsipay Kart</h3>
                        <div class = "sub-cate-item">
                           Hepsipay Kartımı neden kullanamıyorum?
                        </div>
                        <div class = "sub-cate-item">
                           Hepsipay Kart nedir? Avantajları nelerdir?
                        </div>
                        <div class = "sub-cate-item">
                           Hepsipay Kartımı nasıl oluştururum? Nasıl kullanabilirim?
                        </div>
                        <div class = "sub-cate-item">
                           Hepsipay Kart’ı nasıl kapatabilirim?
                        </div>
                    </div>
                </div>
            `;
            let titles = document.querySelectorAll(".sub-cate-item")
            let q = document.querySelector(".chat-answer")
            let chat = document.querySelector(".chat")
            titles.forEach(item => {
                item.addEventListener("click",(e)=>{
                    chat.style.display = "flex";
                    q.textContent = e.target.textContent;
                })
            })

            let closeChat = document.querySelector(".close-chat")
            let confirmClose = document.querySelector(".confirm-close")
            
            closeChat.addEventListener("click",()=>{
                confirmClose.style.display = "flex";
            })

            confirmClose.addEventListener("click",(e)=>{
                if(e.target.className === "yes-close"){
                    confirmClose.style.display = "none";
                    chat.style.display = "none";

                }

                if(e.target.className === "no-cancel"){
                    confirmClose.style.display = "none";
                }
            })
        }

        if(e.target.textContent === "Servis ve teknik destek"){
            content.innerHTML = `
                <div class = "sub-cate">
                    <div class = "sub-cate-container">
                        <h3>Ürün Kurulumu</h3>
                        <div class = "sub-cate-item">
                            Ücretsiz ürün kurulumu nasıl yaptırabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Ücretsiz kurulum için benden ücret talep edildi.
                        </div>
                        <div class = "sub-cate-item">
                            Ürün montajı nasıl yaptırabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Montaj bedeli ödedim ancak kurulum yapılmadı.
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Garanti Belgesi</h3>
                        <div class = "sub-cate-item">
                           Ürünümün garanti belgesi teslim edilmedi.
                        </div>
                        <div class = "sub-cate-item">
                           Ürünümün garanti belgesinin üzerinde kaşe yok / tarih yanlış.
                        </div>
                        <div class = "sub-cate-item">
                           Garanti belgesini kaybettim.
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Servis / arıza başvurusu</h3>
                        <div class = "sub-cate-item">
                           En yakın yetkili servise nasıl ulaşabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Telefonumun IMEI numarası ile ilgili sorun yaşıyorum.
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Servis / arıza takibi</h3>
                        <div class = "sub-cate-item">
                            Ürünün servis durumu hakkında nasıl bilgi alabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Servis / arıza başvuru talebim neden reddedildi?
                        </div>
                        <div class = "sub-cate-item">
                           Servis, değişim / iade raporu vermiyor.
                        </div>
                        <div class = "sub-cate-item">
                            Yetkili servis değişim / iade raporum var. Ne yapmalıyım?
                        </div>
                        <div class = "sub-cate-item">
                            Servise gönderdiğim ürünümün aparatları eksik geldi.
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Hepsiburada Koruma Paketi</h3>
                        <div class = "sub-cate-item">
                           Hepsiburada Koruma Paketi nedir ve neleri kapsar?
                        </div>
                    </div>
                </div>
            `;
            let titles = document.querySelectorAll(".sub-cate-item")
            let q = document.querySelector(".chat-answer")
            let chat = document.querySelector(".chat")
            titles.forEach(item => {
                item.addEventListener("click",(e)=>{
                    chat.style.display = "flex";
                    q.textContent = e.target.textContent;
                })
            })

            let closeChat = document.querySelector(".close-chat")
            let confirmClose = document.querySelector(".confirm-close")
            
            closeChat.addEventListener("click",()=>{
                confirmClose.style.display = "flex";
            })

            confirmClose.addEventListener("click",(e)=>{
                if(e.target.className === "yes-close"){
                    confirmClose.style.display = "none";
                    chat.style.display = "none";

                }

                if(e.target.className === "no-cancel"){
                    confirmClose.style.display = "none";
                }
            })
        }

        if(e.target.textContent === "Üyelik ve hesap"){
             content.innerHTML = `
                <div class = "sub-cate">
                    <div class = "sub-cate-container">
                        <h3>Hesap / giriş işlemleri</h3>
                        <div class = "sub-cate-item">
                            Beni arayan numara Hepsiburada’ya mı ait?
                        </div>
                        <div class = "sub-cate-item">
                            Influencer Projesi hakkında bilgi almak istiyorum
                        </div>
                        <div class = "sub-cate-item">
                            Kişisel verilerime ilişkin başvurularımı nasıl yapabilirim ?
                        </div>
                        <div class = "sub-cate-item">
                            Hepsiburada’ya nasıl üye olabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Müşteri hizmetlerine ulaşmak istiyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Soru, talep ve kayıtlarıma nasıl ulaşabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Mesajlar bölümü nedir, nasıl işlem yapabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Üyelik / giriş işleminde sorun yaşıyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Bana ait olmayan siparişe ait e-posta / sms / bildirim alıyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Hepsiburada üyelik bilgilerimi nasıl değiştirebilirim?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Üyelik iptali</h3>
                        <div class = "sub-cate-item">
                           Hepsiburada üyeliğimi nasıl iptal edebilirim?
                        </div>
                        <div class = "sub-cate-item">
                           Üyeliğim bilgim dışında iptal edilmiş.
                        </div>
                        <div class = "sub-cate-item">
                           İptal olan üyeliğimi yeniden nasıl aktif ederim?
                        </div>
                        <div class = "sub-cate-item">
                           Premium üyeliğimi nasıl iptal edebilirim?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Ürün Yorumlarım</h3>
                        <div class = "sub-cate-item">
                           Yorumum neden yayınlanmadı?
                        </div>
                        <div class = "sub-cate-item">
                            Yorumumu nasıl silebilirim?
                        </div>
                    </div>
                </div>
            `;
            let titles = document.querySelectorAll(".sub-cate-item")
            let q = document.querySelector(".chat-answer")
            let chat = document.querySelector(".chat")
            titles.forEach(item => {
                item.addEventListener("click",(e)=>{
                    chat.style.display = "flex";
                    q.textContent = e.target.textContent;
                })
            })

            let closeChat = document.querySelector(".close-chat")
            let confirmClose = document.querySelector(".confirm-close")
            
            closeChat.addEventListener("click",()=>{
                confirmClose.style.display = "flex";
            })

            confirmClose.addEventListener("click",(e)=>{
                if(e.target.className === "yes-close"){
                    confirmClose.style.display = "none";
                    chat.style.display = "none";

                }

                if(e.target.className === "no-cancel"){
                    confirmClose.style.display = "none";
                }
            })
        }

        if(e.target.textContent === "Ürün bilgisi"){
            content.innerHTML = `
                <div class = "sub-cate">
                    <div class = "sub-cate-container">
                        <h3>Ürün özellikleri / Fiyat</h3>
                        <div class = "sub-cate-item">
                            Bakım Paketi nedir ve nasıl kullanılır? 
                        </div>
                        <div class = "sub-cate-item">
                            Dijital ürün koduma nasıl ulaşabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Ürün özellikleriyle ilgili detaylı bilgiye nereden ulaşabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Ürünler orijinal midir?
                        </div>
                        <div class = "sub-cate-item">
                            Ürünlerin garantisi var mı?
                        </div>
                        <div class = "sub-cate-item">
                            Aradığım ürünü sitede nasıl bulabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Ürünü satın aldıktan sonra fiyatı düştü
                        </div>
                        <div class = "sub-cate-item">
                            Sitede ürün görüntüleme esnasında sorun yaşıyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Hepsiburada satıcılı sıfırdan farksız ürün ne demek?
                        </div>
                        <div class = "sub-cate-item">
                            İncelediğim üründeki bilgilerin hatalı olduğunu düşünüyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Teşhir ürün satılıyor mu?
                        </div>
                    </div>
                </div>
            `;
            let titles = document.querySelectorAll(".sub-cate-item")
            let q = document.querySelector(".chat-answer")
            let chat = document.querySelector(".chat")
            titles.forEach(item => {
                item.addEventListener("click",(e)=>{
                    chat.style.display = "flex";
                    q.textContent = e.target.textContent;
                })
            })

            let closeChat = document.querySelector(".close-chat")
            let confirmClose = document.querySelector(".confirm-close")
            
            closeChat.addEventListener("click",()=>{
                confirmClose.style.display = "flex";
            })

            confirmClose.addEventListener("click",(e)=>{
                if(e.target.className === "yes-close"){
                    confirmClose.style.display = "none";
                    chat.style.display = "none";

                }

                if(e.target.className === "no-cancel"){
                    confirmClose.style.display = "none";
                }
            })
        }

        if(e.target.textContent === "Kampanya ve kuponlar"){
            content.innerHTML = `
                <div class = "sub-cate">
                    <div class = "sub-cate-container">
                        <h3>Kampanya ve Kupon</h3>
                        <div class = "sub-cate-item">
                            Kuponlarımı nasıl kullanabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Hepsiburada kampanyaları hakkında bilgi almak istiyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Peşin fiyatına X taksit nedir? Nasıl yararlanırım?
                        </div>
                        <div class = "sub-cate-item">
                            Efsane Gençlik kampanyasından nasıl yararlanabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Vodafone İşbirliği nedir? Avantajları nelerdir?
                        </div>
                        <div class = "sub-cate-item">
                            Öğrencilere özel vergi iadesi için faturamı nasıl alabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Kargo Bedava kampanyasından nasıl yararlanabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Hediye ürün sepetime neden eklenmedi?
                        </div>
                        <div class = "sub-cate-item">
                            Banka kampanyalarından nasıl yararlanabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Hepsiburada kampanya bildirim tercihlerimi nasıl değiştirebilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Linkgelir kampanyası nedir, nasıl katılabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Vergi iadeli cihaz kampanyasından nasıl yararlanabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Vergi iadeli cihaz iadesi için nasıl başvuru yapabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Çeyiz kampanyasından aldığım kupon kodunu nasıl kullanabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Çeyiz Kampanyası başvuru şartları nelerdir, nasıl başvurabilirim?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Eskiyi yenile</h3>
                        <div class = "sub-cate-item">
                            Eskiyi Yenile nedir, nasıl başvurabilirim?
                        </div>
                    </div>
                </div>
            `;
            let titles = document.querySelectorAll(".sub-cate-item")
            let q = document.querySelector(".chat-answer")
            let chat = document.querySelector(".chat")
            titles.forEach(item => {
                item.addEventListener("click",(e)=>{
                    chat.style.display = "flex";
                    q.textContent = e.target.textContent;
                })
            })

            let closeChat = document.querySelector(".close-chat")
            let confirmClose = document.querySelector(".confirm-close")
            
            closeChat.addEventListener("click",()=>{
                confirmClose.style.display = "flex";
            })

            confirmClose.addEventListener("click",(e)=>{
                if(e.target.className === "yes-close"){
                    confirmClose.style.display = "none";
                    chat.style.display = "none";

                }

                if(e.target.className === "no-cancel"){
                    confirmClose.style.display = "none";
                }
            })
        }

        if(e.target.textContent === "Oyunlar"){
            content.innerHTML = `
                <div class = "sub-cate">
                    <div class = "sub-cate-container">
                        <h3>Çekiliş ve Oyunlar</h3>
                        <div class = "sub-cate-item">
                            Tıkla Kazan oyunu nasıl oynanır?
                        </div>
                        <div class = "sub-cate-item">
                            Kazandıran Çekiliş oyunu nasıl oynanır?
                        </div>
                        <div class = "sub-cate-item">
                            Oynadıkça kazan alanını göremiyorum, oyun oynayamıyorum?
                        </div>
                        <div class = "sub-cate-item">
                            Bil Kazan oyunu nasıl oynanır?
                        </div>
                    </div>
                </div>
            `;
            let titles = document.querySelectorAll(".sub-cate-item")
            let q = document.querySelector(".chat-answer")
            let chat = document.querySelector(".chat")
            titles.forEach(item => {
                item.addEventListener("click",(e)=>{
                    chat.style.display = "flex";
                    q.textContent = e.target.textContent;
                })
            })
            let closeChat = document.querySelector(".close-chat")
            let confirmClose = document.querySelector(".confirm-close")
            
            closeChat.addEventListener("click",()=>{
                confirmClose.style.display = "flex";
            })

            confirmClose.addEventListener("click",(e)=>{
                if(e.target.className === "yes-close"){
                    confirmClose.style.display = "none";
                    chat.style.display = "none";

                }

                if(e.target.className === "no-cancel"){
                    confirmClose.style.display = "none";
                }
            })
        }

        if(e.target.textContent === "Premium"){
            content.innerHTML = `
                <div class = "sub-cate">
                    <div class = "sub-cate-container">
                        <h3>Hepsiburada Premium üyeliği</h3>
                        <div class = "sub-cate-item">
                            Hepsiburada Premium nedir?
                        </div>
                        <div class = "sub-cate-item">
                            Premium aboneliğimi nasıl iptal edebilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Premium faturama/sözleşmeme nasıl ulaşabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Premium'a nasıl üye olabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Premium ücretinin çekildiği kayıtlı kartımı nasıl değiştirebilirim?
                        </div>
                    </div>
                    <div class = "sub-cate-container">
                        <h3>Premium ayrıcalıklar</h3>
                        <div class = "sub-cate-item">
                            Premium Hediye Max Reklamlı üyeliğin avantajları nelerdir?
                        </div>
                        <div class = "sub-cate-item">
                            Premium Hediye Max Reklamlı üyeliğimde sorun yaşıyorum.
                        </div>
                        <div class = "sub-cate-item">
                            Hepsiburada Premium Worldcard nedir, nasıl başvurabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Premium ile Petrol Ofisi yakıt alımlarında 5 kat puan kampanyasından nasıl faydalanabilirim?
                        </div>
                        <div class = "sub-cate-item">
                            Premium Hepsipara kazancı hakkında bilgi almak istiyorum
                        </div>
                        <div class = "sub-cate-item">
                            Premium Hediye Max Reklamlı üyeliğimi nasıl oluşturabilirim? 
                        </div>
                        <div class = "sub-cate-item">
                            Tıkla Gelsin ile BK Steakhouse Menü’de 50 TL indirim kampanyasından nasıl faydalanabilirim?
                        </div>
                    </div>
                </div>
            `;

            let titles = document.querySelectorAll(".sub-cate-item")
            let q = document.querySelector(".chat-answer")
            let chat = document.querySelector(".chat")
            titles.forEach(item => {
                item.addEventListener("click",(e)=>{
                    chat.style.display = "flex";
                    q.textContent = e.target.textContent;
                })
            })
            let closeChat = document.querySelector(".close-chat")
            let confirmClose = document.querySelector(".confirm-close")
            
            closeChat.addEventListener("click",()=>{
                confirmClose.style.display = "flex";
            })

            confirmClose.addEventListener("click",(e)=>{
                if(e.target.className === "yes-close"){
                    confirmClose.style.display = "none";
                    chat.style.display = "none";

                }

                if(e.target.className === "no-cancel"){
                    confirmClose.style.display = "none";
                }
            })
        }

        if(e.target.textContent === "Kurumsal İletişim Bilgileri"){
            content.innerHTML = `
                <div class="contact">
                    <div class="contact-top">
                        <p>
                            İnternette güvenli alışverişin adresi Hepsiburada.com'a 
                            aşağıdaki iletişim adreslerinden kolayca ulaşabilirsiniz.
                        </p>
                    </div>
                    <div class="contact-bottom">
                        <div class="contact-bottom-left">
                            <h3>Hepsiburada Kariyer Olanakları</h3>
                            <p>
                                <a>Linkedin</a> ve <a>Kariyer.net</a> üzerinden güncel iş ilanlarımıza başvurabilirsiniz. 
                            </p>
                            <h3>Şirket Bilgileri</h3>
                            <dl>
                                <dt>Ünvanı</dt>
                                <dd>D-Market Elektronik Hizmetler ve Tic. A.Ş.(Hepsiburada.com)</dd>
                                <dt>Ticari Sicil Numarası</dt>
                                <dd>436165</dd>
                                <dt>Mersis Numarası</dt>
                                <dd>0265017991000011</dd>
                                <dt>Genel Müdürlük</dt>
                                <dd>Kuştepe Mah. Mecidiyeköy Yolu Cad. Trump Towers Kule 2 Kat:2 No:12 34387 Şişli/İstanbul</dd>
                                <dt>Operasyon Merkezi</dt>
                                <dd>İnönü Mah. Mimar Sinan Cad. No: 3 Gebze Güzeller OSB Gebze/Kocaeli</dd>
                                <dt>Yer Sağlayıcı</dt>
                                <dd>
                                    D-Market Elektronik Hizmetler ve Tic. A.Ş.
                                    <b>Sorumlu Kişi:</b> 
                                    Kemal Erişen
                                </dd>
                                <dt>Kayıtlı Elektronik Posta Adresi</dt>
                                <dd>dmarket@hs02.kep.tr</dd>
                                <dt>Telefon</dt>
                                <dd>
                                    Müşteri Destek Hattı - 0850 252 40 00
                                    <br>
                                    (Haftanın her günü 08:00 - 00:00 saatleri arasında çalışır.)
                                    <br>
                                    Satıcı Destek Hattı - 0850 214 09 15
                                    <br>
                                    (Hafta içi 08.00 - 21.00 &amp; Cumartesi - Pazar 09.00 – 18.30 saatleri arasında çalışır.)
                                </dd>
                                <dt>Tescilli Marka Adı</dt>
                                <dd>Hepsiburada</dd>
                            </dl>
                            <p>
                                Üyesi olduğumuz İstanbul Ticaret Odası’nın üyeleri için geçerli davranış kurallarına 
                                <a> www.ito.org.tr</a>
                                adresinden ulaşılabilir
                            </p>
                        </div>
                    <div class="contact-bottom-right">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6016.163102920822!2d28.991192!3d41.06721!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2sus!4v1775040464609!5m2!1str!2sus" width="350" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div> 
            `;
        }  
    })
}

//OFFERS PAGE//
if(document.body.className.includes("op")){
    let productGrid = document.querySelector(".product-grid");
    let offerCate = document.querySelector(".product-category-links");
    productGrid.innerHTML = ""
    
    fetch("product.json")
        .then(res=>res.json())
        .then(data=>{
            productGrid.innerHTML = ""
            data.products.forEach(item=>{

                productGrid.innerHTML += `
                    <div class="product">
                        <div class="left">
                            <img src="${item.image}">
                        </div>
                        <div class="right">
                            <div class="right-top">
                                <p class="product-name">${item.name}</p>
                                <p class="kupon">300 TL'ye 100 TL Kupon !!</p>
                            </div>
                            <div class="bottom">
                                <p>Kampanyalı ürünleri keşfet</p>
                            </div>
                        </div>
                    </div>
                `;
            })

            let explore = document.querySelectorAll(".product")
            explore.forEach(item=>{
                item.addEventListener("click",(e)=>{
                    window.location.href = `category.html`
                })
            })
        })

    offerCate.addEventListener("click",(e)=>{

        const clickedItem = e.target.closest(".ca-li");
        
        document.querySelectorAll(".ca-li").forEach(item => {
            item.classList.remove("clicked");
        });

        clickedItem.classList.add("clicked");

        if(e.target.textContent === "Tümü"){
            fetch("product.json")
                .then(res=>res.json())
                .then(data=>{

                productGrid.innerHTML = ""
                data.products.forEach(item=>{

                    productGrid.innerHTML += `
                        <div class="product">
                            <div class="left">
                                <img src="${item.image}">
                            </div>
                            <div class="right">
                                <div class="right-top">
                                    <p class="product-name">${item.name}</p>
                                    <p class="kupon">300 TL'ye 100 TL Kupon !!</p>
                                </div>
                                <div class="bottom">
                                    <p>Kampanyalı ürünleri keşfet</p>
                                </div>
                            </div>
                        </div>
                    `;
                
            })
        })
        }

        else{
            fetch("product.json")
                .then(res=>res.json())
                .then(data=>{

            productGrid.innerHTML = ""
            data.products.forEach(item=>{
                if(item.category.includes(e.target.textContent)){
                    productGrid.innerHTML += `
                        <div class="product">
                            <div class="left">
                                <img src="${item.image}">
                            </div>
                            <div class="right">
                                <div class="right-top">
                                    <p class="product-name">${item.name}</p>
                                    <p class="kupon">300 TL'ye 100 TL Kupon !!</p>
                                </div>
                                <div class="bottom">
                                    <p>Kampanyalı ürünleri keşfet</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
            })
        })
        }
    })

    let searchInput = document.querySelector(".search-offer-product");
    searchInput.addEventListener("input",()=>{
        fetch("product.json")
                .then(res=>res.json())
                .then(data=>{

            productGrid.innerHTML = ""
            data.products.forEach(item=>{
                if(item.name.toLowerCase().includes(searchInput.value.toLowerCase())){
                    productGrid.innerHTML += `
                        <div class="product">
                            <div class="left">
                                <img src="${item.image}">
                            </div>
                            <div class="right">
                                <div class="right-top">
                                    <p class="product-name">${item.name}</p>
                                    <p class="kupon">300 TL'ye 100 TL Kupon !!</p>
                                </div>
                                <div class="bottom">
                                    <p>Kampanyalı ürünleri keşfet</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
            })
        })
    })

    let back = document.querySelector(".ca-li-back")
    let forward = document.querySelector(".ca-li-forward")
    
    back.addEventListener("click",()=>{
         offerCate.scrollBy({
            left: -250,
            top: 0,
            behavior: "smooth"
        });
    })

    forward.addEventListener("click",()=>{
        offerCate.scrollBy({
            left: 250,
            top: 0,
            behavior: "smooth"
        });
    })

    document.querySelector(".hepsi-burada").addEventListener("click",()=>{
        window.location.href = "index.html"
    })
}

//SUPER PRICE//
if(document.body.className === "sp"){
    let productGrid = document.querySelector(".product-grid");
    let searchInput = document.querySelector(".search-offer-product")
    productGrid.innerHTML = "";
    let addedInfo = document.querySelector(".added-info")

    fetch("product.json")
        .then(res => res.json())
        .then(data => {
            data.products.forEach(item=>{
                productGrid.innerHTML += `
                    <div class="product">
                        <div class="left">
                            <img src=${item.image}>
                        </div>
                        <div class="right">
                            <div class="right-top">
                                <p class="product-name">${item.name}</p>
                                <div class="all-ratings">
                                    <img class="star" src="icons/star.png">
                                    <p class="rating">${item.score}<span>${item.comment}</span></p>
                                </div>
                                <div class="peşin">
                                    <p>Peşin fiyatına taksit</p>
                                </div>
                            </div>
                            <div class="bottom">
                                <p class="p-cost">${item.price}<span> TL</span></p>
                                <img class = "add-to-basket" src="icons/black-shopping-cart.png">
                            </div>
                        </div>
                    </div>
                `;
            })

            let products = document.querySelectorAll(".right-top");
            products.forEach((item,index)=>{
                item.addEventListener("click",()=>{
                    window.location.href = `product-detail.html?id=${index}`
                })
            })

            let shoppingCard = document.querySelectorAll(".add-to-basket")
            let addedInfo = document.querySelector(".added-info")
            
            shoppingCard.forEach(item=>{
                item.addEventListener("click",function(){
                    const productName = this.closest(".product").querySelector(".product-name").textContent;
                    const productRating = this.closest(".product").querySelector(".rating").textContent;
                    const productPrice = this.closest(".product").querySelector(".p-cost").textContent;
                    const productImage = this.closest(".product").querySelector(".left img").src;
                    const productBottom = this.closest(".product").querySelector(".bottom")
                   
                    let products = JSON.parse(localStorage.getItem("Products")) || [];

                    products.push({
                        name: productName,
                        rating: productRating,
                        price: productPrice,
                        photo: productImage,
                        quantity:1
                    });

                    localStorage.setItem("Products", JSON.stringify(products));
                    addedInfo.style.visibility = "visible";

                    setTimeout(()=>{
                        addedInfo.style.visibility = "hidden"
                    },3000)
                })
            })
        })
 
        let offerCate = document.querySelector(".product-category-links");

        offerCate.addEventListener("click",(e)=>{

        const clickedItem = e.target.closest(".ca-li");
        
        document.querySelectorAll(".ca-li").forEach(item => {
            item.classList.remove("clicked");
        });

        clickedItem.classList.add("clicked");

        if(e.target.textContent === "Tümü"){
            fetch("product.json")
                .then(res=>res.json())
                .then(data=>{

                productGrid.innerHTML = ""
                data.products.forEach(item=>{

                    productGrid.innerHTML += `
                        <div class="product">
                        <div class="left">
                            <img src=${item.image}>
                        </div>
                        <div class="right">
                            <div class="right-top">
                                <p class="product-name">${item.name}</p>
                                <div class="all-ratings">
                                    <img class="star" src="icons/star.png">
                                    <p class="rating">${item.score}<span>${item.comment}</span></p>
                                </div>
                                <div class="peşin">
                                    <p>Peşin fiyatına taksit</p>
                                </div>
                            </div>
                            <div class="bottom">
                                <p class="p-cost">${item.price}<span> TL</span></p>
                                <img class = "add-to-basket" src="icons/black-shopping-cart.png">
                            </div>
                        </div>
                    </div>
                    `;
                
            })
        })
        }

        else{
            fetch("product.json")
                .then(res=>res.json())
                .then(data=>{

            productGrid.innerHTML = ""
            data.products.forEach(item=>{
                if(item.category.includes(e.target.textContent)){
                    productGrid.innerHTML += `
                        <div class="product">
                        <div class="left">
                            <img src=${item.image}>
                        </div>
                        <div class="right">
                            <div class="right-top">
                                <p class="product-name">${item.name}</p>
                                <div class="all-ratings">
                                    <img class="star" src="icons/star.png">
                                    <p class="rating">${item.score}<span>${item.comment}</span></p>
                                </div>
                                <div class="peşin">
                                    <p>Peşin fiyatına taksit</p>
                                </div>
                            </div>
                            <div class="bottom">
                                <p class="p-cost">${item.price}<span> TL</span></p>
                                <img class = "add-to-basket" src="icons/black-shopping-cart.png">
                            </div>
                        </div>
                    </div>
                    `;
                }
            })
        })
        }
    })

    searchInput.addEventListener("input",()=>{
        fetch("product.json")
                .then(res=>res.json())
                .then(data=>{

            productGrid.innerHTML = ""
            data.products.forEach(item=>{
                if(item.name.toLowerCase().includes(searchInput.value.toLowerCase())){
                    productGrid.innerHTML += `
                        <div class="product">
                        <div class="left">
                            <img src=${item.image}>
                        </div>
                        <div class="right">
                            <div class="right-top">
                                <p class="product-name">${item.name}</p>
                                <div class="all-ratings">
                                    <img class="star" src="icons/star.png">
                                    <p class="rating">${item.score}<span>${item.comment}</span></p>
                                </div>
                                <div class="peşin">
                                    <p>Peşin fiyatına taksit</p>
                                </div>
                            </div>
                            <div class="bottom">
                                <p class="p-cost">${item.price}<span> TL</span></p>
                                <img class = "add-to-basket" src="icons/black-shopping-cart.png">
                            </div>
                        </div>
                    </div>
                    `;

                }
            })
        })
    })

    let back = document.querySelector(".ca-li-back")
    let forward = document.querySelector(".ca-li-forward")
    
    back.addEventListener("click",()=>{
         offerCate.scrollBy({
            left: -250,
            top: 0,
            behavior: "smooth"
        });
    })

    forward.addEventListener("click",()=>{
        offerCate.scrollBy({
            left: 250,
            top: 0,
            behavior: "smooth"
        });
    })

    document.querySelector(".hepsi-burada").addEventListener("click",()=>{
        window.location.href = "index.html"
    })




    
}















    


