/**
 * @desc 属性配置控件
 * @date: 2020/10/28
 * @time: 17:23
 */
<template>
  <div class="prop-control" v-if="prop.type">
    <p>{{ prop.name }}:</p>
    <input
      type="text"
      v-model.number="prop.value"
      ref="input"
    />
    <div class="prop-control__part">
      <a-icon type="left-circle" @click="$emit('preTimePoint')" />
      <span
        :class="[prop.timeline.length > 0 ? 'prop-control__point prop-control__point--active' : 'prop-control__point']"
        @click="$emit('recordTime', prop)">
      </span>
      <a-icon type="right-circle" @click="$emit('nextTimePoint')" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import anime from 'animejs'
import key from 'keymaster'
import { fromEvent } from 'rxjs'
import {
  takeWhile, tap, takeUntil, mergeMap,
  pairwise, map
} from 'rxjs/operators'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'

const SpecialList = ['width', 'height', 'top', 'left']

export default {
  name: 'PropControl',
  props: {
    prop: {
      type: Object,
      default: () => ({})
    },
    propIndex: {
      type: Number,
      default: 0
    },
    widgetIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isSubscribed: true
    }
  },
  computed: {
    ...mapState('screen', ['activeWidget', 'time']),
    ...mapGetters('screen', ['widgets', 'scale'])
  },
  mounted () {
    const inputDown$ = fromEvent(this.$refs.input, 'mousedown')
    const documentMove$ = fromEvent(document, 'mousemove')
    const documentUp$ = fromEvent(document, 'mouseup')

    inputDown$
      .pipe(
        takeWhile(() => this.isSubscribed),
        mergeMap(() => documentMove$.pipe(takeUntil(documentUp$))),
        tap((event) => {
          event.preventDefault()
        }),
        pairwise(),
        map(([pre, cur]) => cur.pageX - pre.pageX > 0 ? 1 : -1)
      )
      .subscribe(value => {
        const changeValue = +((this.prop.value + value * (key.shift ? 2 : 0.5)).toFixed(1))
        this.prop.value = changeValue > 0 ? changeValue : 0
        this.updateIndexWidget()
      })
  },
  methods: {
    ...mapMutations('screen', {
      updateWidget: ScreenMutations.UPDATE_WIDGET
    }),
    updateIndexWidget () {
      console.log(this.prop, +this.time.toFixed(2))
      const index = this.prop.timeline.findIndex(item => item.time === +this.time.toFixed(2))
      if (index !== -1) {
        this.prop.timeline.splice(index, 1, Object.assign(this.prop.timeline[index], { value: this.prop.value }))
      } else {
        this.prop.timeline.push({ time: +this.time.toFixed(2), ..._.omit(this.prop, ['timeline']) })
      }
      const widget = this.widgets[this.widgetIndex]
      if (SpecialList.includes(this.prop.type)) {
        const { type, value } = this.prop
        const targetProp = { [type]: value }
        Object.assign(widget.animateProps, targetProp)
        Object.assign(widget.config.commonConfig, targetProp)
      }
      widget.animateProps.props.splice(this.propIndex, 1, this.prop)
      const widgetDom = document.getElementById(widget.widgetId)
      const { type, value } = this.prop
      anime.set(widgetDom, {
        [type]: value
      })
      this.updateWidget({ index: this.widgetIndex, widget })
    }
  },
  beforeDestroy () {
    this.isSubscribed = false
  }
}
</script>

<style scoped lang="less">
.prop-control {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 36px;
  box-sizing: border-box;
  padding: 0 12px;
  color: #000000A6;

  p {
    flex: none;
    width: 60px;
    font-size: 12px;
    margin: 0;
  }

  input {
    flex: none;
    width: 60px;
    border: none;
    outline: none;
    font-size: 12px;
    cursor: ew-resize;
    border-top: 1px solid transparent;
    border-bottom: 1px solid rgba(0, 0, 0, .12);
    margin: 0 8px;
    background: transparent;
  }

  &__part {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 64px;
    box-sizing: border-box;

    i {
      cursor: pointer;
    }
  }

  &__point {
    flex: none;
    width: 10px;
    height: 10px;
    cursor: pointer;
    border-radius: 3px;
    background: rgba(0, 0, 0, .23);
    transform: rotate(45deg);

    &--active {
      background: #1890ff !important;
    }
  }

}
</style>
