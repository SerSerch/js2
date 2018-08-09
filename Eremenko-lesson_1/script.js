// общий элемент
function Container() {
  this.id = "";
  this.className = "";
  this.element = "";
}

// возвращаем общий элемент
Container.prototype.render = function() {
  return this.element;
}

// удаление общего элемента
Container.prototype.remove = function() {
  let el = this.element;
  el.parentNode.removeChild(el);
}

// меню
function Menu(myId, myClass) {
  Container.call(this);
  this.id = myId;
  this.className = myClass;
  this.items = [];
}

// наследуем методы общего элемента
Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

// добавление элементов меню
Menu.prototype.add = function(el) {
  this.items.push(el);
}

// возвращаем меню
Menu.prototype.render = function(selector) {
  this.element = document.createElement('ul');
  this.element.className = this.className;
  this.element.id = this.id;
  
  for(var i = 0; i < this.items.length; i++) {
    if(this.items[i] instanceof MenuItem) {
      this.element.appendChild(this.items[i].render());
    }
  }
  
  if (selector) document.querySelector(selector).appendChild(this.element);
  
  return this.element;
}

// элемент меню
function MenuItem(myHref, myLabel, subMenu) {
  Container.call(this);
  this.className = 'menu-item';
  this.href = myHref;
  this.label = myLabel;
  this.submenu = subMenu ? subMenu.render() : '';
}

// наследуем методы общего элемента
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

// добавление элементов подменю
MenuItem.prototype.add = function(subMenu) {
  this.submenu = subMenu.render();
  this.element.appendChild(this.submenu);
}

// возвращаем элемент меню
MenuItem.prototype.render = function() {
  this.element = document.createElement('li');
  this.element.className = this.className;
  
  let link = document.createElement('a');
  link.href = this.href;
  link.innerHTML = this.label;
  
  this.element.appendChild(link);
  if (this.submenu) this.element.appendChild(this.submenu);
  
  return this.element;
}