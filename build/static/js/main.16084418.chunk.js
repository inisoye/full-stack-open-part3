(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),u=t.n(c),o=(t(20),t(4)),l=t(2),i=function(e){var n=e.handleSearch;return r.a.createElement(r.a.Fragment,null,"filter shown with ",r.a.createElement("input",{type:"search",onChange:n}))},m=function(e){var n=e.message,t=e.type;return null===n?null:r.a.createElement("div",{className:"notification ".concat(t)},n)},d=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,c=e.newNumber,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:c,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=e.id,t=e.name,a=e.number,c=e.deletePerson;return r.a.createElement("div",null,r.a.createElement("span",null,t," "),r.a.createElement("span",null,a," "),r.a.createElement("button",{"data-id":n,"data-name":t,onClick:c},"delete"))},f=t(3),h=t.n(f),b="/api/persons",p=function(){return h.a.get(b).then((function(e){return e.data}))},v=function(e){return h.a.post(b,e).then((function(e){return e.data}))},E=function(e){return h.a.delete("".concat(b,"/").concat(e)).then((function(e){return e}))},g=function(e,n){return h.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),f=Object(l.a)(u,2),h=f[0],b=f[1],w=Object(a.useState)(""),j=Object(l.a)(w,2),O=j[0],N=j[1],S=Object(a.useState)(""),C=Object(l.a)(S,2),k=C[0],y=C[1],P=Object(a.useState)(null),T=Object(l.a)(P,2),A=T[0],D=T[1],I=Object(a.useState)("confirmation"),J=Object(l.a)(I,2),x=J[0],B=J[1];Object(a.useEffect)((function(){p().then((function(e){return c(e)}))}),[]);var F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e.trim().toLowerCase().replace(/\s+/g,"")},L=t.some((function(e){return F(e.name)===F(h)})),M=function(e){var n=e.target.getAttribute("data-name"),a=e.target.getAttribute("data-id");window.confirm("Delete ".concat(n,"?"))&&E(a).then((function(){c(t.filter((function(e){return e.id!==a})))})).catch((function(e){D("It appears that this person's info has already been removed from server. Refresh the page to confirm."),B("error")})),setTimeout((function(){D(null)}),3e3)},R=t.filter((function(e){var n=F(e.name),t=F(k);return n.includes(t)}));return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(m,{type:x,message:A}),r.a.createElement(i,{handleSearch:function(e){return y(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("h3",null,"add a new"),r.a.createElement(d,{addPerson:function(e){if(e.preventDefault(),L){var n=window.confirm("".concat(h," is already added to phonebook, replace old number with a new one?")),a=t.find((function(e){return F(e.name)===F(h)})),r=a.id,u=Object(o.a)(Object(o.a)({},a),{},{number:O});n&&g(r,u).then((function(e){c(t.map((function(n){return F(n.name)!==F(h)?n:e}))),D("".concat(h,"'s number has now been replaced.")),B("confirmation")})).catch((function(e){console.log(e.response.data),D("There was an error in updating ".concat(h,"'s number")),B("error")})),setTimeout((function(){D(null)}),5e3),b(""),N("")}else{v({name:h,number:O}).then((function(e){D("Added ".concat(h)),B("confirmation"),c(t.concat(e))})).catch((function(e){console.log(e.response.data),D(e.response.data.error),B("error")})),setTimeout((function(){D(null)}),5e3),b(""),N("")}},newName:h,handleNameChange:function(e){return b(e.target.value)},newNumber:O,handleNumberChange:function(e){return N(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("h3",null,"Numbers"),R.map((function(e){return r.a.createElement(s,{name:e.name,number:e.number,key:e.id,id:e.id,deletePerson:M})}))))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.16084418.chunk.js.map