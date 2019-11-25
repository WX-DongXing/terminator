/**
* 折线图配置
* Author: dong xing
* Date: 2019/11/13
* Time: 1:47 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="comment-template">
    <div class="comment-template__header">
      <p class="comment-template__name">折线图</p>
      <a-popconfirm
        title="从视图中删除该部件?"
        placement="left"
        @confirm="() => removeWidget({ widgetId: activeWidget.widgetId })"
        okText="确定"
        cancelText="取消"
      >
        <a-button shape="circle" type="danger" icon="delete" />
      </a-popconfirm>
    </div>
    <div class="lines-config">
      <a-tabs
        defaultActiveKey="1"
        tabPosition="top"
        :style="{ height: '100%'}"
      >
        <a-tab-pane tab="公共属性" key="1">

          <!-- S 公共配置模板 -->
          <CommonTemplate />
          <!-- E 公共配置模板 -->

        </a-tab-pane>

        <a-tab-pane tab="专有属性" key="2">

          <!-- S 专有配置模板 -->
          <ChartProprietaryTemplate ref="chartProprietaryRef">
            <template v-slot="{ config }">

            <!-- 折线图专属配置 -->

            </template>
          </ChartProprietaryTemplate>
          <!-- E 专有配置模板 -->

        </a-tab-pane>

        <a-tab-pane tab="数据配置" key="3">

          <!-- S 数据配置模板 -->
          <DataSourceTemplate />
          <!-- E 数据配置模板 -->

        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import '@/assets/less/template.less';
import CommonTemplate from '../common/index.vue';
import ChartProprietaryTemplate from '../chartProprietary/index.vue';
import DataSourceTemplate from '../dataSource/index.vue';

export default {
  name: 'Lines',
  components: {
    CommonTemplate,
    ChartProprietaryTemplate,
    DataSourceTemplate,
  },
};
</script>

<style scoped lang="less">
.lines-config {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
  overflow: auto;
}
</style>
