<template>
  <div>
    <button @click="fn">Click</button>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  setup() {
    const fn = ()=>{
      request('/home/inVogue/mutli','get')
    }

    return{
      fn
    }
  },
};
</script>