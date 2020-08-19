<template>
  <div>
    <div class="form">
      <b-form>
        <b-button
          class="mb-4"
          v-if="showDelete"
          style="width: 300px"
          v-b-toggle.collapse-1
          variant="outline-danger"
          @click="onClickDelete"
        >Xóa nhân viên</b-button>
        <b-collapse id="collapse-1" class="mt-2" v-model="visibleDelete">
          <b-form-group label="ID nhân viên">
            <b-form-input
              v-model="id"
              type="number"
              readonly
              placeholder="Click trên bảng để chọn NV"
            ></b-form-input>
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
        <b-button
          @click="onClickUpdate"
          v-if="showUpdate"
          style="width: 300px"
          v-b-toggle.collapse-2
          variant="outline-success"
        >Cập nhật thông tin nhân viên</b-button>
        <b-collapse id="collapse-2" class="mt-2" v-model="visibleUpdate">
          <b-form-group label="ID nhân viên">
            <b-form-input
              v-model="id"
              type="number"
              readonly
              placeholder="Click trên bảng để chọn NV"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Họ tên">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="person-lines-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="name"
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
                v-model="email"
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
              <b-form-input v-model="phone" type="number" placeholder="0123456789" required></b-form-input>
              <b-form-invalid-feedback>Số điện thoại không đúng</b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Mật khẩu mới">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="password" required type="password" placeholder="Password"></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Xác nhận mật khẩu">
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="confirmPassword"
                required
                type="password"
                placeholder="Password"
                :state="validation"
              ></b-form-input>
              <b-form-invalid-feedback :state="validation">Mật khẩu không khớp</b-form-invalid-feedback>
            </b-input-group>
            <small v-if="!isMatch">Mật khẩu không khớp</small>
          </b-form-group>

          <b-button style="width: 300px" type="button" variant="success" @click="onUpdate">Cập nhật</b-button>
        </b-collapse>
      </b-form>
    </div>
    <div style="margin-top: 50px">
      <b-button
        v-if="showRefresh"
        style="width: 300px"
        v-b-toggle.collapse-1
        variant="outline-primary"
        @click="onRefresh"
      >Làm mới danh sách nhân viên</b-button>
    </div>

    <div>
      <b-spinner class="mt-3" v-if="isLoading" label="Loading..."></b-spinner>
      <h5 class="mt-3 mb-2">Danh sách nhân viên ngân hàng</h5>
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
      password: "",
      confirmPassword: "",
      isMatch: true,
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
    ...mapGetters(["isSucceed", "ListEmployee"]),

    validation() {
      return this.confirmPassword === this.password;
    },

    validationName() {
      return this.name == "" ? null : this.name.length > 2 ? true : false;
    },

    validationPhone() {
      return this.form.phone == ""
        ? null
        : this.form.phone.length >= 10 && this.form.phone.length <= 11
        ? true
        : false;
    },

    validationEmail: function () {
      if (this.email == "") return null;
      else {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.email);
      }
    },
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

    async onUpdate() {
      if (this.id == "") {
        alert("Vui lòng chọn nhân viên");
        return;
      }
      this.isLoading = true;
      const info = {
        id: this.id,
        email: this.email,
        name: this.name,
        phone: this.phone,
        password: this.password,
        action: "UPDATE",
      };
      await this.$store.dispatch("updateEmployee", info);
      await this.$store.dispatch("getListEmployee");

      if (this.isSucceed === true) {
        this.$bvToast.toast("Làm mới danh sách nhân viên", {
          title: `Cập nhật tài khoản thành công`,
          variant: "success",
          solid: true,
        });
      } else {
        this.$bvToast.toast("Vui lòng kiểm tra lại thông tin đã nhập", {
          title: `Cập nhật tài khoản thất bại`,
          variant: "danger",
          solid: true,
        });
      }

      this.id = "";
      this.name = "";
      this.email = "";
      this.phone = "";
      this.password = "";
      this.confirmPassword = "";
      this.isLoading = false;
      this.showRefresh = !this.showRefresh;
      this.visibleUpdate = !this.visibleUpdate;
      this.showDelete = !this.showDelete;
    },

    async onConfirmDelete() {
      this.isLoading = true;
      await this.$store.dispatch("deleteEmployee", this.id);
      await this.$store.dispatch("getListEmployee");
      this.isLoading = false;
      this.id = "";
      this.showRefresh = !this.showRefresh;
      this.visibleDelete = !this.visibleDelete;
      this.showUpdate = !this.showUpdate;

      if (this.isSucceed === true) {
        this.$bvToast.toast("Xem danh sách nhân viên để biết thêm chi tiết", {
          title: `Xóa tài khoản thành công`,
          variant: "success",
          solid: true,
        });
      } else {
        this.$bvToast.toast("Vui lòng kiểm tra lại thông tin đã nhập", {
          title: `Xóa tài khoản thất bại`,
          variant: "danger",
          solid: true,
        });
      }
    },

    async onRefresh() {
      this.isLoading = true;
      await this.$store.dispatch("getListEmployee");
      this.isLoading = false;
      if (this.isSucceed === true) {
        this.$bvToast.toast("Xem danh sách nhân viên để biết thêm chi tiết", {
          title: `Làm mới danh sách nhân viên thành công`,
          variant: "success",
          solid: true,
        });
      } else {
        this.$bvToast.toast("Vui lòng thử lại sau", {
          title: `Làm mới danh sách nhân viên thất bại`,
          variant: "danger",
          solid: true,
        });
      }
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