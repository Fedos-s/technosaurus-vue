<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="decreaseAmount()"
      :disabled = "productAmount === 1"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount" name="count" />

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="increaseAmount()"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productAmount: 1,
    };
  },
  watch: {
    productAmount() {
      this.productAmount = amount;
    },
  },
  props: ['amount'],
  methods: {
    increaseAmount() {
      this.productAmount++;
      this.$emit('update:amount', this.productAmount)
    },
    decreaseAmount() {
      this.productAmount--
      this.$emit('update:amount', this.productAmount)
    },
  }
}
</script>
