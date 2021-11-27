<template>
  <div class="sub-category">
    <div class="container">
      <sub-bread></sub-bread>
      <sub-filter></sub-filter>
      <xtx-checkbox v-model="isAllChecked">hh</xtx-checkbox>{{isAllChecked}}
    </div>
  </div>
</template>

<script>
import subBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
import { ref } from "vue";
export default {
  setup() {
    const isAllChecked = ref(true);

    return{
        isAllChecked
    }
  },
  components: {
    subBread,
    SubFilter,
  },
};
</script>