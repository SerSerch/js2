/*
  Киноучет 
*/

const categories = ["Другие", "Рубашки", "Футболки", "Гольфы", "Свитеры"];

const products = [];

class User {
  constructor(id="") {
    this.user_id = id;
    this.cart = [];
    this.products = [];
    this.getUserShop(id);
  }
  
  getUserShop(id) {
    //GET user_id
    
  }
  
  addProduct(product, price) {
    //POST user_id
    //product
    //price
    
  }
  
  deleteProduct(id) {
    //DELETE user_id
    //product_id
    
  }
  
}

class Comment {
  constructor() {
    //GET comments
    this.list = [];
  }
  
  addComment(text) {
    //POST text
    this.list.push({text,likes:0});
  }
  
  addLikes(e) {
    //PATCH comment_id
    let element = e.currentTarget;
    let likes = element.getAttribute('data-likes');
    element.setAttribute("data-likes", ++likes);
  }
  
  deleteComment(id) {
    //DELETE comment_id
  }
}

class Product {
  constructor(name="Other product", id="", cat=0) {
    this.name = name;
    this.category = categories[cat];
    this.id = id;
    this.budget = 0;
  }
  
  /*
  getAverageStars() {
    let sumStars = 0;
    this.comments.forEach(comment => sumStars += comment.stars);
    return (this.comments.length > 0) ? sumStars / this.comments.length : 0;
  }
  */
}
products.push(new Product("Рубашка в клетку", "1001", 1));
products.push(new Product("Рубашка в полоску", "1002", 1));

products.push(new Product("Футболка синяя", "2001", 2));
products.push(new Product("Гольф с тигром", "3001", 3));
products.push(new Product("Свитер с оленями", "4001", 4));
products.push(new Product("Свитер в клетку", "4002", 4));
products.push(new Product("Борцовка красная", "0001"));

const comments = new Comment();
comments.addComment("очень красивая", "user", 5);
comments.addComment("очень понравилась", "user", 3);
comments.addComment("легко отстирывается", "user", 4);
comments.addComment("пуговицы быстро отрываются", "user", 1);

function getProductsByCategory(cat) {
  const resProducts = [];
  for (let product of products) {
    if (product.category === cat) {
      resProducts.push(product);
    }
  }
  return resProducts;
}
