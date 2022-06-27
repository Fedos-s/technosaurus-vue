<template>
    <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :priceFrom.sync="filterPriceFrom" :priceTo.sync="filterPriceTo" :categoryId.sync="filterCategoryId" :productColorId.sync="filterColorId"/>

      <section class="catalog">
        <PageLoader v-if="productsLoading"/>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке<button @click.prevent="loadProducts">Попробовать еще раз</button></div>
        <ProductList :products="products"/>

        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>

    </div>
  </main>

</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import PageLoader from '@/components/PageLoader.vue'

export default {
  components: { ProductList, BasePagination, ProductFilter, PageLoader },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 50000,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 3,

      productData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productData
      ? this.productData.items.map(product => {
        return {
          ...product,
          image:  product.image.file.url,
        };
      })
      : [];
    },
    countProducts() {
       return this.productData
       ? this.productData.pagination.total
       : 0
    },
  },
  methods: {
    loadProducts() {
      this.productsLoadingFailed = false;
      this.productsLoading = true;
      clearTimeout(this.loadProductsTimer);
    this.loadProductsTimer = setTimeout(() => {
       axios.get(API_BASE_URL + `/api/products`, {
        params: {
          page: this.page,
          limit: this.productsPerPage,
          categoryId: this.filterCategoryId,
          minPrice: this.filterPriceFrom,
          maxPrice: this.filterPriceTo,
          colorId: this.filterColorId,
        }
      })
        .then(response => this.productData = response.data)
        .catch(() => this.productsLoadingFailed = true)
        .then(() => this.productsLoading = false);
     }, 0);
    }
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId(){
      this.loadProducts();
    },
    filterPriceFrom(){
      this.loadProducts();
    },
    filterPriceTo(){
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    }
  },
  created() {
    this.loadProducts();
  }
};

</script>
