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
}


//BASKET//
if(document.body.className.includes("bp")){

    let pro = JSON.parse(localStorage.getItem("Products")) || [];
    const basketInfo = document.querySelector(".basket-info");
    const originalHTML = basketInfo.innerHTML;
    
   
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
                                        <span class = "product-quantity">1</span>
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
            overallCost += parseInt(item.price);  
        })

        let basket = document.querySelector(".basket-container")
        basket.innerHTML += `
            <div class = "overall">
                <div class = "overall-top">
                    <span class = "selected-products">SEÇİLEN ÜRÜNLER (${pro.length})</span>
                    <span class = "overall-cost">${overallCost}<span class = "tl">TL</span></span>
                    <button>Alışverişi Tamamla</button>
                </div>
                <div class = "overall-mid">
                    <img src="images/premium-new-logo.png">
                    <p>Premium'a geç, kargo bedava ve Hepsipara avantajları ile tasarruf et.</p>
                    <button>Şimdi Geç</button>
                </div>
                <div class = "overall-bottom">
                    <div class = "bottom-item">
                        <p>Ürünler</p>
                        <p>300 TL</p>
                    </div>

                    <div class = "bottom-item">
                        <p>Kargo</p>
                        <p>100 TL</p>
                    </div>
                </div>
            </div>
        
        
        `; 

        let add = document.querySelectorAll(".add-quantity")

        add.forEach((item)=>{
            item.addEventListener("click",()=>{

                const container = item.parentElement;
                const quantity = container.querySelector(".product-quantity");
                
                let value = parseInt(quantity.textContent) + 1;
                quantity.textContent = value;
                
                if(parseInt(quantity.textContent) > 1){

                    container.innerHTML = `
                            <img class="decrease-quantity" src="icons/minus.png">
                            <span class = "product-quantity">${value}</span>
                            <img class="add-quantity" src="icons/add.png">
                    `;
                }

                else{
                    container.innerHTML = `
                            <img class="delete-product" src ="icons/delete.png">
                            <span class = "product-quantity">1</span>
                            <img class="add-quantity" src="icons/add.png">
                        `;
                    
                }
            })
        })

        let deleteProduct = document.querySelectorAll(".delete-product")
        
        deleteProduct.forEach((item) =>{
            item.addEventListener("click",()=>{
                let product = item.closest(".product-area")
                let index = [...product.parentNode.children].indexOf(product); 
                product.remove()
                pro.splice(index,1)
                localStorage.setItem("Products", JSON.stringify(pro));
                
            })
        })
    }

    else{
        basketInfo.innerHTML = originalHTML;
        
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

        let formLinksContainer = document.querySelector(".form-links")
        let formLinks = formLinksContainer.querySelectorAll("a");
        let creditCard = document.querySelector(".credit-carts")
        
        formLinksContainer.addEventListener("click",(e)=>{
            
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
                                        <option value="varsayılan">Varsayılan</option>
                                        <option value="saab">En faydalı soru & cevap</option>
                                        <option value="mercedes">En yeni soru & cevap</option>
                                        <option value="audi">En eski soru & cevap</option>
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
                                Medium ebatı için ölçüler nedir
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
                                        <img src="icons/like.png">
                                        <p class = "like-number">0</p>
                                        <img class="dislike" src="icons/like.png">
                                        <p class = "dislike-number">0</p> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
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














    


