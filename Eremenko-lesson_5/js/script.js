/*
  Киноучет 
*/

const categories = ["Другие", "Рубашки", "Футболки", "Гольфы", "Свитеры"];

const products = [];

class Comment {
  constructor(text, autor, stars) {
    this.text = text;
    this.autor = autor;
    this.stars = stars;
  }
}

class Product {
  constructor(name="Other product", id="", cat=0) {
    this.name = name;
    this.category = categories[cat];
    this.id = id;
    this.budget = 0;
    this.expertStars = 3;
    this.comments = [];
  }
  addComment(text, autor, stars) {
    this.comments.push(new Comment(text, autor, stars));
  }
  getAverageStars() {
    let sumStars = 0;
    this.comments.forEach(comment => sumStars += comment.stars);
    return (this.comments.length > 0) ? sumStars / this.comments.length : 0;
  }
}

products.push(new Product("Рубашка в клетку", "1001", 1));
products[0].addComment("очень красивая", "user", 5);
products[0].addComment("очень понравилась", "user", 3);
products.push(new Product("Рубашка в полоску", "1002", 1));
products[1].addComment("легко отстирывается", "user", 4);
products[1].addComment("пуговицы быстро отрываются", "user", 1);

products.push(new Product("Футболка синяя", "2001", 2));
products.push(new Product("Гольф с тигром", "3001", 3));
products.push(new Product("Свитер с оленями", "4001", 4));
products.push(new Product("Свитер в клетку", "4002", 4));
products.push(new Product("Борцовка красная", "0001"));

function getProductsByCategory(cat) {
  const resProducts = [];
  for (let product of products) {
    if (product.category === cat) {
      resProducts.push(product);
    }
  }
  return resProducts;
}
