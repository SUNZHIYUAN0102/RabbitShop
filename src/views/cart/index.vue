<template>
  <div class="xtx-cart-page">
    <div class="container">
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item>购物车</xtx-bread-item>
      </xtx-bread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <xtx-checkbox
                  @change="checkAll"
                  :modelValue="$store.getters['cart/isCheckAll']"
                  >全选</xtx-checkbox
                >
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="$store.getters['cart/validList'].length == 0">
              <td colspan="6">
                <cart-none></cart-none>
              </td>
            </tr>
            <tr
              v-else
              v-for="goods in $store.getters['cart/validList']"
              :key="goods.skuId"
            >
              <td>
                <xtx-checkbox
                  :modelValue="goods.selected"
                  @change="($event) => checkOne(goods.skuId, $event)"
                />
              </td>
              <td>
                <div class="goods">
                  <router-link :to="`/product/${goods.id}`"
                    ><img :src="goods.picture" alt=""
                  /></router-link>
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
                <p v-if="goods.price - goods.nowPrice > 0">
                  比加入时降价
                  <span class="red"
                    >&yen;{{ goods.price - goods.nowPrice }}</span
                  >
                </p>
              </td>
              <td class="tc">
                <xtx-numbox :modelValue="goods.count" />
              </td>
              <td class="tc">
                <p class="f16 red">
                  &yen;{{
                    (Math.round(goods.nowPrice) * 100 * goods.count) / 100
                  }}
                </p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p>
                  <a
                    @click="deleteCart(goods.skuId)"
                    class="green"
                    href="javascript:;"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>

          <tbody v-if="$store.getters['cart/invalidList'].length">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr
              v-for="goods in $store.getters['card/invalidList']"
              :key="goods.skuId"
            >
              <td><xtx-checkbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <router-link to="/"
                    ><img :src="goods.picture" alt=""
                  /></router-link>
                  <div>
                    <p class="name ellipsis">
                      {{ goods.name }}
                    </p>
                    <p class="attr">{{ goods.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
              </td>
              <td class="tc">{{ goods.count }}</td>
              <td class="tc">
                <p>
                  &yen;{{
                    (Math.round(goods.nowPrice) * 100 * goods.count) / 100
                  }}
                </p>
              </td>
              <td class="tc">
                <p>
                  <a
                    @click="deleteCart(goods.skuId)"
                    class="green"
                    href="javascript:;"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="action">
        <div class="batch">
          <xtx-checkbox
            @change="checkAll"
            :modelValue="$store.getters['cart/isCheckAll']"
            >全选</xtx-checkbox
          >
          <a href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters["cart/validTotal"] }} 件商品，已选择
          {{ $store.getters["cart/selectedTotal"] }} 件，商品合计：
          <span class="red">¥{{ $store.getters["cart/selectedAmount"] }}</span>
          <xtx-button type="primary">下单结算</xtx-button>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <goods-relevant></goods-relevant>
    </div>
  </div>
</template>
<script>
import goodRelevant from "@/views/goods/components/goods-relevant";
import { useStore } from "vuex";
import Message from "@/components/library/Message";
import cartNone from "./components/cart-none";
import Confirm from "@/components/library/Confirm";
export default {
  components: { goodRelevant, cartNone },
  setup() {
    var store = useStore();
    const checkOne = (skuId, selected) => {
      store.dispatch("cart/updateCart", { skuId, selected });
    };

    const checkAll = (selected) => {
      store.dispatch("cart/checkAllCart", selected);
    };

    const deleteCart = (skuId) => {
      Confirm({ text: "亲，您是否确认删除当前商品" })
        .then(() => {
          store.dispatch("cart/deleteCart", skuId).then(() => {
            Message({ type: "success", text: "删除成功" });
          });
        })
        .catch((e) => {
          console.log("no");
        });
    };

    return {
      checkOne,
      checkAll,
      deleteCart,
    };
  },
};
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>