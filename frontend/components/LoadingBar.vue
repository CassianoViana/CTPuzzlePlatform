<template>
  <div v-if="loading" class="loading-page">
    <p><i class="el-icon-loading"></i></p>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
});
</script>

<style scoped lang="scss">
.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  color: rgb(255, 216, 42);
  //background: rgba(255, 255, 255, 0.4);
  font-size: 100pt;
  z-index: 1000;
}
</style>