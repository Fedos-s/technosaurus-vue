<!-- eslint-disable -->
<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="elColor in product.colors" :key="elColor">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="elColor">
          <span class="colors__value" v-bind:style="{'background-color': elColor}">
          </span>
        </label>
      </li>
     </ul>
  </li>
</template>

<script>
import colors from '../data/colors';

export default {
  data() {
    return {
      color: this.product.colors[0],
    };
  },
  props: ['product'],
  computed: {
    colors() {
      return { colors };
    },
  },
};
</script>
