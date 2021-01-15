<template>
  <div id="app">
    <!--    防止页面重复请求-->
    <keep-alive>
      <router-view v-if="isRouterAlive" />
    </keep-alive>
    <div id="nav" class="f-flex1">
      <router-link to="/" class="f-flex2">
        <img src="./assets/tabBar/home1.png" alt="" />
        <img
          class="animate__animated animate__rubberBand"
          src="./assets/tabBar/home2.png"
          alt=""
        />
        首页
      </router-link>
      <router-link to="/new" class="f-flex2">
        <img src="./assets/tabBar/update1.png" alt="" />
        <img
          class="animate__animated animate__bounce"
          src="./assets/tabBar/update2.png"
          alt=""
        />
        更新
      </router-link>
      <router-link to="/collect" class="f-flex2">
        <img src="./assets/tabBar/collect1.png" alt="" />
        <img
          class="animate__animated animate__swing"
          src="./assets/tabBar/collect2.png"
          alt=""
        />
        收藏
      </router-link>
      <router-link to="/my" class="f-flex2">
        <img src="./assets/tabBar/my1.png" alt="" />
        <img
          class="animate__animated animate__wobble"
          src="./assets/tabBar/my2.png"
          alt=""
        />
        我的
      </router-link>
    </div>
    <van-popup class="watchP" position="right" v-model="watchPShow">
      <mt-loadmore
        :top-method="jiazaiLeft"
        @top-status-change="handleTopChange"
        :bottom-method="jiazai"
        @bottom-status-change="handleBottomChange"
        :auto-fill="false"
        ref="loadmore2"
      >
        <main class="PPP">
          <div
            class="PPP"
            v-for="(val, index) in book.slice(start, more)"
            :key="index"
            @click="conf(val)"
          >
            <img
              v-for="i in val.end_num"
              v-lazy="where(val, i)"
              :key="i"
              alt=""
            />
          </div>
        </main>
        <div slot="top" class="mint-loadmore-top">
          <span
            v-show="topStatus !== 'loading'"
            :class="{ rotate: topStatus === 'drop' }"
            >释放进入上一章</span
          >
          <span v-show="topStatus === 'loading'">
            <van-loading size="24px">loading...</van-loading>
          </span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span
            v-show="bottomStatus !== 'loading'"
            :class="{ rotate: bottomStatus === 'drop' }"
            >释放进入下一章</span
          >
          <span v-show="bottomStatus === 'loading'">
            <van-loading size="24px">loading...</van-loading>
          </span>
        </div>
      </mt-loadmore>
    </van-popup>
    <van-popup
      :overlay="false"
      class="to f-flex1"
      position="top"
      v-model="backShow"
    >
      <img @click="clear" src="./assets/img/back.png" alt="" />
      <marquee class="ti f-thide">{{ curP.chapter_name }}</marquee>
      <img src="./assets/img/details.png" alt="" />
      <img src="./assets/img/share2.png" alt="" />
    </van-popup>
    <van-popup
      :overlay="false"
      class="bo f-flex1"
      position="bottom"
      v-model="backShow"
    >
      <img
        src="./assets/img/left1.png"
        @click="left"
        v-show="curNum > 0"
        alt=""
      />
      <img
        src="./assets/img/left2.png"
        @click="tip('前面没有了哦')"
        v-show="curNum === 0"
        alt=""
      />
      <span @click="catalogueList">目录</span>
      <img
        src="./assets/img/right1.png"
        v-show="more < book.length"
        @click="right"
        alt=""
      />
      <img
        src="./assets/img/right2.png"
        @click="tip('后面没有了哦')"
        v-show="more === book.length"
        alt=""
      />
      <div class="f-flex3">
        <img
          @click="changeLove(bookInfo)"
          src="./assets/img/love1.png"
          alt=""
          v-show="!checkLove"
        />
        <img
          @click="changeLove(bookInfo)"
          src="./assets/img/love2.png"
          alt=""
          v-show="checkLove"
        />
      </div>
    </van-popup>
    <van-popup
      :overlay="false"
      class="catalogueP"
      position="right"
      v-model="catalogueShow"
    >
      <main ref="cata" style="height: 100%; overflow: scroll">
        <div
          @click="change(index)"
          v-for="(val, index) in book"
          :key="index"
          :class="{ red: index === curNum, 'f-thide': true }"
        >
          {{ val.chapter_name }}
          <van-divider />
        </div>
      </main>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import storageUtil from "./util/storageUtil";
import { mapState } from "vuex";
import Qs from "./util/qs";
export default {
  data() {
    return {
      isRouterAlive: true,
      book: [],
      watchPShow: false,
      backShow: false,
      // totitle: '',
      topStatus: "",
      bottomStatus: "",
      start: 0,
      more: 1,
      listShow: false,
      curP: [],
      curNum: "",
      catalogueShow: false,
      // collectBooks: storageUtil.read('collectBooks'),
      bookInfo: [],
      // historyBooks: storageUtil.read('historyBooks'),
    };
  },
  provide() {
    return {
      watchP: this.watchP,
    };
  },
  methods: {
    // reload() {
    //   setTimeout(() => {
    //     this.isRouterAlive = false
    //     this.$nextTick(() => (this.isRouterAlive = true))
    //     Toast({
    //       message: '刷新成功',
    //       duration: 500
    //     })
    //   }, 700)
    // },
    // reload2() {
    //   setTimeout(() => {
    //     this.isRouterAlive = false
    //     this.$nextTick(() => (this.isRouterAlive = true))
    //   }, 500)
    // },
    watchP(id) {
      this.watchPShow = true;
      let url =
        "http://comic.65sy.com/app_api/v5/getcomicinfo_body/?client-version=&comic_id=" +
        id +
        "&isnewkmhlite=1&myuid=240802770&platformname=iphone&productname=kmh";

      this.axios
        .get("http://csjdwz.top:3000/daili", {
          params: {
            url: url,
          },
        })
        .then((result) => {
          this.book = result.data.comic_chapter.reverse();
          this.bookInfo = result.data;
          this.bookInfo.id = id;
          this.changeHistoryBook(this.bookInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    where(val, i) {
      let res = "http://mhpic.";
      res += val.chapter_domain;
      res += val.rule.split("$$").join(i);
      res += "-kmh.middle.webp";
      return res;
    },
    conf(val) {
      this.backShow = !this.backShow;
      this.catalogueShow = false;
      this.curP = val;
      this.curNum = this.book.indexOf(this.curP);
    },
    clear() {
      this.watchPShow = false;
      this.backShow = false;
      this.catalogueShow = false;
      this.book = "";
      this.curP = "";
      this.start = 0;
      this.more = 1;
    },
    jiazai() {
      this.backShow = false;
      if (this.isLoadAll) {
        this.$refs.loadmore2.onBottomLoaded();
        Toast({
          message: "没有更多啦",
          position: "bottom",
          duration: 300,
        });
      } else {
        setTimeout(() => {
          this.more++;
          this.$refs.loadmore2.onBottomLoaded();
          Toast({
            message: "加载成功",
            position: "bottom",
            duration: 300,
          });
        }, 500);
      }
    },
    jiazaiLeft() {
      this.backShow = false;
      if (this.isLoadAll2) {
        this.$refs.loadmore2.onTopLoaded();
        Toast({
          message: "前面已经没有啦",
          position: "top",
          duration: 300,
        });
      } else {
        setTimeout(() => {
          this.start--;
          this.$refs.loadmore2.onTopLoaded();
          Toast({
            message: "加载成功",
            position: "top",
            duration: 300,
          });
        }, 500);
      }
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    left() {
      this.start = --this.curNum;
      this.more = this.start + 1;
      this.curP = this.book[this.start];
      this.$refs.loadmore2.scrollEventTarget.scrollTop = 0;
    },
    right() {
      this.start = ++this.curNum;
      this.more = this.start + 1;
      this.curP = this.book[this.start];
      this.$refs.loadmore2.scrollEventTarget.scrollTop = 0;
    },
    tip(s) {
      Toast({
        message: s,
        position: "bottom",
      });
    },
    catalogueList() {
      this.backShow = false;
      this.catalogueShow = true;
      if (this.curNum > 5) {
        this.$nextTick(() => {
          this.$refs.cata.scrollTop = 50 * (this.curNum - 5);
        });
      } else {
        this.$nextTick(() => {
          this.$refs.cata.scrollTop = 0;
        });
      }
    },
    change(index) {
      this.start = index;
      this.more = this.start + 1;
      this.curP = this.book[index];
      this.curNum = index;
      this.$refs.loadmore2.scrollEventTarget.scrollTop = 0;
    },
    changeLove(bookInfo) {
      if (Array.isArray(this.localUser)) {
        Toast("请先登录");
        return;
      }

      if (this.collectBooks.length === 0) {
        // this.collectBooks.unshift(bookInfo)
        this.$store.commit("addCollectBook", bookInfo);

        this.tip("收藏成功！");
      } else {
        let delflag = false;
        let delone = 0;
        for (let i = 0; i < this.collectBooks.length; i++) {
          if (this.collectBooks[i].comic_id === this.bookInfo.comic_id) {
            delone = i;
            delflag = true;
            break;
          }
        }
        if (delflag) {
          // this.collectBooks.splice(delone, 1)
          this.$store.commit("delCollectBook", delone);
          this.tip("取消收藏成功！");
        } else {
          // this.collectBooks.unshift(bookInfo)
          this.$store.commit("addCollectBook", bookInfo);
          this.tip("收藏成功！");
        }
      }

      let collectId = [];
      for (let i = 0; i < this.collectBooks.length; i++) {
        collectId.push(this.collectBooks[i].id);
      }

      this.axios
        .post(
          "http://csjdwz.top:3000/dailipost",
          Qs.stringify({
            url: "/changeCollectBook",
            data: {
              collectBooks: JSON.stringify(collectId),
              username: this.localUser.username,
            },
          })
        )
        .then((result) => {
          // if (result.data.msg === "修改成功") {
          //   this.$store.commit("addUser", result.data["_doc"]);
          // }
        });
    },
    changeHistoryBook(bookInfo) {
      if (Array.isArray(this.localUser)) {
        return;
      }
      if (this.historyBooks.length === 0) {
        // this.historyBooks.unshift(bookInfo)
        this.$store.commit("addHistoryBook", bookInfo);
      } else {
        let delflag = false;
        let delone = 0;
        for (let i = 0; i < this.historyBooks.length; i++) {
          if (this.historyBooks[i].comic_id === this.bookInfo.comic_id) {
            delone = i;
            delflag = true;
            break;
          }
        }
        if (delflag) {
          // this.historyBooks.splice(delone, 1)
          this.$store.commit("delHistoryBook", delone);
          // this.historyBooks.unshift(this.bookInfo)
          this.$store.commit("addHistoryBook", bookInfo);
        } else {
          // this.historyBooks.unshift(this.bookInfo)
          this.$store.commit("addHistoryBook", bookInfo);
        }
        if (this.historyBooks.length > 5) {
          // this.historyBooks.pop()
          this.$store.commit("popHistoryBook");
        }
      }

      let historyId = [];
      for (let i = 0; i < this.historyBooks.length; i++) {
        historyId.push(this.historyBooks[i].id);
      }

      this.axios
        .post(
          "http://csjdwz.top:3000/dailipost",
          Qs.stringify({
            url: "/changeHistoryBook",
            data: {
              historyBooks: JSON.stringify(historyId),
              username: this.localUser.username,
            },
          })
        )
        .then((result) => {
          // if (result.data.msg === "修改成功") {
          //   this.$store.commit("addUser", result.data["_doc"]);
          // }
        });
    },
  },
  created() {
    window.addEventListener(
      "scroll",
      (e) => {
        this.backShow = false;
      },
      true
    );
  },
  computed: {
    isLoadAll() {
      return this.book.length <= this.more;
    },
    isLoadAll2() {
      return this.start <= 0;
    },
    checkLove() {
      for (let i = 0; i < this.collectBooks.length; i++) {
        if (this.collectBooks[i].comic_id === this.bookInfo.comic_id) {
          return true;
        }
      }
      return false;
    },
    ...mapState(["collectBooks", "historyBooks", "localUser"]),
  },
  watch: {
    collectBooks: {
      deep: true,
      handler: function (val) {
        storageUtil.save("collectBooks", val);
        // this.colKey = new Date().getTime()
      },
    },
    historyBooks: {
      deep: true,
      handler: function (val) {
        storageUtil.save("historyBooks", val);
        // this.colKey = new Date().getTime()
      },
    },
  },
};
</script>

<style lang="less">
html {
  font-size: 100vw/750 * 40;
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  font-size: 12rem/20;
}

#app {
  height: 100%;

  #nav {
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50rem/20;
    background-color: white;
    z-index: 1000;

    a {
      font-weight: bold;
      color: #2c3e50;

      img {
        height: 20rem/20;
        width: $height;
      }

      img:nth-child(1) {
        display: block;
      }

      img:nth-child(2) {
        display: none;
      }

      &.router-link-exact-active {
        color: #b5e0f6;

        img:nth-child(1) {
          display: none;
        }

        img:nth-child(2) {
          display: block;
        }
      }
    }
  }

  .watchP {
    width: 100%;
    img {
      width: 100%;
    }
    .PPP {
      width: 100%;
    }
  }

  .to {
    height: 50rem/20;
    justify-content: start;

    img {
      height: 25rem/20;
      width: $height;
      margin: 0 10rem/20;
    }

    .ti {
      font-size: 20rem/20;
      width: 80%;
    }
  }

  .bo {
    justify-content: start;
    height: 50rem/20;
    font-size: 20rem/20;

    img {
      height: 25rem/20;
      width: $height;
      margin: 0 10rem/20;
    }

    .f-flex3 {
      img {
        width: 35rem/20;
        height: $width;
      }
    }
  }

  .catalogueP {
    height: 100%;
    width: 70%;
    font-size: 16rem/20;
    text-indent: 16rem/20;

    main {
      padding-top: 30rem/20;

      .red {
        color: red;
      }
    }
  }
}
</style>
