<template>
  <div>
    <div class="container">
      <h1 class="text-center mt-4">Đăng Nhập</h1>
      <div class="row myform">
        <form @submit="onLogin" class="col-sm-6 offset-3 p-2">
          <h6 class="checkempty mb-2" v-if="!CorrectAuthInfo">Sai username hoặc password</h6>

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
  computed: {
    ...mapGetters(["CorrectAuthInfo", "Role"]),
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      isLoading: false,
      showerror: false,
      checkcaptcha: false,
    };
  },
  methods: {
    onLogin(event) {
      event.preventDefault();
      this.isLoading = true;
      const data = {
        userName: this.form.username,
        password: this.form.password,
      };
      this.$store.dispatch("login", data);

      var role = localStorage.getItem("role");
      if (role === "EMPLOYER") {
        this.isLoading = false;
        this.$router.push(`/employee`);
      }

      if (role === "ADMIN") {
        this.isLoading = false;
        this.$router.push(`/admin`);
      }

      this.isLoading = false;
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