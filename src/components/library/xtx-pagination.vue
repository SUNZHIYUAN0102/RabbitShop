<template>
  <div class="xtx-pagination">
    <a
      v-if="myCurrentPage > 1"
      @click="myCurrentPage = myCurrentPage - 1"
      href="javascript:;"
      >上一页</a
    >
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      href="javascript:;"
      @click="myCurrentPage = i"
      :class="{ active: i == myCurrentPage }"
      v-for="i in pager.btnArr"
      :key="i"
      >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      v-if="myCurrentPage < pager.pageCount"
      @click="myCurrentPage = myCurrentPage + 1"
      href="javascript:;"
      >下一页</a
    >
    <a v-else class="disabled" href="javascript:;">下一页</a>
  </div>
</template>
<script>
import { computed, ref } from "vue-demi";
export default {
  name: "xtxPagination",

  setup() {
    const count = 5;

    const myCurrentPage = ref(7);

    const myTotal = ref(100);

    const myPageSize = ref(10);

    const pager = computed(() => {
      const pageCount = Math.ceil(myTotal.value / myPageSize.value);
      const offset = Math.floor(count / 2);

      let start = myCurrentPage.value - offset;
      let end = start + count - 1;

      if (start < 1) {
        start = 1;
        end = start + count - 1 > pageCount ? pageCount : start + count - 1;
      }

      if (end > pageCount) {
        end = pageCount;
        start = end - count + 1 < 1 ? 1 : end - count + 1;
      }

      const btnArr = [];

      for (let i = start; i <= end; i++) {
        btnArr.push(i);
      }
      return { pageCount, btnArr, start, end };
    });

    return {
      myCurrentPage,
      pager,
    };
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>