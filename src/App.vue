<template>
  <div>
    App
    <p>{{$store.state.moduleA.userName}}</p>
    <p>{{$store.getters.newName}}</p>


    <p>{{$store.state.moduleB.userName}}</p>
    <p>{{$store.getters['moduleB/newName']}}</p>

    <button @click="mutationsFn">mutationFn</button>
    <button @click="actionsFn">actionFn</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const mutationsFn = ()=>{
      store.commit('moduleB/updateName');
    }

    const actionsFn = ()=>{
      store.dispatch('moduleB/updateName');
    }
    return {
      mutationsFn,
      actionsFn
    };
  },
};
</script>