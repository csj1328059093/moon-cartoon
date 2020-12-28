<template>
  <div class="rankone">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="body" v-show="books.length!==0">
        <div class="book f-flex1" v-for="(book,index) in books" @click="watchP(book.comic_id)" :key="index">
          <img v-lazy="'http://image.yqmh.com/mh/'+book.comic_id+'.jpg-600x800.jpg.webp'" alt="">
          <div class="title f-flex2">
            <div class="ti f-thide">{{ book.comic_name }}</div>
            <div>{{ book.author_name }}</div>
            <div>当周人气{{ book.count_num|fil }}</div>
            <div>{{ book.sort_typelist|fil2 }}</div>
          </div>
          <div class="mark f-flex2">
            <div>{{ index + 1 }}</div>
            <div class="tip f-flex1">
              <img src="../assets/img/up.png" v-show="check(book.rise_rank)">
              <img src="../assets/img/down.png" v-show="!check(book.rise_rank)">
              {{ book.rise_rank|fil3 }}
            </div>
          </div>
        </div>
        <div class="more">
          最多只显示100条哦~
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import moment from 'moment'
import {Toast} from 'vant'

export default {
  name: "RankOne",
  data() {
    return {
      books: [],
      isLoading: false
    }
  },
  props: ['rankType'],
  created() {
    this.find()
  },
  methods: {
    check(val) {
      return val > 0
    },
    onRefresh() {
      setTimeout(() => {
        Toast({
          message: '刷新成功',
          duration: 500,
          position: "top"
        });
        this.find()
        this.isLoading = false;
      }, 600);
    },
    find() {
      let url = 'http://rankdata.65sy.com/app_api/v1/comic/getRankDataDetials/?client-version=4.3.7&isnewkmhlite=1&myuid=240802770&platformname=iphone&product_id=1&productname=kmh&query_time=' + moment().format('YYYY-MM-DD') + '&rank_type=heat&sort_type=' + this.rankType + '&time_type=week'
      this.axios.get('http://csjdwz.top:3000/daili', {
			params: {
				url: url
			}
		}).then(result => {
        this.books = result.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  filters: {
    fil(val) {
      return parseInt(val / 10000) + '万'
    },
    fil2(val) {
      let res = ''
      for (let i = 1; i < val.split('|').join().split(',').length; i += 2) {
        res += val.split('|').join().split(',')[i] + ' '
      }
      return res
    },
    fil3(val) {
      return Math.abs(val)
    }
  },
  inject:['watchP']
}
</script>

<style lang="less" scoped>
.rankone {
  .body {

    width: 100%;
    padding-bottom: 50rem/20;

    .book {

      height: 160rem/20;
      justify-content: start;

      img {
        margin: 0 10rem/20;
        width: 30%;
        border-radius: 10rem/20;
      }

      .title {
        height: 100%;
        //flex-grow: 1;
        width: 45%;
        align-items: start;
        justify-content: space-around;
        //line-height: 70rem/20;
        font-size: 12rem/20;
        color: grey;

        .ti {
          font-size: 16rem/20;
          color: black;
          width: 100%;
        }

      }

      .mark {
        flex-grow: 1;
        padding-top: 20rem/20;
        font-size: 20rem/20;
        justify-content: start;
        height: 100%;

        .tip {
          font-size: 12rem/20;
          color: grey;
          height: 20rem/20;

          img {
            width: 12rem/20;
            height: $width;
            margin: 0;
          }
        }
      }

    }

    .book:nth-child(1) {
      .mark {
        color: red;
        font-size: 35rem/20;
      }
    }

    .book:nth-child(2) {
      .mark {
        color: red;
        font-size: 32rem/20;
      }
    }

    .book:nth-child(3) {
      .mark {
        color: red;
        font-size: 29rem/20;
      }
    }

    .more {
      color: #AEAEAE;
      width: 100%;
      height: 40rem/20;
      text-align: center;
      line-height: 40rem/20;
    }
  }
}
</style>