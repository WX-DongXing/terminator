/**
* 边通用配置模板
* Author: dong xing
* Date: 2020/2/20
* Time: 11:34 上午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="common-edge-template common-template">

    <a-collapse defaultActiveKey="1" :bordered="false">

      <!-- S 节点 -->
      <a-collapse-panel header="边" key="1">

        <EdgeTemplate :model="model" @change="change" ref="edgeTemplate">

          <template v-slot="{ model }">
            <div class="comment-template__item">
              <p class="comment-template__leading">文本:</p>
              <div class="comment-template__inner">
                <a-input
                  type="text"
                  v-model.trim="model.label"
                  @change="change" />
              </div>
            </div>
            <!-- / 文本 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">文本颜色:</p>
              <div class="comment-template__inner">
                <ColorPicker v-model="model.labelCfg.style.fill" @change="change" />
              </div>
            </div>
            <!-- / 文本颜色 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">文本大小:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  v-model.number="model.labelCfg.style.fontSize"
                  min="0"
                  @change="change" />
              </div>
            </div>
            <!-- / 文本大小 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">文本位置:</p>
              <div class="comment-template__inner">
                <a-select
                  v-model="model.labelCfg.position"
                  @change="change">
                  <a-select-option value="middle">居中</a-select-option>
                  <a-select-option value="start">居上</a-select-option>
                  <a-select-option value="end">居下</a-select-option>
                  <a-select-option value="left">居右</a-select-option>
                  <a-select-option value="right">居左</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 文本位置 -->

          </template>

        </EdgeTemplate>

      </a-collapse-panel>
      <!-- / 节点 -->

    </a-collapse>

  </div>
</template>

<script>
import '@/assets/less/template.less'
import _ from 'lodash'
import { mapMutations, mapState } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import EdgeTemplate from './edge'
import ColorPicker from '@/components/colorPicker'

export default {
  name: 'CommonEdgeTemplate',
  components: {
    EdgeTemplate,
    ColorPicker
  },
  computed: {
    ...mapState('screen', ['activeWidget', 'activeEdge']),
    model () {
      return _.cloneDeep(this.activeEdge.model)
    }
  },
  methods: {
    ...mapMutations('screen', {
      activationEdge: ScreenMutations.ACTIVATION_EDGE
    }),
    change () {
      const { render: { chart } } = this.activeWidget
      // 根据配置更新视图
      chart.updateItem(this.model.id, this.model)

      this.activationEdge({
        activeEdge: Object.assign({}, { _cfg: this.activeEdge._cfg, model: this.model })
      })
    }
  }
}
</script>

<style scoped>

</style>
