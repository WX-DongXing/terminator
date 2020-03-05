/**
* 通用echarts对象
* Author: dong xing
* Date: 2019/11/25
* Time: 6:04 下午
* Email: dong.xing@outlook.com
*/

/**
 * 图例
 * @param orient 'horizontal' | 'vertical'
 * @param icon 'circle' | 'rect' | 'roundRect' | 'triangle' |  'diamond' | 'pin' | 'arrow' | 'none'
 */
class Legend {
  constructor ({
    show = false,
    orient = 'horizontal',
    icon = 'circle',
    top = 'auto',
    right = 'auto',
    bottom = 'auto',
    left = 'auto',
    textStyle = {}
  }) {
    this.show = show
    this.orient = orient
    this.top = top
    this.right = right
    this.bottom = bottom
    this.left = left
    this.icon = icon
    this.textStyle = new TextStyle(textStyle)
  }
}

/**
 * 折线样式
 * @param type 'solid' | 'dashed' | 'dotted'
 */
class LineStyle {
  constructor ({
    color = 'rgba(0,0,0,1)',
    width = 2,
    type = 'solid'
  }) {
    this.color = color
    this.width = width
    this.type = type
  }
}

/**
 * 图形样式
 * @param type 类型 'single' | 'combination' | 'linear'
 * @param colorType 颜色类型 'default' | 'custom'
 */
class BarItemStyle {
  constructor ({
    type = 'single',
    colorType = 'default',
    colorScheme = 'default',
    color = 'rgba(7,171,253,1)',
    barBorderRadius = [0, 0, 0, 0]
  }) {
    this.type = type
    this.colorType = colorType
    this.colorScheme = colorScheme
    this.color = color
    this.barBorderRadius = barBorderRadius
  }

  getOption () {
    let color
    switch (this.type) {
      case 'single':
        color = this.color
        break
      case 'combination':
        color = [...this.color]
        break
      case 'linear':
        color = [...this.color].map(({ start, end }) => ({
          type: 'linear',
          x: 1,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: start
            },
            {
              offset: 1,
              color: end
            }
          ]
        }))
        break
      default:
        color = 'rgba(7,171,253,1)'
        break
    }
    return {
      color,
      barBorderRadius: this.barBorderRadius
    }
  }
}

/**
 * 通用文本样式配置
 * @param color 文本颜色
 * @param fontStyle 文本风格 'normal' | 'italic'
 * @param fontSize 文本大小 12
 * @param fontWeight 文本粗细 'normal' | 'lighter' | 'bold' | 'bolder'
 */
class TextStyle {
  constructor ({
    color = 'rgba(0, 0, 0, 1)',
    fontStyle = 'normal',
    fontSize = 12,
    fontWeight = 'normal'
  }) {
    this.color = color
    this.fontStyle = fontStyle
    this.fontSize = fontSize
    this.fontWeight = fontWeight
  }
}

/**
 * 坐标轴轴线相关配置
 * @param show 是否显示坐标轴线
 * @param lineStyle 坐标轴轴线样式
 */
class AxisLine {
  constructor ({
    show = true,
    lineStyle = {}
  }) {
    this.show = show
    this.lineStyle = new LineStyle(lineStyle)
  }
}

/**
 * 坐标轴刻度相关设置
 * @param show: 是否显示坐标轴刻度
 * @param length: 坐标轴刻度的长度
 * @param lineStyle 刻度线样式
 */
class AxisTick {
  constructor ({
    show = true,
    length = 5,
    lineStyle = {}
  }) {
    this.show = show
    this.length = length
    this.lineStyle = new LineStyle(lineStyle)
  }
}

/**
 * 坐标轴刻度标签的相关设置
 * @param show 是否显示刻度标签
 * @param rotate 刻度标签旋转的角度 -90 ~ 90
 * @param margin 刻度标签与轴线之间的距离
 */
class AxisLabel extends TextStyle {
  constructor ({
    show = true,
    rotate = 0,
    margin = 8,
    ...props
  }) {
    super(props)
    this.show = show
    this.rotate = rotate
    this.margin = margin
  }
}

/**
 * 坐标轴区域分隔线相关设置
 * @param show 是否显示分隔线
 * @param lineStyle 分隔线线样式
 */
class SplitLine {
  constructor ({
    show = false,
    lineStyle = {}
  }) {
    this.show = show
    this.lineStyle = new LineStyle(lineStyle)
  }
}

/**
 * 坐标轴配置
 * @param aixsName = 坐标轴类型 'x' | 'y'
 * @param show 是否显示
 * @param position x轴位置 'bottom' | 'top'
 * @param type 坐标轴数据类型 'category' | 'value' | 'time'
 * @param name 坐标轴名称 'category' | 'value' | 'time'
 * @param nameLocation 坐标轴名称位置 'end' | 'center' | 'start'
 * @param nameTextStyle 坐标轴名称样式
 * @param nameGap 坐标轴名称与轴线之间的距离 15
 * @param axisLine 坐标轴轴线相关设置
 * @param axisTick 坐标轴刻度相关设置
 * @param axisLabel 坐标轴刻度标签的相关设置
 * @param splitLine 坐标轴区域分隔线相关设置
 */
class Aixs {
  constructor ({
    aixsName = '',
    show = true,
    type = 'category',
    name = '',
    nameLocation = 'end',
    nameTextStyle = {},
    nameGap = 15,
    gridIndex = 1,
    axisLine = {},
    axisTick = {},
    axisLabel = {},
    splitLine = {}
  }) {
    this.show = show
    this.type = type
    this.name = name
    this.nameLocation = nameLocation
    this.nameTextStyle = new TextStyle(nameTextStyle)
    this.nameGap = nameGap
    this.gridIndex = gridIndex
    this.axisLine = new AxisLine(axisLine)
    this.axisTick = new AxisTick(axisTick)
    this.axisLabel = new AxisLabel(axisLabel)
    this.splitLine = new SplitLine(splitLine)
  }
}

/**
 * x轴配置
 * 官方配置: https://echarts.apache.org/zh/option.html#xAxis
 */
class XAixs extends Aixs {
  constructor ({
    position = 'bottom',
    ...props
  }) {
    super(props)
    this.aixsName = 'x'
    this.position = position
  }
}

/**
 * y轴配置
 * 官方配置: https://echarts.apache.org/zh/option.html#yAxis
 */
class YAixs extends Aixs {
  constructor ({
    position = 'left',
    ...props
  }) {
    super(props)
    this.aixsName = 'y'
    this.position = position
  }
}

export {
  Legend,
  LineStyle,
  BarItemStyle,
  XAixs,
  YAixs
}
