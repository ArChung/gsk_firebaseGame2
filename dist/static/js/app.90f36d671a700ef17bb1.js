webpackJsonp([1],{"+UNK":function(e,t){},JWVv:function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("7+uW"),a=s("kxiW"),i=s.n(a),r={name:"Game",data:function(){return{channel:1,answers:[2,1,1],questions:[1,2,3],qTxt:["在immune cycle 中, 像Tecentriq 這類的anti-PD-L1的藥物會在哪幾個部分發揮作用?","Tecentriq 癌自禦在不適用cisplatin的局部轉移或晚期泌尿道上皮癌病患中, mOS可以達到幾個月?",'您知道" 腎上老人 一路過八八"是因為以下原因，對或錯?<br/>腎: 腎功能CCR < 60 mg/mL的病患,(mOS=16.3m)<br/>上:上泌尿道上皮癌 ,(mOS=33m)<br/>老: 年紀>80歲,(mOS=21.3m)<br/>人: ECOS=0的病人 (mOS= 25m)<br/>以上病患在trial 中都顯示超過8+8=18個月的OS.'],aTxt:[{a:"step 5 & 6",b:"step 3 & 7",c:"step 2 & 7"},{a:"16.3個月",b:"16.4個月",c:"16.5個月"},{a:"對",b:"錯"}],userAnsNow:-1,totalTime:0,totalQuestions:3,score:0,userChoosed:!1,timeLeft:10}},computed:{question:function(){return this.questions[this.channel-1]},answer:function(){return this.answers[this.question-1]},questionTxt:function(){return this.qTxt[this.question-1]},answerTxt:function(){return this.aTxt[this.question-1]},rightAns:function(){return-1===this.userAnsNow?-1:this.answer},wrongAns:function(){return-1!==this.userAnsNow&&this.userAnsNow!=this.answer?this.userAnsNow:-1}},mounted:function(){console.log("game mounted"),this.channel=1},created:function(){console.log("game created")},methods:{chooseAnswer:function(e){var t=this;this.userChoosed||(clearInterval(this.answerTimer),this.userAnsNow=e,this.userChoosed=!0,this.userAnsNow===this.answer&&(this.score=Math.floor(100/this.totalQuestions)+this.score),setTimeout(function(){t.nextQuestion()},1e3))},nextQuestion:function(){this.channel>=this.totalQuestions?this.endGame():(this.channel+=1,this.userAnsNow=-1,this.userChoosed=!1)},startAnswerTimer:function(){var e=this;e.timeLeft=10,e.answerTimer=setInterval(function(){e.timeLeft<=0?e.chooseAnswer(4):e.timeLeft-=1},1e3)},startPlayTime:function(){var e=this;e.totalTime=0,e.playTimer=setInterval(function(){e.totalTime+=1},1e3)},endGame:function(){clearInterval(this.playTimer),console.log("game ended"),this.$emit("gameover",{playTime:this.totalTime,score:this.score})},shuffleArray:function(e){for(var t=e.slice(0),s=t.length-1;s>0;s--){var n=Math.floor(Math.random()*(s+1)),a=t[s];t[s]=t[n],t[n]=a}return t}}},o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("div",{staticClass:"topPic center",class:"tp"+e.channel}),e._v(" "),s("div",{staticClass:"gameBox center"},[s("div",{staticClass:"quesNo"},[e._v("第 "+e._s(e.channel)+" 題")]),e._v(" "),s("div",{staticClass:"question",domProps:{innerHTML:e._s(e.questionTxt)}}),e._v(" "),s("div",{staticClass:"optionBox"},[s("div",{staticClass:"option op1 btn",class:[{right:1==e.rightAns},{wrong:1==e.wrongAns}],on:{click:function(t){e.chooseAnswer(1)}}},[e._v(e._s(e.answerTxt.a))]),e._v(" "),s("div",{staticClass:"option op2 btn",class:[{right:2==e.rightAns},{wrong:2==e.wrongAns}],on:{click:function(t){e.chooseAnswer(2)}}},[e._v(e._s(e.answerTxt.b))]),e._v(" "),e.answerTxt.c?s("div",{staticClass:"option op3 btn",class:[{right:3==e.rightAns},{wrong:3==e.wrongAns}],on:{click:function(t){e.chooseAnswer(3)}}},[e._v(e._s(e.answerTxt.c))]):e._e()])]),e._v(" "),s("div",{staticClass:"info hide"},[s("p",[e._v("\n      channel : "+e._s(e.channel)+"\n    ")]),e._v(" "),s("p",[e._v("\n      quesNo. : "+e._s(e.question)+"\n    ")]),e._v(" "),s("p",[e._v("\n      answer  : "+e._s(e.answer)+"\n    ")]),e._v(" "),s("p",[e._v("\n      score: "+e._s(e.score)+"\n    ")]),e._v(" "),s("p",[e._v("\n      userAnsNow : "+e._s(e.userAnsNow)+"\n    ")]),e._v(" "),s("p",[e._v("\n      right: "+e._s(e.rightAns)+" , wrong: "+e._s(e.wrongAns)+"\n    ")]),e._v(" "),s("p",[e._v("\n      time: "+e._s(e.timeLeft)+"\n    ")])])])},staticRenderFns:[]};var c={name:"HelloWorld",data:function(){return{pageChannel:"index",userData:{email:"",username:"",score:0,playTime:0}}},created:function(){this.initFirebase()},methods:{gameover:function(e){this.userData.score=+e.score>98?100:e.score,this.userData.playTime=e.playTime,this.pageChannel="form"},initFirebase:function(){i.a.initializeApp({apiKey:"AIzaSyAfSyBKDOds7c5qRLRHHg2Ug3RHLpNj_HE",authDomain:"gsk-319c7.firebaseapp.com",databaseURL:"https://gsk-319c7.firebaseio.com",projectId:"gsk-319c7",storageBucket:"gsk-319c7.appspot.com",messagingSenderId:"735059452550"}),this.database=i.a.database().ref("gskqa2/posts/")},uploadUserData:function(){var e=this;""!=this.userData.username&&""!=this.userData.email?this.validateEmail(this.userData.email)?this.database.push(this.userData).then(function(t){console.log(t),alert("感謝您的參與"),e.pageChannel="index"}):alert("請輸入正確的email格式"):alert("請完成表單")},validateEmail:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}},components:{Game:s("VU/8")(r,o,!1,function(e){s("omrO")},"data-v-7532e3fe",null).exports}},l={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",["index"==e.pageChannel?s("div",{staticClass:"page",attrs:{id:"index"},on:{click:function(t){e.pageChannel="game"}}},[e._m(0),e._v(" "),s("div",{staticClass:"footer"})]):e._e(),e._v(" "),"game"==e.pageChannel?s("div",{staticClass:"page",attrs:{id:"game"}},[s("div",{staticClass:"pageContainer"},[s("Game",{on:{gameover:e.gameover}})],1),e._v(" "),s("div",{staticClass:"gameLogo"})]):e._e(),e._v(" "),"form"==e.pageChannel?s("div",{staticClass:"page",attrs:{id:"form"}},[s("div",{staticClass:"footer top"}),e._v(" "),s("div",{staticClass:"pageContainer"},[s("div",{staticClass:"inputWrap"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.userData.username,expression:"userData.username"}],staticClass:"textInput",attrs:{type:"text",placeholder:"請輸入中文全名"},domProps:{value:e.userData.username},on:{input:function(t){t.target.composing||e.$set(e.userData,"username",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.userData.email,expression:"userData.email"}],staticClass:"textInput",attrs:{type:"text",placeholder:"請輸入email"},domProps:{value:e.userData.email},on:{input:function(t){t.target.composing||e.$set(e.userData,"email",t.target.value)}}})])]),e._v(" "),s("div",{staticClass:"uploadBtn",on:{click:e.uploadUserData}}),e._v(" "),s("div",{staticClass:"gameLogo"})]):e._e()])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"pageContainer pt-b"},[t("div",{staticClass:"t1"})])}]};var u={name:"App",components:{HelloWorld:s("VU/8")(c,l,!1,function(e){s("+UNK")},"data-v-e998ddf0",null).exports}},m={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("HelloWorld")],1)},staticRenderFns:[]};var h=s("VU/8")(u,m,!1,function(e){s("JWVv")},null,null).exports;n.a.config.productionTip=!1,new n.a({el:"#app",components:{App:h},template:"<App/>"})},omrO:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.90f36d671a700ef17bb1.js.map