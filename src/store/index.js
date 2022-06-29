import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductData: [],

    cartProductsLoading: false,
    cartProductsLoadingFailed: false,

    orderInfo: null,

    orderInfoLoading: false,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductData = [];
    },
    updateCartPoductAmount (state, {productId, amount}) {
      const item = state.cartProducts.find(item => item.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct (state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
    },
    increaseCartAmount (state, productId) {
      const item = state.cartProducts.find(item => item.productId === productId);

      if (item) {
        item.amount++
      }
    },
    decreaseCartAmount (state, productId) {
      const item = state.cartProducts.find(item => item.productId === productId);

      if (item) {
        item.amount--
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductData(state, items) {
      state.cartProductData = items;
    },
    syncCartPoducts(state) {
      state.cartProducts = state.cartProductData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        }
      })
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductData.find(p => item.productId === p.product.id).product
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartProductsLoad(state) {
      return state.cartProductsLoading;
    },
    cartProductsLoadFailed(state) {
      return state.cartProductsLoadingFailed;
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      context.state.orderInfoLoading = true;
      return axios.get(API_BASE_URL + '/api/orders/'+ orderId, {
        params: {
          userAccessKey: context.state.userAccessKey
        },
      })
      .then(response => {
        context.commit('updateOrderInfo', response.data);
        context.state.orderInfoLoading = false;
      })
    },
    loadCart(context) {
      context.state.cartProductsLoading = true;
      context.state.cartProductsLoadingFailed = false;
      console.log(context.state.userAccessKey)
      return axios.get(API_BASE_URL + '/api/baskets', {
        params: {
          userAccessKey: context.state.userAccessKey
        },
      })
        .then(response => {
          if ( !context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateUserAccessKey', response.data.user.accessKey)
          };
          context.commit('updateCartProductData', response.data.items);
          context.commit('syncCartPoducts');
        })
        .catch(() => context.state.cartProductsLoadingFailed = true)
        .then(() => context.state.cartProductsLoading = false)

    },
    addProductToCart(context, {productId, amount}) {
      return axios.post(API_BASE_URL + '/api/baskets/products', {
        productId: productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
      .then(response => {
        context.commit('updateCartProductData', response.data.items)
        context.commit('syncCartPoducts');
      });
    },
    updateCartProductAmount(context, {productId, amount}) {
      context.commit('updateCartPoductAmount', {productId, amount});

      if (amount<1) {
        return;
      };

      return axios.put(API_BASE_URL + '/api/baskets/products', {
        productId: productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
      .then(response => {
        context.commit('updateCartProductData', response.data.items);
      })
      .catch(() => {
        context.commit('syncCartPoducts');
      })
    },
    deleteCartProduct(context, productId) {
      context.commit('deleteCartProduct', productId);
      return axios.delete(API_BASE_URL + '/api/baskets/products',{
        params: {
          userAccessKey: context.state.userAccessKey,
        },
        data: {
          productId,
        }
      })
      .then(response => {
        context.commit('updateCartProductData', response.data.items);
        context.commit('syncCartPoducts');
      })
    }
  },

});
