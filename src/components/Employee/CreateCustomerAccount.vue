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

          <b-form-group label="Tên chủ thẻ">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="credit-card"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="form.cardname"
                :state="validationCardName"
                placeholder="Nguyen Van A"
                required
              ></b-form-input>
              <b-form-invalid-feedback>Tên chủ thẻ ít nhất 2 ký tự</b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <div class="d-flex justify-content-center">
            <b-button type="submit" variant="primary">Tạo tài khoản</b-button>
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
                  <p>{{ModalCreateCustomer.userName}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Password:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{ModalCreateCustomer.password}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Số thẻ:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{ModalCreateCustomer.cardNumber}}</p>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <h6 class="mt-0">Tên chủ thẻ:</h6>
                </b-col>
                <b-col sm="9">
                  <p>{{ModalCreateCustomer.cardName}}</p>
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
        email: "",
        phone: "",
        cardname: "",
      },

      isLoading: false,
      showResult: false,
    };
  },

  computed: {
    ...mapGetters(["isSucceed", "ModalCreateCustomer"]),

    validationName() {
      return this.form.name == ""
        ? null
        : this.form.name.length > 2
        ? true
        : false;
    },

    validationCardName() {
      return this.form.cardname == ""
        ? null
        : this.form.cardname.length > 2
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
      evt.preventDefault();
      this.isLoading = true;
      const customer = {
        email: this.form.email,
        name: this.form.name,
        phone: this.form.phone,
        cardName: this.form.cardname,
      };

      await this.$store.dispatch("createCustomer", customer);
      this.isLoading = false;
      if (this.isSucceed === true) {
        this.showResult = true;
        this.createToast(
          "Click Xem thông tin vừa tạo để biết thêm chi tiết",
          "Tạo tài khoản thành công",
          "success"
        );
      } else {
        this.createToast(
          "Tài khoản đã được sử dụng",
          "Tạo tài khoản thất bại",
          "danger"
        );
      }
    },

    printInfo() {
      const doc = new jsPDF("0", "px", "a4");
      doc.setFontSize(18);
      doc.text(
        "LH BANK \n\nThong tin tai khoan \n    Username: " +
          this.ModalCreateCustomer.userName +
          "\n    Password: " +
          this.ModalCreateCustomer.password +
          "\n    So tai khoan: " +
          this.ModalCreateCustomer.cardNumber +
          "\n    Ten chu the: " +
          this.ModalCreateCustomer.cardName +
          "\n\nCam on quy khach da su dung dich vu cua LH Bank!",
        20,
        20
      );
      doc.save(this.ModalCreateCustomer.cardNumber);
    },
    createToast(message, title, variant) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true,
      });
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