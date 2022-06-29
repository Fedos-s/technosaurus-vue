<template>
<div>
  <PageLoader v-if="loading"/>
  <main v-else-if="failed" class="content container">Заказ не найден</main>
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
        Заказ оформлен <span>№ {{ products.id}}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
               {{ products.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ products.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
               +7 {{ products.phone | acceptNumber}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ products.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="product in products.basket.items" :key="product.product.id">
              <h3>{{ product.product.title }}</h3>
              <b>{{ product.product.price | numberFormat}} ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>

          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ products.basket.items.length }}</b> товара на сумму <b>{{ products.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import PageLoader from '@/components/PageLoader.vue'

export default {
  components: { PageLoader },
  filters: {
    numberFormat,
    acceptNumber(value) {
    	var x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      return value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }
    },
  created() {
    if(this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return;
    };
    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
 computed: {
    products() {
      return this.$store.state.orderInfo
    },
    loading() {
      return this.$store.state.orderInfoLoading
    },
    failed() {
      return this.$store.state.orderInfoLoadingFailed
    }
  },
}
</script>
