<template>
  <div class="__appFlow">
    <HeadComponent />
    <router-view />
  </div>
</template>
<script>
import Header from '@/components/common/header.vue'
import DialogBox from './components/chat/dialog-box.vue';
export default {
  components: {
    HeadComponent: Header,
    DialogBox
  }

}
</script>
<style lang="scss" scoped>
.__appFlow {
  background-color: #eee;
}
</style>
