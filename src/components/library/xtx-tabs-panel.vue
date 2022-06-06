<template>
  <div class="xtx-tabs-panel">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'xtxTabsPanel',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
