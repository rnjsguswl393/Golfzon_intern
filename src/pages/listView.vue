<template>
    <div class="container_pages">
        <div class="pages">
            <div class="list_hd">
                <div class="items animate__animated animate__backInDown" >
                    <b-form-group>
                        <b-form-checkbox-group v-model="current" :options="options" switches size="sm"></b-form-checkbox-group>
                    </b-form-group>
                </div>
            </div>
          <topTwo ></topTwo>
            <!-- 부가시설필터 -->
            <b-list-group id="list_bd" class="list_bd" style="margin-bottom: 60px;">
            <h1 style="width:100%">리스트 보기</h1>
                
                <b-list-group-item
                    v-for="(item, index) in $options.filters.fil(slicedata, current)"
                    :key="index"
                    @click="goTodetail(item.name)"
                    class="flex-column align-items-start"
                >
                    <img :src="item.img" class="thumb_list" :alt="item.name" />
                    <div class="w-100 justify-content-between shop_info">
                        <h5>{{ item.name }}</h5>
                        <p style="font-size:13px;margin-top:6px;">{{ item.call_num }}</p>
                        <p style="font-size:13px;color:#666;">
                            <span>{{ item.week_open }}~{{ item.week_close }} / </span>
                            <span>{{ item.carry_dist }}m ({{ item.hit_spot }}석)</span>
                        </p>
                    </div>
                    <!-- {{ item.dis }} -->
                    <small>
                        <b-badge v-if="item.parking" variant="danger">주차가능</b-badge>
                        <b-badge v-if="item.rent" variant="warning">장비대여</b-badge>
                        <b-badge v-if="item.shower" variant="info">샤워시설</b-badge>
                        <b-badge v-if="item.lesson" variant="success">레슨가능 프로 {{ item.lesson }}명</b-badge>
                        <b-badge v-if="item.indoor" class="badge_custom_2">실내</b-badge>
                        <b-badge v-if="item.indoor == false" class="badge_custom_1" style="backgroud:black">실외</b-badge>
                        <!-- <b-badge v-if="item.new_addr" variant="danger">실내</b-badge> -->
                    </small>
                    
                </b-list-group-item>
            <infinite-loading style="height:120px" @infinite="inifinteHandler" spinner="waveDots"></infinite-loading>

            </b-list-group>
            
        </div>
        
    </div>
</template>
<script>
    import golf from "../../public/dummy.json";
    import InfiniteLoading from 'vue-infinite-loading';
    import topTwo from "../component/TopTwo.vue";

    export default {
        name: "list",
        components: {InfiniteLoading,topTwo},
        data() {
            return {
                isScrollable: true,
                maxHeight: 200,
                data: [],
                // sortdata: [],
                slicedata:[],
                // limit:1,
                options: [
                    { value: -1, text: "실내" },
                    { value: 0, text: "레슨가능" },
                    { value: 1, text: "샤워시설" },
                    { value: 2, text: "장비대여" },
                    { value: 3, text: "주차가능" },
                ],
                current: [],
                page:1
            };
        },

        mounted() {
            this.callData();
            if (window.kakao && window.kakao.maps) {
                this.thisLocation();
            } else {
                const script = document.createElement("script");

                script.onload = () => kakao.maps.load(this.thisLocation);
                script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=4ff9af170258a825316e7777898cd18e";
                document.head.appendChild(script);
            }
            console.log(this.data)
            // console.log(this.sortdata)
        },
        filters: {
            fil(val, select) {
                // console.log("TEST", val);
                // console.log(select);
                var datas = [];

                val.forEach((item) => {
                    // let randomIdx = Math.floor(Math.random() * 9) + 1;
                    // item.img = "/images/dummy/place_lg_thumb_" + randomIdx + ".jpg";
                    if (select.length == 0) {
                        datas.push(item);
                        // let randomIdx = Math.floor(Math.random() * 9) + 1;
                        // item.img = "/images/dummy/place_lg_thumb_" + randomIdx + ".jpg";
                    } else {
                        if (select.includes(-1)) {
                            if (item.indoor) {
                                datas.push(item);
                            }
                        }
                        if (select.includes(0)) {
                            if (item.lesson) {
                                datas.push(item);
                            }
                        }
                        if (select.includes(1)) {
                            if (item.shower) {
                                datas.push(item);
                            }
                        }
                        if (select.includes(2)) {
                            if (item.rent) {
                                datas.push(item);
                            }
                        }
                        if (select.includes(3)) {
                            if (item.parking) {
                                datas.push(item);
                            }
                        }
                        if (select.includes(4)) {
                            if (item.valet) {
                                datas.push(item);
                            }
                        }
                    }
                });
                // console.log(datas);
                // console.log(select);
                var test, test2, test3, test4;
                if (select.length == 2) {
                    test = datas.filter((item, index) => datas.indexOf(item) !== index);
                    // console.log(test);
                    return test; //2개필터 가능
                    // var set = new Set(test);
                    // console.log(set.size);
                    // return set;
                } else if (select.length == 3) {
                    test = datas.filter((item, index) => datas.indexOf(item) !== index);
                    test2 = test.filter((item, index) => test.indexOf(item) !== index);
                    // console.log(test2);
                    return test2;
                } else if (select.length == 4) {
                    test = datas.filter((item, index) => datas.indexOf(item) !== index);
                    test2 = test.filter((item, index) => test.indexOf(item) !== index);
                    test3 = test2.filter((item, index) => test2.indexOf(item) !== index);
                    // console.log(test3);
                    return test3;
                } else if (select.length == 5) {
                    test = datas.filter((item, index) => datas.indexOf(item) !== index);
                    test2 = test.filter((item, index) => test.indexOf(item) !== index);
                    test3 = test2.filter((item, index) => test2.indexOf(item) !== index);
                    test4 = test3.filter((item, index) => test3.indexOf(item) !== index);
                    // console.log(test4);
                    return test4;
                } else {
                    return datas; //전체출력
                }
            },
        },
        methods: {
            callData() {
                // console.log(golf);
                golf.golfplace.forEach((item) => {
                    if (item.latitude || item.longitude) {
                        if (item.new_addr == null) {
                            item.new_addr = item.old_addr;
                        }
                        this.data.push(item);
                        let randomIdx = Math.floor(Math.random() * 9) + 1;
                        item.img = "/images/dummy/place_lg_thumb_" + randomIdx + ".jpg";
                    }
                });
                // console.log(this.data.length);
            },
            getData(page){
                // console.log( this.slicedata)
                let startNum = (page-1) * 10;
                let endNum = page * 10;
                let vm = this;
                
                return new Promise(function(resolve, reject) {
                    resolve(vm.data.slice(startNum, endNum));
                });
            },
            inifinteHandler($state) {
            setTimeout(() => {
                let vm = this;

                this.getData(this.page).then(function(data){
                    console.log(data);
                    if(data.length){
                        vm.page += 1;
                        vm.slicedata.push(...data);
                        $state.loaded();
                    }else{
                        $state.complete();
                    }
                    
                })
                console.log( this.slicedata)
            }, 2000)
            },
            sortData(a, b) {
                if (a.dis == b.dis) {
                    return 0;
                }
                return a.dis > b.dis ? 1 : -1;
            },
            goTodetail(prodId) {
                let proId = prodId;
                this.$router.push({ name: "Detail", params: { Pid: proId } });
            },
            thisLocation() {
                let vm = this;
                if (navigator.geolocation) {
                    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var lat = position.coords.latitude, // 위도
                            lon = position.coords.longitude; // 경도
                        // console.log("지금여기"+lat+lon);
                        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                        vm.data.filter((item) => {
                            var placePos = new kakao.maps.LatLng(item.latitude, item.longitude);
                            // return placePos;
                            // console.log(placePos);
                            // console.log(locPosition);
                            var polyline = new kakao.maps.Polyline({
                                path: [locPosition, placePos],
                            });
                            var dis = Math.round(polyline.getLength());
                            // console.log(dis);
                            item.dis = dis;
                            // vm.posDistance.push(dis);
                            // console.log(item);
                        });
                        vm.data.sort(vm.sortData);
                        // vm.sortdata = vm.data.sort(vm.sortData);
                        // vm.slicedata=vm.sortdata.slice((vm.limit - 1) * 8,vm.limit * 8)
                        // console.log(vm.slicedata)
                        // console.log(vm.posDistance.length);
                    });
                        // vm.sortdata = vm.data.sort(vm.sortData);
                        // console.log(vm.sortdata[0])
                } else {
                    // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                    
                    var locPosition = new kakao.maps.LatLng(37.523291, 127.0545508),
                        message = "geolocation을 사용할수 없어요..";
                }
            },
            
        },
    };
</script>

<style lang="scss" scoped>
    @import "../scss/listview.scss";
</style>
