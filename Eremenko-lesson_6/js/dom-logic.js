//создаем категории
const categories = ['Другие', 'Рубашки', 'Футболки', 'Гольфы', 'Свитеры'];
//добавляем отзывы
const comments = new Comment();
//добавляем товары в категории
const products = [];

products.push(new Product('Рубашка в клетку', 50, '1001', 1));
products.push(new Product('Рубашка в полоску', 60, '1002', 1));
products.push(new Product('Футболка синяя', 70, '2001', 2));
products.push(new Product('Гольф с тигром', 80, '3001', 3));
products.push(new Product('Свитер с оленями', 90, '4001', 4));
products.push(new Product('Свитер в клетку', 95, '4002', 4));
products.push(new Product('Борцовка красная', 100, '0001'));

const user = new User();
document.querySelector('.user').innerText = `Username: ${user.user_id}`;

//рендер отзывов
function renderComments() {
  let commentBlock = document.querySelector('.comments');
  commentBlock.innerHTML = '';

  //блок добавления комментария
  let newEl = document.createElement('li');
  newEl.classList.add('comments__item');

  let text = document.createElement('input');
  text.classList.add('comments__add-text');
  text.type = 'text';
  text.setAttribute('placeholder', 'Текст');
  newEl.appendChild(text);
  
  let data = document.createElement('input');
  data.classList.add('comments__add-data');
  data.id = 'datepicker';
  data.type = 'text';
  data.setAttribute('placeholder', 'Дата');
  newEl.appendChild(data);

  let newComment = document.createElement('input');
  newComment.classList.add('comments__add-comment');
  newComment.type = 'button';
  newComment.value = 'Добавить отзыв';
  newComment.addEventListener('click', function () {
    comments.addComment(document.querySelector('.comments__add-text').value);
  });
  newEl.appendChild(newComment);
  
  commentBlock.appendChild(newEl);

  //добавляем комментарии в блок
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
  $("#datepicker").datepicker();
}

//рендер продуктов
function renderProducts(e) {
  let cat = e.currentTarget.innerText;
  let parentBlock = document.querySelector('.products');
  parentBlock.innerHTML = '';
  let products = getProductsByCategory(cat);
  for (let product of products) {
    let newEl = document.createElement('li');
    newEl.classList.add('products__item', 'drag');
    newEl.setAttribute('data-price', product.price);
    newEl.innerText = product.name;
    //newEl.addEventListener('click', user.addProduct);
    parentBlock.appendChild(newEl);
  }
  $('.drag').draggable({
    revert: true
  });
}

//рендер категорий
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
  newEl.id = 'basket';
  newEl.innerText = 'Корзина';
  newEl.addEventListener('click', getBasket);
  document.querySelector('.categories').appendChild(newEl);
}

//отображение корзины
function getBasket() {
  let basket = document.createElement('ul');
  basket.classList.add('dialog__basket');

  for (let product of user.cart) {
    let newEl = document.createElement('li');
    newEl.classList.add('dialog__item');
    newEl.id = product.product_id;
    newEl.innerText = product.product;
    newEl.setAttribute('data-price', product.price);
    newEl.addEventListener('click', user.deleteProduct);
    basket.appendChild(newEl);
  }

  $('.dialog').html('В корзине <b>' + user.cart.length + '</b> товаров').append(basket);

  $('.dialog').dialog({
    modal: true,
    title: 'Корзина'
  }).effect('bounce', {}, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
  renderCategories();
  $('#basket').droppable({
    accept: '.drag',
    hoverClass: 'drags',
    activeClass: 'basket'
  }, {
    drop: function (event, ui) {
      user.addProduct(ui.draggable[0]);
    }
  });
  
  let swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    pagination: {
      clickable: true,
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});
