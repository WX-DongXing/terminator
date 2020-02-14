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
        <!-- / x坐标位置 -->

        <div v-else>
          <div class="comment-template__item">
            <p class="comment-template__leading">宽:</p>
            <div class="comment-template__inner topology-config__editable">
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
            <div class="comment-template__inner topology-config__editable">
              <a-input
                type="number"
                v-model.number="model.size[1]"
                min="0"
                @change="change" />
            </div>
          </div>
          <!-- / 高 -->

        </div>

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

export default {
  name: 'CommonNodeTemplate',
  computed: {
    ...mapState('screen', ['activeWidget', 'activeNode']),
    model () {
      return Object.assign(
        {},
        _.cloneDeep(this.activeNode.model),
        { radius: this.activeNode.model.size[0] / 2 }
      )
    }
  },
  methods: {
    ...mapMutations('screen', {
      activationNode: ScreenMutations.ACTIVATION_NODE
    }),
    /**
     * 节点数据配置更新
     */
    change () {
      // 更新激活节点配置
      this.activationNode({
        activeNode: Object.assign({}, { _cfg: this.activeNode._cfg, model: _.omit(this.model, ['radius']) })
      })
      // 根据配置更新视图
      const { render: { chart } } = this.activeWidget
      chart.updateItem(this.model.id, this.model)
    },
    /**
     * 原型节点半径配置更新
     */
    radiusChange () {
      this.model.size = [this.model.radius * 2, this.model.radius * 2]
      this.change()
    }
  }
}
</script>

<style scoped>

</style>
