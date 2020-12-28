<template>
  <div class="one">
    <div class="title f-flex1">
      <div class="blue"></div>
      {{ title }}
    </div>
    <div class="body f-flex1">
      <div class="book f-flex2" v-for="(book,index) in ranDomBooks" @click="watchP(book.comic_id)" :key="index">
        <img v-lazy="'http://image.yqmh.com/mh/'+book.comic_id+'.jpg-600x800.jpg.webp'" alt="">
        <!--        http://image.yqmh.com/mh/107781.jpg-600x800.jpg.webp-->
        <span class="f-thide">{{ book.comic_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "One",
  data() {
    return {
      ranDomBooks: []
    }
  },
  props: ['title', 'books'],
  created() {
    if (this.books.length <= 6) {
      this.ranDomBooks = this.books
    } else {
      while (this.ranDomBooks.length < 6) {
        let ran = parseInt(Math.random() * this.books.length)
        this.ranDomBooks.push(this.books[ran])
        this.ranDomBooks = [...new Set(this.ranDomBooks.map(cur => cur['comic_id']))].map(cur => this.ranDomBooks.find(cu => (cu['comic_id']) === cur))
      }
    }
  },
  computed: {
    // len() {
    //   if (this.books.length % 3 !== 0) {
    //     return 3 - this.books.length % 3
    //   }
    // }
  },
  inject:['watchP']
}
</script>

<style lang="less" scoped>
.one {
  width: 100%;

  .title {
    justify-content: start;
    width: 100%;
    height: 20rem/20;
    color: lightskyblue;
    font-size: 16rem/20;

    .blue {
      width: 4rem/20;
      height: 16rem/20;
      background-color: lightskyblue;
      margin: 0 4rem/20 0 10rem/20;
    }
  }

  .body {
    width: 100%;
    flex-wrap: wrap;


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
}
</style>