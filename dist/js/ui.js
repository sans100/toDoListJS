!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(2),e.exports=n(1)},function(e,t){var n=document.querySelector("#todolist"),r=document.querySelector("#donelist"),o=document.querySelector("[sample]");o.parentNode.removeChild(o);var u,c=[{idx:1,subject:"테스트1",startDate:"2019-08-22",endDate:"2019-09-22",doneFlag:!1},{idx:2,subject:"테스트2",startDate:"2019-08-22",endDate:"2019-09-23",doneFlag:!1},{idx:3,subject:"테스트3",startDate:"2019-08-22",endDate:"2019-09-24",doneFlag:!0}];function a(e){var t=e.parentElement;t===todolist?r.appendChild(e):n.appendChild(e),c.forEach(function(n){n.idx==e.todoIndex&&(n.doneFlag=t!=r)}),i(n),i(r)}function i(e){for(var t=[],n=e.childNodes.length;n--;)"LI"===e.childNodes[n].nodeName&&t.push(e.childNodes[n]);t.sort(function(e,t){var n=e.querySelector(".end-date").textContent.split("-").join(""),r=t.querySelector(".end-date").textContent.split("-").join(""),o=e.getAttribute("add-time"),u=t.getAttribute("add-time");return r<n?1:n<r?-1:u<o?1:o<u?-1:0});for(var r=0;r<t.length;r++)e.appendChild(t[r])}function d(e,t,r,u){var i=o.cloneNode(!0),d=i.querySelector('label input[type="checkbox"]'),l=i.querySelector(".work"),f=i.querySelector(".start-date"),s=i.querySelector(".end-date"),p=i.querySelector(".modify"),v=i.querySelector(".remove"),y=(new Date).getTime();return l.innerText=e,(t<1||t===r)&&f.parentNode.removeChild(f),f.innerText=t,s.innerText=r,d.onclick=function(){a(i)},p.onclick=function(){var e,t;e=i,(t=prompt("일정을 수정하시오!")).trim()&&(e.querySelector(".work").innerText=t,c.forEach(function(n){n.idx===e.todoIndex&&(n.subject=t)}))},v.onclick=function(){!function(e){if(confirm("삭제 하시겠습니다?")){e.parentNode.removeChild(e);for(var t=0;t<c.length;t++)c[t].idx===e.todoIndex&&c.splice(t,1)}}(i)},i.setAttribute("add-time",y),n.appendChild(i),u&&(a(i),d.setAttribute("checked","checked")),i}u=1,c.forEach(function(e){d(e.subject,e.startDate.substr("2"),e.endDate.substr("2"),e.doneFlag).todoIndex=u,u++}),i(n),i(r);var l=document.querySelector("#input-Date-Start"),f=document.querySelector("#input-Date-End"),s=document.querySelector("#input-Text"),p=document.querySelector("#btn-Add"),v=new Date,y=String(v.getFullYear()),b=String(v.getMonth()+1).padStart(2,"0"),m=String(v.getDate()).padStart(2,"0");v="".concat(y,"-").concat(b,"-").concat(m),l.value=v,f.value=v,s.focus(),p.onclick=function(){var e=s.value,t=l.value.substr("2"),r=f.value.substr("2");if(!e.trim())return!1;if(t<=r){var o=d(e,t,r);i(n);var u=[];c.forEach(function(e){u.push(e.idx)});var a=Math.max.apply(null,u);o.todoIndex=a+1,c.push({idx:a+1,subject:e,startDate:l.value,endDate:f.value,doneFlag:!1})}else alert("일정을 확인 하시오!");s.focus(),s.select()},s.onkeyup=function(e){13===e.which&&p.onclick()}},function(e,t){}]);