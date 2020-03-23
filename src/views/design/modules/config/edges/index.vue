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

          <template v-slot:header="{ model }">

            <div class="comment-template__item">
              <p class="comment-template__leading">显示:</p>
              <div class="comment-template__inner comment-template__end">
                <a-switch
                  checkedChildren="显示"
                  unCheckedChildren="隐藏"
                  v-model="model.display"
                  @change="displayChange" />
              </div>
            </div>
            <!-- / 默认动画 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">默认动画:</p>
              <div class="comment-template__inner comment-template__end">
                <a-switch
                  checkedChildren="启用"
                  unCheckedChildren="不启用"
                  v-model="model.animate"
                  @change="animateChange" />
              </div>
            </div>
            <!-- / 默认动画 -->

          </template>

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
import ColorPicker from '@/components/ColorPicker'
import Template from '../../template/index'

export default {
  name: 'CommonEdgeTemplate',
  components: {
    Template,
    EdgeTemplate,
    ColorPicker
  },
  computed: {
    ...mapState('screen', ['activeWidget', 'activeEdge']),
    model () {
      return _.cloneDeep(this.activeEdge.getModel())
    }
  },
  methods: {
    ...mapMutations('screen', {
      updateTopologyConfig: ScreenMutations.UPDATE_TOPOLOGY_CONFIG
    }),
    change () {
      const { render: { chart } } = this.activeWidget
      // 根据配置更新视图
      chart.updateItem(this.model.id, this.model)
      // 更新配置
      this.updateTopologyConfig()
    },
    /**
     * 动画启用更新
     */
    animateChange () {
      const { render: { chart } } = this.activeWidget
      chart.setItemState(this.model.id, 'active', this.model.animate)
      this.change()
    },
    /**
     * 显示更新
     */
    displayChange () {
      this.model.display ? this.activeEdge.show() : this.activeEdge.hide()
      this.change()
    }
  }
}
</script>

<style scoped>

</style>
