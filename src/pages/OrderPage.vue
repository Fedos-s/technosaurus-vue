<template>
<div>
  <PageLoader v-if="pageLoading" />
   <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО" :error="formError.name" v-model="formData.name" placeholder="Введите ваше полное имя"/>

            <BaseFormText title="Адрес доставки" :error="formError.address" v-model="formData.address" placeholder="Введите ваш адрес"/>

            <BaseFormText title="Телефон" :error="formError.phone" v-model="formData.phone" placeholder="Введите ваш телефон" type="tel"/>

            <BaseFormText title="Email" :error="formError.email" v-model="formData.email" placeholder="Введи ваш Email" type="email"/>

            <BaseFormTextarea title="Комментарий к заказу" v-model="formData.comment" placeholder="Ваши пожелания" :error="formError.comment" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="product in products" :key="product.product.id">
              <h3>{{ product.product.title }}</h3>
              <b>{{ product.product.price | numberFormat}} ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</div>

</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import NumberFormat from "@/helpers/numberFormat";
import { mapGetters } from "vuex";
import PageLoader from '@/components/PageLoader.vue';

export default {
  filters: { NumberFormat },
  components: { BaseFormText, BaseFormTextarea, PageLoader },
  data() {
    return{
      formData: {},
      formError: {},
      formErrorMessage: '',
      pageLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
    })
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.pageLoading = true;

      axios.post(API_BASE_URL + '/api/orders', {
        ...this.formData
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey
        },
      })
      .then(response => {
        this.pageLoading = false
        this.$store.commit('resetCart');
        this.$store.commit('updateOrderInfo', response.data);
        this.$router.push({name: 'orderInfo', params: {id: response.data.id}});
      })
      .catch(error => {
        this.pageLoading = false
        this.formError = error.response.data.error.request || {};
        this.formErrorMessage = error.response.data.error.message;
      })
    },
  },
}
</script>
