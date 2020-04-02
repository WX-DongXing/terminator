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

    </a-collapse>

    <!-- S 数据编辑 -->
    <div class="data-source__modify" v-if="config.dataConfig.sourceType === 'static'">
      <div class="data-source__control">
        <p>数据编辑</p>
        <a-button type="primary" shape="circle" :icon="isFullscreen ? 'fullscreen' : 'fullscreen-exit'" @click="switchMode" />
      </div>
      <div class="data-source__wrap">
        <AceEditor class="data-source__editor" v-model="code" />
      </div>
    </div>
    <!-- E 数据编辑 -->

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
  data: () => ({
    isFullscreen: false,
    code: ''
  }),
  created () {
    this.code = JSON.stringify(this.config.dataConfig.staticData, null, '\t')
  },
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
    switchMode () {
      this.isFullscreen = !this.isFullscreen
    },
    codeChange () {},
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

  &__modify {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;
    height: 500px;
  }

  &__control {
    flex: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    padding: 0 16px;
    border-bottom: 1px solid #d9d9d9;

    p {
      margin: 0;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  &__wrap {
    height: calc(100vh - 366px);
    box-sizing: border-box;
    padding: 16px 16px;
  }

  &__editor {
    border-radius: 4px;
    background: #f1f1f1;
    font-size: 14px;
    font-family: Source Code Pro;
  }
}
</style>
