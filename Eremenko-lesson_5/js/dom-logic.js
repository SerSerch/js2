function renderComments() {
  let newComment = document.createElement("input");
  newComment.classList.add("comments__add-comment");
  newComment.type = "button";
  newComment.value = "Добавить отзыв";
  //newComment.addEventListener("click", )
  //.appendChild(newComment);    

  for (let comment of comments.list) {

    let newEl = document.createElement("li");
    newEl.classList.add("comments__item");


    let autor = document.createElement("div");
    autor.classList.add("comments__autor");
    autor.innerText = "user";
    autor.setAttribute("data-likes", comment.likes);
    autor.addEventListener("click", comments.addLikes)
    newEl.appendChild(autor);
    let text = document.createElement("div");
    text.classList.add("comments__text");
    text.innerText = comment.text;
    newEl.appendChild(text);

    document.querySelector(".comments").appendChild(newEl);
  }
}
/*
function onProduct(e) {
  let element = e.currentTarget;
  let commentsEl = element.nextElementSibling;
  if (commentsEl && commentsEl.classList.contains("products__comment")) {
    if (commentsEl.classList.contains("_active")) {
      commentsEl.classList.remove("_active");
    } else {
      commentsEl.classList.add("_active");
    }
  } else {
    renderComments(element);
  }

}
*/
function renderProducts(e) {
  let active = document.querySelector(".categories__item._active");
  active ? active.classList.remove("_active") : "";
  e.currentTarget.classList.add("_active");
  let cat = e.currentTarget.innerText;
  let parentBlock = document.querySelector(".products");
  parentBlock.innerHTML = "";
  let products = getProductsByCategory(cat);
  for (let product of products) {
    let newEl = document.createElement("li");
    newEl.classList.add("products__item");
    newEl.innerText = product.name;
    //newEl.setAttribute("data-star", product.getAverageStars());
    //newEl.addEventListener("click", onProduct);
    parentBlock.appendChild(newEl);
  }
}

function renderCategories() {
  for (let cat of categories) {
    let newEl = document.createElement("li");
    newEl.classList.add("categories__item");
    newEl.innerText = cat;
    newEl.addEventListener("click", renderProducts);
    document.querySelector(".categories").appendChild(newEl);
  }
  let newEl = document.createElement("li");
    newEl.classList.add("categories__item");
    newEl.innerText = "Корзина";
    newEl.addEventListener("click", getBasket);
    document.querySelector(".categories").appendChild(newEl);
}

function getBasket() {
  alert("Корзина");
}

document.addEventListener("DOMContentLoaded", function() {
  renderCategories();
  renderComments();
});
