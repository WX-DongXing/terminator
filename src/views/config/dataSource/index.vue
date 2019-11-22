<template>
  <div class="data-source common-template">

    <!-- S 背景颜色 -->
    <p class="comment-template__title">数据源</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">选择:</p>
        <div class="comment-template__inner">
          <a-select
            class="data-source__select">
<!--            v-model="config.proprietaryConfig.lineStyle.type" @change="change">-->
            <a-select-option value="static">静态数据</a-select-option>
            <a-select-option value="real">实时数据</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <!-- E 背景颜色 -->

  </div>
</template>

<script>
import '@/assets/less/template.less';
import _ from 'lodash';
import { mapState } from 'vuex';

export default {
  name: 'DataSourceTemplate',
  computed: {
    ...mapState('screen', ['activeWidget', 'view']),
    // 为不修改 state.activeWidget，在此深复制激活部件的配置项，并将其设置为该组件内变量，修改部件后提交再行修改state.activeWidget
    config() {
      return _.cloneDeep(this.activeWidget.config);
    },
  },
  created() {
    console.log(this.config);
  },
};
</script>

<style scoped lang="less">
.data-source {

  &__select {
    width: 100%;
  }
}
</style>
