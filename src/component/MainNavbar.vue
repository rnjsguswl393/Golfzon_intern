<template>
    <navbar
        position="fixed"
        type="primary"
        :transparent="transparent"
        :color-on-scroll="colorOnScroll"
        menu-classes="ml-auto"
    >
        <template>
            <!-- <router-link v-popover:popover1 class="navbar-brand" to="/"> -->
            <router-link class="navbar-brand" to="/">
                HIT the BALL
            </router-link>
            <el-popover
                ref="popover1"
                popper-class="popover"
                placement="bottom"
                width="200"
                trigger="hover"
            >
                <!-- <div class="popover-body">
          Designed by Invision. Coded by Creative Tim
        </div> -->
            </el-popover>
        </template>
        <template slot="navbar-menu">
            <!-- <li class="nav-item">
        <a
          class="nav-link"
          href="https://www.creative-tim.com/product/vue-now-ui-kit"
          target="_blank"
        >
          <i class="now-ui-icons arrows-1_cloud-download-93"></i>
          <p>Download</p>
        </a>
      </li> -->
            <!-- <drop-down
                tag="li"
                title="HOME"
                icon="now-ui-icons design_app"
                class="nav-item"
            > -->
            <nav-link to="/">
                <i class="now-ui-icons business_chart-pie-36"></i> HOME
            </nav-link>
            <!-- <a
          href="https://demos.creative-tim.com/vue-now-ui-kit/documentation"
          target="_blank"
          class="dropdown-item"
        >
          <i class="now-ui-icons design_bullet-list-67"></i> Documentation
        </a> -->
            <!-- </drop-down> -->
            <!-- <drop-down
                tag="li"
                title="MY PAGE"
                icon="now-ui-icons design_image"
                class="nav-item"
            > -->
            <nav-link to="/MapView">
                <i class="now-ui-icons education_paper"></i> MapView
            </nav-link>
            <!-- <nav-link to="/login">
                    <i class="now-ui-icons users_circle-08"></i> Login
                </nav-link> -->
            <nav-link to="/profile">
                <i class="now-ui-icons users_single-02"></i> Profile
            </nav-link>
            <!-- </drop-down> -->
        </template>
    </navbar>
</template>

<script>
    export default {
        name: "main-navbar",
        props: {
        },
        components: {
            Navbar,
            NavLink,
            [Popover.name]: Popover,
        },
    };
</script>

<style scoped></style>
