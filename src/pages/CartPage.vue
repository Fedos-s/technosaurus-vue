<template>
  <div>
    <div v-if="productLoadingFailed">Ошибка загрузки</div>
    <PageLoader v-else-if="productsLoading" />
    <main v-else class="content container">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="index.html"> Каталог </a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> Корзина </a>
          </li>
        </ul>

        <h1 class="content__title">Корзина</h1>
        <span class="content__info">
          {{ products.length }}
          <span v-if="products.length < 5"> товара </span>
          <span v-else> товаров </span>
        </span>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <ul class="cart__list">
              <CartItem
                v-for="item in products"
                :key="item.productId"
                :item="item"
              />
            </ul>
          </div>

          <div class="cart__block">
            <p class="cart__desc">
              Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
            </p>
            <p class="cart__price">
              Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
            </p>

            <router-link tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit" :disabled="products.length === 0">
              Оформить заказ
            </router-link>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import NumberFormat from "@/helpers/numberFormat";
import { mapGetters } from "vuex";
import CartItem from "@/components/CartItem.vue";
import PageLoader from "@/components/PageLoader.vue";

export default {
  filters: { NumberFormat },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
      productsLoading: "cartProductsLoad",
      productLoadingFailed: "cartProductsLoadFailed",
    }),
  },
  components: { CartItem, PageLoader },
};
</script>
