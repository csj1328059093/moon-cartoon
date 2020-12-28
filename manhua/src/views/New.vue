<template>
  <div class="new f-flex1">
    <van-tabs ref="tabs" v-model="active" :swipeable="true" swipe-threshold="10" animated>
      <van-tab v-for="(val,index) in data" :title="val.comicUpdateDate" :key="index">
        <UpdataOne :books="val.info"></UpdataOne>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UpdataOne from "../components/UpdataOne";

export default {
  name: "New",
  components: {UpdataOne},
  data() {
    return {
      data: [],
      active: 6,
    }
  },
  beforeCreate() {
    this.axios.get('http://csjdwz.top:3000/daili', {
      params: {
        url: 'http://comic.65sy.com/app_api/v5/updatelist/?client-version=4.3.7&isnewkmhlite=1&myuid=240802770&platformname=iphone&productname=kmh&refreshTime=26804270'
      }
    }).then(result => {
      this.data = result.data.update
      setTimeout(() => {
        if (this.$refs.tabs) {
          this.$refs.tabs.resize()
        }
      }, 0)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="less" scoped>
.new {
  width: 100%;
  padding-top: 10rem/20;

  /deep/ .van-tab__text {
    font-size: 14rem/20;
    overflow: visible;
  }


}
</style>