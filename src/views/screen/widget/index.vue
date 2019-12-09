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
    :id="widget.widgetId"
    :ref="widget.widgetId"
    @click.stop="() => $emit('select')">
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import Factory from '@/model/factory/factory'

export default {
  name: 'Widget',
  props: {
    widget: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    chart: null
  }),
  computed: {
    ...mapState('screen', ['widgets'])
  },
  mounted () {
    const widgetFactory = this.widget.config.category === 'CHART'
      ? Factory.createChartFactory()
      : Factory.createElementFactory()
    // 根据类型创建图表
    this.chart = widgetFactory.create(this.widget.config.type, {
      widget: this.widget
    })
    // 将渲染的元素更新至部件
    this.activationWidget({
      widget: Object.assign(this.widget, { render: this.chart })
    })
  },
  methods: {
    ...mapMutations('screen', {
      activationWidget: ScreenMutations.ACTIVATION_WIDGET
    })
  }
}
</script>

<style scoped lang="less">
.widget {
  position: absolute;

  &:hover {
    box-shadow: 0 0 4px 2px rgba(24, 144, 255, .8) !important;
  }
}

</style>
