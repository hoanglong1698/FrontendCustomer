<template>
  <div>
    <div id="time" class="form">
      <b-form-group label="Từ ngày">
        <b-form-datepicker v-model="from" class="mb-2" placeholder="Bấm để chọn ngày"></b-form-datepicker>
      </b-form-group>

      <b-form-group label="Đến ngày">
        <b-form-datepicker v-model="to" class="mb-2" placeholder="Bấm để chọn ngày"></b-form-datepicker>
      </b-form-group>

      <b-form-group label="Chọn đối tác">
        <b-form-select v-model="partner" :options="options"></b-form-select>
      </b-form-group>
      <b-button variant="primary" @click="loadPartnerTransaction">Xem</b-button>
    </div>
    <br />

    <b-spinner v-if="isLoading" label="Loading..."></b-spinner>

    <div v-if="isSucceed && isClicked">
      <h5>Lịch sử giao dịch</h5>
      <Table :items="PartnerTransactions" :fields="Fields"></Table>
      <div id="amount" class="form mt-4 mb-5">
        <h5>Tổng số tiền đã giao dịch với đối tác</h5>
        <b-form-input readonly :value="TotalAmount + ' VND'" placeholder="0 VND"></b-form-input>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../common/Table.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Table,
  },
  data() {
    return {
      partner: "0",
      from: "",
      to: "",
      options: [
        { value: "0", text: "Tất cả" },
        { value: "1", text: "Ngân hàng pgpbank" },
        { value: "3", text: "Ngân hàng HHL Bank" },
      ],
      isLoading: false,
      Fields: [],
      isClicked: false,
    };
  },

  mounted() {
    this.Fields = [
      {
        key: "senderCard",
        label: "STK gửi",
        sortable: false,
      },
      {
        key: "receiverCard",
        label: "STK nhận",
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
      {
        key: "createDate",
        label: "Ngày tạo",
        sortable: true,
      },
      {
        key: "merchantName",
        label: "Tên ngân hàng",
        sortable: true,
      },
    ];
  },

  computed: {
    ...mapGetters([
      "isSucceed",
      "ErrorMessage",
      "PartnerTransactions",
      "TotalAmount",
    ]),
  },

  methods: {
    loadPartnerTransaction() {
      if (this.from >= this.to) {
        alert("Sai ngày bắt đầu. Vui lòng chọn lại");
        return;
      }

      this.isLoading = true;
      this.isClicked = true;

      setTimeout(() => {
        this.isLoading = false;
        this.$store.dispatch("getPartnerTransaction", {
          from: this.from,
          to: this.to,
          id: this.partner,
        });
        if (this.$store.state.isSucceed === true) {
          this.$bvToast.toast("Xem chi tiết tại bảng lịch sử giao dịch", {
            title: `Lấy dữ liệu thành công`,
            variant: "success",
            solid: true,
          });
        } else {
          this.$bvToast.toast("Vui lòng thử lại sau", {
            title: `Lấy dữ liệu thất bại`,
            variant: "danger",
            solid: true,
          });
        }
      }, 1500);
    },
  },
};
</script>

<style scoped>
.form {
  margin: auto;
  width: 350px;
}
</style>