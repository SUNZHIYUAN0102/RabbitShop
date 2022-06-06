<template>
  <div class="member-order">
    <xtx-tabs>
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
export default {
  setup () {}
}
</script>
