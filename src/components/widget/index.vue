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
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import Factory from '@/model/factory/factory'

export default {
  name: 'Widget',
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
    selectWidget () {
      return Object.assign({}, this.widget, { render: this.render })
    }
  },
  mounted () {
    const { category, type } = this.widget.config
    const widgetFactory = category === 'CHART'
      ? Factory.createChartFactory()
      : Factory.createElementFactory()
    // 根据类型创建图表
    this.render = widgetFactory.create(type, {
      widget: this.widget
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
