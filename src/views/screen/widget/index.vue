/**
* 部件渲染组件
* Author: dong xing
* Date: 2019/11/13
* Time: 4:02 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="widget"
       :id="widget.widgetId" :ref="widget.widgetId" @click.stop="() => $emit('select')">
  </div>
</template>

<script>
import Factory from '@/model/factory/factory';

export default {
  name: 'Widget',
  props: ['widget'],
  data: () => ({
    chart: null,
  }),
  mounted() {
    const widgetFactory = this.widget.category === 'CHART'
      ? Factory.createChartFactory()
      : Factory.createElementFactory();
    this.chart = widgetFactory.create(this.widget.type, {
      container: this.$refs[this.widget.widgetId],
      widget: this.widget,
    });
    console.log(this.chart);
  },
};
</script>

<style scoped lang="less">
.widget {
  position: absolute;
}

</style>
