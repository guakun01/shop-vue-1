<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="good in goods" class="menu-item">
          <span class="text border-1px">
            <span v-if="good.type > 0" :class="classMap[good.type]" class="icon"></span>
            {{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper"></div>
  </div>
</template>

<script>
const ERR_OK = 0;

export default {
  name: 'GGoodsPage',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      classMap: [
        'decrease',
        'discount',
        'special',
        'invoice',
        'guarantee',
      ],
    };
  },
  created() {
    this.$http.get('/api/goods')
      .then(response => {
        response = response.data;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
        }
      });
  },
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease {
          @include bg-image('decrease_3');
        }
        &.discount {
          @include bg-image('discount_3');
        }
        &.guarantee {
          @include bg-image('guarantee_3');
        }
        &.invoice {
          @include bg-image('invoice_3');
        }
        &.special {
          @include bg-image('special_3');
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        @include border-1px(rgba(7, 17, 27, .1));
        font-size: 12px;
      }
    }
  }
  .goods-wrapper {
    flex: 1;
  }
}
</style>
