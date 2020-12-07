<template>
    <div class="container_pages">
        <h1 style="padding:10px 150px;font-size:30px;">즐겨찾기</h1>
        <div class="pages">
            
            <b-list-group class="list_bd">
                <b-list-group-item
                    v-for="(item, index) in data"
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

                    <!-- <p class="mb-1">{{ item.call_num }}</p> -->
                    <!-- <p class="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing.</p> -->

                    <!-- <small>Donec id elit non mi porta.</small> -->
                </b-list-group-item>
            </b-list-group>
            <b-list-group v-if="data.length == 0" class="list_bd">
                <h1>즐겨찾는 매장을 등록해주세요!</h1>
            </b-list-group>
        </div>
    </div>
</template>
<script>
    export default {
        // props: ["propsdata"],
        data() {
            return {
                data: [],
            };
        },
        mounted() {
            // console.log(this.data.name.length);
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) != "loglevel:webpack-dev-server") {
                    // this.data.name.push(localStorage.key(i));
                    this.data.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
                // console.log(localStorage.key(i));
            }
        },
        methods: {
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
