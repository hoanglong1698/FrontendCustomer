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

          <vue-recaptcha
            @verify="onVerifyCaptcha"
            @expired="onCaptchaExpired"
            sitekey="6Lejd78ZAAAAAExK1GyM1nDyeOQ0hhXyZ0gnaHB8"
            :loadRecaptchaScript="true"
          ></vue-recaptcha>

          <b-alert
            class="mt-3"
            v-model="showError"
            variant="danger"
            dismissible
          >Vui lòng xác thực captcha!</b-alert>

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
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "login",
  components: { VueRecaptcha },
  computed: {
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
      showError: false,
      isCaptchaVerified: true,
    };
  },
  methods: {
    async onLogin(event) {
      event.preventDefault();
      if (this.isCaptchaVerified) {
        this.isLoading = true;
        const data = {
          userName: this.form.username,
          password: this.form.password,
        };
        await this.$store.dispatch("login", data);
        this.isLoading = false;

        if (localStorage.getItem("serverResponseOnTime") == "true") {
          if (localStorage.getItem("isAuthenticated") == "true") {
            var role = localStorage.getItem("role");
            if (role === "EMPLOYER") {
              this.$router.push(`/employee`);
            }

            if (role === "ADMIN") {
              this.isLoading = false;
              this.$router.push(`/admin`);
            }
          } else {
            this.createToast("Sai tài khoản hoặc mật khẩu");
            return;
          }
        } else {
          this.createToast("Hệ thống gặp lỗi khi đăng nhập hoặc lỗi mạng");
          return;
        }
      } else {
        this.showError = true;
      }
    },

    createToast(message) {
      this.$bvToast.toast(message, {
        title: `Đăng nhập thất bại`,
        variant: "danger",
        solid: true,
      });
    },
    onVerifyCaptcha() {
      this.isCaptchaVerified = true;
      this.showError = false;
    },

    onCaptchaExpired() {
      this.isCaptchaVerified = false;
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