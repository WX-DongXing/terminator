/**
* 图标专有配置模板
* Author: dong xing
* Date: 2019/11/25
* Time: 3:54 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="chart-proprietary-template">

    <!-- S 图表专有配置顶部插槽 -->
    <slot name="header" :config="config" />
    <!-- E 图表专有配置顶部插槽 -->

    <!-- E 折线图专有配置 -->
    <a-collapse :bordered="false">

      <a-collapse-panel header="图例" key="1">

        <div class="comment-template__item">
          <p class="comment-template__leading">显示:</p>
          <div class="comment-template__inner comment-template__end">
            <a-switch
              checkedChildren="显示"
              unCheckedChildren="不显示"
              v-model="config.proprietaryConfig.legend.show"
              @change="change" />
          </div>
        </div>
        <!-- / 显示 -->

        <div v-if="config.proprietaryConfig.legend.show">
          <div class="comment-template__item">
            <p class="comment-template__leading">方向:</p>
            <div class="comment-template__inner">
              <a-select
                v-model="config.proprietaryConfig.legend.orient"
                @change="change">
                <a-select-option value="horizontal">水平</a-select-option>
                <a-select-option value="vertical">纵向</a-select-option>
              </a-select>
            </div>
          </div>
          <!-- / 方向 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">居上:</p>
            <div class="comment-template__inner">
              <a-input
                type="text"
                @change="change"
                v-model="config.proprietaryConfig.legend.top" />
            </div>
          </div>
          <!-- / 居上 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">居右:</p>
            <div class="comment-template__inner">
              <a-input
                type="text"
                @change="change"
                v-model="config.proprietaryConfig.legend.right" />
            </div>
          </div>
          <!-- / 居右 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">居下:</p>
            <div class="comment-template__inner">
              <a-input
                type="text"
                @change="change"
                v-model="config.proprietaryConfig.legend.bottom" />
            </div>
          </div>
          <!-- / 居下 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">居左:</p>
            <div class="comment-template__inner">
              <a-input
                type="text"
                @change="change"
                v-model="config.proprietaryConfig.legend.left" />
            </div>
          </div>
          <!-- / 居左 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">图标:</p>
            <div class="comment-template__inner">
              <a-select
                v-model="config.proprietaryConfig.legend.icon"
                @change="change">
                <a-select-option
                  v-for="(icon, index) in icons"
                  :key="index"
                  :value="icon.value">
                  {{ icon.name }}
                </a-select-option>
              </a-select>
            </div>
          </div>
          <!-- / 方向 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">颜色:</p>
            <div class="comment-template__inner">
              <ColorPicker
                v-model="config.proprietaryConfig.legend.textStyle.color"
                @change="change" />
            </div>
          </div>
          <!-- / 文字颜色 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">粗细:</p>
            <div class="comment-template__inner">
              <a-select
                v-model="config.proprietaryConfig.legend.textStyle.fontWeight"
                @change="change">
                <a-select-option value="normal">正常</a-select-option>
                <a-select-option value="lighter">细</a-select-option>
                <a-select-option value="bold">粗</a-select-option>
                <a-select-option value="bolder">更粗</a-select-option>
              </a-select>
            </div>
          </div>
          <!-- / 文字粗细 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">大小:</p>
            <div class="comment-template__inner">
              <a-slider
                :min="6"
                :max="24"
                @change="change"
                v-model="config.proprietaryConfig.legend.textStyle.fontSize" />
            </div>
          </div>
        </div>
        <!-- / 文字大小 -->

      </a-collapse-panel>
      <!-- / 图例 -->

      <a-collapse-panel header="X坐标轴" key="2">

        <div class="comment-template__item">
          <p class="comment-template__leading">显示:</p>
          <div class="comment-template__inner comment-template__end">
            <a-switch
              checkedChildren="显示"
              unCheckedChildren="不显示"
              v-model="config.proprietaryConfig.xAxis.show"
              @change="change" />
          </div>
        </div>
        <!-- / 显示 -->

        <div v-if="config.proprietaryConfig.xAxis.show">
          <div class="comment-template__item">
            <p class="comment-template__leading">位置:</p>
            <div class="comment-template__inner comment-template__end">
              <a-radio-group
                buttonStyle="solid"
                v-model="config.proprietaryConfig.xAxis.position"
                @change="change">
                <a-radio-button value="top">居上</a-radio-button>
                <a-radio-button value="bottom">居下</a-radio-button>
              </a-radio-group>
            </div>
          </div>
          <!-- / 位置 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">数据类型:</p>
            <div class="comment-template__inner comment-template__end">
              <a-radio-group
                buttonStyle="solid"
                v-model="config.proprietaryConfig.xAxis.type"
                @change="change">
                <a-radio-button value="category">类别</a-radio-button>
                <a-radio-button value="value">数值</a-radio-button>
                <a-radio-button value="time">时间</a-radio-button>
              </a-radio-group>
            </div>
          </div>
          <!-- / 数据类型 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称:</p>
            <div class="comment-template__inner">
              <a-input
                type="text"
                @change="change"
                v-model="config.proprietaryConfig.xAxis.name" />
            </div>
          </div>
          <!-- / 名称 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称位置:</p>
            <div class="comment-template__inner comment-template__end">
              <a-select
                v-model="config.proprietaryConfig.xAxis.nameLocation"
                @change="change">
                <a-select-option value="start">前</a-select-option>
                <a-select-option value="center">中</a-select-option>
                <a-select-option value="end">后</a-select-option>
              </a-select>
            </div>
          </div>
          <!-- / 名称位置 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称颜色:</p>
            <div class="comment-template__inner comment-template__end">
              <ColorPicker
                v-model="config.proprietaryConfig.xAxis.nameTextStyle.color"
                @change="change()"/>
            </div>
          </div>
          <!-- / 名称颜色 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称大小:</p>
            <div class="comment-template__inner">
              <a-input
                type="number"
                @change="change"
                v-model.number="config.proprietaryConfig.xAxis.nameTextStyle.fontSize" />
            </div>
          </div>
          <!-- / 名称大小 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称粗细:</p>
            <div class="comment-template__inner comment-template__end">
              <a-select
                v-model="config.proprietaryConfig.xAxis.nameTextStyle.fontWeight"
                @change="change">
                <a-select-option value="normal">正常</a-select-option>
                <a-select-option value="lighter">细</a-select-option>
                <a-select-option value="bold">粗</a-select-option>
                <a-select-option value="bolder">更粗</a-select-option>
              </a-select>
            </div>
          </div>
          <!-- / 名称粗细 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称风格:</p>
            <div class="comment-template__inner comment-template__end">
              <a-select
                v-model="config.proprietaryConfig.xAxis.nameTextStyle.fontStyle"
                @change="change">
                <a-select-option value="normal">正常</a-select-option>
                <a-select-option value="italic">斜体</a-select-option>
              </a-select>
            </div>
          </div>
          <!-- / 名称风格 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">间距:</p>
            <div class="comment-template__inner">
              <a-input
                type="number"
                @change="change"
                v-model.number="config.proprietaryConfig.xAxis.nameGap" />
            </div>
          </div>
          <!-- / 间距 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">坐标轴线:</p>
            <div class="comment-template__inner comment-template__end">
              <a-switch
                checkedChildren="显示"
                unCheckedChildren="不显示"
                v-model="config.proprietaryConfig.xAxis.axisLine.show"
                @change="change" />
            </div>
          </div>
          <!-- / 坐标轴线 -->

          <div v-if="config.proprietaryConfig.xAxis.axisLine.show">
            <div class="comment-template__item">
              <p class="comment-template__leading">轴线颜色:</p>
              <div class="comment-template__inner comment-template__end">
                <ColorPicker
                  v-model="config.proprietaryConfig.xAxis.axisLine.lineStyle.color"
                  @change="change()"/>
              </div>
            </div>
            <!-- / 轴线颜色 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">轴线宽度:</p>
              <div class="comment-template__inner comment-template__end">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.xAxis.axisLine.lineStyle.width" />
              </div>
            </div>
            <!-- / 轴线宽度 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">轴线类型:</p>
              <div class="comment-template__inner comment-template__end">
                <a-select
                  v-model="config.proprietaryConfig.xAxis.axisLine.lineStyle.type"
                  @change="change">
                  <a-select-option value="solid">直线</a-select-option>
                  <a-select-option value="dashed">虚线</a-select-option>
                  <a-select-option value="dotted">点线</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 轴线类型 -->

          </div>
          <!-- / 坐标轴线设置 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">坐标刻度:</p>
            <div class="comment-template__inner comment-template__end">
              <a-switch
                checkedChildren="显示"
                unCheckedChildren="不显示"
                v-model="config.proprietaryConfig.xAxis.axisTick.show"
                @change="change" />
            </div>
          </div>
          <!-- / 坐标刻度 -->

          <div v-if="config.proprietaryConfig.xAxis.axisTick.show">
            <div class="comment-template__item">
              <p class="comment-template__leading">刻度颜色:</p>
              <div class="comment-template__inner comment-template__end">
                <ColorPicker
                  v-model="config.proprietaryConfig.xAxis.axisTick.lineStyle.color"
                  @change="change()"/>
              </div>
            </div>
            <!-- / 刻度颜色 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">刻度长度:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.xAxis.axisTick.length" />
              </div>
            </div>
            <!-- / 刻度长度 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">刻度宽度:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.xAxis.axisTick.lineStyle.width" />
              </div>
            </div>
            <!-- / 刻度长度 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">刻度类型:</p>
              <div class="comment-template__inner comment-template__end">
                <a-select
                  v-model="config.proprietaryConfig.xAxis.axisTick.lineStyle.type"
                  @change="change">
                  <a-select-option value="solid">直线</a-select-option>
                  <a-select-option value="dashed">虚线</a-select-option>
                  <a-select-option value="dotted">点线</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 轴线类型 -->

          </div>
          <!-- / 坐标刻度设置 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">坐标标签:</p>
            <div class="comment-template__inner comment-template__end">
              <a-switch
                checkedChildren="显示"
                unCheckedChildren="不显示"
                v-model="config.proprietaryConfig.xAxis.axisLabel.show"
                @change="change" />
            </div>
          </div>
          <!-- / 坐标标签 -->

          <div v-if="config.proprietaryConfig.xAxis.axisLabel.show">
            <div class="comment-template__item">
              <p class="comment-template__leading">标签角度:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  min="-90"
                  max="90"
                  @change="change"
                  v-model.number="config.proprietaryConfig.xAxis.axisLabel.rotate" />
              </div>
            </div>
            <!-- / 标签角度 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">标签间距:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.xAxis.axisLabel.margin" />
              </div>
            </div>
            <!-- / 标签间距 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">标签颜色:</p>
              <div class="comment-template__inner comment-template__end">
                <ColorPicker
                  v-model="config.proprietaryConfig.xAxis.axisLabel.color"
                  @change="change()"/>
              </div>
            </div>
            <!-- / 刻度颜色 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">标签大小:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.xAxis.axisLabel.fontSize" />
              </div>
            </div>
            <!-- / 标签大小 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">标签粗细:</p>
              <div class="comment-template__inner comment-template__end">
                <a-select
                  v-model="config.proprietaryConfig.xAxis.axisLabel.fontWeight"
                  @change="change">
                  <a-select-option value="normal">正常</a-select-option>
                  <a-select-option value="lighter">细</a-select-option>
                  <a-select-option value="bold">粗</a-select-option>
                  <a-select-option value="bolder">更粗</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 标签粗细 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">标签风格:</p>
              <div class="comment-template__inner comment-template__end">
                <a-select
                  v-model="config.proprietaryConfig.xAxis.axisLabel.fontStyle"
                  @change="change">
                  <a-select-option value="normal">正常</a-select-option>
                  <a-select-option value="italic">斜体</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 标签风格 -->

          </div>
          <!-- / 坐标刻度设置 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">分隔线:</p>
            <div class="comment-template__inner comment-template__end">
              <a-switch
                checkedChildren="显示"
                unCheckedChildren="不显示"
                v-model="config.proprietaryConfig.xAxis.splitLine.show"
                @change="change" />
            </div>
          </div>
          <!-- / 分隔线 -->

          <div v-if="config.proprietaryConfig.xAxis.splitLine.show">
            <div class="comment-template__item">
              <p class="comment-template__leading">隔线颜色:</p>
              <div class="comment-template__inner comment-template__end">
                <ColorPicker
                  v-model="config.proprietaryConfig.xAxis.splitLine.lineStyle.color"
                  @change="change()"/>
              </div>
            </div>
            <!-- / 隔线颜色 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">隔线宽度:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.xAxis.splitLine.lineStyle.width" />
              </div>
            </div>
            <!-- / 隔线宽度 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">隔线类型:</p>
              <div class="comment-template__inner comment-template__end">
                <a-select
                  v-model="config.proprietaryConfig.xAxis.splitLine.lineStyle.type"
                  @change="change">
                  <a-select-option value="solid">直线</a-select-option>
                  <a-select-option value="dashed">虚线</a-select-option>
                  <a-select-option value="dotted">点线</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 轴线类型 -->

          </div>
          <!-- / 分隔线设置 -->

        </div>

      </a-collapse-panel>
      <!-- / X坐标轴 -->

      <a-collapse-panel header="Y坐标轴" key="3">

        <div class="comment-template__item">
          <p class="comment-template__leading">显示:</p>
          <div class="comment-template__inner comment-template__end">
            <a-switch
              checkedChildren="显示"
              unCheckedChildren="不显示"
              v-model="config.proprietaryConfig.yAxis.show"
              @change="change" />
          </div>
        </div>
        <!-- / 显示 -->

        <div v-if="config.proprietaryConfig.yAxis.show">
          <div class="comment-template__item">
            <p class="comment-template__leading">位置:</p>
            <div class="comment-template__inner comment-template__end">
              <a-radio-group
                buttonStyle="solid"
                v-model="config.proprietaryConfig.yAxis.position"
                @change="change">
                <a-radio-button value="left">居左</a-radio-button>
                <a-radio-button value="right">居右</a-radio-button>
              </a-radio-group>
            </div>
          </div>
          <!-- / 位置 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">数据类型:</p>
            <div class="comment-template__inner comment-template__end">
              <a-radio-group
                buttonStyle="solid"
                v-model="config.proprietaryConfig.yAxis.type"
                @change="change">
                <a-radio-button value="category">类别</a-radio-button>
                <a-radio-button value="value">数值</a-radio-button>
                <a-radio-button value="time">时间</a-radio-button>
              </a-radio-group>
            </div>
          </div>
          <!-- / 数据类型 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称:</p>
            <div class="comment-template__inner">
              <a-input
                type="text"
                @change="change"
                v-model="config.proprietaryConfig.yAxis.name" />
            </div>
          </div>
          <!-- / 名称 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称位置:</p>
            <div class="comment-template__inner comment-template__end">
              <a-select
                v-model="config.proprietaryConfig.yAxis.nameLocation"
                @change="change">
                <a-select-option value="end">上</a-select-option>
                <a-select-option value="center">中</a-select-option>
                <a-select-option value="start">下</a-select-option>
              </a-select>
            </div>
          </div>
          <!-- / 名称位置 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称颜色:</p>
            <div class="comment-template__inner comment-template__end">
              <ColorPicker
                v-model="config.proprietaryConfig.yAxis.nameTextStyle.color"
                @change="change()"/>
            </div>
          </div>
          <!-- / 名称颜色 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称大小:</p>
            <div class="comment-template__inner">
              <a-input
                type="number"
                @change="change"
                v-model.number="config.proprietaryConfig.yAxis.nameTextStyle.fontSize" />
            </div>
          </div>
          <!-- / 名称大小 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称粗细:</p>
            <div class="comment-template__inner comment-template__end">
              <a-select
                v-model="config.proprietaryConfig.yAxis.nameTextStyle.fontWeight"
                @change="change">
                <a-select-option value="normal">正常</a-select-option>
                <a-select-option value="lighter">细</a-select-option>
                <a-select-option value="bold">粗</a-select-option>
                <a-select-option value="bolder">更粗</a-select-option>
              </a-select>
            </div>
          </div>
          <!-- / 名称粗细 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">名称风格:</p>
            <div class="comment-template__inner comment-template__end">
              <a-select
                v-model="config.proprietaryConfig.yAxis.nameTextStyle.fontStyle"
                @change="change">
                <a-select-option value="normal">正常</a-select-option>
                <a-select-option value="italic">斜体</a-select-option>
              </a-select>
            </div>
          </div>
          <!-- / 名称风格 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">间距:</p>
            <div class="comment-template__inner">
              <a-input
                type="number"
                @change="change"
                v-model.number="config.proprietaryConfig.yAxis.nameGap" />
            </div>
          </div>
          <!-- / 间距 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">坐标轴线:</p>
            <div class="comment-template__inner comment-template__end">
              <a-switch
                checkedChildren="显示"
                unCheckedChildren="不显示"
                v-model="config.proprietaryConfig.yAxis.axisLine.show"
                @change="change" />
            </div>
          </div>
          <!-- / 坐标轴线 -->

          <div v-if="config.proprietaryConfig.yAxis.axisLine.show">
            <div class="comment-template__item">
              <p class="comment-template__leading">轴线颜色:</p>
              <div class="comment-template__inner comment-template__end">
                <ColorPicker
                  v-model="config.proprietaryConfig.yAxis.axisLine.lineStyle.color"
                  @change="change()"/>
              </div>
            </div>
            <!-- / 轴线颜色 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">轴线宽度:</p>
              <div class="comment-template__inner comment-template__end">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.yAxis.axisLine.lineStyle.width" />
              </div>
            </div>
            <!-- / 轴线宽度 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">轴线类型:</p>
              <div class="comment-template__inner comment-template__end">
                <a-select
                  v-model="config.proprietaryConfig.yAxis.axisLine.lineStyle.type"
                  @change="change">
                  <a-select-option value="solid">直线</a-select-option>
                  <a-select-option value="dashed">虚线</a-select-option>
                  <a-select-option value="dotted">点线</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 轴线类型 -->

          </div>
          <!-- / 坐标轴线设置 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">坐标刻度:</p>
            <div class="comment-template__inner comment-template__end">
              <a-switch
                checkedChildren="显示"
                unCheckedChildren="不显示"
                v-model="config.proprietaryConfig.yAxis.axisTick.show"
                @change="change" />
            </div>
          </div>
          <!-- / 坐标刻度 -->

          <div v-if="config.proprietaryConfig.yAxis.axisTick.show">
            <div class="comment-template__item">
              <p class="comment-template__leading">刻度颜色:</p>
              <div class="comment-template__inner comment-template__end">
                <ColorPicker
                  v-model="config.proprietaryConfig.yAxis.axisTick.lineStyle.color"
                  @change="change()"/>
              </div>
            </div>
            <!-- / 刻度颜色 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">刻度长度:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.yAxis.axisTick.length" />
              </div>
            </div>
            <!-- / 刻度长度 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">刻度宽度:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.yAxis.axisTick.lineStyle.width" />
              </div>
            </div>
            <!-- / 刻度长度 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">刻度类型:</p>
              <div class="comment-template__inner comment-template__end">
                <a-select
                  v-model="config.proprietaryConfig.yAxis.axisTick.lineStyle.type"
                  @change="change">
                  <a-select-option value="solid">直线</a-select-option>
                  <a-select-option value="dashed">虚线</a-select-option>
                  <a-select-option value="dotted">点线</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 轴线类型 -->

          </div>
          <!-- / 坐标刻度设置 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">坐标标签:</p>
            <div class="comment-template__inner comment-template__end">
              <a-switch
                checkedChildren="显示"
                unCheckedChildren="不显示"
                v-model="config.proprietaryConfig.yAxis.axisLabel.show"
                @change="change" />
            </div>
          </div>
          <!-- / 坐标标签 -->

          <div v-if="config.proprietaryConfig.yAxis.axisLabel.show">
            <div class="comment-template__item">
              <p class="comment-template__leading">标签角度:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  min="-90"
                  max="90"
                  @change="change"
                  v-model.number="config.proprietaryConfig.yAxis.axisLabel.rotate" />
              </div>
            </div>
            <!-- / 标签角度 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">标签间距:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.yAxis.axisLabel.margin" />
              </div>
            </div>
            <!-- / 标签间距 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">标签颜色:</p>
              <div class="comment-template__inner comment-template__end">
                <ColorPicker
                  v-model="config.proprietaryConfig.yAxis.axisLabel.color"
                  @change="change()"/>
              </div>
            </div>
            <!-- / 刻度颜色 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">标签大小:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.yAxis.axisLabel.fontSize" />
              </div>
            </div>
            <!-- / 标签大小 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">标签粗细:</p>
              <div class="comment-template__inner comment-template__end">
                <a-select
                  v-model="config.proprietaryConfig.yAxis.axisLabel.fontWeight"
                  @change="change">
                  <a-select-option value="normal">正常</a-select-option>
                  <a-select-option value="lighter">细</a-select-option>
                  <a-select-option value="bold">粗</a-select-option>
                  <a-select-option value="bolder">更粗</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 标签粗细 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">标签风格:</p>
              <div class="comment-template__inner comment-template__end">
                <a-select
                  v-model="config.proprietaryConfig.yAxis.axisLabel.fontStyle"
                  @change="change">
                  <a-select-option value="normal">正常</a-select-option>
                  <a-select-option value="italic">斜体</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 标签风格 -->

          </div>
          <!-- / 坐标刻度设置 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">分隔线:</p>
            <div class="comment-template__inner comment-template__end">
              <a-switch
                checkedChildren="显示"
                unCheckedChildren="不显示"
                v-model="config.proprietaryConfig.yAxis.splitLine.show"
                @change="change" />
            </div>
          </div>
          <!-- / 分隔线 -->

          <div v-if="config.proprietaryConfig.yAxis.splitLine.show">
            <div class="comment-template__item">
              <p class="comment-template__leading">隔线颜色:</p>
              <div class="comment-template__inner comment-template__end">
                <ColorPicker
                  v-model="config.proprietaryConfig.yAxis.splitLine.lineStyle.color"
                  @change="change()"/>
              </div>
            </div>
            <!-- / 隔线颜色 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">隔线宽度:</p>
              <div class="comment-template__inner">
                <a-input
                  type="number"
                  @change="change"
                  v-model.number="config.proprietaryConfig.yAxis.splitLine.lineStyle.width" />
              </div>
            </div>
            <!-- / 隔线宽度 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">隔线类型:</p>
              <div class="comment-template__inner comment-template__end">
                <a-select
                  v-model="config.proprietaryConfig.yAxis.splitLine.lineStyle.type"
                  @change="change">
                  <a-select-option value="solid">直线</a-select-option>
                  <a-select-option value="dashed">虚线</a-select-option>
                  <a-select-option value="dotted">点线</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 轴线类型 -->

          </div>
          <!-- / 分隔线设置 -->

        </div>

      </a-collapse-panel>
      <!-- / Y坐标轴 -->

    </a-collapse>
    <!-- E 折线图专有配置 -->

    <!-- S 图表专有配置默认插槽 -->
    <slot :config="config" />
    <!-- E 图表专有配置默认插槽 -->

  </div>
</template>

<script>
import '@/assets/less/template.less'
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import ColorPicker from '@/components/colorPicker/index.vue'

export default {
  name: 'ChartProprietaryTemplate',
  components: {
    ColorPicker
  },
  data: () => ({
    icons: [
      { name: '圆点', value: 'circle' },
      { name: '矩形', value: 'rect' },
      { name: '圆角矩形', value: 'roundRect' },
      { name: '三角形', value: 'triangle' },
      { name: '菱形', value: 'diamond' }
    ]
  }),
  computed: {
    ...mapState('screen', ['activeWidget']),
    config () {
      return _.cloneDeep(this.activeWidget.config)
    }
  },
  methods: {
    ...mapMutations('screen', {
      activateWidget: ScreenMutations.ACTIVATE_WIDGET,
      removeWidget: ScreenMutations.REMOVE_WIDGET
    }),
    change () {
      const activeWidget = _.cloneDeep(this.activeWidget)
      const { render } = this.activeWidget
      Object.assign(activeWidget.config, this.config)
      this.activateWidget({
        widget: Object.assign(activeWidget, { render })
      })
      this.$nextTick(() => {
        render.mergeOption(this.config)
      })
    }
  }
}
</script>

<style scoped lang="less">
.chart-proprietary-template {
  height: calc(100vh - 224px);
  overflow: auto;
}
</style>
