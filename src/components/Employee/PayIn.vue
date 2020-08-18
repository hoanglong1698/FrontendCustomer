<template>
  <div class="pay-in">
    <b-container>
      <div class="form">
        <b-form @submit="onSubmit">
          <b-form-group label="Số tài khoản:">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="credit-card"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="accNumber" :state="validationNumber" type="number" required></b-form-input>
              <b-form-invalid-feedback>Số tài khoản có 16 ký tự</b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Số tiền cần nạp: ">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="wallet2"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="amount" :state="validationAmount" required type="number"></b-form-input>
              <b-form-invalid-feedback>Tối thiểu 10.000đ, tối đa 10.000.000đ</b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <div class="d-flex justify-content-center">
            <b-button type="submit" variant="primary">Nạp tiền</b-button>
          </div>

          <b-spinner class="mt-4" v-if="isLoading" label="Loading..."></b-spinner>
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
      accNumber: "",
      amount: "",
      isLoading: false,
    };
  },

  computed: {
    ...mapGetters(["isSucceed", "TotalBalance"]),
    validationNumber() {
      return this.accNumber == ""
        ? null
        : this.accNumber.length == 16
        ? true
        : false;
    },

    validationAmount() {
      return this.amount == ""
        ? null
        : this.amount >= 10000 && this.amount <= 10000000
        ? true
        : false;
    },
  },

  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      this.isLoading = true;
      const data = {
        cardNumber: this.accNumber,
        balance: this.amount,
      };

      await this.$store.dispatch("payIn", data);
      this.isLoading = false;
      if (this.isSucceed === true) {
        const textBalance = "Số dư: " + this.TotalBalance;
        this.$bvToast.toast(textBalance, {
          title: `Nạp tiền thành công`,
          variant: "success",
          solid: true,
        });
      } else {
        this.$bvToast.toast("Vui lòng kiểm tra lại thông tin đã nhập", {
          title: `Nạp tiền thất bại`,
          variant: "danger",
          solid: true,
        });
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
.add-money {
  position: relative;
}
</style>