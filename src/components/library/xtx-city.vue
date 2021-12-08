<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <div class="loading" v-if="loading"></div>
      <template v-else>
        <span
          class="ellipsis"
          @click="changeItem(item)"
          v-for="item in currList"
          :key="item.code"
          >{{ item.name }}</span
        >
      </template>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
export default {
  name: "xtxCity",
  props: {
    fullLocation: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const visible = ref(false);

    const allCityData = ref([]);

    const loading = ref(false);

    const open = () => {
      visible.value = true;
      loading.value = true;
      getCityData().then((data) => {
        allCityData.value = data;
        loading.value = false;
      });

      for (const key in changeResult) {
        changeResult[key] = "";
      }
    };

    const close = () => {
      visible.value = false;
    };

    const toggle = () => {
      visible.value ? close() : open();
    };

    const target = ref(null);

    onClickOutside(target, () => close());

    const currList = computed(() => {
      let list = allCityData.value;
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find((x) => x.code === changeResult.provinceCode).areaList;
      }

      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find((x) => x.code === changeResult.cityCode).areaList;
      }

      return list;
    });

    const changeResult = reactive({
      provinceCode: "",
      provinceName: "",
      cityCode: "",
      cityName: "",
      countyCode: "",
      countyName: "",
      fullLocation: "",
    });

    const changeItem = (item) => {
      if (item.level === 0) {
        changeResult.provinceCode = item.code;
        changeResult.provinceName = item.name;
      }

      if (item.level === 1) {
        changeResult.cityCode = item.code;
        changeResult.cityName = item.name;
      }

      if (item.level === 2) {
        changeResult.countyCode = item.code;
        changeResult.countyName = item.name;

        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
        close();
        emit("change", changeResult);
      }
    };

    return {
      visible,
      toggle,
      target,
      loading,
      currList,
      changeItem,
    };
  },
};

const getCityData = () => {
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      resolve(window.cityData);
    } else {
      axios
        .get(
          "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
        )
        .then((res) => {
          resolve(res.data);
        });
    }
  });
};
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    margin-left: 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>