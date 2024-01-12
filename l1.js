const productsList = [
    {
      id: 1,
      productImg: "./images/Image (1).png",
      price: "780",
      title: "Library stool chair",
      quantity: 1,
    },
    {
      id: 2,
      productImg: "./images/Image (2).png",
      price: "200",
      title: "Library stool chair",
      quantity: 1,
    },
    {
      id: 3,
      productImg: "./images/Image (3).png",
      price: "209",
      title: "Library stool chair",
      quantity: 1,
    },
    {
      id: 4,
      productImg: "./images/Image (4).png",
      price: "150",
      title: "Library stool chair",
      quantity: 1,
    },
    {
      id: 5,
      productImg: "./images/Image (5).png",
      price: "100",
      title: "Library stool chair",
      quantity: 1,
    },
    {
      id: 6,
      productImg: "./images/Image (6).png",
      price: "300",
      title: "Library stool chair",
      quantity: 1,
    },
    {
      id: 7,
      productImg: "./images/Image.png",
      price: "580",
      title: "Library stool chair",
      quantity: 1,
    },
    {
      id: 8,
      productImg: "./images/eugene-chystiakov-3neSwyntbQ8-unsplash.jpg",
      price: "300",
      title: "Library stool chair",
      quantity: 1,
    },
   
  ];
  
  let cartList = [];
  
  let productsListContainer = document.querySelector("#productsListContainer");
  let filterContainer = document.querySelector("#filterContainer");
  let cartListContainer = document.querySelector("#cartListContainer");
  let cartSummaryConatiner = document.querySelector("#cartSummaryConatiner");
  
  function addToCart(product) {
    const productObject = cartList.find(
      (eachcartItem) => eachcartItem.id === product.id
    );
  
    if (productObject === undefined) {
      cartList.push(product);
    } else {
      let newCartList = cartList.map((each) => {
        if (each.id === product.id) {
          return { ...each, quantity: each.quantity + 1 };
        } else {
          return each;
        }
      });
      cartList = newCartList;
    }
   
    Products(cartListContainer, cartList);
    Filter();
    CartSummary(cartListContainer, cartList);
  }
  
  function removeCartItem(product) {
    const filterList = cartList.filter((each) => each.id !== product.id);
    cartList = filterList;
    Products(cartListContainer, cartList);
    CartSummary();
   
  }
  
  function Products(container, list) {
    container.textContent = "";
    list.forEach((eachProduct) => {
      let productListItem = document.createElement("li");
      productListItem.classList.add("product-list-item");
      container.appendChild(productListItem);
  
      let productInfo = document.createElement("div");
      productInfo.classList.add("product-info");
      productListItem.appendChild(productInfo);
  
      let productImgEl = document.createElement("img");
      productImgEl.src = eachProduct.productImg;
      productImgEl.alt = eachProduct.title;
      productImgEl.classList.add("product-img");
      productInfo.appendChild(productImgEl);
  
      let productDetails = document.createElement("div");
      productDetails.classList.add("product-details");
      productInfo.appendChild(productDetails);
  
      let productTitleEl = document.createElement("h2");
      productTitleEl.textContent = eachProduct.title;
      productTitleEl.classList.add("product-title");
      productDetails.appendChild(productTitleEl);
  
      let productPriceEl = document.createElement("p");
      productPriceEl.textContent = `Rs. ${
        eachProduct.price * eachProduct.quantity
      }`;
      productPriceEl.classList.add("product-price");
      productDetails.appendChild(productPriceEl);
  
      let isCart = container === cartListContainer;
      if (isCart) {
        let deleteEl = document.createElement("button");
        deleteEl.textContent = "X";
        deleteEl.classList.add("delete-button");
        productDetails.appendChild(deleteEl);
        deleteEl.addEventListener("click", () => removeCartItem(eachProduct));
      }
  

  
      if (!isCart) {
        let addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add";
        addToCartBtn.classList.add("product-btn");
        addToCartBtn.addEventListener("click", () => addToCart(eachProduct));
        productDetails.appendChild(addToCartBtn);
      }
    });
  }
  
  function onProductSeacrh(e) {
    let userSearchvalue = e.target.value;
    let filterList = cartList.filter((each) => {
      if (
        each.price * each.quantity <= parseInt(userSearchvalue) ||
        each.title.toLowerCase().includes(userSearchvalue.toLowerCase())
      ) {
        return each;
      }
    });
    Products(cartListContainer, filterList);
  }
  
  function Filter() {
    filterContainer.textContent = "";
    let leftFilterSection = document.createElement("div");
    filterContainer.appendChild(leftFilterSection);
  
    let searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.addEventListener("input", onProductSeacrh);
    searchBox.placeholder = "Search by Price or Name";
    searchBox.classList.add("input-search-box");
    leftFilterSection.appendChild(searchBox);
  
    let rightFilterSection = document.createElement("div");
    filterContainer.appendChild(rightFilterSection);
  
    let clearCart = document.createElement("button");
    clearCart.classList.add("clear-cart-button");
    clearCart.textContent = "Clear cart X";
    rightFilterSection.appendChild(clearCart);
  
    clearCart.addEventListener("click", () => {
      cartList = [];
        Products(cartListContainer, cartList);
        CartSummary();
    });
  }
  
  function CartSummary() {
    cartSummaryConatiner.textContent = "";
    let price = 0;
    cartList.forEach((each) => {
      price += each.price * each.quantity;
    });
  
    console.log(price);
  
    let avg = 0;
    if (price !== 0) {
      avg = parseInt(price / cartList.length);
    }
  
    let avgCartItem = document.createElement("div");
    avgCartItem.classList.add("cart-summary");
    cartSummaryConatiner.appendChild(avgCartItem);
  
    let avgCartHeading = document.createElement("h2");
    avgCartHeading.textContent = "Average Product Price";
    avgCartItem.appendChild(avgCartHeading);
  
    let avgCartPrice = document.createElement("h2");
    avgCartPrice.textContent = "Rs. " + avg;
    avgCartItem.appendChild(avgCartPrice);
  
    let horizontal = document.createElement("hr");
    horizontal.classList.add("hr-line");
    cartSummaryConatiner.appendChild(horizontal);
  
    let totalPrice = document.createElement("div");
    totalPrice.classList.add("cart-summary");
    cartSummaryConatiner.appendChild(totalPrice);
  
    let totalCartHeading = document.createElement("h2");
    totalCartHeading.textContent = "Total Products Price";
    totalPrice.appendChild(totalCartHeading);
  
    let totalCartPrice = document.createElement("h2");
    totalCartPrice.textContent = "Rs. " + price;
    totalPrice.appendChild(totalCartPrice);
  }
  
  Filter();
  Products(productsListContainer, productsList);
  CartSummary();
