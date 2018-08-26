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
        reject(xhr.status + ' ' + xhr.statusText);
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
        error => console.error(error)
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
      error => console.error(error)
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
      error => console.error(error)
    );
  }

  deleteProduct(e) {
    //DELETE user_id
    //product_id
    let element = e.currentTarget;
    let arg = ['user_id=' + user.user_id,
              'product_id=' + element.id];
    httpReq('DELETE', 'http://89.108.65.123:8080/shop', arg).then(
      response => {
        user.cart = response.cart;
        element.remove();
        document.querySelector('.dialog b').innerText = user.cart.length;
      },
      error => console.error(error)
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
      error => console.error(error)
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
        error => console.error(error)
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
      error => console.error(error)
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
      error => console.error(error)
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
