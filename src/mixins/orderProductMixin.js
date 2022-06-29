import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
    })
  },
}
