<template>
  <div class="register">
    <b-container>
      <div class="form">
        <b-form @submit="onSubmit">
          <b-form-group label="Họ tên">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="person-lines-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="form.name"
                :state="validationName"
                placeholder="Nguyen Van A"
                required
              ></b-form-input>
              <b-form-invalid-feedback>Họ tên ít nhất 2 ký tự</b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Email">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="envelope-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="form.email"
                :state="validationEmail"
                placeholder="nguyenvana@gmail.com"
                required
              ></b-form-input>
              <b-form-invalid-feedback>Email không đúng định dạng</b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Số điện thoại">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="phone"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="form.phone"
                :state="validationPhone"
                type="number"
                placeholder="0123456789"
                required
              ></b-form-input>
              <b-form-invalid-feedback>Số điện thoại không đúng</b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <div class="d-flex justify-content-center">
            <b-button type="submit" variant="primary">Thêm nhân viên</b-button>
          </div>

          <b-spinner class="mt-4" v-if="isLoading" label="Loading..."></b-spinner>

          <div class="m-2">
            <b-button
              v-if="isSucceed && showResult"
              v-b-modal.modal-prevent-closing
            >Xem thông tin tài khoản vừa tạo</b-button>

            <b-modal id="modal-prevent-closing" ref="modal" title="Kết quả đăng ký" @ok="printInfo">
              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Username:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{ModalCreateEmployee.userName}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Password:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{ModalCreateEmployee.password}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Họ tên:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{form.name}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Email:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{this.form.email}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Điện thoại:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{this.form.phone}}</p>
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
import { jsPDF } from "jspdf";
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        email: "",
      },
      isLoading: false,
      showResult: false,
    };
  },

  computed: {
    ...mapGetters(["isSucceed", "ModalCreateEmployee"]),

    validationName() {
      return this.form.name == ""
        ? null
        : this.form.name.length > 2
        ? true
        : false;
    },

    validationPhone() {
      return this.form.phone == ""
        ? null
        : this.form.phone.length >= 10 && this.form.phone.length <= 11
        ? true
        : false;
    },

    validationEmail: function () {
      if (this.form.email == "") return null;
      else {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.form.email);
      }
    },
  },

  methods: {
    async onSubmit(evt) {
      this.showResult = false;
      this.isLoading = true;
      evt.preventDefault();
      const employee = {
        email: this.form.email,
        name: this.form.name,
        phone: this.form.phone,
      };

      await this.$store.dispatch("createEmployee", employee);

      this.isLoading = false;
      if (this.isSucceed === true) {
        this.$bvToast.toast(
          "Click Xem thông tin vừa tạo để biết thêm chi tiết",
          {
            title: `Tạo tài khoản thành công`,
            variant: "success",
            solid: true,
          }
        );

        this.showResult = true;
      } else {
        this.$bvToast.toast("Vui lòng kiểm tra lại thông tin đã nhập", {
          title: `Tạo tài khoản thất bại`,
          variant: "danger",
          solid: true,
        });
      }
    },

    printInfo() {
      const doc = new jsPDF("0", "px", "a4");
      doc.setFontSize(18);
      doc.text(
        "LH BANK \n\nThong tin tai khoan nhan vien \n    Username: " +
          this.ModalCreateEmployee.userName +
          "\n    Password: " +
          this.ModalCreateEmployee.password +
          "\n    Ho ten: " +
          this.form.name +
          "\n    Email: " +
          this.form.email +
          "\n    Dien thoai: " +
          this.form.phone,
        20,
        20
      );
      doc.save("NV_" +this.ModalCreateEmployee.userName);
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