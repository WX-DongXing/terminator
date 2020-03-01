/**
* 视图属性配置
* Author: dong xing
* Date: 2020/2/24
* Time: 5:30 下午
* Email: dong.xing@outlook.com
*/

/**
 * @param mode 背景样式模式
 *  color: 单一颜色
 *  image: 背景图片
 *
 * @param backgroundImage 背景图片
 *
 * @param backgroundSize 背景图片显示模式
 *  null: 默认大小
 *  contain: 伸展
 *  cover: 铺满
 *
 * @param backgroundRepeat 背景图片重复
 *  repeat: 重复
 *  repeat-x: x轴重复
 *  repeat-y: y轴重复
 *  no-repeat: 不重复
 *
 * @param scaleMode 屏幕缩放模式
 *  auto: 自适应
 *  primary: 原始尺寸
 *  fullscreen: 全屏显示
 *  fullWidth: 等比宽度铺满
 *  fullHeight: 等比高度铺满
 */
export default class ViewProprietaryConfig {
  constructor ({
    mode = 'color',
    backgroundColor = 'rgba(255,255,255,1)',
    backgroundImage = '',
    backgroundRepeat = 'no-repeat',
    backgroundSize = '',
    scaleMode = 'auto'
  }) {
    this.mode = mode
    this.backgroundColor = backgroundColor
    this.backgroundImage = backgroundImage
    this.backgroundRepeat = backgroundRepeat
    this.backgroundSize = backgroundSize
    this.scaleMode = scaleMode
  }
}
