<template>
  <div class="xtx-bread-item">
    <router-link v-if="to" :to="to"><slot /></router-link>
    <span v-else><slot /></span>
  </div>
</template>
<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: ''
    },
  },
};
</script>