<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">
        <img
          src="https://image.flaticon.com/icons/svg/2331/2331947.svg"
          width="30"
          height="30"
          class="d-inline-block align-center"
          alt="Kitten"
        />
        LH Bank
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text>Xin chào, {{this.role}}</b-nav-text>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Quản lý tài khoản" right>
            <b-dropdown-item @click="onLogout">Đăng xuất</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CustomHeader",

  data() {
    return {
      role: "",
    };
  },
  mounted() {
    this.role = localStorage.getItem("role");
  },
  computed: {
    ...mapGetters(["Role"]),
  },
  methods: {
    onLogout() {
      //this.$store.dispatch('logout');
      this.$router.push("/login");
      //this.isLogin = false;
    },
  },
};
</script>