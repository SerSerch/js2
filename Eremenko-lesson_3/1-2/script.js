var text = "'Lorem ipsum dol'or' sit 'amet', conse'ctetur 'adipisicing elit'.";
var reg = /\B'|'\B/g;
var res = text.replace(reg, '"');
console.log(res);