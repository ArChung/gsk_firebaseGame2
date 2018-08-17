<template>
    <div>
    <div class="page" id='index' v-if='pageChannel=="index"' @click='pageChannel="game"'>
      <div class="pageContainer pt-b">
        <div class="t1"></div>
      </div>
        <div class="footer"></div>
    </div>
    <div class="page" id='game' v-if='pageChannel=="game"'>
      <div class="pageContainer">
        <Game @gameover='gameover' ></Game>
      </div>
      <div class="gameLogo"></div>
    </div>
    <div class="page" id='form' v-if='pageChannel=="form"'>
      <div class="footer top"></div>
      <div class="pageContainer">
        <div class="inputWrap">
          <input type="text" class='textInput' v-model='userData.username' placeholder="請輸入中文全名"> 
          <input type="text" class='textInput' v-model='userData.email' placeholder="請輸入email">
        </div>
        
      </div>
      <div class="uploadBtn" @click='uploadUserData'></div>
      
      <div class="gameLogo"></div>
      
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Game from "./Game";

export default {
  name: "HelloWorld",
  data() {
    return {
      pageChannel: "index",
      userData: {
        email: "",
        username: "",
        score: 0,
        playTime: 0
      }
    };
  },
  created() {
    this.initFirebase();
  },
  methods: {
    gameover(data) {
      this.userData.score = +data.score > 98 ? 100 : data.score;
      this.userData.playTime = data.playTime;
      this.pageChannel = "form";
    },
    initFirebase() {
      var config = {
        apiKey: "AIzaSyAfSyBKDOds7c5qRLRHHg2Ug3RHLpNj_HE",
        authDomain: "gsk-319c7.firebaseapp.com",
        databaseURL: "https://gsk-319c7.firebaseio.com",
        projectId: "gsk-319c7",
        storageBucket: "gsk-319c7.appspot.com",
        messagingSenderId: "735059452550"
      };

      firebase.initializeApp(config);
      this.database = firebase.database().ref("gskqa2/posts/");
    },
    uploadUserData() {
      if (this.userData.username == "" || this.userData.email == "") {
        alert("請完成表單");
        return;
      }

      if (!this.validateEmail(this.userData.email)) {
        alert("請輸入正確的email格式");
        return;
      }

      this.database.push(this.userData).then(e => {
        console.log(e);
        alert("感謝您的參與");
        this.pageChannel = "index";
      });
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  components: {
    Game
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  border: 1px solid #000;
  padding: 10px;
  display: block;
}
.page {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.pageContainer {
  width: 100%;
}

#index {
  background-image: url("../assets/images/bg.png");
  background-size: cover;
}

#game {
  background-image: url("../assets/images/bg2.png");
  background-size: cover;
}
#form {
  background-image: url("../assets/images/bg2.png");
  background-size: cover;
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 640px;
  height: 127px;
  background-image: url("../assets/images/footer.png");
  z-index: 5;
}
.footer.top {
  bottom: auto;
  top: -17px;
}
.t1 {
  width: 611px;
  height: 873px;
  background-image: url("../assets/images/index.png");
}

.pt-b {
  padding-top: 80px;
}
.gameLogo {
  background-image: url("../assets/images/logo.png");
  width: 550px;
  height: 82px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -275px;
}

#form .pageContainer {
  background-image: url("../assets/images/form.png");
  width: 545px;
  height: 720px;
  margin: 150px auto 0;
  position: relative;
}

#form .inputWrap {
  position: absolute;
  width: 523px;
  top: 520px;
  left: 5px;
}

.textInput {
  border: 0;
  padding: 10px;
  display: block;
  width: 100%;
  height: 80px;
  margin-bottom: 23px;
  font-size: 30px;
  padding-left: 30px;
  box-sizing: border-box;
  background-color: transparent;
}
#form .uploadBtn {
  width: 320px;
  height: 90px;
  background-image: url("../assets/images/btn.png");
  margin: 15px auto;
}
</style>
