import * as eruda from 'eruda';
import * as erudaCode from 'eruda-code';
import * as erudaDom from 'eruda-dom';

eruda.init();
eruda.add(erudaCode);
eruda.add(erudaDom);
// eruda.js
var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/eruda';
document.body.appendChild(script);
script.onload = function () {
    eruda.init();
};

export default eruda