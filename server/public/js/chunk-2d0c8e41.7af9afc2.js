(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c8e41"],{"578a":function(e,r,s){"use strict";s.r(r);var t=s("7a23"),n={class:"hello"},o={class:"input_row"},u=Object(t["f"])("label",{for:"email"},"이메일",-1),i={class:"input_row"},a=Object(t["f"])("label",{for:"password"},"비밀번호",-1),c=Object(t["f"])("a",{href:"/signup"},"가입하기",-1);function l(e,r,s,l,p,d){return Object(t["q"])(),Object(t["e"])("div",n,[Object(t["f"])("form",{class:"form",onSubmit:r[3]||(r[3]=Object(t["E"])((function(){return d.login&&d.login.apply(d,arguments)}),["prevent"]))},[Object(t["f"])("div",o,[u,Object(t["D"])(Object(t["f"])("input",{type:"email",id:"email","onUpdate:modelValue":r[0]||(r[0]=function(e){return p.user.user_email=e})},null,512),[[t["A"],p.user.user_email]])]),Object(t["f"])("div",i,[a,Object(t["D"])(Object(t["f"])("input",{type:"password",id:"password","onUpdate:modelValue":r[1]||(r[1]=function(e){return p.user.user_password=e})},null,512),[[t["A"],p.user.user_password]])]),Object(t["f"])("button",{onClick:r[2]||(r[2]=function(){return d.login&&d.login.apply(d,arguments)})},"로그인"),c],32)])}var p={data:function(){return{user:{user_email:"",user_password:""}}},methods:{login:function(){var e=this;try{var r={user_email:this.user.user_email,user_password:this.user.user_password};this.$store.dispatch("login",r).then((function(){e.$router.push("/")}))}catch(s){console.log("error on Front: ",s.res)}}}},d=s("d959"),f=s.n(d);const b=f()(p,[["render",l]]);r["default"]=b}}]);
//# sourceMappingURL=chunk-2d0c8e41.7af9afc2.js.map