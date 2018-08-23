function renderComments(element) {
      for (let product of products) {
      if (product.name == element.innerText) {
        let newEl = document.createElement("li");
        newEl.classList.add("products__comment", "_active");

        if (product.comments.length) {
          for (let comment of product.comments) {
            let autor = document.createElement("div");
            autor.classList.add("products__autor");
            autor.innerText = `${comment.autor}: оценка ${comment.stars}`;
            newEl.appendChild(autor);
            let text = document.createElement("div");
            text.classList.add("products__text");
            text.innerText = comment.text;
            newEl.appendChild(text);
          }
        }
        let newComment = document.createElement("input");
        newComment.classList.add("products__add-comment");
        newComment.type = "button";
        newComment.value = "Добавить отзыв";
        //newComment.addEventListener("click", )
        newEl.appendChild(newComment);
        element.parentNode.insertBefore(newEl, element.nextSibling);

      }
    }
}

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
    newEl.setAttribute("data-star", product.getAverageStars());
    newEl.addEventListener("click", onProduct);
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
}

document.addEventListener("DOMContentLoaded", renderCategories);