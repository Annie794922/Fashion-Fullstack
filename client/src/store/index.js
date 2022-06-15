import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import productsData from "../../public/data.json"


export default createStore ({
  state: {
    data: productsData,
    productAllApi: "http://localhost:3000/api/getAllProducts",
    cart: [],
  },
  getters: {
    // 取得點選商品的詳細資訊
    getProduct: state => id => {
      return state.data.find (product => product.id === id)
    },
    // 已經加總後的購物車商品數量
    currentQuantity (state) {
      let sum = 0;
      for(var i = 0; i < state.cart.length; i++) {
        sum += state.cart[i].number
        // sum = sum(0) + "cart裡面每一組資料API中的number數量[後來自己新加的API資料]"
      }
      return sum
    },
  },
  mutations: {
    // 加入購物車功能
    addCart (state, data) {
      let isNewProduct = true
      state.cart.map (function (product) {
        if (product.id == data.product.id) {
          product.number += data.number
          isNewProduct = false
        }
        return product
      })

      if (isNewProduct) {
        let newProduct = data.product
        newProduct.number = data.number
        state.cart.push (newProduct)
      }
    },
    // 清空購物車功能
    resetCart (state, data) {
      if (data) {
        state.cart = data;
      }
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState ()]
})
