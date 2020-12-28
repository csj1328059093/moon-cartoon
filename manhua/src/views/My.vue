<template>
  <div class="my">
    <van-cell center is-link>
      <div class="title f-flex1">
        <img src="../assets/img/avatar.png" alt="">
        <div class="f-flex2">
          <span class="ti f-flex1">
            <span>点我登陆</span>
            <div class="vip"><img src="../assets/img/vip.png" alt="">VIP</div>
          </span>
          <span class="id">ID:240802770</span>
        </div>
      </div>
    </van-cell>
    <div class="comp f-flex1">
      <div class="f-flex2"><img src="../assets/img/sign.png" alt="">签到</div>
      <div class="f-flex2"><img src="../assets/img/task.png" alt="">任务</div>
      <div class="f-flex2"><img src="../assets/img/wallet.png" alt="">钱包</div>
      <div class="f-flex2"><img src="../assets/img/message.png" alt="">信息</div>
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
      <div class="configOne">缓存漫画</div>
    </van-cell>
    <van-cell center is-link>
      <div class="configOne">缓存漫画</div>
    </van-cell>

  </div>
</template>

<script>
export default {
  name: "My"
}
</script>

<style lang="less" scoped>
.my {
  padding-bottom: 50rem/20;
  background-color: #FAFAFA;

  .title {
    justify-content: start;

    img {
      height: 80rem/20;
      width: $height;
      margin-right: 10rem/20;
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
            top: -50%
          }

          font-weight: normal;
          font-size: 14rem/20;
          width: 40rem/20;
          height: 16rem/20;
          text-align: center;
          line-height: $height;
          border-radius: 25rem/20;
          background-color: #FFD45A;
        }
      }

      .id {
        color: #BFBFBF;
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
      background-color: #FACC31;
      width: 90%;
      border-radius: 10rem/20;
      margin: 0 auto;
      justify-content: space-around;
      color: white;
      box-shadow: 5px 5px 80px rgba(0, 0, 0, 0.1);

      .f-flex2 {
        align-items: start;
        //justify-content: space-around;
        height: 100%;

        .kmVIP {
          font-size: 20rem/20;
        }
      }

      .myVIP {
        font-size: 18rem/20;
        background-color: white;
        color: #FACC31;
        width: 100rem/20;
        height: 34rem/20;
        border-radius: 17rem/20;
        text-align: center;
        line-height: $height;
      }
    }
  }


  .configOne {
    height: 40rem/20;
    line-height: $height;
    font-size: 18rem/20;
  }
}
</style>