/**
* 视图渲染
* Author: dong xing
* Date: 2020/3/1
* Time: 19:27
* Email: dong.xing@outlook.com
*/

<template>
  <div class="renderer" ref="wrap">
    <div class="renderer__content" ref="renderer">
      <Widget
        only-show
        v-if="view.widgets.length > 0"
        v-for="widget in view.widgets"
        :widget="widget"
        :key="widget.widgetId"
        :ref="widget.widgetId"
        @select="() => $emit('change', { el: 'widget', widget })"
      />
      <!-- / 部件渲染 -->
    </div>
  </div>
</template>

<script>
import { fromEvent } from 'rxjs'
import { takeWhile, startWith } from 'rxjs/operators'
import Widget from '@/components/Widget'
import anime from 'animejs'

export default {
  name: 'Renderer',
  components: {
    Widget
  },
  data: () => ({
    isSubscribed: true,
    scale: [1, 1]
  }),
  props: {
    view: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    fromEvent(window, 'resize')
      .pipe(
        takeWhile(() => this.isSubscribed),
        startWith('')
      )
      .subscribe(() => {
        const { width: wrapWidth, height: wrapHeight } = this.$refs.wrap.getBoundingClientRect()
        const {
          config: {
            commonConfig: { height, width },
            proprietaryConfig: {
              mode,
              backgroundColor,
              backgroundImage,
              backgroundRepeat,
              backgroundSize,
              scaleMode
            }
          }
        } = this.view

        const scaleX = wrapWidth / width
        const scaleY = wrapHeight / height
        const scale = Math.min(scaleX, scaleY)

        switch (scaleMode) {
          case 'auto':
            this.scale = [scale, scale]
            break
          case 'primary':
            this.scale = [1, 1]
            break
          case 'fullscreen':
            this.scale = [scaleX, scaleY]
            break
          case 'fullWidth':
            this.scale = [scaleX, scaleX]
            break
          case 'fullHeight':
            this.scale = [scaleY, scaleY]
            break
          default:
            this.scale = [1, 1]
            break
        }

        anime.set(this.$refs.renderer, {
          width,
          height,
          backgroundImage: mode === 'image' ? `url(${backgroundImage})` : '',
          background: mode === 'single' ? backgroundColor : `linear-gradient(${backgroundColor.angle}deg, ${backgroundColor.start}, ${backgroundColor.end})`,
          backgroundRepeat,
          backgroundSize,
          transformOrigin: '0 0',
          scaleX: this.scale[0],
          scaleY: this.scale[1]
        })
      })
  },
  beforeDestroy () {
    this.isSubscribed = false
  }
}
</script>

<style scoped lang="less">
.renderer {
  width: 100%;
  height: 100%;

  &__content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
