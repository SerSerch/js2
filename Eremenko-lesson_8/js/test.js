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
    elem.id = user.cart[0].product_id;
    
    user.deleteProduct(elem);
  });

  it('Должна уменьшиться длина массива basketItems', function () {
    expect(user.cart.length).toBe(0);
  });

});
