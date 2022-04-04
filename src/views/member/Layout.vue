<template>
  <div class="container">
    <app-member-aside></app-member-aside>
    <article class="article">
      <router-view></router-view>
    </article>
  </div>
</template>
<script>
import appMemberAside from '@/components/app-member-aside'
export default {
  components: {
    appMemberAside
  }
}
</script>
<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>