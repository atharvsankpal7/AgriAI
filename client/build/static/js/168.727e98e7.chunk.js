"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[168],{2168:(e,s,t)=>{t.r(s),t.d(s,{default:()=>d});var a=t(2791),r=t(7689),n=t(1087),i=t(7803),l=t(3832),o=t(43),c=t(184);const d=()=>{const[e,s]=(0,a.useState)({email:"",password:""}),[t,d]=(0,a.useState)({}),[m,u]=(0,a.useState)(!1),p=(0,r.s0)(),h=e=>{let s={};return e.email.trim()?g(e.email)||(s.email="Invalid email address"):s.email="Email is required",e.password.trim()?e.password.length<8&&(s.password="Password should be at least 8 characters"):s.password="Password is required",s},g=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),f=a=>{s({...e,[a.target.id]:a.target.value}),d({...t,[a.target.id]:""})};return(0,c.jsx)("div",{className:"container-fluid p-3 my-5 h-custom",children:(0,c.jsxs)("div",{className:"row",children:[(0,c.jsx)("div",{className:"col-lg-6 col-sm-12 col-md-6",children:(0,c.jsx)("img",{src:"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp",className:"img-fluid",alt:"Company "})}),(0,c.jsxs)("form",{onSubmit:async s=>{s.preventDefault(),u(!0);const t=h(e);if(0!==Object.keys(t).length)return d(t),void u(!1);try{const s=await fetch("".concat("http://localhost:5000/api/","auth/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e.email,password:e.password})});if(404===s.status)return i.Z.error({title:"Error",content:"User not found please create an account first"}),p("/signup"),void u(!1);if(401===s.status)return i.Z.error({title:"Error",content:"Invalid Credentials"}),void u(!1);if(!s.ok)return i.Z.error({title:"Error",content:"Unknown Error"}),void u(!1);const t=await s.json();localStorage.setItem("token",t.authToken),localStorage.setItem("username",t.username),u(!1),p("/"),l.ZP.success({title:"Success",content:"Login Successful"}),t.isAdmin&&(localStorage.setItem("isAdmin",t.isAdmin),l.ZP.success({title:"Success",content:"Admin Login Successful"}),p("/AdminPage"))}catch(a){i.Z.error({title:"Error",content:"Error connecting to backend please check internet connection OR try after sometime"}),u(!1),console.error("Error during login request:",a)}},className:"col-sm-12 col-md-6 col-lg-6 my-lg-5 my-md-3 py-md-3 py-lg-5 my-sm-5",children:[(0,c.jsxs)("div",{className:"mb-4",children:[(0,c.jsx)("label",{htmlFor:"email",className:"form-label",children:"Email"}),(0,c.jsx)("input",{type:"email",className:"form-control ".concat(t.email?"is-invalid":""),id:"email",value:e.email,onChange:f}),t.email&&(0,c.jsx)("div",{className:"invalid-feedback",children:t.email})]}),(0,c.jsxs)("div",{className:"mb-4",children:[(0,c.jsx)("label",{htmlFor:"password",className:"form-label",children:"Password"}),(0,c.jsx)("input",{type:"password",className:"form-control form-control-lg ".concat(t.password?"is-invalid":""),id:"password",value:e.password,onChange:f}),t.password&&(0,c.jsx)("div",{className:"invalid-feedback",children:t.password})]}),(0,c.jsx)("div",{className:"text-center mt-4 pt-2 w-25",children:(0,c.jsx)(o.Z,{spinning:m,children:(0,c.jsx)("button",{className:"w-100 btn btn-info",type:"submit",disabled:m,children:"Login"})})}),(0,c.jsx)("hr",{}),(0,c.jsxs)("p",{className:"small fw-bold mt-2 pt-1 mb-2",children:["Don't have an account?"," ",(0,c.jsx)(n.rU,{to:"/signup",className:"link link-info",children:"Register"})]})]})]})})}}}]);
//# sourceMappingURL=168.727e98e7.chunk.js.map