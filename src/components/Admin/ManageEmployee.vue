<template>
  <div>
    <div class="form">
      <b-form>
        <b-form-group>
          <b-alert v-if="isSucceed && isDeleled" variant="success" show>Xóa tài khoản thành công</b-alert>
          <b-alert v-if="!isSucceed && isDeleled" variant="danger" show>Xóa tài khoản thất bại</b-alert>
        </b-form-group>
        <b-button
          v-if="showDelete"
          style="width: 300px"
          v-b-toggle.collapse-1
          variant="outline-danger"
          @click="onClickDelete"
        >Xóa nhân viên</b-button>
        <b-collapse id="collapse-1" class="mt-2" v-model="visibleDelete">
          <b-form-group label="ID nhân viên">
            <b-form-input v-model="id" type="number" readonly placeholder="ID nhân viên"></b-form-input>
          </b-form-group>

          <b-button
            v-b-modal.modal-confirm
            style="width: 300px"
            class="mb-4"
            type="button"
            variant="danger"
          >Xóa</b-button>
          <div class="m-2">
            <b-modal
              id="modal-confirm"
              ref="modal"
              title="Bạn có chắc chắn muốn làm điều này?"
              @ok="onConfirmDelete"
            >Xóa nhân viên ID: {{this.id}} - {{this.name}}</b-modal>
          </div>
        </b-collapse>
      </b-form>
    </div>
    <div class="form">
      <b-form>
        <b-form-group>
          <b-alert v-if="isSucceed && isUpdate" variant="success" show>Cập nhật tài khoản thành công</b-alert>
          <b-alert v-if="!isSucceed && isUpdate" variant="danger" show>Cập nhật tài khoản thất bại</b-alert>
        </b-form-group>

        <b-button
          @click="onClickUpdate"
          v-if="showUpdate"
          style="width: 300px"
          v-b-toggle.collapse-2
          variant="outline-success"
        >Cập nhật thông tin nhân viên</b-button>
        <b-collapse id="collapse-2" class="mt-2" v-model="visibleUpdate">
          <b-form-group label="ID nhân viên">
            <b-form-input v-model="id" type="number" readonly placeholder="ID nhân viên"></b-form-input>
          </b-form-group>

          <b-form-group label="Họ tên">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="person-lines-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="name" placeholder="Nguyen Van A" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Email">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="envelope-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="email" placeholder="nguyenvana@gmail.com" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Số điện thoại">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="phone"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="phone" type="number" placeholder="0123456789" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-button style="width: 300px" type="button" variant="success" @click="onUpdate">Cập nhật</b-button>
        </b-collapse>
      </b-form>
    </div>
    <b-spinner class="mt-3" v-if="isLoading" label="Loading..."></b-spinner>
    <div style="margin-top: 50px">
      <b-button
        v-if="showRefresh"
        style="width: 300px"
        v-b-toggle.collapse-1
        variant="outline-primary"
        @click="onRefresh"
      >Làm mới danh sách nhân viên</b-button>
      <h5 class="mt-2 mb-2">Danh sách nhân viên ngân hàng</h5>
      <b-table
        striped
        hover
        selectable
        outlined
        :select-mode="selectMode"
        :items="ListEmployee"
        :fields="Fields"
        @row-selected="onRowSelected"
        sticky-header
        head-variant="light"
      ></b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      id: "",
      name: "",
      email: "",
      phone: "",
      isUpdate: false,
      isDeleled: false,
      isLoading: false,
      selectMode: "single",
      Fields: [],
      showRefresh: true,
      showDelete: true,
      showUpdate: true,
      visibleDelete: false,
      visibleUpdate: false,
    };
  },

  computed: {
    ...mapGetters(["isSucceed", "ErrorMessage", "ListEmployee"]),
  },

  mounted() {
    this.Fields = [
      {
        key: "id",
        label: "ID",
        sortable: false,
      },
      {
        key: "name",
        label: "Họ tên",
        sortable: true,
      },
      {
        key: "email",
        label: "Email",
        sortable: false,
      },
      {
        key: "phone",
        label: "Số điện thoại",
        sortable: false,
      },
      {
        key: "userName",
        label: "Username",
        sortable: false,
      },
      {
        key: "createdAt",
        label: "Ngày tạo",
        sortable: true,
      },
    ];

    this.$store.dispatch("getListEmployee");
  },

  methods: {
    onRowSelected(items) {
      this.id = items[0].id;
      this.name = items[0].name;
      this.email = items[0].email;
      this.phone = items[0].phone;
    },

    onUpdate() {
      this.isLoading = true;
      const info = {
        id: this.id,
        email: this.email,
        name: this.name,
        phone: this.phone,
        password: "123456",
        action: "UPDATE",
      };
      this.$store.dispatch("updateEmployee", info);
      
      setTimeout(() => {
        this.$store.dispatch("getListEmployee");
        this.isUpdate = true;
        this.isLoading = false;
      }, 3000);
      setTimeout(() => {
        this.isUpdate = false;
        this.isLoading = false;
      }, 6000);
    },

    onConfirmDelete() {
      this.isLoading = true;
      this.$store.dispatch("deleteEmployee", this.id);
      setTimeout(() => {
        this.$store.dispatch("getListEmployee");
        this.isDeleled = true;
        this.isLoading = false;
      }, 3000);
      setTimeout(() => {
        this.isDeleled = false;
        this.isLoading = false;
      }, 6000);
    },

    onRefresh() {
      this.isLoading = true;
      this.$store.dispatch("getListEmployee");
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },

    onClickDelete() {
      this.showRefresh = !this.showRefresh;
      this.visibleDelete = !this.visibleDelete;
      this.showUpdate = !this.showUpdate;
    },

    onClickUpdate() {
      this.showRefresh = !this.showRefresh;
      this.visibleUpdate = !this.visibleUpdate;
      this.showDelete = !this.showDelete;
    },
  },
};
</script>

<style>
.form {
  width: 300px;
  margin: auto;
}
</style>