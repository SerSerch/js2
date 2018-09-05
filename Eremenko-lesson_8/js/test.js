describe('При создании экземпляра класса пользователя', function () {

  let user;

  beforeEach(function () {
    user = new User();
  });

  it('Экземпляр должен принадлежати классу User', function () {
    expect(user).toEqual(jasmine.any(User));
  });

  it('ID не должен быть пустым', function () {
    expect(user.id).toBeDefined();
  });

  it('В корзине не должно быть товаров', function () {
    expect(user.cart).toEqual([]);
  });

});

describe('При добавлении товара в корзину', function () {

  let user;

  beforeEach(function () {
    user = new User();
    let elem = document.createElement('li');
    elem.innerText = "Рубашка";

    user.addProduct(elem);
  });

  it('Должна увеличиться длина массива basketItems', function () {
    expect(user.cart.length).toBe(1);
  });

});

describe('При удалении товара из корзины', function () {

  let user;

  beforeEach(function () {
    user = new User();
    let elem = document.createElement('li');
    elem.innerText = "Рубашка";

    user.addProduct(elem);
    user.deleteProduct(15, 1500);
  });

  it('Должно уменьшиться общее число товаров в корзине', function () {
    expect(basket.countGoods).toBe(1);
  });

  it('Должна уменьшиться общая стоимость корзины', function () {
    expect(basket.amount).toBe(3000);
  });

  it('Должна уменьшиться длина массива basketItems', function () {
    expect(basket.basketItems.length).toBe(1);
  });

});
