/**
 * @desc 属性配置控件
 * @date: 2020/10/28
 * @time: 17:23
 */
<template>
  <div class="prop-control" v-if="option">
    <p>{{ option.name }}:</p>
    <input
      type="text"
      v-model.number="option.value"
      ref="input"
    />
    <div class="prop-control__part">
      <a-icon type="left-circle" @click="$emit('preTimePoint')" />
      <span
        :class="[option.timelines.length > 0 ? 'prop-control__point prop-control__point--active' : 'prop-control__point']"
        @click="$emit('toggleTimePoint')">
      </span>
      <a-icon type="right-circle" @click="$emit('nextTimePoint')" />
    </div>
  </div>
</template>

<script>
import key from 'keymaster'
import { fromEvent } from 'rxjs'
import {
  takeWhile, tap, takeUntil, mergeMap,
  pairwise, map
} from 'rxjs/operators'

export default {
  name: 'PropControl',
  props: {
    option: {
      type: Object,
      default: () => null
    }
  },
  model: {
    prop: 'option',
    event: 'change'
  },
  data () {
    return {
      isSubscribed: true
    }
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
        const changeValue = +((this.option.value + value * (key.shift ? 1 : 0.1)).toFixed(1))
        this.option.value = changeValue > 0 ? changeValue : 0
        this.$emit('change', this.option)
      })
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
