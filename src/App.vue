<template>
  <div class="g-app">
    <g-header :seller="seller"></g-header>
    <div class="tab border-1px">
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
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import {urlParse} from 'common/js/util';
import GHeader from 'components/header/header';

const ERR_OK = 0;

export default {
  name: 'GApp',
  components: {
    GHeader,
  },
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })(),
      }
    };
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id)
      .then(response => {
        response = response.data;
        if (response.errno === ERR_OK) {
          // this.seller = response.data;
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
  },
};
</script>

<style lang="scss" scoped>
  @import "./common/scss/mixin";

  .g-app {
    .tab {
      display: flex;
      height: 40px;
      line-height: 40px;
      @include border-1px(rgba(7, 17, 27, 0.1));
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
