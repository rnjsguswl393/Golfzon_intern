<template>
    <div class="container_pages">
        <div class="pages">
            <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="4000"
                controls
                indicators
                background="#a7e4a9"
                img-width="1024"
                img-height="480"
                style="text-shadow: 1px 1px 2px #333;height:308px"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
            >
                <!-- Text slides with image -->
                <!-- <b-carousel-slide
                    caption="First slide"
                    text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                    img-src="https://picsum.photos/1024/480/?image=52"
                ></b-carousel-slide> -->

                <!-- Slides with custom text -->
                <!-- <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
                    <h1>Hello world!</h1>
                </b-carousel-slide> -->

                <!-- Slides with image only -->
                <b-carousel-slide :img-src="randomImg1"></b-carousel-slide>
                <b-carousel-slide :img-src="randomImg2"></b-carousel-slide>

                <!-- Slides with img slot -->
                <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
                <!-- <b-carousel-slide>
                    <template #img>
                        <img
                            class="d-block img-fluid w-100"
                            width="1024"
                            height="480"
                            src="https://picsum.photos/1024/480/?image=55"
                            alt="image slot"
                        />
                    </template>
                </b-carousel-slide> -->

                <!-- Slide with blank fluid image to maintain slide aspect ratio -->
                <!-- <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt a tincidunt eget,
                        convallis vel est. Ut pellentesque ut lacus vel interdum.
                    </p>
                </b-carousel-slide> -->
            </b-carousel>

            <div v-for="(data, index) in data" :key="index" style="margin-top: -10px;">
                <div v-if="proId == data.name">
                    <h2 class="ttl_overlay">{{ data.name }}</h2>
                    
                    <b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown = 0"
                        ><p>즐겨찾기 추가 성공</p>
                    </b-alert>
                    
                    <b-alert :show="disremoveSecs " dismissible variant="danger" @dismissed="disremoveSecs = 0"
                        ><p>즐겨찾기 삭제 성공</p>
                    </b-alert>
                    
                    <b-button pill variant="info" @click="callClick" style="position: absolute;">{{ data.call_num }}</b-button>
                    <div v-if="data.star==null" style="margin-left:370px;margin-top: 20px;"><i  class="far fa-star" @click="bookmarkClick(data.name, data)" style="color:#ffc107;font-size: 35px" ></i></div>
                    <div  v-else style="margin-left: 370px;margin-top: 20px;"><i class="fas fa-star" @click="bookmarkClick(data.name, data)" style="color:#ffc107;font-size: 35px" ></i></div>
                    
                    <!-- <b-button v-if="data.star==null" id="star" pill style="margin:10px 0 0 20px;background:white" @click="bookmarkClick(data.name, data)">
                        즐겨찾기
                    </b-button>
                    <b-button v-else id="star" pill variant="warning" style="margin:10px 0 0 20px;" @click="bookmarkClick(data.name, data)">
                        즐겨찾기
                    </b-button> -->

                    <div class="info">
                        <h1>상세주소 : {{ data.old_addr }}</h1>
                        <p>타석 수 : {{ data.hit_spot }}개</p>
                        <p>비거리 : {{ data.carry_dist }}yard</p>
                    </div>

                    <table class="table">
                        <caption style="caption-side: top;width:80px">
                            이용안내
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">이용타입</th>
                                <th scope="col">이용시간</th>
                                <th scope="col">가격</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1회권</th>
                                <td>60분</td>
                                <td>{{ data.hour_charge }},000원</td>
                            </tr>
                            <tr>
                                <th scope="row">1개월</th>
                                <td>60분</td>
                                <td>{{ data.one_charge }},000원</td>
                            </tr>
                            <tr>
                                <th scope="row">3개월</th>
                                <td>60분</td>
                                <td>{{ data.triple_charge }},000원</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <b-table striped caption-top :fields="table_fields_1" >
                        <template #table-caption> 이용안내 </template>
                    </b-table> -->

                    <table class="table">
                        <caption style="caption-side: top;width:80px">
                            영업안내
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">영업시간</th>
                                <th scope="col">Open</th>
                                <th scope="col">Close</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">주중</th>
                                <td>{{ data.week_open }} AM</td>
                                <td>{{ data.week_close }} PM</td>
                            </tr>
                            <tr>
                                <th scope="row">주말</th>
                                <td>{{ data.satsun_open }} AM</td>
                                <td>{{ data.satsun_close }} PM</td>
                            </tr>
                            <tr>
                                <th scope="row">공휴일</th>
                                <td>{{ data.holi_open }} AM</td>
                                <td>{{ data.holi_close }} PM</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <b-table striped caption-top :items="table_items_2" :fields="table_fields_2">
                        <template #table-caption>영업안내</template>
                    </b-table> -->

                    <div class="tags">
                        <b-badge pill variant="primary" v-if="data.shower" class="load">#{{ data.shower }}</b-badge>
                        <b-badge pill variant="danger" v-if="data.valet" class="load">#발렛 가능</b-badge>
                        <b-badge pill variant="secondary" v-if="data.parking" class="load">#주차가능</b-badge>
                        <b-badge pill variant="warning" v-if="data.rent" class="load">#{{ data.rent }}</b-badge>
                        <b-badge pill variant="dark" v-if="data.lesson" class="load">#레슨 가능</b-badge>
                    </div>
                    <div class="btng">
                        <b-button
                            pill
                            variant="success"
                            :href="`https://map.kakao.com/link/to/${data.name},${data.latitude},${data.longitude}`"
                            >길찾기</b-button
                        >

                        <b-button pill variant="outline-danger" @click="navClick">네비게이션</b-button>
                    </div>
                </div>
            </div>
            <div id="staticMap" style="height:160px;margin-bottom:70px">
                지도 클릭 시, 카카오지도로 이동합니다
            </div>
        </div>
    </div>
</template>
<script>
    import golf from "../../public/dummy.json";

    export default {
        name: "detail",

        data() {
            return {
                slide: 0,
                sliding: null,
                proId: this.$route.params.Pid,
                title: "details",
                data: [],
                dismissSecs: 1,
                disremoveSecs: 0,
                dismissCountDown: 0,
                randomImg1: "",
                randomImg2: "",
                // star: null,
            };
        },
        mounted() {
            this.callData();
            // console.log(this.data);
            this.getRandomImg();
            // console.log(this.star);
            if (window.kakao && window.kakao.maps) {
                this.staticMap();
            } else {
                const script = document.createElement("script");

                script.onload = () => kakao.maps.load(this.staticMap);
                script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=4ff9af170258a825316e7777898cd18e";
                document.head.appendChild(script);
            }
        },
        // watch:{
        // star:function(){
        //   // var s1=this.data1[this.randomIdx].score;
        //   //   var s2=this.data1[this.randomIdx2].score;
        //   //   var dis1=this.data1[this.randomIdx].dis;
        //   //   var dis2=this.data1[this.randomIdx2].dis;
        //     this.star==1   ? 
        //     document.getElementById('star').style.background="black":
        //     document.getElementById('star').style.background="pink"
        //     }
        // },
        methods: {
            getRandomImg() {
                let randomIdx = Math.floor(Math.random() * 9) + 1;
                let rId = Math.floor(Math.random() * 9) + 1;
                this.randomImg1 = "/images/dummy/place_lg_thumb_" + randomIdx + ".jpg";
                this.randomImg2 = "/images/dummy/place_lg_thumb_" + rId + ".jpg";
            },
            callClick() {
                // console.log(this.data);
                var name = this.proId;
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].name == name) {
                        var callnum = this.data[i].call_num;
                    }
                }
                console.log(callnum);
                document.location.href = "tel:" + callnum + "";
            },
            
            bookmarkClick(names, data) {
                // console.log(JSON.stringify(data));
                // console.log((localStorage.getItem(names)));
                if((localStorage.getItem(names))==null)
                {
                    console.log("없다");
                    data.star=1;
                    this.dismissCountDown = 1;
                    localStorage.setItem(names, JSON.stringify(data));
                    console.log(data.star)
                    // document.getElementById('star').style.background="#ffc107"

                }
                // console.log(name)
                // console.log(data.name)
                // for (var i = 0; i < localStorage.length; i++) {
                else if (data.name== (JSON.parse(localStorage.getItem(names))).name) {
                    // console.log(localStorage.key(i));
                    // console.log(name);
                    // console.log(JSON.stringify(data));
                    // console.log(localStorage.getItem(name));
                    console.log("있다");
                    data.star=null;
                    localStorage.removeItem(names);
                    this.dismissSecs = 0;
                    this.disremoveSecs = 1;
                    
                    // document.getElementById('star').style.background="white"

                } 
                
            },
            
            onSlideStart(slide) {
                this.sliding = true;
            },
            onSlideEnd(slide) {
                this.sliding = false;
            },
            callData() {
                golf.golfplace.forEach((item) => {
                    if (item.latitude || item.longitude) {

                        if (item.new_addr == null) {
                            item.new_addr = item.old_addr;

                        }
                        this.data.push(item);
                        // item.star=null;
                    }
                });
                console.log(this.data)

            },
            staticMap() {
                var name = this.proId;
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].name == name) {
                        var lat = this.data[i].latitude;
                        var lng = this.data[i].longitude;
                    }
                }

                console.log(lat, lng);
                var markerPosition = new kakao.maps.LatLng(lat, lng);

                var marker = {
                    position: markerPosition,
                };

                var staticMapContainer = document.getElementById("staticMap"),
                    staticMapOption = {
                        center: new kakao.maps.LatLng(lat, lng),
                        level: 3,
                        marker: marker,
                    };

                var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
            },
            navClick() {
                var name = this.proId;
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].name == name) {
                        var lat = this.data[i].latitude;
                        var lng = this.data[i].longitude;
                    }
                }
                console.log(lat);
                window.Kakao.init("4ff9af170258a825316e7777898cd18e");
                window.Kakao.Navi.start({
                    name: name,
                    x: lng,
                    y: lat,
                    coordType: "wgs84",
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .ttl_overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 10px 0;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.3);
        text-align: center;
    }
    .info {
        margin: 20px 0;
    }
    .btng {
        // margin-bottom: 60px;
        height: fit-content;
        .btn {
            font-size: 13px;
        }
    }
    .tags {
        padding: 10px 0 20px;
        .badge {
            margin-left: 4px;
            font-size: 13px;
        }
    }
</style>
