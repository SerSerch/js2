const categories = ['Другие', 'Рубашки', 'Футболки', 'Гольфы', 'Свитеры'];
const products = [];
const comments = new Comment();

products.push(new Product('Рубашка в клетку', '1001', 1));
products.push(new Product('Рубашка в полоску', '1002', 1));

products.push(new Product('Футболка синяя', '2001', 2));
products.push(new Product('Гольф с тигром', '3001', 3));
products.push(new Product('Свитер с оленями', '4001', 4));
products.push(new Product('Свитер в клетку', '4002', 4));
products.push(new Product('Борцовка красная', '0001'));

function renderComments() {
  let commentBlock = document.querySelector('.comments');
  commentBlock.innerHTML = '';

  let newEl = document.createElement('li');
  newEl.classList.add('comments__item');

  let text = document.createElement('input');
  text.classList.add('comments__add-text');
  text.type = 'text';
  newEl.appendChild(text);

  let newComment = document.createElement('input');
  newComment.classList.add('comments__add-comment');
  newComment.type = 'button';
  newComment.value = 'Добавить отзыв';
  newComment.addEventListener('click', function () {
    comments.addComment(document.querySelector('.comments__add-text').value);
  });
  newEl.appendChild(newComment);
  commentBlock.appendChild(newEl);

  for (let comment of comments.list) {
    let newEl = document.createElement('li');
    newEl.classList.add('comments__item');
    newEl.id = comment.comment_id;

    let removeComment = document.createElement('input');
    removeComment.classList.add('comments__remove-comment');
    removeComment.type = 'button';
    removeComment.value = 'X';
    removeComment.addEventListener('click', comments.deleteComment);
    newEl.appendChild(removeComment);

    let autor = document.createElement('div');
    autor.classList.add('comments__autor');
    autor.innerText = 'user';
    autor.setAttribute('data-likes', comment.likes);
    autor.addEventListener('click', comments.addLikes);
    newEl.appendChild(autor);

    let text = document.createElement('div');
    text.classList.add('comments__text');
    text.innerText = comment.text;
    newEl.appendChild(text);

    commentBlock.appendChild(newEl);
  }
}
/*
function onProduct(e) {
  let element = e.currentTarget;
  let commentsEl = element.nextElementSibling;
  if (commentsEl && commentsEl.classList.contains('products__comment')) {
    if (commentsEl.classList.contains('_active')) {
      commentsEl.classList.remove('_active');
    } else {
      commentsEl.classList.add('_active');
    }
  } else {
    renderComments(element);
  }

}
*/
function renderProducts(e) {
  let active = document.querySelector('.categories__item._active');
  active ? active.classList.remove('_active') : '';
  e.currentTarget.classList.add('_active');
  let cat = e.currentTarget.innerText;
  let parentBlock = document.querySelector('.products');
  parentBlock.innerHTML = '';
  let products = getProductsByCategory(cat);
  for (let product of products) {
    let newEl = document.createElement('li');
    newEl.classList.add('products__item');
    newEl.innerText = product.name;
    //newEl.setAttribute('data-star', product.getAverageStars());
    //newEl.addEventListener('click', onProduct);
    parentBlock.appendChild(newEl);
  }
}

function renderCategories() {
  for (let cat of categories) {
    let newEl = document.createElement('li');
    newEl.classList.add('categories__item');
    newEl.innerText = cat;
    newEl.addEventListener('click', renderProducts);
    document.querySelector('.categories').appendChild(newEl);
  }
  let newEl = document.createElement('li');
  newEl.classList.add('categories__item');
  newEl.innerText = 'Корзина';
  newEl.addEventListener('click', getBasket);
  document.querySelector('.categories').appendChild(newEl);
}

function getBasket() {
  alert('Корзина');
}

document.addEventListener('DOMContentLoaded', function () {
  renderCategories();
});
