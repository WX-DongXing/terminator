/**
* 通用echarts对象
* Author: dong xing
* Date: 2019/11/25
* Time: 6:04 下午
* Email: dong.xing@outlook.com
*/

/**
 * 图例文本样式
 * @param fontWeight 'normal' | 'bold' | 'bolder' | 'lighter'
 */
class LegendTextStyle {
  constructor ({
    color = 'rgba(0,0,0,1)',
    fontWeight = 'normal',
    fontSize = 12
  }) {
    this.color = color
    this.fontWeight = fontWeight
    this.fontSize = fontSize
  }
}

/**
 * 图例
 * @param orient 'horizontal' | 'vertical'
 * @param icon 'circle' | 'rect' | 'roundRect' | 'triangle' |  'diamond' | 'pin' | 'arrow' | 'none'
 */
class Legend {
  constructor ({
    show = 0,
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
    this.textStyle = new LegendTextStyle(textStyle)
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
class ItemStyle {
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
}

export {
  Legend,
  LineStyle,
  ItemStyle
}
