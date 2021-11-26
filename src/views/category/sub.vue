<template>
    <div class="sub-category">
        <div class="container">
            <sub-bread></sub-bread>
            <sub-filter></sub-filter>
        </div>
    </div>
</template>

<script>
import subBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
export default {
    setup() {
        
    },
    components:{
        subBread,
        SubFilter
    }
}
</script>