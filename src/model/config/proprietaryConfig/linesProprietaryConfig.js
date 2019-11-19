/**
* 折线图专有属性配置
* Author: dong xing
* Date: 2019/11/19
* Time: 5:54 下午
* Email: dong.xing@outlook.com
*/

/**
 * 折现样式
 * @param type 'solid' | 'dashed' | 'dotted'
 */
class LineStyle {
  constructor(
    color = 'rgba(0,0,0,1)',
    width = 2,
    type = 'solid',
  ) {
    this.color = color;
    this.width = width;
    this.type = type;
  }
}

/**
 * 图例文本样式
 * @param fontWeight 'normal' | 'bold' | 'bolder' | 'lighter'
 */
class LegendTextStyle {
  constructor(
    color = 'rgba(0,0,0,1)',
    fontWeight = 'normal',
    fontSize = 12,
  ) {
    this.color = color;
    this.fontWeight = fontWeight;
    this.fontSize = fontSize;
  }
}

/**
 * 图例
 * @param orient 'horizontal' | 'vertical'
 * @param icon 'circle' | 'rect' | 'roundRect' | 'triangle' |  'diamond' | 'pin' | 'arrow' | 'none'
 */
class Legend {
  constructor(
    show = 0,
    orient = 'horizontal',
    icon = 'circle',
    textStyle,
  ) {
    this.show = show;
    this.orient = orient;
    this.icon = icon;
    this.textStyle = new LegendTextStyle(textStyle);
  }
}

/**
 * 折现图专有属性配置
 */
export default class LinesProprietaryConfig {
  constructor(
    smooth = 0,
    lineStyle,
    legend,
  ) {
    // 是否平滑曲线显示
    this.smooth = smooth || 0;
    this.lineStyle = new LineStyle(lineStyle);
    this.legend = new Legend(legend);
  }
}
