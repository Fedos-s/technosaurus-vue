<template>
  <BaseFormField :title="title" :error="error">
  <textarea class="form__input form__input--area" v-model="dataValue" :placeholder="placeholder"></textarea>
  </BaseFormField>
</template>

<script>
 import formFielMixin from '@/mixins/formFieldMixin';

  export default {
    mixins: [ formFielMixin ]
  }
</script>
