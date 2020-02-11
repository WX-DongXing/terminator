/**
* G6 css缩放场景坐标异常补丁
* Author: dong xing
* Date: 2020/2/10
* Time: 12:59 下午
* Email: dong.xing@outlook.com
*/

import G6 from '@antv/g6'

/**
 * 替换 G.Canvas.getPointByClient 函数，适配CSS缩放的场景。
 * */
const rawGetPointByClient = G6.G.Canvas.prototype.getPointByClient
// 由于需要运行时this指针，这个函数不可改为箭头函数。
G6.G.Canvas.prototype.getPointByClient = function (clientX, clientY) {
  // 获取原函数返回的坐标值
  const raw = rawGetPointByClient.call(this, clientX, clientY)
  // 获取设定高宽和真实高宽。
  // 当设定的高宽不等于getBoundingClientRect获取的高宽时，说明存在缩放。
  const el = this.get('el')
  const bbox = el.getBoundingClientRect()
  const setWidth = this.get('width')
  const setHeight = this.get('height')
  const { width: realWidth, height: realHeight } = bbox
  // 除以缩放比（真实高宽 / 设定高宽）获得真实的坐标。
  return {
    x: raw.x / (realWidth / setWidth),
    y: raw.y / (realHeight / setHeight)
  }
}
