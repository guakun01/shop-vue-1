<template>
  <div class="g-app">
    <g-header></g-header>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div>
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
    .tab {
      display: flex;
      height: 40px;
      line-height: 40px;
      .tab-item {
        flex: 1;
        text-align: center;
      }
    }
  }
</style>
