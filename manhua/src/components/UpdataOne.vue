<template>
  <div class="updataone">
    <div style=""></div>
    <div class="one f-flex2" v-for="(book,index) in books" :key="index">
      <img class="img" :src="'http://image.yqmh.com/mh/'+book.comic_id+'_2_1.jpg-noresize.webp'"
           @click="watchP(book.comic_id)" alt="">
      <div class="title f-flex1">
        <div class="ti">{{ book.comic_name }}</div>
        <div>{{ book.comic_type|fil }}</div>
      </div>
      <div class="hot f-flex1">
        <div class="geng">更新至 {{ book.comic_chapter_name }}</div>
        <div class="nu f-flex1"><img src="../assets/img/hot.png" alt=""><span>{{ book.renqi |yi }}</span></div>
      </div>
    </div>
    <div class="more">
      当天只更新了这么多哦~再去首页逛逛吧
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdataOne",
  data() {
    return {
      watchBook: []
    }
  },
  props: ['books'],
  filters: {
    fil(val) {
      let res = ''
      for (let i = 0; i < val.length; i++) {
        if (i !== val.length - 1) {
          res += val[i] + '·'
        } else {
          res += val[i]
        }
      }
      return res
    },
    yi(val) {
      val += ''
      if (val.length > 7) {
        val = parseInt(val / 10000000)
        val /= 10
        return val + '亿'
      } else if (val.length > 5) {
        val = parseInt(val / 100000)
        val /= 10
        return val + '百万'
      } else if (val.length > 3) {
        val = parseInt(val / 1000)
        val /= 10
        return val + '万'
      }
    }
  },
  inject: ['watchP'],
}
</script>

<style lang="less" scoped>
.updataone {

  .one {
    width: 100%;
    color: #AEAEAE;
    font-size: 12rem/20;

    .img {
      width: 90%;
      border-radius: 10rem/20;
      margin: 10rem/20 0;
    }

    .title {
      justify-content: space-between;
      width: 90%;
      line-height: 25rem/20;

      .ti {
        font-size: 16rem/20;
        color: black;
      }
    }

    .hot {
      line-height: 25rem/20;
      justify-content: space-between;
      width: 90%;
      position: relative;
      img {
        width: 16rem/20;
        height: $width;
      }
      .nu{
        position: absolute;
        right: 0;
      }
    }
  }

  .more {
    color: #AEAEAE;
    width: 100%;
    height: 40rem/20;
    text-align: center;
    line-height: 40rem/20;
  }


  margin-bottom: 50rem/20;
}
</style>