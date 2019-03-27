<template>
  <div class="g-app">
    <g-header></g-header>
    <div class="tab">
      <div class="tab-item">
        <a v-link="{path: '/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path: '/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path: '/seller'}">商家</a>
      </div>
    </div>
    <router-view></router-view>
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
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .tab-item {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: rgb(77, 85, 93);
        & > a {
          display: block;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
      }
    }
  }
</style>
