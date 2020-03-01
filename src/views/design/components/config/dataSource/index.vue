/**
* 数据源选择模板
* Author: dong xing
* Date: 2019/12/6
* Time: 4:09 下午
* Email: dong.xing@outlook.com
*/

<template>
  <div class="data-source common-template">

    <a-collapse defaultActiveKey="1" :bordered="false">

      <!-- S 数据源 -->
      <a-collapse-panel header="数据源" key="1">

        <div class="comment-template__item">
          <p class="comment-template__leading">选择:</p>
          <div class="comment-template__inner">
            <a-select
              class="data-source__select"
              v-model="config.dataConfig.sourceType"
              @change="change">
              <a-select-option value="null">空数据</a-select-option>
              <a-select-option value="static">静态数据</a-select-option>
              <a-select-option value="real">实时数据</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- / 数据源选择 -->

      </a-collapse-panel>
      <!-- E 数据源 -->

    </a-collapse>

  </div>
</template>

<script>
import '@/assets/less/template.less'
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'

export default {
  name: 'DataSourceTemplate',
  computed: {
    ...mapState('screen', ['activeWidget']),
    config () {
      return _.cloneDeep(this.activeWidget.config)
    }
  },
  methods: {
    ...mapMutations('screen', {
      activateWidget: ScreenMutations.ACTIVATE_WIDGET
    }),
    change () {
      const activeWidget = _.cloneDeep(this.activeWidget)
      const { render } = this.activeWidget
      Object.assign(activeWidget.config, this.config)
      this.activateWidget({
        widget: Object.assign(activeWidget, { render })
      })
      render.mergeOption(this.config)
    }
  }
}
</script>

<style scoped lang="less">
.data-source {

  &__select {
    width: 100%;
  }
}
</style>
