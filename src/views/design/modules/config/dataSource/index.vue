/**
* 数据源选择模板
* Author: dong xing
* Date: 2019/12/6
* Time: 4:09 下午
* Email: dong.xing@outlook.com
*/

<template>
  <div class="data-source comment-template">
    <a-collapse defaultActiveKey="1" :bordered="false">

      <!-- S 数据源 -->
      <a-collapse-panel header="数据源" key="1">

        <div class="comment-template__item">
          <p class="comment-template__leading">选择:</p>
          <div class="comment-template__inner">
            <a-select
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

      <!-- S 静态数据编辑 -->
      <a-collapse-panel header="静态数据编辑" key="2" v-show="config.dataConfig.sourceType === 'static'">
        <a-icon slot="extra" class="data-source__fullscreen" :type="isFullscreen ? 'setting' : 'fullscreen-exit'" @click="switchMode" />

        <div class="data-source__wrap">
          <AceEditor
            class="data-source__editor"
            language="json"
            :code="code"
            @change="staticSourceChange" />
        </div>

      </a-collapse-panel>
      <!-- E 静态数据编辑 -->

    </a-collapse>

  </div>
</template>

<script>
import '@/assets/less/template.less'
import _ from 'lodash'
import AceEditor from 'vue-ace-editor-valid'
import { mapState, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'

export default {
  name: 'DataSourceTemplate',
  components: {
    AceEditor
  },
  data: function () {
    return {
      isFullscreen: false
    }
  },
  computed: {
    ...mapState('screen', ['activeWidget']),
    config () {
      return _.cloneDeep(this.activeWidget.config)
    },
    code () {
      // 柱形图根据类型调整样式
      const { barType } = this.config.proprietaryConfig
      return this.activeWidget.config.dataConfig.staticDataConfig.getCode(barType)
    }
  },
  methods: {
    ...mapMutations('screen', {
      activateWidget: ScreenMutations.ACTIVATE_WIDGET
    }),
    switchMode () {
      this.isFullscreen = !this.isFullscreen
    },
    /**
     * 静态资源修改
     * @param code 静态资源代码
     */
    staticSourceChange (code) {
      if (code !== '') {
        switch (this.config.type) {
          case 'Lines':
            Object.assign(
              this.config.dataConfig.staticDataConfig,
              { staticData: JSON.parse(code) }
            )
            break
          case 'Bar':
            const { barType } = this.config.proprietaryConfig
            const typeMapping = new Map([
              ['single', 'singleSeries'],
              ['multiple', 'multipleSeries']
            ])
            Object.assign(
              this.config.dataConfig.staticDataConfig.staticData,
              Object.assign(_.omit(JSON.parse(code), ['series'])),
              {
                [typeMapping.get(barType)]: JSON.parse(code).series
              }
            )
            break
          default:
            break
        }
        this.change()
      }
    },
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

  &__fullscreen {
    color: #1890ff;
  }

  &__wrap {
    height: calc(100vh - 388px);
  }

  &__editor {
    border-radius: 4px;
    background: #f1f1f1;
    font-size: 14px;
  }
}
</style>
