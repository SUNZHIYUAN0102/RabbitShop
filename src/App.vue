<template>
  <div>App
    <p>{{$store.state.user}}</p>
  </div>
</template>

<script>
import {useStore} from 'vuex'

export default {
  setup() {
    const store = useStore()

    console.log(store.state.user);
  },
}
</script>