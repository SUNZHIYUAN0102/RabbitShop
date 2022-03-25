<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            @click="changeSku(item, val)"
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
            :class="{ selected: val.selected, disabled: val.disabled }"
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from "@/vender/power-set.js";
const getPathMap = (skus) => {
  const pathMap = {};
  skus.forEach((sku) => {
    if (sku.inventory > 0) {
      const valueArr = sku.specs.map((val) => val.valueName);

      const valueArrPowerSet = powerSet(valueArr);
      valueArrPowerSet.forEach((arr) => {
        const key = arr.join("★");
        if (pathMap[key]) {
          pathMap[key].push(sku.id);
        } else {
          pathMap[key] = [sku.id];
        }
      });
    }
  });

  return pathMap;
};

const getSelectedValues = (specs) => {
  const arr = [];
  specs.forEach((item) => {
    const selectedVal = item.values.find((val) => val.selected);
    arr.push(selectedVal ? selectedVal.name : undefined);
  });

  return arr;
};

const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs);
    item.values.forEach((val) => {
      if (val.selected) return;
      selectedValues[i] = val.name;

      const key = selectedValues.filter((value) => value).join("★");
      val.disabled = !pathMap[key];
    });
  });
};

const initDefaultSelected = (goods, skuId) => {
  const sku = goods.skus.find((sku) => sku.id === skuId);

  goods.specs.forEach((item, i) => {
    const val = item.values.find((val) => val.name === sku.specs[i].valueName);
    val.selected = true;
  });
};

export default {
  props: {
    goods: {
      type: Object,
      default: () => ({}),
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const pathMap = getPathMap(props.goods.skus);
    if (props.skuId) {
      initDefaultSelected(props.goods, props.skuId);
    }

    updateDisabledStatus(props.goods.specs, pathMap);
    const changeSku = (item, val) => {
      if (val.disabled) return;

      if (val.selected) {
        val.selected = !val.selected;
      } else {
        item.values.forEach((element) => {
          element.selected = false;
        });
        val.selected = true;
      }

      updateDisabledStatus(props.goods.specs, pathMap);

      const validSelectedValues = getSelectedValues(props.goods.specs).filter(
        (v) => v
      );
      if (validSelectedValues.length === props.goods.specs.length) {
        const skuIds = pathMap[validSelectedValues.join("★")];
        const sku = props.goods.skus.find((sku) => sku.id === skuIds[0]);
        emit("change", {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs
            .reduce((p, c) => `${p} ${c.name}: ${c.valueName}`, "")
            .trim(),
        });
      } else {
        emit("change", {});
      }
    };

    return {
      changeSku,
    };
  },
};
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>