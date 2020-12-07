<template>
<div>
  <div v-if="data1.length==0" style="margin-top: 50px; padding:1.3rem 1.25rem;">
    <h1 style="width:100%">오늘의 추천</h1>
    2개 이상의 매장을 즐겨찾기에 등록해보세요!
  </div>
    <b-card-group v-else class="row" style="margin-top: 50px; padding:0 1.3rem 0 1.25rem;">
        <h1 style="width:100%">오늘의 추천</h1>
    <b-card id="card1" class="col-xs-6" style="padding:0.25rem; width: 50%" :img-src="data1[randomIdx].img" img-alt="Image" background="#a7e4a9" img-top>
      <b-card-header>{{data1[randomIdx].name}}</b-card-header>
      <b-card-text>
        <p>타석 수 : {{ data1[randomIdx].hit_spot }}개</p>
        <p>비거리 : {{ data1[randomIdx].carry_dist }}yard</p>
        <p>현재 위치로부터 {{data1[randomIdx].dis|kmChange}}</p>
        <!-- <p>평점 : {{ data1[randomIdx].score }}</p> -->
        <!-- <div> -->
        <b-form-rating style="border:0" v-model="data1[randomIdx].score" variant="warning" class="mb-2" readonly></b-form-rating>
        <!-- </div> -->
        <b-badge v-if="data1[randomIdx].parking" variant="danger">주차가능</b-badge>
        <b-badge v-if="data1[randomIdx].rent" variant="warning">장비대여</b-badge>
        <b-badge v-if="data1[randomIdx].shower" variant="info">샤워시설</b-badge>
        <b-badge v-if="data1[randomIdx].lesson" variant="success">레슨가능 프로 {{ data1[randomIdx].lesson }}명</b-badge>
        <b-badge v-if="data1[randomIdx].indoor" class="badge_custom_2">실내</b-badge>
        <b-badge v-if="data1[randomIdx].indoor == false" class="badge_custom_1" style="backgroud:black">실외</b-badge>
      </b-card-text>
      <template #footer>
        <small @click="goTodetail(data1[randomIdx].name)" class="text-muted">더보기</small>
      </template>
    </b-card> 

    <b-card id="card2" class="col-xs-6" style="padding:0.25rem; width: 50%" :img-src="data1[randomIdx2].img" img-alt="Image" img-top>
      <b-card-header>{{data1[randomIdx2].name}}</b-card-header>
      <b-card-text>
        <p>타석 수 : {{ data1[randomIdx2].hit_spot }}개</p>
        <p>비거리 : {{ data1[randomIdx2].carry_dist }}yard</p>
        <p>현재 위치로부터 {{data1[randomIdx2].dis|kmChange}}</p>
        <b-form-rating style="border:0" v-model="data1[randomIdx2].score" variant="warning" class="mb-2" readonly></b-form-rating>

        <b-badge v-if="data1[randomIdx2].parking" variant="danger">주차가능</b-badge>
        <b-badge v-if="data1[randomIdx2].rent" variant="warning">장비대여</b-badge>
        <b-badge v-if="data1[randomIdx2].shower" variant="info">샤워시설</b-badge>
        <b-badge v-if="data1[randomIdx2].lesson" variant="success">레슨가능 프로 {{ data1[randomIdx2].lesson }}명</b-badge>
        <b-badge v-if="data1[randomIdx2].indoor" class="badge_custom_2">실내</b-badge>
        <b-badge v-if="data1[randomIdx2].indoor == false" class="badge_custom_1" style="backgroud:black">실외</b-badge>
      </b-card-text>
      <template #footer>
        <small @click="goTodetail(data1[randomIdx2].name)" class="text-muted">더보기</small>
      </template>
    </b-card> 

  </b-card-group>
</div>
</template>
<script>
// import listview from "../pages/listView.vue";
export default {
  data(){
    return{
      data1:[],
      randomIdx:null,
      randomIdx2:null,
    }
  },
  components: {},
  filters: {
            kmChange(val) {
                var newVal = 0;
                if (val > 999) {
                    newVal = (val / 1000).toFixed(2) + "km";
                } else {
                    newVal = val + "m";
                }
                return newVal;
            },
  },
  created() {
            // console.log(this.data.name.length);
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) != "loglevel:webpack-dev-server") {
                    this.data1.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                    
                    this.data1[i].score= Math.floor(Math.random() * 5) +1;
                }
                else break;
                // console.log(this.data1[i].score)
            }
                // console.log(this.data1)
  
            //여기 랜덤수 수정
            this.randomIdx = Math.floor(Math.random() * this.data1.length) ;
            this.randomIdx2 = Math.floor(Math.random() *this.data1.length) ;
            // console.log(this.data1[this.randomIdx].score)
            // window.onload = function(event){
            //   this.data1[this.randomIdx].score>this.data1[this.randomIdx2].score?
            // document.getElementById('card1').style.border="thick solid #0000FF":
            // document.getElementById('card2').style.border="thick solid #0000FF"
            // }
            console.log(this.randomIdx2)
            console.log(this.randomIdx)
            
                // console.log(this.data1)
            
            // window.onload = function(event){
            // // console.log(s1)
              
            // }
            // // cache-loader( babel-loader() );
            //     console.log(this.data1)

  },
  watch:{
        randomIdx:function(){
          // var s1=this.data1[this.randomIdx].score;
          //   var s2=this.data1[this.randomIdx2].score;
          //   var dis1=this.data1[this.randomIdx].dis;
          //   var dis2=this.data1[this.randomIdx2].dis;
          if(this.data1.length!=0){
          this.data1[this.randomIdx].score>this.data1[this.randomIdx2].score   ? 
            document.getElementById('card1').style.border="thick solid #ffc107":
            document.getElementById('card2').style.border="thick solid #ffc107"
        }
  }
  },
  methods:{
        goTodetail(prodId) {
                let proId = prodId;
                this.$router.push({ name: "Detail", params: { Pid: proId } });
            },
  },
};
</script>
<style lang="scss" scoped>
    @import "../scss/listview.scss";
</style>
