<template>
  <div>
    <b-container>
      <div class="form">
        <b-form @submit="onSubmit">
          <b-form-group>
            <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
            <b-alert v-if="isSucceed && isClicked" variant="success" show>Lấy dữ liệu thành công</b-alert>
            <b-alert v-if="!isSucceed && isClicked" variant="danger" show>Lấy dữ liệu thất bại</b-alert>
          </b-form-group>

          <b-form-group label="Số tài khoản:">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="credit-card"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="accountNumber" type="number" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Loại giao dịch:">
            <b-form-select v-model="type" :options="types" required></b-form-select>
          </b-form-group>

          <div class="d-flex justify-content-center">
            <b-button type="submit" variant="primary">Xem</b-button>
          </div>
        </b-form>
      </div>
    </b-container>
    <h4>{{type}}</h4>
    <Table :items="Transactions" :fields="Fields"></Table>
    <br />
  </div>
</template>

<script>
import Table from "../common/Table.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      accountNumber: "",
      isLoading: false,
      isClicked: false,
      Fields: [],
      types: ["Nhận tiền", "Chuyển tiền", "Nhắc nợ"],
    };
  },

  computed: {
    ...mapGetters(["isSucceed", "ErrorMessage", "Transactions"]),
  },

  components: {
    Table,
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.isLoading = true;
      this.Fields = [
        {
          key: "transId",
          label: "Mã giao dịch",
          sortable: false,
        },
        {
          key: "createDate",
          label: "Thời gian",
          sortable: true,
        },
        {
          key: "cardNumber",
          label: "Số tài khoản",
          sortable: false,
        },
        {
          key: "amount",
          label: "Số tiền",
          sortable: false,
        },
        {
          key: "content",
          label: "Nội dung",
          sortable: false,
        },
      ];

      const data = {
        cardNumber: this.accountNumber,
        type: this.type,
      };

      this.$store.dispatch("getTransactions", data);

      setTimeout(() => {
        this.isClicked = true;
        this.isLoading = false;
      }, 2000);
      setTimeout(() => {
        this.isClicked = false;
        this.isAdd = false;
      }, 5000);
    },
  },
};
</script>

<style scoped>
.form {
  margin: auto;
  margin-bottom: 50px;
  width: 350px;
}
</style>