import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSucceed: false,
    TotalBalance: '',

    ModalCreateCustomerMessage: '',
    ModalCreateCustomerUsername: '',
    ModalCreateCustomerPassword: '',
    ModalCreateCustomerCardNumber: '',
    ModalCreateCustomerCardName: '',

    ModalCreateEmployeeMessage: '',
    ModalCreateEmployeeUsername: '',
    ModalCreateEmployeePassword: '',
    ModalCreateEmployeeName: '',
    ModalCreateEmployeeEmail: '',
    ModalCreateEmployeePhone: '',
    accessToken: '',
    role: '',
    Transactions: [],
    PartnerTransactions: [],
    ListEmployee: [],
    TotalAmount: 'N/A',
  },

  getters: {
    TotalBalance(state) {
      return state.TotalBalance;
    },
    Transactions(state) {
      return state.Transactions;
    },
    PartnerTransactions(state) {
      return state.PartnerTransactions;
    },
    TotalAmount(state) {
      return state.TotalAmount;
    },
    ListEmployee(state) {
      return state.ListEmployee;
    },
    isSucceed(state) {
      return state.isSucceed
    },

    ModalCreateCustomerMessage(state) {
      return state.ModalCreateCustomerMessage;
    },
    ModalCreateCustomerUsername(state) {
      return state.ModalCreateCustomerUsername;
    },
    ModalCreateCustomerPassword(state) {
      return state.ModalCreateCustomerPassword;
    },
    ModalCreateCustomerCardNumber(state) {
      return state.ModalCreateCustomerCardNumber;
    },
    ModalCreateCustomerCardName(state) {
      return state.ModalCreateCustomerCardName;
    },

    ModalCreateEmployeeMessage(state) {
      return state.ModalCreateEmployeeMessage;
    },
    ModalCreateEmployeeUsername(state) {
      return state.ModalCreateEmployeeUsername;
    },
    ModalCreateEmployeePassword(state) {
      return state.ModalCreateEmployeePassword;
    },
    ModalCreateEmployeeName(state) {
      return state.ModalCreateEmployeeName;
    },
    ModalCreateEmployeeEmail(state) {
      return state.ModalCreateEmployeeEmail;
    },
    ModalCreateEmployeePhone(state) {
      return state.ModalCreateEmployeePhone;
    },
  },

  mutations: {
    IS_SUCCEED(state, payload) {
      state.isSucceed = payload;
    },

    TOTAL_BALANCE(state, payload) {
      state.TotalBalance = payload;
    },

    TRANSACTIONS(state, payload) {
      state.Transactions = payload;
    },

    PARTNERTRANSACTIONS(state, payload) {
      state.PartnerTransactions = payload;
    },

    LISTEMPLOYEE(state, payload) {
      state.ListEmployee = payload;
    },
    TOTALAMOUNT(state, payload) {
      state.TotalAmount = payload;
    },
    MODAL_CREATE_CUSTOMER_MESSAGE(state, payload) {
      state.ModalCreateCustomerMessage = payload;
    },
    MODAL_CREATE_CUSTOMER_USERNAME(state, payload) {
      state.ModalCreateCustomerUsername = payload;
    },
    MODAL_CREATE_CUSTOMER_PASSWORD(state, payload) {
      state.ModalCreateCustomerPassword = payload;
    },
    MODAL_CREATE_CUSTOMER_CARDNUMBER(state, payload) {
      state.ModalCreateCustomerCardNumber = payload;
    },
    MODAL_CREATE_CUSTOMER_CARDNAME(state, payload) {
      state.ModalCreateCustomerCardName = payload;
    },

    MODAL_CREATE_EMPLOYEE_MESSAGE(state, payload) {
      state.ModalCreateEmployeeMessage = payload;
    },
    MODAL_CREATE_EMPLOYEE_USERNAME(state, payload) {
      state.ModalCreateEmployeeUsername = payload;
    },
    MODAL_CREATE_EMPLOYEE_PASSWORD(state, payload) {
      state.ModalCreateEmployeePassword = payload;
    },
    MODAL_CREATE_EMPLOYEE_NAME(state, payload) {
      state.ModalCreateEmployeeName = payload;
    },
    MODAL_CREATE_EMPLOYEE_EMAIL(state, payload) {
      state.ModalCreateEmployeeEmail = payload;
    },
    MODAL_CREATE_EMPLOYEE_PHONE(state, payload) {
      state.ModalCreateEmployeePhone = payload;
    },
  },
  actions: {
    async login(ctx, loginInfo) {
      await axios.post('https://i-banking.herokuapp.com/lh-bank/authenticate', {
        userName: loginInfo.userName,
        password: loginInfo.password
      })
        .then(function (response) {
          localStorage.setItem('access_token', response.data.bearerToken);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('isAuthenticated', true);
        })
        .catch(function (error) {
          localStorage.setItem('isAuthenticated', false);
          console.log(error);
        });
    },

    logout() {
      localStorage.setItem('access_token', '');
      localStorage.setItem('role', '');
      localStorage.setItem('isAuthenticated', false);
      var storage = window.localStorage;
      storage.clear();
    },
    //nạp tiền vào tài khoản
    async payIn(ctx, data) {
      await axios.post('https://i-banking.herokuapp.com/lh-bank/deposit', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      })
        .then(function (response) {
          ctx.commit('IS_SUCCEED', true);
          ctx.commit('TOTAL_BALANCE', response.data.data.totalBalance);
        })
        .catch(function (error) {
          ctx.commit('IS_SUCCEED', false);
          console.log(error);
        });
    },

    async createCustomer(ctx, customer) {
      await axios.post('https://i-banking.herokuapp.com/lh-bank/register', customer, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      })
        .then(function (response) {
          console.log(response.data);
          ctx.commit('IS_SUCCEED', true);
          ctx.commit('MODAL_CREATE_CUSTOMER_MESSAGE', response.data.message);
          ctx.commit('MODAL_CREATE_CUSTOMER_USERNAME', response.data.data.userName);
          ctx.commit('MODAL_CREATE_CUSTOMER_PASSWORD', response.data.data.password);
          ctx.commit('MODAL_CREATE_CUSTOMER_CARDNUMBER', response.data.data.account.cardNumber);
          ctx.commit('MODAL_CREATE_CUSTOMER_CARDNAME', response.data.data.account.cardName);
        })
        .catch(function (error) {
          ctx.commit('IS_SUCCEED', false);
          ctx.commit('MODAL_CREATE_CUSTOMER_MESSAGE', 'Thất bại');
          console.log(error);
        });
    },

    async getTransactions(ctx, data) {
      var url = 'https://i-banking.herokuapp.com/lh-bank/get-transactions/';
      if (data.type == "Nhận tiền") {
        url = url + 'receiver/' + data.cardNumber;
      }
      if (data.type == "Chuyển tiền") {
        url = url + 'send/' + data.cardNumber;
      }
      if (data.type == "Nhắc nợ") {
        url = url + 'debt/' + data.cardNumber;
      }

      await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      })
        .then(function (response) {
          ctx.commit('IS_SUCCEED', true);
          if (response.data.data.transactions != null) {
            ctx.commit('TRANSACTIONS', response.data.data.transactions);
          }
          else {
            const data = [
              {
                "cardNumber": "Chưa có giao dịch nào !",
              }
            ]
            setTimeout(() => {
              ctx.commit('TRANSACTIONS', data);
            }, 1500);

          }
        })
        .catch(function (error) {
          ctx.commit('IS_SUCCEED', false);
          console.log(error);
        });
    },

    async createEmployee(ctx, employee) {
      await axios.post('https://i-banking.herokuapp.com/lh-bank/register-employee', employee, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      })
        .then(function (response) {
          console.log(response.data);
          ctx.commit('IS_SUCCEED', true);
          ctx.commit('MODAL_CREATE_EMPLOYEE_MESSAGE', response.data.message);
          ctx.commit('MODAL_CREATE_EMPLOYEE_USERNAME', response.data.data.userName);
          ctx.commit('MODAL_CREATE_EMPLOYEE_PASSWORD', response.data.data.password);
          ctx.commit('MODAL_CREATE_EMPLOYEE_NAME', employee.name);
          ctx.commit('MODAL_CREATE_EMPLOYEE_EMAIL', employee.email);
          ctx.commit('MODAL_CREATE_EMPLOYEE_PHONE', employee.phone);
        })
        .catch(function (error) {
          ctx.commit('IS_SUCCEED', false);
          ctx.commit('MODAL_CREATE_EMPLOYEE_MESSAGE', 'Thất bại');
          console.log(error);
        });
    },

    async getListEmployee(ctx) {
      await axios.get('https://i-banking.herokuapp.com/lh-bank/get-employee/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      })
        .then(function (response) {
          ctx.commit('IS_SUCCEED', true);
          ctx.commit('LISTEMPLOYEE', response.data.data.employees);
        })
        .catch(function (error) {
          ctx.commit('IS_SUCCEED', false);
          console.log(error);
        });
    },

    async deleteEmployee(ctx, id) {
      await axios.post('https://i-banking.herokuapp.com/lh-bank/update-employee',
        {
          id: id,
          action: "DELETE"
        }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      })
        .then(function (response) {
          console.log(response.data);
          ctx.commit('IS_SUCCEED', true);
        })
        .catch(function (error) {
          ctx.commit('IS_SUCCEED', false);
          console.log(error);
        });
    },

    async updateEmployee(ctx, info) {
      await axios.post('https://i-banking.herokuapp.com/lh-bank/update-employee', info, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      })
        .then(function (response) {
          console.log(response.data);
          ctx.commit('IS_SUCCEED', true);
        })
        .catch(function (error) {
          ctx.commit('IS_SUCCEED', false);
          console.log(error);
        });
    },

    async getPartnerTransaction(ctx, info) {
      var url = '';

      if (info.id == "0") {
        url = 'https://i-banking.herokuapp.com/lh-bank/get-transaction-merchant/' + info.from + ' 00:00:00' + '/' + info.to + ' 23:59:59.999'
      }
      else {
        url = 'https://i-banking.herokuapp.com/lh-bank/get-transaction-merchant/' + info.from + ' 00:00:00' + '/' + info.to + ' 23:59:59.999' + '/' + info.id
      }

      await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      })
        .then(function (response) {
          if (response.data.data.transactions != null) {
            const resTotalAmount = response.data.data.transactions.map(item => item.totalAMount)
            if (resTotalAmount.length == 1) {
              ctx.commit('TOTALAMOUNT', resTotalAmount);
            }
            else {
              ctx.commit('TOTALAMOUNT', "N/A");
            }
            const data = response.data.data.transactions.flatMap(item => item.transactionMerchants)
            const result = data.map(item => {
              if (item.merchantId == 1) {
                item.merchantName = "pgpbank";
              }
              if (item.merchantId == 3) {
                item.merchantName = "HHL Bank";
              }
              return item;
            })
            ctx.commit('IS_SUCCEED', true);
            ctx.commit('PARTNERTRANSACTIONS', result);
          }
          else {
            const data = [
              {
                "content": "Chưa có giao dịch nào !",
              }
            ]
            setTimeout(() => {
              ctx.commit('PARTNERTRANSACTIONS', data);
            }, 1500);

          }
        })
        .catch(function (error) {
          ctx.commit('IS_SUCCEED', false);
          console.log(error);
        });
    },


  },
  modules: {
  }
})
