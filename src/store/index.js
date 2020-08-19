import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSucceed: false,
    TotalBalance: '',

    ModalCreateCustomer: {
      userName: '',
      password: '',
      cardNumber: '',
      cardName: '',
    },

    ModalCreateEmployee: {
      userName: '',
      password: '',
      name: '',
      email: '',
      phone: '',
    },

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

    ModalCreateCustomer(state) {
      return state.ModalCreateCustomer;
    },

    ModalCreateEmployee(state) {
      return state.ModalCreateEmployee;
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

    MODAL_CREATE_CUSTOMER(state, payload) {
      state.ModalCreateCustomer = {
        userName: payload.userName,
        password: payload.password,
        cardNumber: payload.account.cardNumber,
        cardName: payload.account.cardName
      };
    },

    MODAL_CREATE_EMPLOYEE(state, payload) {
      state.ModalCreateEmployee = {
        userName: payload.userName,
        password: payload.password,
      };
    },
  },
  actions: {
    async login(ctx, loginInfo) {
      await axios.post('https://i-banking.herokuapp.com/lh-bank/authenticate', {
        userName: loginInfo.userName,
        password: loginInfo.password
      },
        { timeout: 5000, })
        .then(function (response) {
          localStorage.setItem('access_token', response.data.bearerToken);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('serverResponseOnTime', true);
        })
        .catch(function (error) {
          if (error.code == 'ECONNABORTED') {
            localStorage.setItem('serverResponseOnTime', false);
          } else {
            localStorage.setItem('serverResponseOnTime', true);
          }
          localStorage.setItem('isAuthenticated', false);
          console.log(error);
        });
    },

    logout() {
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
          ctx.commit('IS_SUCCEED', true);
          ctx.commit('MODAL_CREATE_CUSTOMER', response.data.data);
        })
        .catch(function (error) {
          ctx.commit('IS_SUCCEED', false);
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
            ctx.commit('TRANSACTIONS', data);
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
          ctx.commit('IS_SUCCEED', true);
          ctx.commit('MODAL_CREATE_EMPLOYEE', response.data.data);
        })
        .catch(function (error) {
          ctx.commit('IS_SUCCEED', false);
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
          ctx.commit('IS_SUCCEED', true);
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
              if (item.merchantId == 2) {
                item.merchantName = "PGP Bank";
              }
              if (item.merchantId == 3) {
                item.merchantName = "RSA Bank";
              }
              return item;
            })
            ctx.commit('PARTNERTRANSACTIONS', result);
          }
          else {
            const data = [
              {
                "content": "Chưa có giao dịch nào !",
              }
            ]
            ctx.commit('PARTNERTRANSACTIONS', data);
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
