/**
* 节点通用配置模板
* Author: dong xing
* Date: 2020/2/14
* Time: 1:39 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="common-node-template common-template">

    <!-- S 节点通用配置顶部插槽 -->
    <slot name="header" :model="model" />
    <!-- E 节点通用配置顶部插槽 -->

    <a-collapse defaultActiveKey="1" :bordered="false">

      <!-- S 节点 -->
      <a-collapse-panel header="节点" key="1">

        <slot name="inside-header" :model="model" />
        <!-- / 节点通用配置内部顶部插槽 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">形状:</p>
          <div class="comment-template__inner comment-template__end">
            <b>{{ shape.get(model.shape) }}</b>
          </div>
        </div>
        <!-- / 形状 -->

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
        <!-- / 显示 -->

        <div class="comment-template__item" v-if="model.icon">
          <p class="comment-template__leading">图标:</p>
          <div class="comment-template__inner">
            <IconPicker :icon="model.icon" @change="change('icon')" />
          </div>
        </div>
        <!-- / 图标 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">动画类型:</p>
          <div class="comment-template__inner">
            <a-select
              v-model="model.animateType"
              @change="animateTypeChange">
              <a-select-option value="none">无</a-select-option>
              <a-select-option value="default">默认</a-select-option>
              <a-select-option value="success">成功</a-select-option>
              <a-select-option value="warning">告警</a-select-option>
              <a-select-option value="danger">危险</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- / 动画类型 -->

        <div class="comment-template__item" v-if="model.shape === 'rect'">
          <p class="comment-template__leading">圆角:</p>
          <div class="comment-template__inner comment-template__end">
            <a-input
              type="number"
              v-model.number="model.style.radius"
              min="0"
              @change="change" />
          </div>
        </div>
        <!-- / 圆角 -->

        <div class="comment-template__item" v-if="model.shape === 'circle'">
          <p class="comment-template__leading">半径:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="model.radius"
              min="0"
              @change="radiusChange" />
          </div>
        </div>
        <!-- / 半径 -->

        <div v-else>
          <div class="comment-template__item">
            <p class="comment-template__leading">宽:</p>
            <div class="comment-template__inner comment-template__end">
              <a-input
                type="number"
                v-model.number="model.size[0]"
                min="0"
                @change="change" />
            </div>
          </div>
          <!-- / 宽 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">高:</p>
            <div class="comment-template__inner comment-template__end">
              <a-input
                type="number"
                v-model.number="model.size[1]"
                min="0"
                @change="change" />
            </div>
          </div>
          <!-- / 高 -->

        </div>

        <div v-if="model.shape !== 'image'">

          <div class="comment-template__item">
            <p class="comment-template__leading">填充颜色:</p>
            <div class="comment-template__inner comment-template__end">
              <ColorPicker v-model="model.style.fill" @change="change" />
            </div>
          </div>
          <!-- / 填充颜色 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">边框粗细:</p>
            <div class="comment-template__inner">
              <a-slider
                :min="0"
                :max="16"
                @change="change"
                v-model.number="model.style.lineWidth" />
            </div>
          </div>
          <!-- / 边框粗细 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">边框颜色:</p>
            <div class="comment-template__inner comment-template__end">
              <ColorPicker v-model="model.style.stroke" @change="change" />
            </div>
          </div>
          <!-- / 边框颜色 -->

        </div>

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
          <p class="comment-template__leading">文本距离:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="model.labelCfg.offset"
              min="0"
              @change="change" />
          </div>
        </div>
        <!-- / 文本距离 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">文本位置:</p>
          <div class="comment-template__inner">
            <a-select
              v-model="model.labelCfg.position"
              @change="change">
              <a-select-option value="center">居中</a-select-option>
              <a-select-option value="top">居上</a-select-option>
              <a-select-option value="bottom">居下</a-select-option>
              <a-select-option value="left">居左</a-select-option>
              <a-select-option value="right">居右</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- / 文本位置 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">X:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="model.x"
              min="0"
              @change="change" />
          </div>
        </div>
        <!-- / x坐标位置 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">Y:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="model.y"
              min="0"
              @change="change" />
          </div>
        </div>
        <!-- / y坐标位置 -->

        <div class="comment-template__item" v-if="model.img">
          <p class="comment-template__leading">图片:</p>
          <div class="comment-template__inner">
            <a-textarea v-model.trim="model.img" @change="change" />
          </div>
        </div>
        <!-- / 图片 -->

      </a-collapse-panel>
      <!-- / 节点 -->

    </a-collapse>

    <!-- S 节点通用配置默认插槽 -->
    <slot :model="model" />
    <!-- E 节点通用配置默认插槽 -->

  </div>
</template>

<script>
import '@/assets/less/template.less'
import _ from 'lodash'
import { mapMutations, mapState } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import IconPicker from '@/components/IconPicker'
import ColorPicker from '@/components/ColorPicker'

export default {
  name: 'CommonNodeTemplate',
  components: { IconPicker, ColorPicker },
  data: () => ({
    shape: new Map([
      ['circle', '圆形'],
      ['rect', '矩形'],
      ['ellipse', '椭圆形'],
      ['image', '图片']
    ])
  }),
  computed: {
    ...mapState('screen', ['activeWidget', 'activeNode']),
    model () {
      return Object.assign(
        _.cloneDeep(this.activeNode.getModel()),
        { radius: this.activeNode.getModel().size[0] / 2 }
      )
    }
  },
  methods: {
    ...mapMutations('screen', {
      updateTopologyConfig: ScreenMutations.UPDATE_TOPOLOGY_CONFIG,
      updateNode: ScreenMutations.ACTIVATE_NODE
    }),
    /**
     * 节点数据配置更新
     */
    change (type) {
      const { render, config: { proprietaryConfig } } = this.activeWidget
      // 根据配置更新视图，由于 updateItem 方法只能更新节点配置无法更新视图icon
      render.chart.updateItem(this.model.id, this.model)

      // 更新配置
      this.updateTopologyConfig()

      if (type === 'icon') {
        // 通过上一步已经修改后的节点配置项，通过 read 方法更新整个视图以更新 icon
        render.read(proprietaryConfig)
      }

      // 更新当前节点
      this.updateNode({
        activeNode: render.chart.find('node', node => node.getModel().id === this.model.id)
      })
    },
    /**
     * 原型节点半径配置更新
     */
    radiusChange () {
      this.model.size = [this.model.radius * 2, this.model.radius * 2]
      this.change()
    },
    /**
     * 节点动画类型更新
     */
    animateTypeChange () {
      const { render: { chart } } = this.activeWidget
      const { id, animateType } = this.model
      chart.clearItemStates(this.activeNode)
      chart.setItemState(id, animateType, true)
      // 更新配置
      this.change()
    },
    /**
     * 节点显示更新
     */
    displayChange () {
      this.model.display ? this.activeNode.show() : this.activeNode.hide()
      this.change()
    }
  }
}
</script>

<style scoped>

</style>
