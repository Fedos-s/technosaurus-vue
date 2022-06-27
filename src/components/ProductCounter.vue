<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="computedAmount--"
      :disabled = "amount === 1"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number.lazy="computedAmount" name="count" />

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="computedAmount++"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['amount'],
  computed: {
    computedAmount: {
      get() {
        return this.amount
      },
      set(value) {
        let pos = value
        if (pos < 0) {
          pos = 1
        }
        this.$emit('update:amount', pos)
      }
    }
  }
}
</script>
