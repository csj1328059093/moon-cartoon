<template>
  <div class="my">
    <van-cell
      v-if="Array.isArray(localUser)"
      center
      is-link
      @click="loginShow = true"
    >
      <div class="title f-flex1">
        <img src="../assets/img/avatarL.png" alt="" />
        <div class="f-flex2">
          <span class="ti f-flex1">
            <span>点我登陆</span>
            <div class="vip"><img src="../assets/img/vip.png" alt="" />VIP</div>
          </span>
          <span class="id">登录显示id</span>
        </div>
      </div>
    </van-cell>
    <van-cell
      v-if="!Array.isArray(localUser)"
      center
      is-link
      @click="userMsgShow = true"
    >
      <div class="title f-flex1">
        <img :src="localUser.photo" alt="" />
        <div class="f-flex2">
          <span class="ti f-flex1">
            <span>{{ localUser.nickname }}</span>
            <div class="vip"><img src="../assets/img/vip.png" alt="" />VIP</div>
          </span>
          <span class="id">id:{{ localUser.username }}</span>
        </div>
      </div>
    </van-cell>
    <div class="comp f-flex1">
      <div class="f-flex2"><img src="../assets/img/sign.png" alt="" />签到</div>
      <div class="f-flex2"><img src="../assets/img/task.png" alt="" />任务</div>
      <div class="f-flex2">
        <img src="../assets/img/wallet.png" alt="" />钱包
      </div>
      <div class="f-flex2">
        <img src="../assets/img/message.png" alt="" />信息
      </div>
    </div>
    <div class="vipBack">
      <div class="vipShow f-flex1">
        <div class="f-flex2">
          <div class="kmVIP">看漫VIP</div>
          <div>黑金VIP有效期:2099.01.01</div>
        </div>
        <div class="myVIP">我的VIP</div>
      </div>
    </div>
    <van-cell center is-link>
      <div class="configOne">缓存漫画</div>
    </van-cell>
    <van-cell center is-link>
      <div class="configOne">已购漫画</div>
    </van-cell>
    <van-cell center is-link style="margin: 10px 0">
      <div class="configOne">推荐给朋友</div>
    </van-cell>
    <van-cell center is-link>
      <div class="configOne">帮助反馈</div>
    </van-cell>
    <van-cell center is-link>
      <div class="configOne">联系我们</div>
    </van-cell>
    <van-cell center is-link>
      <div class="configOne">扫一扫</div>
    </van-cell>
    <van-cell center is-link>
      <div class="configOne">设置</div>
    </van-cell>
    <van-popup class="loginP" v-model="loginShow" position="right">
      <div class="top f-flex1">
        <img @click="loginShow = false" src="../assets/img/back.png" alt="" />
        <span @click="reg"
          ><span v-show="regShow">注册帐号</span
          ><span v-show="!regShow">登录帐号</span></span
        >
      </div>
      <form action="" v-show="regShow" class="f-flex2" method="post">
        <div class="cen">
          <div class="title">登录</div>
          <div class="loginDiv">
            <input
              type="text"
              name="username"
              v-model="username"
              class="username"
              @keypress="checkLen(username)"
              maxlength="11"
              placeholder="帐号"
            />
            <div>
              <input
                :type="passwordType"
                name="password"
                v-model="password"
                maxlength="11"
                class="password"
                placeholder="密码"
                @keypress="checkLen(password)"
              />
              <img
                @click="showPassword"
                src="../assets/img/unshowPassword.png"
                v-show="!passwordShow"
                alt=""
              />
              <img
                @click="unShowPassword"
                src="../assets/img/showPassword.png"
                v-show="passwordShow"
                alt=""
              />
            </div>
          </div>
        </div>
        <van-button class="sub" type="submit" @click="login">登录</van-button>
      </form>
      <form action="" v-show="!regShow" class="f-flex2" method="post">
        <div class="cen">
          <div class="title">注册</div>
          <div class="loginDiv">
            <input
              type="text"
              name="username"
              v-model="username"
              class="username"
              maxlength="11"
              @keypress="checkLen(username)"
              placeholder="帐号"
            />
            <input
              type="password"
              name="password"
              v-model="password"
              class="password"
              maxlength="11"
              @keypress="checkLen(password)"
              placeholder="密码"
            />
            <input
              type="password"
              name="reword"
              v-model="reword"
              class="reword"
              maxlength="11"
              @keypress="checkLen(reword)"
              placeholder="确认密码"
            />
          </div>
        </div>
        <van-button class="sub" type="submit" @click="register">
          注册并登录
        </van-button>
      </form>
    </van-popup>

    <van-popup class="msgP" v-model="userMsgShow" position="right">
      <div class="top f-flex1">
        <img @click="userMsgShow = false" src="../assets/img/back.png" alt="" />
        <span @click="upd"
          ><span v-show="updShow">修改昵称</span
          ><span v-show="!updShow">查看资料</span></span
        >
      </div>
      <div class="f-flex2" v-show="updShow">
        <van-cell-group>
          <van-cell title="昵称" :value="localUser.nickname" />
          <van-cell title="帐号" :value="localUser.username" />
        </van-cell-group>
        <van-button class="out" @click="logout">退出帐号</van-button>
      </div>
      <div v-show="!updShow">
        <form class="f-flex2" method="post">
          <div class="cen">
            <div class="updDiv">
              <input
                type="text"
                name="nickname"
                maxlength="4"
                @keypress="checkLen2(nickname)"
                placeholder="新昵称"
                v-model="nickname"
              />
            </div>
          </div>
          <van-button class="sub" type="submit" @click="update">
            提交修改
          </van-button>
        </form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import storageUtil from "../util/storageUtil";
import { Toast } from "vant";
import Qs from "../util/qs";
import { mapState } from "vuex";

export default {
  name: "My",
  data() {
    return {
      loginShow: false,
      regShow: true,
      passwordShow: false,
      userMsgShow: false,
      updShow: true,
      passwordType: "password",
      // localUser: storageUtil.read("localUser"),
      username: "",
      password: "",
      reword: "",
      nickname: "",
    };
  },
  methods: {
    reg() {
      this.regShow = !this.regShow;
      this.password = "";
      this.reword = "";
    },
    upd() {
      this.updShow = !this.updShow;
    },
    login(event) {
      event.preventDefault();
      if (this.username === "") {
        Toast.fail({
          message: "帐号不可为空",
        });
      } else if (this.password === "") {
        Toast.fail({
          message: "密码不可为空",
        });
      } else {
        this.axios
          .post(
            "http://csjdwz.top:3000/dailipost",
            Qs.stringify({
              url: "/getUser",
              data: {
                username: this.username,
                password: this.password,
              },
            })
          )
          .then((result) => {
            if (result.data.msg === "登录成功") {
              this.$store.commit("addUser", result.data[0]);
              let col = [],
                his = [],
                colb = JSON.parse(result.data[0].collectBooks),
                hisb = JSON.parse(result.data[0].historyBooks);
              for (let i = 0; i < colb.length; i++) {
                let url =
                  "http://comic.65sy.com/app_api/v5/getcomicinfo_body/?client-version=&comic_id=" +
                  colb[i] +
                  "&isnewkmhlite=1&myuid=240802770&platformname=iphone&productname=kmh";
                this.axios
                  .get("http://csjdwz.top:3000/daili", {
                    params: {
                      url: url,
                    },
                  })
                  .then((result) => {
                    result.data.id = colb[i];
                    col.push(result.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              for (let i = 0; i < hisb.length; i++) {
                let url =
                  "http://comic.65sy.com/app_api/v5/getcomicinfo_body/?client-version=&comic_id=" +
                  hisb[i] +
                  "&isnewkmhlite=1&myuid=240802770&platformname=iphone&productname=kmh";
                this.axios
                  .get("http://csjdwz.top:3000/daili", {
                    params: {
                      url: url,
                    },
                  })
                  .then((result) => {
                    result.data.id = hisb[i];
                    his.push(result.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              this.$store.commit("changeCollectBook", col);
              this.$store.commit("changeHistoryBook", his);
              this.loginShow = false;
            }
            Toast(result.data.msg);
          });
      }
    },
    register(event) {
      event.preventDefault();
      if (this.username === "") {
        Toast.fail({
          message: "帐号不可为空",
        });
      } else if (this.password === "") {
        Toast.fail({
          message: "密码不可为空",
        });
      } else if (this.password !== this.reword) {
        Toast.fail({
          message: "两次密码不同",
        });
      } else {
        this.axios
          .post(
            "http://csjdwz.top:3000/dailipost",
            Qs.stringify({
              url: "/register",
              data: {
                username: this.username,
                password: this.password,
              },
            })
          )
          .then((result) => {
            console.log(result.data);
            if (result.data.msg === "注册成功") {
              this.$store.commit("addUser", result.data[0]);
<<<<<<< HEAD
=======
              this.localUser = result.data[0];
>>>>>>> 5592bc2a28f5d9ef586b9ed5fad6d1f079bf4383
              this.loginShow = false;
            }
            Toast(result.data.msg);
          });
      }
    },
    update(event) {
      event.preventDefault();
      if (this.nickname === "") {
        Toast.fail({
          message: "昵称不可为空",
        });
      } else {
        this.axios
          .post(
            "http://csjdwz.top:3000/dailipost",
            Qs.stringify({
              url: "/updUser",
              data: {
                nickname: this.nickname,
                username: this.localUser.username,
              },
            })
          )
          .then((result) => {
            if (result.data.msg === "修改成功") {
              this.$store.commit("addUser", result.data["_doc"]);
              this.updShow = true;
            }
            Toast(result.data.msg);
          });
      }
    },
    showPassword() {
      this.passwordShow = true;
      this.passwordType = "text";
    },
    unShowPassword() {
      this.passwordShow = false;
      this.passwordType = "password";
    },
    checkLen(name) {
      if (name.length === 11) {
        Toast({
          message: "长度不能超过11位",
          duration: 500,
        });
      }
    },
    checkLen2(name) {
      if (name.length === 4) {
        Toast({
          message: "昵称长度不能超过4位",
          duration: 500,
        });
      }
    },
    logout() {
      this.userMsgShow = false;
      this.$store.commit("addUser", []);
      this.$store.commit("changeCollectBook", []);
      this.$store.commit("changeHistoryBook", []);
      Toast("登出成功");
    },
  },
  watch: {
    localUser: {
      deep: true,
      handler: function (val) {
        storageUtil.save("localUser", val);
      },
    },
  },
  computed: {
    ...mapState(["localUser"]),
  },
};
</script>

<style lang="less" scoped>
.my {
  padding-bottom: 50rem/20;
  background-color: #fafafa;

  .title {
    justify-content: start;

    img {
      height: 80rem/20;
      width: $height;
      margin-right: 10rem/20;
      border-radius: 50%;
    }

    .f-flex2 {
      justify-content: space-between;
      line-height: 30rem/20;
      align-items: start;

      .ti {
        font-weight: bold;
        font-size: 20rem/20;
        justify-content: space-between;
        width: 150rem/20;

        .vip {
          position: relative;

          img {
            height: 30rem/20;
            position: absolute;
            width: $height;
            left: -18rem/20;
            top: -50%;
          }

          font-weight: normal;
          font-size: 14rem/20;
          width: 40rem/20;
          height: 16rem/20;
          text-align: center;
          line-height: $height;
          border-radius: 25rem/20;
          background-color: #ffd45a;
        }
      }

      .id {
        color: #bfbfbf;
      }
    }
  }

  .comp {
    height: 100rem/20;
    justify-content: space-around;
    background-color: white;

    img {
      width: 50rem/20;
      height: $width;
    }
  }

  .vipBack {
    background-color: white;
    height: 100rem/20;

    .vipShow {
      height: 80rem/20;
      background-color: #facc31;
      width: 90%;
      border-radius: 10rem/20;
      margin: 0 auto;
      justify-content: space-around;
      color: white;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);

      .f-flex2 {
        align-items: start;
        height: 100%;

        .kmVIP {
          font-size: 20rem/20;
        }
      }

      .myVIP {
        font-size: 18rem/20;
        background-color: white;
        color: #facc31;
        width: 100rem/20;
        height: 34rem/20;
        border-radius: 17rem/20;
        text-align: center;
        line-height: $height;
      }
    }
  }

  .configOne {
    height: 30rem/20;
    line-height: $height;
    font-size: 16rem/20;
  }

  .loginP {
    height: 100%;
    width: 100%;

    .top {
      justify-content: space-between;
      height: 50rem/20;
      font-size: 20rem/20;

      img {
        height: 25rem/20;
        width: $height;
        margin: 0 10rem/20;
      }

      span {
        margin: 0 10rem/20;
      }
    }

    .cen {
      width: 80%;

      .title {
        font-size: 26rem/20;
        margin: 30rem/20 0 45rem/20;
      }

      .loginDiv {
        font-size: 20rem/20;

        input {
          border-bottom: 1px solid gainsboro;
          width: 100%;
          line-height: 60rem/20;
        }

        div {
          position: relative;

          img {
            width: 30rem/20;
            height: $width;
            position: absolute;
            right: 0;
            top: 25%;
          }
        }
      }
    }

    .sub {
      width: 60%;
      height: 40rem/20;
      border-radius: 20rem/20;
      background-color: #facc31;
      color: white;
      font-size: 20rem/20;
      margin-top: 30rem/20;
      border: none;
    }
  }

  .msgP {
    height: 100%;
    width: 100%;

    .top {
      justify-content: space-between;
      height: 50rem/20;
      font-size: 20rem/20;

      img {
        height: 25rem/20;
        width: $height;
        margin: 0 10rem/20;
      }

      span {
        margin: 0 10rem/20;
      }
    }

    .f-flex2 {
      /deep/ .van-cell-group {
        width: 100%;
      }
    }

    .cen {
      width: 80%;

      .updDiv {
        font-size: 20rem/20;

        input {
          border-bottom: 1px solid gainsboro;
          width: 100%;
          line-height: 60rem/20;
        }
      }
    }

    .out {
      width: 60%;
      height: 40rem/20;
      border-radius: 20rem/20;
      background-color: red;
      color: white;
      font-size: 20rem/20;
      margin-top: 30rem/20;
      border: none;
    }

    .sub {
      width: 60%;
      height: 40rem/20;
      border-radius: 20rem/20;
      background-color: #facc31;
      color: white;
      font-size: 20rem/20;
      margin-top: 30rem/20;
      border: none;
    }
  }
}
</style>