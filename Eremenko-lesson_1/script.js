function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "";
}

Container.prototype.render = function() {
  return this.htmlCode;
}

function Menu(myId, myClass, myItems) {
  Container.call(this);
  this.id = myId;
  this.className = myClass;
  this.items = myItems;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function() {
  var result = '<ul class="' + this.className + '" id="' + this.id + '">';
  for(var i = 0; i < this.items.length; i++) {
    if(this.items[i] instanceof MenuItem) {
      result += this.items[i].render();
    }
  }
  result += '</ul>';
  
  return result;
}

Menu.prototype.remove = function() {
  var el = document.querySelector('#' + this.id);
  el.parentNode.removeChild(el);
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
  return '<li class="' + this.className + '"><a href="' + this.href + '" >' + this.label + '</a>' + this.submenu + '</li>';
}