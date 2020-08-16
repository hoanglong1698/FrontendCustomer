<template>
  <div>
    <div class="container">
      <h1 class="text-center mt-4">LH Bank - Đăng nhập</h1>
      <div class="row myform">
        <form @submit="onLogin" class="col-sm-6 offset-3 p-2">
          <b-form-group label="Tên đăng nhập">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="person-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="form.username" type="text" required placeholder="username"></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Mật khẩu:">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="form.password" required type="password" placeholder="password"></b-form-input>
            </b-input-group>
          </b-form-group>
          <div class="d-flex justify-content-center mt-4">
            <button type="submit" class="btn btn-primary">Đăng nhập</button>
          </div>
          <b-spinner class="mt-4" v-if="isLoading" label="Loading..."></b-spinner>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "login",
  components: {},
  mounted() {
    var storage = window.localStorage;
    storage.clear();
  },
  computed: {
    ...mapGetters(["Role"]),
    pageTitle: function () {
      return this.$route.meta.title;
    },
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async onLogin(event) {
      event.preventDefault();
      this.isLoading = true;
      const data = {
        userName: this.form.username,
        password: this.form.password,
      };
      await this.$store.dispatch("login", data);
      if (localStorage.getItem("isAuthenticated") == "true") {
        var role = localStorage.getItem("role");
        if (role === "EMPLOYER") {
          this.isLoading = false;
          this.$router.push(`/employee`);
        }

        if (role === "ADMIN") {
          this.isLoading = false;
          this.$router.push(`/admin`);
        }
      } else {
        this.isLoading = false;
        this.$bvToast.toast("Vui lòng kiểm tra lại thông tin đã nhập", {
          title: `Đăng nhập thất bại`,
          variant: "danger",
          solid: true,
        });
      }
    },
  },
};
</script>

<style>
.container {
  width: 600px;
}
.myform {
  margin-top: 50px;
  width: 631px;
}
.checkempty {
  color: red;
}
</style>