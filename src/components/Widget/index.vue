/**
* 部件渲染组件
* Author: dong xing
* Date: 2019/11/13
* Time: 4:02 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div
    class="widget"
    :class="[onlyShow ? 'widget' : 'widget widget--hover']"
    :id="widget.widgetId"
    :ref="widget.widgetId"
    @click.stop="() => $emit('select', selectWidget)">

    <!-- S 元素部件 -->
    <component v-if="useComponent" :is="elementName" :elementProps="elementProps" ref="element" />
    <!-- E 元素部件 -->

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import Factory from '@/model/factory/factory'
import { ELEMENTS, ELEMENTMAPPING } from '../Elements'
import Widget from '@/model/widget'

export default {
  name: 'Widget',
  components: {
    ...ELEMENTS
  },
  props: {
    widget: {
      type: Object,
      default: () => ({})
    },
    onlyShow: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    render: null
  }),
  computed: {
    // 选择的部件
    selectWidget () {
      return Object.assign(this.widget, { render: this.render })
    },
    // 在类型为元素时使用组件进行渲染
    useComponent () {
      return this.widget.config.category === 'ELEMENT'
    },
    // 元素组件名
    elementName () {
      return ELEMENTMAPPING.get(this.widget.config.type)
    },
    // 元素配置
    elementProps () {
      return this.widget.config.proprietaryConfig.props
    }
  },
  mounted () {
    // 在直接使用配置渲染情况中，此时 widget prop 并不是 Widget 的实例，需要将其实例化
    if (!(this.widget instanceof Widget)) {
      Object.assign(this.widget, new Widget(this.widget))
    }
    const { category, type } = this.widget.config
    const widgetFactory = category === 'CHART'
      ? Factory.createChartFactory()
      : Factory.createElementFactory()
    // 根据类型创建图表
    this.render = widgetFactory.create(type, {
      widget: this.widget,
      element: this.$refs.element && this.$refs.element.$el
    })

    // 如果在编辑状态，将渲染的元素更新至部件
    !this.onlyShow && this.activateWidget({
      widget: this.selectWidget
    })
  },
  methods: {
    ...mapMutations('screen', {
      activateWidget: ScreenMutations.ACTIVATE_WIDGET
    })
  },
  beforeDestroy () {
    this.render.destroy()
  }
}
</script>

<style scoped lang="less">
.widget {
  position: absolute !important;
  overflow: hidden;

  &--hover:hover {
    box-shadow: 0 0 4px 2px rgba(24, 144, 255, .8) !important;
  }
}

</style>
