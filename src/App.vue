<template>
  <div>
    {{$store.state.user.profile.account}}
    <button @click="$store.commit('user/setUser', {account:'dick'})">Click</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    return {

    };
  },
};
</script>