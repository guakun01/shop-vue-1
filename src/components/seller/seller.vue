<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <g-star :size="36" :score="seller.score"></g-star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
      <split></split>
    </div>
  </div>
</template>

<script>
import GStar from '../star/star';
import Split from '../split/split';

export default {
  name: 'GSellerPage',
  components: {
    GStar,
    Split,
  },
  props: {
    seller: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .seller-content {
    .overview {
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .desc {
        padding-bottom: 18px;
        font-size: 0;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .star {
          display: inline;
          margin-right: 8px;
          vertical-align: top;
        }
        .text {
          display: inline-block;
          margin-right: 12px;
          line-height: 18px;
          vertical-align: top;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
        }
        .block + .block {
          border-left: 1px solid rgba(7, 17, 27, 0.1);
        }
        .title {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .content {
          line-height: 24px;
          font-size: 10px;
          color: rgb(7, 17, 27);
          .stress {
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>
