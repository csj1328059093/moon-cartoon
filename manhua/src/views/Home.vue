<template>
  <div class="home" :style="{height:Height+'px'}" @scroll="shade($event.srcElement)">
    <header class="f-flex1">
      <div class="search f-flex1" @click="searchShowMe">
        搜索漫画
        <img src="../assets/img/search_w.png" alt="">
      </div>
      <div @click="rankShow=true" class="tag f-flex1">
        <img src="../assets/img/king.png" alt="">
        排行
      </div>
      <div @click="classifyFind" class="tag f-flex1">
        <img src="../assets/img/more.png" alt="">
        分类
      </div>
    </header>
    <div class="back" ref="ti"></div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <main>
        <van-swipe :autoplay="3000" class="traversal">
          <van-swipe-item v-for="(val, index) in traversal" :key="index">
            <img @click="watchP(val.comic_id)" v-lazy="'http://cms.samanlehua.com/'+val.img_url"/>
          </van-swipe-item>
        </van-swipe>
        <div :key="te">
          <One v-for="(val,index) in data.slice(1)" :key="index" :title="val.title" :books="val.comic_info"></One>
        </div>
      </main>
    </van-pull-refresh>
    <!--搜索页-->
    <van-popup v-model="searchshow" position="right" class="searchP">
      <div class="top f-flex1">
        <input type="text" placeholder="绝世唐门" ref="auto" v-model="searchname" @keyup="searchList" @keyup.enter="search">
        <span @click="clear">取消</span>
      </div>
      <div class="cen" v-show="!listShow&&!serShow">
        <h2>大家在搜</h2>
        <div class="f-flex1 ones">
          <div v-for="(val,index) in searchs" @click="watchP(val.comic_id)" :key="index" class="one">
            {{ val.comic_name }}
          </div>
        </div>
      </div>
      <div class="bot" v-show="history.length&&!listShow&&!serShow">
        <div class="hist f-flex1">
          <h2>历史记录</h2>
          <img src="../assets/img/dustbin2.png" @click="history=[]" alt="">
        </div>
        <div class="histbody">
          <div class="f-flex1 one" v-for="(val,index) in history" :key="index" @click="serHis(val)">
            <img src="../assets/img/history.png" alt="">
            <span>{{ val }}</span>
          </div>
        </div>
      </div>
      <div class="list" v-show="listShow&&!serShow">
        <div @click="watchP(val.comic_id)" v-for="(val,index) in list.slice(0,10)" :key="index">
          {{ val.comic_name }}
        </div>
      </div>
      <div class="list2" v-show="serShow">
        <div v-show="list.length>0">
          <div class="top f-flex1"><span class="ti">漫画</span><span class="nu">{{ list.length }}</span></div>
          <div class="body f-flex1">
            <div @click="watchP(val.comic_id)" class="book f-flex2" v-for="(val,index) in list" :key="index">
              <img v-lazy="'http://image.yqmh.com/mh/'+val.comic_id+'.jpg-600x800.jpg.webp'" alt="">
              <span class="f-thide">{{ val.comic_name }}</span>
            </div>
            <div class="book" v-for="i in listMore"></div>
          </div>
        </div>
        <div class="sorry f-flex2" v-show="list.length===0">
          <img src="../assets/img/unsearch.png" alt="">
          无搜索结果
        </div>
      </div>
    </van-popup>

    <!--排行-->
    <van-popup v-model="rankShow" position="right" class="rankP">
      <div class="title f-flex1">
        <div class="one">
          <img @click="rankShow=false" src="../assets/img/back.png" alt="">
        </div>
        <span class="one phb">排行榜</span>
        <span class="one f-flex3">每天12点更新</span>
      </div>
      <div>
        <van-tabs swipe-threshold="10" animated>
          <van-tab class="nav" v-for="i in 5" :title="title[i-1]" :key="i">
            <RankOne :rankType="rank[i-1]"></RankOne>
          </van-tab>
        </van-tabs>
      </div>
    </van-popup>

    <!--分类-->
    <van-popup v-model="classifyShow" position="right" class="classifyP">
      <div class="title f-flex1">
        <div class="one">
          <img @click="classifyShow=false" src="../assets/img/back.png" alt="">
        </div>
        <span class="one phb">分类</span>
        <div class="one f-flex3">
          <img src="../assets/img/search_g.png" alt="" @click="searchshow=true">
        </div>
      </div>
      <div class="category">
        <div class="rong f-flex1">
          <div>
            <input type="radio" v-model="pay" value="" id="quanbu"><label :class="{cho:pay===''}"
                                                                          for="quanbu">全部</label>
          </div>
          <div>
            <input type="radio" v-model="pay" value="1" id="lianzai"><label :class="{cho:pay==='1'}"
                                                                            for="lianzai">连载</label>
          </div>
          <div>
            <input type="radio" v-model="pay" value="2" id="wanjie"><label :class="{cho:pay==='2'}"
                                                                           for="wanjie">完结</label>
          </div>
        </div>
        <div class="rong f-flex1">
          <div>
            <input type="radio" v-model="car" value="" id="quanbu2"><label :class="{cho:car===''}"
                                                                           for="quanbu2">全部</label>
          </div>
          <div>
            <input type="radio" v-model="car" value="2" id="mianfei"><label :class="{cho:car==='2'}"
                                                                            for="mianfei">免费</label>
          </div>
          <div>
            <input type="radio" v-model="car" value="1" id="fufei"><label :class="{cho:car==='1'}"
                                                                          for="fufei">付费</label>
          </div>
        </div>
        <div class="rong f-flex1">
          <div v-for="(val,index) in tags" :key="index">
            <input type="radio" v-model="tag" :value="val.id" :id="val.id">
            <label :for="val.id" :class="{cho:tag===val.id}">{{ val.name }}</label>
          </div>
          <!--          <div v-for="i in 2"></div>-->
        </div>
        <div class="rong2 f-flex1">
          <div>
            <input type="radio" v-model="type" value="total_view_num" id="renqizuigao"><label
              :class="{cho:type==='total_view_num'}"
              for="renqizuigao">人气最高</label>
          </div>
          <div>
            <input type="radio" v-model="type" value="update_time" id="zuijingengxin"><label
              :class="{cho:type==='update_time'}"
              for="zuijingengxin">最近更新</label>
          </div>
        </div>
      </div>
      <div>
        <div class="body f-flex1">
          <div class="book f-flex2" v-for="(book,index) in classifyBooks" @click="watchP(book.cartoon_id)" :key="index">
            <img v-lazy="'http://image.yqmh.com/mh/'+book.cartoon_id+'.jpg-600x800.jpg.webp'" alt="">
            <span class="f-thide">{{ book.cartoon_name }}</span>
          </div>
          <div v-for="i in addDiv" class="book"></div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import One from "../components/One";
import storageUtil from "../util/storageUtil";
import RankOne from "../components/RankOne";
import {Toast} from 'vant'

export default {
  name: 'Home',
  components: {
    RankOne,
    One
  },
  data() {
    return {
      data: [],
      traversal: [],
      isLoading: false,
      te: '',
      Height: 700,
      searchshow: false,
      searchs: [],
      searchname: '',
      history: storageUtil.read('history'),
      allBook: [],
      list: [],
      serShow: false,
      rankShow: false,
      title: ['综合榜', '新作榜', '黑马榜', '完结榜', '免费榜'],
      rank: ['all', 'new', 'dark', 'finish', 'free'],
      classifyShow: false,
      pay: '',
      car: '',
      tags: [{
        id: 'all',
        name: '全部'
      }, {
        id: 'rexue',
        name: '热血'
      }, {
        id: 'lianai',
        name: '恋爱'
      }, {
        id: 'xuanhuan',
        name: '玄幻'
      }, {
        id: 'shenmo',
        name: '神魔'
      }, {
        id: 'dushi',
        name: '都市'
      }, {
        id: 'bazong',
        name: '霸总'
      }, {
        id: 'chuanyue',
        name: '穿越'
      }, {
        id: 'gaoxiao',
        name: '搞笑'
      }, {
        id: 'maoxian',
        name: '冒险'
      }, {
        id: 'mangai',
        name: '漫改'
      }, {
        id: 'gufeng',
        name: '古风'
      }, {
        id: 'shenghuo',
        name: '生活'
      }, {
        id: 'dongzuo',
        name: '动作'
      }, {
        id: 'xuanyi',
        name: '悬疑'
      }, {
        id: 'wuxia',
        name: '武侠'
      }, {
        id: 'shehui',
        name: '社会'
      }, {
        id: 'yundong',
        name: '运动'
      }, {
        id: 'xiuzhen',
        name: '修真'
      }, {
        id: 'kehuan',
        name: '科幻'
      }, {
        id: 'tuili',
        name: '推理'
      }, {
        id: 'zhenren',
        name: '真人'
      }, {
        id: 'youxi',
        name: '游戏'
      }, {
        id: 'zhanzheng',
        name: '战争'
      }, {
        id: 'lishi',
        name: '历史'
      }, {
        id: 'chongwu',
        name: '宠物'
      }, {
        id: 'zazhi',
        name: '杂志'
      }, {
        id: 'jizhan',
        name: '机战'
      }, {
        id: 'renzhe',
        name: '忍者'
      }, {
        id: 'fangyi',
        name: '防疫'
      },],
      tag: 'all',
      type: 'total_view_num',
      classifyBooks: []
    }
  },
  beforeCreate() {
    this.axios.get('http://csjdwz.top:3000/daili', {
      params: {
        url: 'http://cms-booklist.65sy.com/api/v1/bookList/getBookByType?booktype=132&client-version=4.3.7&isnewkmhlite=1&myuid=240802770&page=1&pagesize=20&platformname=iphone&productname=kmh&refreshtime=26800768'
      }
    }).then(result => {
      this.data = result.data.data.book
      this.traversal = this.data[0].comic_info
    }).catch(err => {
      console.log(err)
    })
    this.Height = document.documentElement.clientHeight - 50
    this.axios.get('http://csjdwz.top:3000/daili', {
      params: {
        url: 'http://getconfig-globalapi.65sy.com/app_api/v5/gettopsearch/?client-version=4.3.7&isnewkmhlite=1&myuid=240802770&platformname=iphone&productname=kmh'
      }
    }).then(result => {
      this.searchs = result.data
    }).catch(err => {
      console.log(err)
    })

  },
  created() {
    this.Height = document.documentElement.clientHeight - 50
  },
  methods: {
    load() {
      setTimeout(() => {
        this.reload()
      }, 300)
    },
    handleTopChange(status) {
      this.topStatus = status
    },
    searchShowMe() {
      this.searchshow = true
      this.$nextTick(function () {
        //DOM 更新了
        this.$refs.auto.focus()
      })
    },
    search() {
      if (this.searchname.trim() !== '') {
        this.history.unshift(this.searchname.trim())
        this.history = [...new Set(this.history)]
        this.serShow = true
      }
    },
    searchList() {
      this.serShow = false
      const temp = this.searchname.replace(/\s*/g, "");
      let res = []
      if (temp !== '') {
        res = this.allser(temp, 1)
      }
      this.list = res
      // console.log(this.list)
    },
    allser(key, i) {
      let res = []
      let url =
          'http://getconfig-globalapi.65sy.com/app_api/v5/getsortlist/?client-version=4.3.7&comic_sort=&isnewkmhlite=1&myuid=240802770&orderby=click&page=' + i +
          '&pagesize=2000&p0latformname=iphone&productname=kmh&refreshtime=%26refreshTime%3D26803094&search_key=' + key
      this.axios.get('http://csjdwz.top:3000/daili', {
        params: {
          url: url
        }
      }).then(result => {
        res.push(...result.data.data)
      }).catch(err => {
        console.log(err)
      })
      return res
    },
    clear() {
      this.searchshow = false
      this.searchname = ''
      this.serShow = false
    },
    serHis(val) {
      this.searchname = val
      this.searchList()
      this.search()
    },
    classifyFind() {
      this.classifyShow = true
      let tag2 = ''
      if (this.tag !== 'all') {
        tag2 = this.tag
      }
      let url = 'https://xcxweb.kanman.com/wechat/api/query.do?cartoon_status_id=' + this.car +
          '&client-version=4.3.7&isnewkmhlite=1&myuid=240802770&pageno=1&pagesize=30&pay_type=' + this.pay +
          '&platformname=iphone&productname=kmh&refreshTime=26807443&sortby=' + this.type + '&tag=' + tag2
      this.axios.get('http://csjdwz.top:3000/daili2', {
        params: {
          url: url
        }
      }).then(result => {
        this.classifyBooks = result.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    shade(e){
      const SHAD = 250
      this.$refs.ti.style.opacity = e.scrollTop / SHAD
    },
    onRefresh() {
      setTimeout(() => {
        Toast({
          message: '刷新成功',
          duration: 500,
          position: "top"
        });
        this.changeOne()
        this.isLoading = false;
      }, 600);
    },
    //通过修改key来重载组件
    changeOne() {
      this.te = new Date().getTime()
    }
  },
  computed: {
    isLoadAll() {
      return this.last < this.max
    },
    listShow() {
      return this.searchname.replace(/\s*/g, '') !== '';
    },
    listMore() {
      if (this.list.length % 3 !== 0) {
        return 3 - this.list.length % 3
      } else {
        return 0
      }
    },
    addDiv() {
      if (this.classifyBooks.length % 3 === 0) {
        return 0
      } else {
        return 3 - this.classifyBooks.length % 3
      }
    }
  },
  watch: {
    history: {
      deep: true,
      handler: function (val) {
        storageUtil.save('history', val)
      }
    },
    car: {
      handler: function (val) {
        this.classifyFind()
      }
    },
    pay: {
      handler: function (val) {
        this.classifyFind()
      }
    },
    type: {
      handler: function (val) {
        this.classifyFind()
      }
    },
    tag: {
      handler: function (val) {
        this.classifyFind()
      }
    },
  },
  inject: ['watchP']
}
</script>

<style lang="less">
.home {
  width: 100%;
  overflow: scroll;
  font-size: 12rem/20;

  input::-webkit-input-placeholder {
    /* WebKit browsers 适配谷歌 */
    color: #BCBCBC;
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 适配火狐 */
    color: #BCBCBC;
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ 适配火狐 */
    color: #BCBCBC;
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10+  适配ie*/
    color: #BCBCBC;
  }

  header {
    position: fixed;
    width: 100%;
    height: 50rem/20;
    //background-color: white;
    top: 0;
    z-index: 1000;

    .tag {
      background-color: rgba(0, 0, 0, 0.2);
      width: 60rem/20;
      height: 30rem/20;
      border-radius: 15rem/20;
      color: white;
    }

    .search {
      width: 50%;
      height: 30rem/20;
      border-radius: 15rem/20;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.2);
      color: white;
      justify-content: space-between;
      text-indent: 10rem/20;
      padding-right: 10rem/20;
    }

    img {
      height: 15rem/20;
      width: $height;
    }
  }

  .back {
    position: fixed;
    width: 100%;
    height: 50rem/20;
    background-color: white;
    top: 0;
    z-index: 999;
    opacity: 0;
  }

  main {
    //margin-top: 35rem/20;
    //padding-bottom: 50rem/20;
    //overflow: scroll;

    .traversal {
      width: 100%;

      img {
        width: 100%;
        height: 280rem/20;
      }
    }
  }

  .searchP {
    width: 100%;
    height: 100%;

    .top {
      width: 100%;
      height: 50rem/20;

      input {
        width: 80%;
        border-radius: 15rem/20;
        text-indent: 10rem/20;
        background-color: #F5F4F4;
        border: none;
        height: 30rem/20;
        caret-color: red;
      }

    }

    .cen {

      h2 {
        font-size: 16rem/20;
        text-indent: 16rem/20;
        line-height: 40rem/20;
        font-weight: normal;
      }

      .ones {
        flex-wrap: wrap;
        justify-content: start;

        .one {
          border-radius: 12rem/20;
          height: 25rem/20;
          border: none;
          background-color: #F5F4F4;
          text-align: center;
          line-height: 25rem/20;
          padding: 0 15rem/20;
          margin: 5rem/20 10rem/20 5rem/20 16rem/20;
          color: #6E6E6E;

          &:nth-child(-n+3) {
            color: red;
          }
        }
      }
    }

    .bot {
      .hist {
        justify-content: space-between;

        h2 {
          font-size: 16rem/20;
          text-indent: 16rem/20;
          line-height: 40rem/20;
          font-weight: normal;
        }

        img {
          width: 16rem/20;
          height: $width;
          margin-right: 16rem/20;
        }
      }

      .histbody {
        .one {
          justify-content: start;
          height: 30rem/20;
          color: #6E6E6E;

          img {
            height: 12rem/20;
            width: $height;
            margin: 0 10rem/20 0 16rem/20;
          }
        }
      }
    }

    .list {
      div {
        font-size: 12rem/20;
        margin-left: 16rem/20;
        border-bottom: 1px solid lightcyan;
        line-height: 28rem/20;
      }
    }

    .list2 {


      .top {

        justify-content: start;

        .ti {
          font-size: 16rem/20;
          margin: 0 10rem/20;
        }

        .nu {
          color: #6E6E6E
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

      .sorry {
        margin-top: 100rem/20;
        height: 300rem/20;
        justify-content: start;

        img {
          width: 150rem/20;
          height: $width;
        }

        color: #6E6E6E;
        font-size: 16rem/20;
      }
    }
  }

  .rankP {
    height: 100%;
    width: 100%;

    .title {
      font-size: 12rem/20;
      color: lightgrey;
      height: 35rem/20;
      justify-content: space-between;
      padding: 0 10rem/20;

      .one {
        flex: 1;
      }

      img {
        width: 20rem/20;
        height: $width;
      }

      .phb {
        font-size: 20rem/20;
        color: black;
        text-align: center;
      }
    }
  }

  .classifyP {
    height: 100%;
    width: 100%;

    .title {
      font-size: 12rem/20;
      color: lightgrey;
      height: 35rem/20;
      justify-content: space-between;
      padding: 0 10rem/20;

      .one {
        flex: 1;
      }

      img {
        width: 20rem/20;
        height: $width;
      }

      .phb {
        font-size: 20rem/20;
        color: black;
        text-align: center;
      }
    }

    .category {
      font-size: 12rem/20;
      line-height: 30rem/20;

      input {
        visibility: hidden;
      }

      .cho {
        color: red;
        font-size: 16rem/20;
        text-decoration: underline;
      }

      .rong {
        flex-wrap: wrap;
        justify-content: start;

        div {
          width: 14%;
          height: 30rem/20;
        }
      }

      .rong2 {
        justify-content: start;
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

}
</style>
