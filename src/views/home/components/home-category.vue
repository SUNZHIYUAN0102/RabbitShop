<template>
  <div class="home-category">
    <ul class="menu">
      <li
        v-for="item in menuList"
        :key="item.id"
        @mouseenter="categoryId = item.id"
      >
        <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
        <template v-if="item.children">
          <router-link
            :to="`/category/sub/${sub.id}`"
            v-for="sub in item.children"
            :key="sub.id"
            >{{ sub.name }}</router-link
          >
        </template>
      </li>
    </ul>

    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="item in currCategory.goods" :key="item.id">
          <router-link to="/">
            <img
              :src="item.picture"
              alt=""
            />
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="desc ellipsis">{{item.desc}}</p>
              <p class="price"><i>¥</i>{{item.price}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const brand = reactive({
      id: "brand",
      name: "品牌",
      children: [{ id: "brand-child", name: "品牌推荐" }],
    });

    const menuList = computed(() => {
      const list = store.state.category.list.map((item) => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods,
        };
      });
      list.push(brand);
      return list;
    });

    const categoryId = ref(null);
    const currCategory = computed(() => {
      return menuList.value.find((item) => item.id === categoryId.value);
    });

    return {
      menuList,
      categoryId,
      currCategory
    };
  },
};
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}

.layer {
  width: 990px;
  height: 500px;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 250px;
  top: 0;
  display: none;
  padding: 0 15px;
  h4 {
    font-size: 20px;
    font-weight: normal;
    line-height: 80px;
    small {
      font-size: 16px;
      color: #666;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 310px;
      height: 120px;
      margin-right: 15px;
      margin-bottom: 15px;
      border: 1px solid #eee;
      border-radius: 4px;
      background: #fff;
      &:nth-child(3n) {
        margin-right: 0;
      }
      a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        padding: 10px;
        &:hover {
          background: #e3f9f4;
        }
        img {
          width: 95px;
          height: 95px;
        }
        .info {
          padding-left: 10px;
          line-height: 24px;
          width: 190px;
          .name {
            font-size: 16px;
            color: #666;
          }
          .desc {
            color: #999;
          }
          .price {
            font-size: 22px;
            color: @priceColor;
            i {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
&:hover {
  .layer {
    display: block;
  }
}
</style>