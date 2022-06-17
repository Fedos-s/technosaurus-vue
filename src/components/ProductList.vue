<template>
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
 <!-- eslint-disable -->
  <ul class="catalog__list">
    <ProductItem :product="product" v-for="product in products" :key="product.id"/>
  </ul>
</template>

<script>

import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
