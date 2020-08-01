<template>
  <div class="home">
    <div>
      <Header />
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Tạo tài khoản khách hàng" active>
            <create-customer-account></create-customer-account>
          </b-tab>

          <b-tab title="Nạp tiền vào tài khoản khách hàng">
            <pay-in></pay-in>
          </b-tab>

          <b-tab title="Xem lịch sử giao dịch khách hàng">
            <trans-history></trans-history>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import CreateCustomerAccount from "../../components/Employee/CreateCustomerAccount.vue";
import PayIn from "../../components/Employee/PayIn.vue";
import TransHistory from "../../components/Employee/TransHistory.vue";
import Header from "@/components/common/Header.vue";
export default {
  name: "Employee",
  components: {
    Header,
    CreateCustomerAccount,
    PayIn,
    TransHistory,
  },

  mounted() {
    this.$bvToast.toast("Xin chào Employee", {
      title: `Đăng nhập thành công`,
      variant: "success",
      solid: true,
    });
  },
};
</script>