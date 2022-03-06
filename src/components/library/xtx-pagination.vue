<template>
  <div class="xtx-pagination">
    <a
      v-if="myCurrentPage > 1"
      @click="changePage(myCurrentPage - 1)"
      href="javascript:;"
      >上一页</a
    >
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      href="javascript:;"
      @click="changePage(i)"
      :class="{ active: i == myCurrentPage }"
      v-for="i in pager.btnArr"
      :key="i"
      >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      v-if="myCurrentPage < pager.pageCount"
      @click="changePage(myCurrentPage + 1)"
      href="javascript:;"
      >下一页</a
    >
    <a v-else class="disabled" href="javascript:;">下一页</a>
  </div>
</template>
<script>
import { computed, ref, watch } from "vue-demi";
export default {
  name: "xtxPagination",
  props: {
    total: {
      type: Number,
      default: 100,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },

  setup(props, { emit }) {
    const count = 5;

    const myCurrentPage = ref(1);

    const myTotal = ref(100);

    const myPageSize = ref(10);

    const pager = computed(() => {
      var pageCount = Math.ceil(myTotal.value / myPageSize.value);
      const offset = Math.floor(count / 2);

      var start = myCurrentPage.value - offset;
      var end = start + count - 1;

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

    const changePage = (page) => {
      myCurrentPage.value = page;
      emit("current-change", page);
    };

    watch(
      props,
      () => {
        myTotal.value = props.total;
        myPageSize.value = props.pageSize;
        myCurrentPage.value = props.currentPage;
      },
      {
        immediate: true,
      }
    );
    return {
      myCurrentPage,
      pager,
      changePage,
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