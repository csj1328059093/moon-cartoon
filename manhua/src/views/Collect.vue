<template>
  <div class="bookshelf">
    <van-tabs ref="cole" :swipeable="true" swipe-threshold="10" animated>
      <van-tab class="nav" title="收藏">
        <div
          class="body f-flex1"
          v-show="
            !Array.isArray(localUser) && collectBooks.length !== 0
          "
        >
          <div
            class="book f-flex2"
            v-for="(book, index) in collectBooks"
            @click="watchP(book.comic_id)"
          >
            <img
              v-lazy="
                'http://image.yqmh.com/mh/' +
                book.comic_id +
                '.jpg-600x800.jpg.webp'
              "
              alt=""
            />
            <span class="f-thide">{{ book.comic_name }}</span>
          </div>
          <div class="book" v-for="i in addDiv"></div>
        </div>
        <div class="sorry f-flex2" v-show="Array.isArray(localUser)">
          <img src="../assets/img/unsearch.png" alt="" />
          请先登录
        </div>
        <div
          class="sorry f-flex2"
          v-show="
            !Array.isArray(localUser) && collectBooks.length === 0
          "
        >
          <img src="../assets/img/unsearch.png" alt="" />
          书架空空的，去首页看看吧
        </div>
      </van-tab>
      <van-tab class="nav" title="历史">
        <div
          class="body2"
          v-show="
            !Array.isArray(localUser) && historyBooks.length !== 0
          "
        >
          <div
            class="book2 f-flex1"
            v-for="(book, index) in historyBooks"
            @click="watchP(book.comic_id)"
          >
            <img
              v-lazy="
                'http://image.yqmh.com/mh/' +
                book.comic_id +
                '.jpg-600x800.jpg.webp'
              "
              alt=""
            />
            <div class="title f-flex2">
              <div class="ti">{{ book.comic_name }}</div>
              <div class="f-thide">更至 {{ book.last_chapter_name }}</div>
            </div>
          </div>
          <div class="more" v-show="historyBooks.length === 5">
            最多只保留5条历史记录哦~
          </div>
        </div>
        <div class="sorry f-flex2" v-show="Array.isArray(localUser)">
          <img src="../assets/img/unsearch.png" alt="" />
          请先登录
        </div>
        <div
          class="sorry f-flex2"
          v-show="
            !Array.isArray(localUser) && historyBooks.length === 0
          "
        >
          <img src="../assets/img/unsearch.png" alt="" />
          还没有阅读记录
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import storageUtil from "../util/storageUtil";
import { mapState } from "vuex";

export default {
  name: "Bookshelf",
  inject: ["watchP"],
  computed: {
    addDiv() {
      if (this.collectBooks.length % 3 === 0) {
        return 0;
      } else {
        return 3 - (this.collectBooks.length % 3);
      }
    },
    ...mapState(["collectBooks", "historyBooks", "localUser"]),
  },
};
</script>

<style lang="less" scoped>
.bookshelf {
  height: 100%;

  /deep/ .van-tab__text {
    font-size: 14rem/20;
    overflow: visible;
  }

  .body {
    width: 100%;
    flex-wrap: wrap;
    margin-top: 10rem/20;

    .book {
      width: 30%;
      height: 170rem/20;
      //overflow: hidden;

      img {
        width: 100%;
        //height: 150rem/20;
        border-radius: 10rem/20;
      }

      span {
        width: 100%;
        font-size: 12rem/20;
      }
    }
  }

  .sorry {
    margin-top: 100rem/20;
    height: 300rem/20;
    justify-content: start;

    img {
      width: 150rem/20;
      height: $width;
    }

    color: #6e6e6e;
    font-size: 16rem/20;
  }

  .body2 {
    width: 100%;
    padding-bottom: 50rem/20;

    .book2 {
      height: 160rem/20;
      justify-content: start;

      img {
        margin: 0 20rem/20;
        width: 30%;
        border-radius: 10rem/20;
      }

      .title {
        height: 100%;
        flex-grow: 1;
        align-items: start;
        justify-content: space-between;
        line-height: 70rem/20;
        font-size: 12rem/20;
        color: #4e4e4e;

        .ti {
          font-size: 20rem/20;
        }

        .f-thide {
          width: 90%;
        }
      }
    }

    .more {
      color: #aeaeae;
      width: 100%;
      height: 40rem/20;
      text-align: center;
      line-height: 40rem/20;
    }
  }
}
</style>