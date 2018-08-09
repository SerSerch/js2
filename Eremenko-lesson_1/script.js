function Container() {
  this.id = "";
  this.className = "";
  this.element = "";
}

Container.prototype.render = function() {
  return this.element;
}

Container.prototype.remove = function() {
  let el = this.element;
  el.parentNode.removeChild(el);
}

function Menu(myId, myClass) {
  Container.call(this);
  this.id = myId;
  this.className = myClass;
  this.items = [];
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.add = function(el) {
  this.items.push(el);
}

Menu.prototype.render = function() {
  this.element = document.createElement('ul');
  this.element.className = this.className;
  this.element.id = this.id;
  
  for(var i = 0; i < this.items.length; i++) {
    if(this.items[i] instanceof MenuItem) {
      this.element.appendChild(this.items[i].render());
    }
  }
  
  return this.element;
}

function MenuItem(myHref, myLabel, subMenu='') {
  Container.call(this);
  this.className = 'menu-item';
  this.href = myHref;
  this.label = myLabel;
  this.submenu = subMenu;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

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