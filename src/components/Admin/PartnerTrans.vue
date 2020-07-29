<template>
  <div class="form">
    <br />
    <h5>Tất cả giao dịch với ngân hàng đối tác</h5>
    <Table :items="AllTrans"></Table>
    <b-button variant="primary" @click="loadAll">Xem</b-button>


    <div id="time" style="margin-top: 100px">
      <h5>Xem theo khoảng thời gian</h5>
      <b-form-group label="Từ ngày:">
        <b-form-datepicker v-model="from" class="mb-2"></b-form-datepicker>
      </b-form-group>

      <b-form-group label="Đến ngày:">
        <b-form-datepicker v-model="to" class="mb-2"></b-form-datepicker>
      </b-form-group>
      <b-button variant="primary" @click="loadFromTimeToTime">Xem</b-button>
    </div>
    <br />
    <Table :items="TransFromTimeToTime"></Table>

    <div id="partner" style="margin-top: 100px">
      <h5>Xem theo đối tác</h5>
      <b-form-group>
        <b-form-select v-model="partner" :options="options"></b-form-select>
      </b-form-group>
      <b-button variant="primary" @click="loadPartner">Xem</b-button>
    </div>
    <br />
    <Table :items="TransPartner"></Table>

    <div id="amount" style="margin-top: 100px">
      <h5>Tổng số tiền đã giao dịch với đối tác</h5>
      <b-form-group inline>
        <b-form-select v-model="amoutPartner" :options="options"></b-form-select>
      </b-form-group>

      <b-form-group>
        <b-button variant="primary" @click="loadAmount">Xem</b-button>
      </b-form-group>

      <b-form-group>
        <b-form-input readonly :value="PartnerMoney" placeholder="0 VND"></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import Table from "../common/Table.vue";

export default {
  components: {
    Table
  },
  data() {
    return {
      partner: "",
      amoutPartner: "",
      from: "",
      to: "",
      options: [
        { value: "", text: "Chọn ngân hàng" },
        { value: "nganhanga", text: "Ngân hàng A" },
        { value: "nganhangb", text: "Ngân hàng B" }
      ]
    };
  },
  mounted() {
    //this.$store.dispatch("partnerTrans");
  },
  computed: {},
  methods: {
    loadAll() {
      //this.$store.dispatch("partnerTrans");
    },
    loadFromTimeToTime() {
      //   this.$store.dispatch("partnerTransByTime", {
      //     from: this.from,
      //     to: this.to
      //   });
    },
    loadPartner() {
      //this.$store.dispatch("partnerTransByName", this.bank1);
      alert(this.partner);
    },
    loadAmount() {
      //this.$store.dispatch("partnerStatisticMoney", this.bank2);
    }
  }
};
</script>

<style scoped>
.form {
  margin: auto;
  width: 350px;
}
</style>