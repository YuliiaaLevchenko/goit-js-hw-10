import"./assets/modulepreload-polyfill-ec808ebb.js";import{i as s}from"./assets/vendor-651d7991.js";document.querySelector(".form").addEventListener("submit",function(i){i.preventDefault();const t=parseInt(this.elements.delay.value,10),o=this.elements.state.value;new Promise((e,n)=>{setTimeout(()=>{o==="fulfilled"?e(t):n(t)},t)}).then(e=>{s.success({message:`Fulfilled promise in ${e}ms`})}).catch(e=>{s.error({message:`Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map