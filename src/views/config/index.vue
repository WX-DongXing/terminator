<template>
  <div class="config">
    <div class="config__header"></div>
    <div class="config__content"></div>
  </div>
</template>

<script>
export default {
  name: 'Config',
};
</script>

<style scoped lang="less">
.config {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-content: stretch;

  &__header {
    flex: none;
    height: 48px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.23);
  }

  &__content {
    height: 100%;
  }
}
</style>
