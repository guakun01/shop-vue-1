<template>
  <div class="g-app">
    <g-header></g-header>
    <div class="tab">
      m tab
    </div>
    <div class="content">
      m content
    </div>
  </div>
</template>

<script>
import GHeader from 'components/header/header';

export default {
  name: 'GApp',
  components: {
    GHeader,
  }
};
</script>

<style lang="scss" scoped>
  .g-app {
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    p {
      border: 1px solid red;
    }
  }
</style>
