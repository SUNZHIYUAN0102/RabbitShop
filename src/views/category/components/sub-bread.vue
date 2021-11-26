<template>
  <xtx-bread>
    <xtx-bread-item to="/">首页</xtx-bread-item>
    <xtx-bread-item v-if="category.top" :to="`/category/${category.top.id}`">{{
      category.top.name
    }}</xtx-bread-item>
    <transition name="fade-right" mode="out-in">
      <xtx-bread-item v-if="category.sub" :key="category.sub.id">{{
        category.sub.name
      }}</xtx-bread-item>
    </transition>
  </xtx-bread>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const category = computed(() => {
      const cate = {};
      store.state.category.list.forEach((top) => {
        if (top.children) {
          const sub = top.children.find((sub) => sub.id === route.params.id);
          if (sub) {
            cate.top = { id: top.id, name: top.name };
            cate.sub = { id: sub.id, name: sub.name };
          }
        }
      });
      return cate;
    });

    return {
        category
    }
  },
};
</script>

<style lang="less" scoped>
</style>