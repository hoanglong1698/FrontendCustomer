<template>
  <div class="home">
    <Header />
    <div>
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Tạo tài khoản nhân viên" active>
              <create-employee-account></create-employee-account>
            </b-tab>
            <b-tab title="Quản lý nhân viên">
              <manage-employee></manage-employee>
            </b-tab>
            <b-tab title="Xem lịch sử giao dịch với đối tác">
              <partner-trans></partner-trans>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import CreateEmployeeAccount from "../../components/Admin/CreateEmployeeAccount.vue";
import ManageEmployee from "../../components/Admin/ManageEmployee.vue";
import PartnerTrans from "../../components/Admin/PartnerTrans.vue";
import Header from '@/components/common/Header.vue'
export default {
  name: "Admin",
  components: {
    Header,
    CreateEmployeeAccount,
    ManageEmployee,
    PartnerTrans
  }
};
</script>