`<template>
  <div class="container">
    <div class="topPic center" :class='"tp"+channel'></div>
    <div class="gameBox center">
      <div class="quesNo">第 {{ channel }} 題</div>
      <div class="question" v-html="questionTxt"></div>
      <div class="optionBox">
        <div class="option op1 btn" @click='chooseAnswer(1)' :class='[{right: rightAns == 1},{wrong: wrongAns ==1}]'>{{answerTxt.a}}</div>
        <div class="option op2 btn" @click='chooseAnswer(2)' :class='[{right: rightAns == 2},{wrong: wrongAns ==2}]'>{{answerTxt.b}}</div>
        <div class="option op3 btn" @click='chooseAnswer(3)' :class='[{right: rightAns == 3},{wrong: wrongAns ==3}]' v-if='answerTxt.c'>{{answerTxt.c}}</div>
      </div>
      <!-- <div class="btn" @click='nextQuestion()'>next</div> -->
      <!-- <div class="btn" @click='endGame'>test</div> -->
    </div>
    <div class="info hide">
      <p>
        channel : {{channel}}
      </p>
      <p>
        quesNo. : {{question}}
      </p>
      <p>
        answer  : {{answer}}
      </p>
      <p>
        score: {{score}}
      </p>
      <p>
        userAnsNow : {{userAnsNow}}
      </p>
      <p>
        right: {{rightAns}} , wrong: {{wrongAns}}
      </p>
      <p>
        time: {{timeLeft}}
      </p>
    </div>
  </div>  
</template>

<script>
export default {
  name: "Game",

  data() {
    return {
      channel: 1,
      answers: [2, 1,1],
      questions: [1, 2, 3],
      qTxt: [
        "在immune cycle 中, 像Tecentriq 這類的anti-PD-L1的藥物會在哪幾個部分發揮作用?",
        "Tecentriq 癌自禦在不適用cisplatin的局部轉移或晚期泌尿道上皮癌病患中, mOS可以達到幾個月?",
        '您知道" 腎上老人 一路過八八"是因為以下原因，對或錯?<br/>腎: 腎功能CCR < 60 mg/mL的病患,(mOS=16.3m)<br/>上:上泌尿道上皮癌 ,(mOS=33m)<br/>老: 年紀>80歲,(mOS=21.3m)<br/>人: ECOS=0的病人 (mOS= 25m)<br/>以上病患在trial 中都顯示超過8+8=18個月的OS.',
      ],
      aTxt: [
        {
          a: "step 5 & 6",
          b: "step 3 & 7",
          c: "step 2 & 7"
        },
        {
          a: "16.3個月",
          b: "16.4個月",
          c: "16.5個月"
        },
        {
          a: "對",
          b: "錯",
        }
      ],
      userAnsNow: -1,
      totalTime: 0,
      totalQuestions: 3,
      score: 0,
      userChoosed: false,
      // answerTimer: null,
      timeLeft: 10
    };
  },
  computed: {
    question: function() {
      return this.questions[this.channel - 1];
    },
    answer: function() {
      return this.answers[this.question - 1];
    },
    questionTxt: function(){
      return this.qTxt[this.question-1]
    },
    answerTxt: function(){
      return this.aTxt[this.question-1]
    },
    rightAns: function() {
      return this.userAnsNow === -1 ? -1 : this.answer;
    },
    wrongAns: function() {
      return this.userAnsNow !== -1 && this.userAnsNow != this.answer
        ? this.userAnsNow
        : -1;
    }
  },
  mounted() {
    console.log("game mounted");
    // this.questions = this.shuffleArray(this.questions);
    // this.startPlayTime();
    // this.nextQuestion();
    this.channel = 1;
  },
  created() {
    console.log("game created");
  },
  methods: {
    chooseAnswer(userAnswer) {
      const vm = this;
      if (this.userChoosed) {
        return;
      }
      clearInterval(this.answerTimer);
      this.userAnsNow = userAnswer;
      this.userChoosed = true;

      if (this.userAnsNow === this.answer) {
        //right
        this.score = Math.floor(100 / this.totalQuestions) + this.score;
      } else {
        //wrong
      }
      setTimeout(function() {
        vm.nextQuestion();
      }, 1000);
    },
    nextQuestion() {
      if (this.channel >= this.totalQuestions) {
        this.endGame();
        return;
      }
      this.channel += 1;
      this.userAnsNow = -1;
      this.userChoosed = false;
      // this.startAnswerTimer();
    },
    startAnswerTimer: function() {
      let vm = this;
      vm.timeLeft = 10;
      vm.answerTimer = setInterval(function() {
        if (vm.timeLeft <= 0) {
          vm.chooseAnswer(4);
        } else {
          vm.timeLeft -= 1;
        }
      }, 1000);
    },
    startPlayTime: function() {
      let vm = this;
      vm.totalTime = 0;
      vm.playTimer = setInterval(function() {
        vm.totalTime += 1;
      }, 1000);
    },
    endGame() {
      clearInterval(this.playTimer);
      console.log("game ended");
      this.$emit("gameover", {
        playTime: this.totalTime,
        score: this.score
      });
    },
    shuffleArray(array) {
      let tmpArray = array.slice(0);
      for (var i = tmpArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = tmpArray[i];
        tmpArray[i] = tmpArray[j];
        tmpArray[j] = temp;
      }
      return tmpArray;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hide{
  display: none;
}
.btn {
  /* background-image: url("../assets/images/btnB.png"); */
  position: relative;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin: 0 auto 30px;
  background-size: 100% 100%;
  padding: 20px;
  box-sizing: border-box;
  min-height: 75px;
  border: 1px solid #555;
  background-color: #D2E8F3;
  box-shadow: 3px 3px 3px #555;
  border-radius: 10px;
  
}
.question{
  font-size: 30px;
  font-weight: bold;
  margin: 0 auto 50px;
  margin-bottom: 50px;
  min-height: 150px;
  padding: 20px 15px;
  border: 1px solid #555;
  background-color: #F0E2C3;
  margin-top: 30px;
  box-shadow: 3px 3px 3px #555;
  border-radius: 10px;
  
}
.topPic{

}
.tp1{
  width: 522px;
  height: 179px;
  background-image: url('../assets/images/p1.png');
}
.tp2{
  width: 527px;
  height: 173px;
  background-image: url('../assets/images/p2.png');
}
.tp3{
  width: 594px;
  height: 191px;
  background-image: url('../assets/images/p3.png');
}
/* .btn::after{
  content: '';
  position: absolute;
  background-image: url("../assets/images/bTop.png");
  
  width: 450px;
  height: 9px;
  top: -8px;
  left: 0;
}
.btn::before{
  content: '';
  position: absolute;
  background-image: url("../assets/images/bBotton.png");
  
  width: 450px;
  height: 10px;
  bottom: -9px;
  left: 0;
} */

.wrong::after{
  content: '';
  width: 80px;
  height: 80px;
  background-image: url('../assets/images/wrong.png');
  position: absolute;
  top: -0px;
  right: -35px;
}

.right::after{
  content: '';
  width: 80px;
  height: 80px;
  background-image: url('../assets/images/right.png');
  position: absolute;
  top: -0px;
  right: -35px;
}
.count{
  position: absolute;
  top: -80px;
  left: 20px;
  /* background-image: url('../assets/images/cir.png'); */
  color: #0e6eb8;
  font-weight: bold;
  font-size: 80px;
  text-align: center;
  width: 104px;
  height: 104px;
  line-height: 104px;


}

.center{
  margin-left: auto;
  margin-right: auto;
}

.gameBox{
  width: 85%;

}
.quesNo{
  font-size: 30px;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #F0E2C3;
  display: inline-block;
  border: 1px solid #555;
  box-shadow: 3px 3px 3px #555;
  margin-top: 30px;
}
</style>
