// DOMhelpers {
$ = (x) => document.querySelector(x);
mixin = (a, b) => {
  var o = {}
  for (k in a) {
    o[k] = a[k];
  }
  for (k in b) {
    o[k] = b[k];
  }
  return o;
}
node = (tag, attrs, content) => {
  var n = document.createElement(tag);
  for (k in attrs) {
    var a = document.createAttribute(k);
    a.value = attrs[k];
    n.setAttributeNode(a);
  }
  n.appendChild(document.createTextNode(content));
  return n;
};
div = (content, attrs = {}) => node('div', attrs, content);
code = (content, attrs = {}) => node('code', attrs, content);
link = (content, link, attrs = {}) => node('a', mixin(attrs, {href: link}), content);
hide = (n) => {
  var styleAttr = document.createAttribute('style');
  styleAttr.value = "display: none;";
  n.setAttributeNode(styleAttr);
};
removeChildren = (n) => {
  while (n.firstChild) {
      n.removeChild(n.firstChild);
  }
}
// }

// Util {
function rand(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// }

class Question {
  constructor(qText) {
    removeChildren($("#container"))
    $("#container").appendChild(div(qText));
    $("#container").appendChild(node("input", {id: "answer"}));
    var submit = node("button", {}, "submit");
    submit.onclick = () => this.onanswer($('#answer').value);
    $("#container").appendChild(submit);
  }

  onanswer() {
    alert('onanswer');
  }
}

class reduceToLowestTerms extends Question {
  constructor() {
    var p = rand(10) + 1;
    var q = rand(10) + 1;
    if (p == q) { p = p + 1; }
    var cf = 1;
    var ncf = rand(3) + 1;
    for (var i = 0; i < ncf; i++) {
      cf *= rand(10) + 2;
    }
    p *= cf;
    q *= cf;
    super(`Reduce ${p}/${q} to the lowest terms`);
  }

  onanswer(answer) {
    alert(`you entered: ${answer}`)
  }
}

window.onload = () => {
    var q = new reduceToLowestTerms();
}
