var text = "'Lorem ipsum dol'or' sit 'amet', conse'ctetur 'adipisicing elit'.";
const reg = /\B'|'\B/g;
var res = text.replace(reg, '"');
console.log(res);