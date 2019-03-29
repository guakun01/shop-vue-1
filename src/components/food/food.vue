<template>
  <div v-show="visible" v-el:food class="food" transition="move">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image" alt="我是一张商品的头图">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">¥{{food.price}}</span><span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cart-control :food="food"></cart-control>
        </div>
        <div v-show="!food.count || food.count===0" @click.stop.prevent="addFoodToCart"
          transition="fade" class="buy">
          加入购物车
        </div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
      </div>
      <rating-select :select-type="selectType" :only-content="onlyContent" 
        :ratings="food.ratings" :desc="desc"></rating-select>
      <div class="rating-wrapper">
        <ul v-if="food.ratings && food.ratings.length">
          <li v-show="rateVisible(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
            <div class="user">
              <span class="name">{{rating.username}}</span>
              <img :src="rating.avatar" width="12" height="12" alt="" class="avatar">
            </div>
            <div class="time">{{rating.rateTime}}</div>
            <p class="text">
              <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" class="icon"></span>{{rating.text}}
            </p>
          </li>
        </ul>
        <div v-else class="no-rating"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import CartControl from '../cartcontrol/cartcontrol';
import Split from '../split/split';
import RatingSelect from '../ratingselect/ratingselect';

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
  name: 'GFood',
  components: {
    CartControl,
    Split,
    RatingSelect,
  },
  props: {
    food: {
      type: Object,
    }
  },
  data() {
    return {
      visible: false,
      scroll: null,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽',
      }
    };
  },
  events: {
    'ratingType.select'(type) {
      this.selectType = type;
    },
    'content.toggle'(onlyContent) {
      this.onlyContent = onlyContent;
    }
  },
  methods: {
    rateVisible(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    addFoodToCart(event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
      this.$dispatch('cart.add', event.target);
    },
    show() {
      this.selectType = ALL;
      this.onlyContent = true;
      this.visible = true;
      this.desc = {
        all: '全部',
        positive: '推荐',
        negative: '吐槽',
      };
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$els.food, {
            click: true,
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.food {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
  &.move-transition {
    transition: all .1s linear;
    transform: translate3d(0, 0, 0);
  }
  &.move-enter, &.move-leave {
    transform: translate3d(-100%, 0, 0);
  }
  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 10px;
      left: 0;
      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .content {
    position: relative;
    padding: 18px;
    .title {
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }
    .detail {
      margin-bottom: 18px;
      line-height: 10px;
      height: 10px;
      font-size: 0;
      .sell-count, .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .sell-count {
        margin-right: 12px;
      }
    }
    .price {
      font-weight: 700;
      line-height: 24px;
      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }
      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: #fff;
      background: rgb(0, 160, 220);
      &.fade-transition {
        transition: all .2s;
        opacity: 1;
      }
      &.fade-enter, &.fade-leave {
        opacity: 0;
      }
    }
  }
  .info {
    padding: 18px;
    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .text {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
  }
  .rating {
    padding-top: 18px;
    .title {
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
  }
  .rating-wrapper {
    padding: 0 18px;
    .rating-item {
      position: relative;
      padding: 16px 0;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .user {
        position: absolute;
        right: 0;
        top: 16px;
        line-height: 12px;
        font-size: 0;
        .name {
          display: inline-block;
          margin-right: 6px;
          vertical-align: top;
          font-size: 10px;
          color: rgb(143, 157, 159);
        }
        .avatar {
          border-radius: 50%;
        }
      }
      .time {
        margin-bottom: 6px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .text {
        line-height: 16px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        .icon-thumb_up, .icon-thumb_down {
          margin-right: 4px;
          line-height: 16px;
          font-size: 12px;
        }
        .icon-thumb_up {
          color: rgb(0, 160, 220);
        }
        .icon-thumb_down {
          color: rgb(147, 153, 159); // right
        }
      }
    }
  }
}
</style>
