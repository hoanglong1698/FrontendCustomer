<template>
  <div class="register">
    <b-container>
      <div class="form">
        <b-form @submit="onSubmit">
          <b-form-group>
            <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
            <b-alert v-if="isSucceed && isRegister" variant="success" show>Tạo tài khoản thành công</b-alert>
            <b-alert
              v-if="!isSucceed && isRegister"
              variant="danger"
              show
            >Tạo tài khoản thất bại, vui lòng kiểm tra lại thông tin đã nhập</b-alert>
          </b-form-group>

          <b-form-group label="Tên đăng nhập:">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="person-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="form.username" type="text" required placeholder="user123"></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Mật khẩu:">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="form.password" required type="password"></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Xác nhận mật khẩu:">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input required v-model="form.confirmpw" @input="notifyChange" type="password"></b-form-input>
            </b-input-group>
            <small v-if="!isMatch">Mật khẩu không khớp</small>
          </b-form-group>

          <b-form-group label="Họ tên">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="person-lines-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="form.fullname" placeholder="Nguyen Van A" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Số điện thoại">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="phone"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="form.phone" type="number" placeholder="0123456789" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Email:">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="envelope-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="form.email" placeholder="nguyenvana@gmail.com" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Ngày sinh:">
            <b-form-datepicker v-model="form.dob" placeholder="Nhấn để chọn ngày" class="mb-2"></b-form-datepicker>
          </b-form-group>
          <div class="d-flex justify-content-center">
            <b-button type="submit" variant="primary">Thêm nhân viên</b-button>
          </div>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        confirmpw: "",
        fullname: "",
        phone: "",
        email: "",
        dob: "",
      },
      isMatch: true,
      isRegister: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const employee = {
        UserName: this.form.username,
        UserPassword: this.form.password,
        FullName: this.form.fullname,
        Phone: this.form.phone,
        Email: this.form.email,
        DoB: this.form.dob,
      };
      //this.$store.dispatch("addEmployee", employee);
      alert(JSON.stringify(employee));

      setTimeout(() => {
        this.isRegister = true;
      }, 3000);
      setTimeout(() => {
        this.isRegister = false;
      }, 6000);
    },

    notifyChange() {
      if (this.form.confirmpw === this.form.password) {
        this.isMatch = true;
      } else {
        this.isMatch = false;
      }
    },
  },
};
</script>

<style scoped>
.form {
  margin: auto;
  width: 350px;
}
.register {
  position: relative;
}
</style>