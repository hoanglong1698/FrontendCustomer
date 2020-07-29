<template>
  <div class="pay-in">
    <b-container>
      <div class="form">
        <b-form @submit="onSubmit">
          <b-form-group>
            <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
            <b-alert v-if="isSucceed && isAdd" variant="success" show>Nạp tiền thành công</b-alert>
            <b-alert v-if="isSucceed && isAdd" variant="success" show>Số dư: {{TotalBalance}}</b-alert>
            <b-alert
              v-if="!isSucceed && isAdd"
              variant="danger"
              show
            >Nạp tiền thất bại, vui lòng kiểm tra số thẻ và số tiền cần nạp</b-alert>
          </b-form-group>

          <b-form-group label="Số tài khoản:">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="credit-card"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="accNumber" type="number" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Số tiền cần nạp: ">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="wallet2"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="amount" required type="number"></b-form-input>
            </b-input-group>
          </b-form-group>

          <div class="d-flex justify-content-center">
            <b-button type="submit" variant="primary">Nạp tiền</b-button>
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
      accNumber: "",
      amount: "",
      isAdd: false,
      isLoading: false,
    };
  },

  computed: {
    ...mapGetters(["isSucceed", "ErrorMessage", "TotalBalance"]),
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const data = {
        cardNumber: this.accNumber,
        balance: this.amount,
      };

      this.$store.dispatch("payIn", data);
      this.isLoading = true;

      setTimeout(() => {
        this.isAdd = true;
        this.isLoading = false;
      }, 3000);

      setTimeout(() => {
        this.isAdd = false;
      }, 8000);
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