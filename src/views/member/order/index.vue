<template>
  <div class="member-order">
    <xtx-tabs v-model="activeName" @tab-click="changeTab">
      <xtx-tabs-panel
        v-for="i in 5"
        :key="i"
        :label="`选项卡${i}`"
        :name="`name${i}`"
        >内容{{ i }}</xtx-tabs-panel
      >
    </xtx-tabs>
  </div>
</template>

<script>
import { ref } from 'vue-demi'
export default {
  setup () {
    const activeName = ref('name2')

    const changeTab = (tab) => {
      console.log(tab)
    }

    return {
      activeName,
      changeTab
    }
  }
}
</script>
