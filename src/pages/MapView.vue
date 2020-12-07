<template>
    <div style="height=550px">
        <div class="list_hd">
            <div  class="items animate__animated animate__backInDown" >
                <b-form-group  style="text-align: center;margin-top: 5px;margin-bottom: 0;">
                    <b-form-radio-group  v-model="current" :options="options" switches size="sm"></b-form-radio-group> 
                </b-form-group>
                <!-- {{ current }} -->
            </div>
        </div>
        <div id="map"></div>


        <section class="bottomInfo" id="info">
            <span v-if="this.info&&this.more==true" @click="showMore()" style=" padding:0 202px"><i class="fas fa-angle-down"></i> </span>
            <span v-if="this.info&&this.more==false" @click="showMore()" style=" padding:0 202px"><i class="fas fa-angle-up"></i> </span>
            <span v-if="this.info" @click="hideLayer()" class="btm_info_close"><i class="far fa-times-circle"></i></span>

            <div  v-if="this.info" class="btm_info_content">
                <b-card :img-src="randomImg" @click="goTodetail(info.name)" img-alt="Card image" img-left img-height="130" img-width="130" style="border: 0px; margin-left: 10px;">
                    <b-card-text>
                        <p>
                            {{ this.info.new_addr ? this.info.new_addr : this.info.old_addr }}
                        </p>
                        <p>비거리 : {{ this.info.carry_dist }}yard</p>
                        <p>타석수 : {{ this.info.hit_spot }}개</p>
                        <p>현재위치로 부터 {{ this.posDistance | kmChange }}</p>
                        <p>자동차로 {{ this.carMin | hourChange }}</p>
                        <div>
                            <b-form-rating style="border:0" v-model="score" variant="warning" class="mb-2" readonly></b-form-rating>
                        </div>

                        <!-- <p>평점 : {{ this.score }}</p> -->
                    </b-card-text>
                </b-card>
                <h1 style="font-size: 20px;">리뷰 <a style="color:blue">{{totalcount}}</a></h1> 
                <p @click="seachNext(seachMore)" style="text-align: right;margin-block-start: -25px;padding-bottom: 6px;">리뷰 더보기<i class="fas fa-arrow-right"></i></p>
                <div style="height:200px;width:100%;border:5px;border-color:black;overflow-y:scroll">
                    <div v-for="(item, index) in blog" :key="index" >
                    <b-card :img-src="item.thumbnail | nullImg" img-left style="height:65px;width:100%;overflow:hidden" @click="goBlog(item.url)" >
                        <h1 style="font-weight: bold;margin-bottom: 7px;overflow: hidden;height: 17px;" v-html="item.title"></h1>
                        <b-card-text>
                            <p v-html="item.contents"></p>
                        </b-card-text>
                    </b-card>
                    </div>
                   
                </div>

            </div>
            
        </section>
    </div>
</template>

<script>
import axios from 'axios';
    import golf from "../../public/dummy.json";
    export default {
        data() {
            return {
                info: null,
                data: [],
                more:false,
                selectedWindow: null,
                locationPos: null,
                posDistance: null,
                randomImg: "",
                carMin: "",
                score: "",
                map:"",
                blog:[],
                markers : [],
                infowindows:[],
                totalcount:"",
                seachMore:"",
                options: [
                    { value: -1, text: "실내" },
                    { value: 5, text: "레슨가능" },
                    { value: 1, text: "샤워시설" },
                    { value: 2, text: "장비대여" },
                    { value: 3, text: "주차가능" },
                    { value: 4, text: "전체보기" },
                ],
                current: 4,
            };
        },
        watch:{
            current:function(select){
                console.log(select)
                this.setMarkers(null)
                this.markers.splice(0,this.markers.length)
                if(this.selectedWindow!==null){
                            // this.selectedWindow.close();
                    this.hideLayer();
                }
                this.data.forEach((item) => {
                //     if(select==false){
                //         // this.addMarker(new kakao.maps.LatLng(item.latitude,item.longitude))
                //         this.setMarkers(null)
                //         this.markers.splice(0,this.markers.length)
                //         if(this.selectedWindow!==null){
                //             // this.selectedWindow.close();
                //             this.hideLayer();
                //             }

                //     }
                // //    else if(select.length==1){
                //     else {
                    if (select==-1&&item.indoor) {
                        // console.log(item.latitude)
                        // this.markers.splice(0,this.markers.length);
                        this.addMarker(new kakao.maps.LatLng(item.latitude,item.longitude),item.name)
                        this.setMarkers(this.map)
                        
                        
                        // console.log("확인")
                    }
                    if (select==5&&item.lesson) {
                        this.addMarker(new kakao.maps.LatLng(item.latitude,item.longitude),item.name)
                        this.setMarkers(this.map)
                    }
                    if (select==1&&item.shower) {
                        this.addMarker(new kakao.maps.LatLng(item.latitude,item.longitude),item.name)
                        this.setMarkers(this.map)
                    }
                    if (select==2&&item.rent) {
                        this.addMarker(new kakao.maps.LatLng(item.latitude,item.longitude),item.name)
                        this.setMarkers(this.map)
                    }
                    if (select==3&&item.parking) {
                        this.addMarker(new kakao.maps.LatLng(item.latitude,item.longitude),item.name)
                        this.setMarkers(this.map)
                    }
                    if (select==4) {
                        this.addMarker(new kakao.maps.LatLng(item.latitude,item.longitude),item.name)
                        this.setMarkers(this.map)
                    }
                    // }
                    // else{
                    //     this.setMarkers(null);
                    //     this.markers.splice(0,this.markers.length);
                    // }
                });
                    //    this.setMarker(this.map,datas);
                console.log("데이터로딩 끝dmx");
                console.log(this.markers)

            }
        
        },
        mounted() {
            this.callData();
            
            if (window.kakao && window.kakao.maps) {
                this.initMap();
            } else {
                const script = document.createElement("script");

                script.onload = () => kakao.maps.load(this.initMap);
                script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=4ff9af170258a825316e7777898cd18e";
                document.head.appendChild(script);
            }
        },
        computed: {
            hasResult: function() {
            return this.posts.length > 0
            }
        },
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
            hourChange(min) {
                var newMin = 0;
                if (min > 60) {
                    newMin = Math.floor(min / 60) + "시간";
                }
                else if(min==0){
                    newMin="1분 미만"
                }
                else newMin = (min) + "분";
                return newMin;
            },
            nullImg(img){
                var newImg = "";
                if (img=="") {
                    newImg ="/images/nullImg.jpg";
                }
                else{
                    newImg=img;
                }
                return newImg;
            }
        },
        methods: {
            addMarker(position,name) {
    // 마커를 생성합니다
                 var imageSrc = "/images/pin.png", // 마커이미지의 주소입니다
                    imageSize = new kakao.maps.Size(30, 36), // 마커이미지의 크기입니다
                    imageOption = { offset: new kakao.maps.Point(20, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
                var marker = new kakao.maps.Marker({
                    position: position,
                    image: markerImage,
                });                
                this.markers.push(marker);
                var iwContent = name;

                    var infowindow = new kakao.maps.InfoWindow({
                        zIndex: 1,
                        content: iwContent,
                        // removable: iwRemoveable,
                    });
                    // 생성된 인포윈도우를 배열에 담아줍니다.
                    this.infowindows.push(infowindow);
                    // 인포윈도우, 마커 인덱스
                    var idx = this.infowindows.length - 1;

                    // 마커에 해당하는 인포윈도우 index를 저장합니다.
                    marker.idx = idx;

                    kakao.maps.event.addListener(marker, "click", this.clickListener(this.map, marker, infowindow));
                    kakao.maps.event.addListener(marker, "openLayer", this.openLayer());
                    // kakao.maps.event.addListener(
                    //     marker,
                    //     "click",
                    //     this.distance(marker),
                    // );
                    

                    this.infowindows[idx].close();
    // // 마커가 지도 위에 표시되도록 설정합니다
    // marker.setMap(this.map);  
            },
            setMarkers(map) {
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(map);
                }            
                
            },
            searchBlog(query) {
                let vm=this;
                const headers = {"Authorization" : "KakaoAK 096504c0a62c2eb577aa66eba8fe9158"};
                // const size=5;
                // const query = "서대문골프존";
                // const query =query;
                axios.get("https://dapi.kakao.com/v2/search/blog?query=" + encodeURIComponent(query)+"&size="+5, { headers})
                .then(response => {
                    console.log(response.data.documents);
                    // console.log(response.config.url)
                    vm.totalcount=response.data.meta.total_count;
                    // vm.seachMore=response.data.meta.total_count;
                    vm.blog=response.data.documents
                    }
                    // vm.city=response.data.documents);
                );
                this.seachMore="https://search.daum.net/search?w=blog&q="+encodeURIComponent(query)
            },
            getRandomImg() {
                let randomIdx = Math.floor(Math.random() * 9) + 1;
                this.randomImg = "/images/dummy/place_lg_thumb_" + randomIdx + ".jpg";
            },
            getRandomScore() {
                let randomScore = Math.floor(Math.random() * 5) + 1;
                this.score = randomScore;
            },

            thisLocation(map) {
                let vm = this;
                if (navigator.geolocation) {
                    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var lat = position.coords.latitude, // 위도
                            lon = position.coords.longitude; // 경도
                        // console.log("지금여기"+lat+lon);
                        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                        // message = '<div style="padding:5px;">현재위치입니다</div>'; // 인포윈도우에 표시될 내용입니다
                        vm.locationPos = locPosition;
                        // console.log(vm.locationPos);

                        // var imageSrc =
                        //         "https://toppng.com/uploads/preview/map-point-google-map-marker-gif-11562858751s4qufnxuml.png", // 마커이미지의 주소입니다
                        //     imageSize = new kakao.maps.Size(40, 44), // 마커이미지의 크기입니다
                        //     imageOption = {
                        //         offset: new kakao.maps.Point(27, 69),
                        //     }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                        var marker = new kakao.maps.Marker({
                            // map: map,
                            position: locPosition,
                            // image: new kakao.maps.MarkerImage(
                            //     imageSrc,
                            //     imageSize,
                            //     imageOption,
                            // ),
                        });
                        marker.setMap(map);

                        map.setCenter(locPosition);
                        // 마커와 인포윈도우를 표시합니다
                        // displayMarker(locPosition, message);
                    });
                } else {
                    // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

                    var locPosition = new kakao.maps.LatLng(37.523291, 127.0545508),
                        message = "geolocation을 사용할수 없어요..";

                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: locPosition,
                        // image: new kakao.maps.MarkerImage(
                        //     imageSrc,
                        //     imageSize,
                        //     imageOption,
                        // ),
                    });
                    marker.setMap(map);
                }
            },
            callData() {
                // console.log(golf);
                golf.golfplace.forEach((item) => {
                    if (item.latitude || item.longitude) {
                        if (item.new_addr == null) {
                            item.new_addr = item.old_addr;
                        }
                        this.data.push(item);
                    }
                });

                // console.log(this.data.length);
            },
            
            initMap() {
                var container = document.getElementById("map");
                var options = {
                    center: new kakao.maps.LatLng(37.566826, 126.9786567),
                    level: 4,
                };
                var clickedOverlay = null;
                this.map = new kakao.maps.Map(container, options);
                this.map.setMaxLevel(7);
                this.thisLocation(this.map);
                for (var i = 0; i < this.data.length; i++) {
                this.addMarker(new kakao.maps.LatLng(this.data[i].latitude,this.data[i].longitude),this.data[i].name)
                this.setMarkers(this.map)
                }
                
                // map.setCenter(moveLatLon);
                console.log("데이터로딩 끝");
                // console.log(infowindows);
                // console.log(marker.getPosition());
            },
            clickListener(map, marker, infowindow) {
                
                let vm = this;
                return function() {
                    vm.getRandomImg();
                    vm.getRandomScore();
                    if (vm.selectedWindow == infowindow) {
                        return false;
                    } else {
                        if (!vm.selectedWindow) {
                            vm.selectedWindow = infowindow;
                        } else {
                            vm.selectedWindow.close();
                            vm.selectedWindow = infowindow;
                        }
                        infowindow.open(map, marker);
                    }
                    var list = vm.data;
                    for (var i = 1; i < list.length; i++) {
                        if (infowindow.getContent() == list[i].name) {
                            var info = list[i];
                            vm.info = info;
                            // console.log(vm.info);

                        }
                        // this.searchBlog(vm.info.name);

                    }
                    var pos = marker.getPosition();

                    map.panTo(pos);
                    vm.placePos = pos;
                    document.getElementById('info').style.height="180px";
                    // vm.more=!vm.more;

                    kakao.maps.event.trigger(marker, "openLayer");
                    vm.distance(marker);
                    if(vm.more==true){
                        vm.more=false;
                    }
                    // kakao.maps.event.trigger(marker, "getDistance");

                    // this.data = infowindows.Lf.innerHTML;
                    // console.log(infowindows.getContent());
                };
            },
            distance(marker) {
                var placePos = marker.getPosition();
                // console.log("placePos" + placePos);
                var locationPos = this.locationPos;
                var polyline = new kakao.maps.Polyline({
                    path: [locationPos, placePos],
                });
                var dis = Math.round(polyline.getLength());
                // console.log(dis);
                this.posDistance = dis;
                // console.log(this.posDistance);
                var carTime = (this.posDistance / 450) | 0; //자동차평균 시속 30km(분속 500m)이하

                this.carMin = carTime % 60;


                // console.log(this.carMin);
            },

            showMore() {
                if(this.more==false){ //작을때
                    document.getElementById('info').style.height="400px";
                    // this.searchBlog();
                    this.searchBlog(this.info.name);

                    this.more=!this.more;
                    
                }
                else{ //클때
                    document.getElementById('info').style.height="180px";
                    this.more=!this.more;

                }
                // console.log(this.more);
                
            },
            openLayer() {
                let vm = this;  
                document.getElementById('info').style.height="200px"
                return function() {
                    var el = document.querySelector(".bottomInfo");
                    if (!el.classList.contains("show")) {
                        el.classList.add("show");
                    }
                };
            },
            hideLayer() {
                var el = document.querySelector(".bottomInfo");
                if (el.classList.contains("show")) {
                    el.classList.remove("show");
                }
                this.selectedWindow.close();
                // console.log("요기"+this.more);
                if(this.more==true){
                    this.more=false;
                }
            },
            goTodetail(prodId) {
                let proId = prodId;
                this.$router.push({ name: "Detail", params: { Pid: proId } });
            },
            goBlog(url){
                window.open(url);    
            },
            seachNext(url){
                window.open(url);    
                
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../scss/mapview.scss";
</style>
