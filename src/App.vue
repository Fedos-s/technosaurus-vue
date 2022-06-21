<template>
  <component :is="currentPageComponent" :page-params="currentPageParams"/>
</template>

<script>
import eventBus from '@/eventBus';
import MainPage from './pages/MainPage.vue';
import ProductPage from './pages/ProducPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  methods: {
    goToPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
  components: { MainPage, ProductPage, NotFoundPage },
  created() {
    eventBus.$on('gotoPage', (pageName, pageParams) => this.goToPage(pageName, pageParams));
  },
};

</script>
