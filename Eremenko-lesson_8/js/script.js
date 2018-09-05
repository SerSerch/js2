//асинхронный запрос возвращающий promise
function httpReq(metod, url, arg = '') {
  return new Promise(function (resolve, reject) {
    url += arg ? '?' + arg.join('&') : '';
    let xhr = new XMLHttpRequest();
    xhr.open(metod, url, true);
    xhr.send();
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject([xhr.status, xhr.statusText, metod, url]);
      }
    };
  });
}

//класс пользователя
class User {
  constructor() {
    let id = localStorage.user ? localStorage.user : '';
    if (id) {
      this.user_id = id;
      this.getUserCart();
    } else {
      httpReq('GET', 'http://89.108.65.123:8080/shop').then(
        response => {
          localStorage.user = response.user_id;
          this.user_id = response.user_id;
          this.cart = [];
        },
        error => errorDialog(error)
      );
    }
  }

  getUserCart() {
    //GET user_id
    let arg = ['user_id=' + this.user_id];
    httpReq('GET', 'http://89.108.65.123:8080/shop', arg).then(
      response => {
        this.cart = response.cart;
      },
      error => errorDialog(error)
    );
  }

  addProduct(elem) {
    //POST user_id
    //product
    //price
    let product = elem.innerText;
    let price = elem.getAttribute('data-price');

    let arg = ['user_id=' + user.user_id,
              'product=' + product,
              'price=' + price];
    httpReq('POST', 'http://89.108.65.123:8080/shop', arg).then(
      response => {
        user.cart.push(response);
        getBasket();
      },
      error => errorDialog(error)
    );
  }

  deleteProduct(elem) {
    //DELETE user_id
    //product_id
    let arg = ['user_id=' + user.user_id,
              'product_id=' + elem.id];
    httpReq('DELETE', 'http://89.108.65.123:8080/shop', arg).then(
      response => {
        user.cart = response.cart;
        elem.remove();
        document.querySelector('.dialog b').innerText = user.cart.length;
      },
      error => errorDialog(error)
    );
  }

}


//класс комментариев
class Comment {
  constructor() {
    //GET comments
    this.list = [];
    this.getComments();
  }

  getComments() {
    httpReq('GET', 'http://89.108.65.123:8080/comments').then(
      response => {
        this.list = response;
        renderComments();
      },
      error => errorDialog(error)
    );
  }

  addComment(text) {
    //POST text
    if (text) {
      let arg = ['text=' + text];
      httpReq('POST', 'http://89.108.65.123:8080/comments', arg).then(
        response => {
          this.getComments();
        },
        error => errorDialog(error)
      );
    }
  }

  addLikes(e) {
    //PATCH comment_id
    let element = e.currentTarget;
    let likes = element.getAttribute('data-likes');
    let arg = ['comment_id=' + element.parentNode.id]
    httpReq('PATCH', 'http://89.108.65.123:8080/comments', arg).then(
      response => {
        element.setAttribute('data-likes', response.likes);
      },
      error => errorDialog(error)
    );
  }

  deleteComment(e) {
    //DELETE comment_id
    let element = e.currentTarget;
    let arg = ['comment_id=' + element.parentNode.id];
    httpReq('DELETE', 'http://89.108.65.123:8080/comments', arg).then(
      response => {
        for (let comment in comments.list) {
          if (comments.list[comment].comment_id == response.comment_id) {
            comments.list.splice(comment, 1);
            break;
          }
        }
        element.parentNode.remove();
      },
      error => errorDialog(error)
    );
  }
}


//класс продуктов
class Product {
  constructor(name = 'Other product', price = 0, id = '', cat = 0) {
    this.name = name;
    this.price = price;
    this.category = categories[cat];
    this.id = id;
    this.budget = 0;
  }
}

//получение продуктов в категории
function getProductsByCategory(cat) {
  const resProducts = [];
  for (let product of products) {
    if (product.category === cat) {
      resProducts.push(product);
    }
  }
  return resProducts;
}

function errorDialog(error) {
  $('.dialog').html(`${error[2]}<br>${error[3]}`)

  $('.dialog').dialog({
    modal: true,
    title: `Error ${error[0]} ${error[1]}` 
  }).effect('bounce', {}, 1000);
}