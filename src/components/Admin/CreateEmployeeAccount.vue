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

          <b-form-group label="Họ tên">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="person-lines-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="form.name" placeholder="Nguyen Van A" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Email">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="envelope-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="form.email" placeholder="nguyenvana@gmail.com" required></b-form-input>
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

          <div class="d-flex justify-content-center">
            <b-button type="submit" variant="primary">Thêm nhân viên</b-button>
          </div>

          <div class="m-2">
            <b-button
              v-if="isSucceed && !isLoading"
              v-b-modal.modal-prevent-closing
            >Xem thông tin tài khoản vừa tạo</b-button>

            <b-modal
              id="modal-prevent-closing"
              ref="modal"
              title="Kết quả đăng ký"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleOk"
            >
              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Trạng thái:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{ModalCreateEmployeeMessage}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Username:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{ModalCreateEmployeeUsername}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Password:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{ModalCreateEmployeePassword}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Họ tên:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{ModalCreateEmployeeName}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Email:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{ModalCreateEmployeeEmail}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Điện thoại:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{ModalCreateEmployeePhone}}</p>
                </b-col>
              </b-row>
            </b-modal>
          </div>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        email: "",
      },
      isRegister: false,
      isLoading: false,
    };
  },

  computed: {
    ...mapGetters([
      "isSucceed",
      "ErrorMessage",
      "ModalCreateEmployeeMessage",
      "ModalCreateEmployeeUsername",
      "ModalCreateEmployeePassword",
      "ModalCreateEmployeeName",
      "ModalCreateEmployeeEmail",
      "ModalCreateEmployeePhone",
    ]),
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const employee = {
        email: this.form.email,
        name: this.form.name,
        phone: this.form.phone,
      };

      this.$store.dispatch("createEmployee", employee);
      this.isLoading = true;

      setTimeout(() => {
        this.isRegister = true;
        this.isLoading = false;
      }, 3000);
      setTimeout(() => {
        this.isRegister = false;
      }, 7000);
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