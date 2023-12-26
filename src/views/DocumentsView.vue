<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Активные">
      Активные
    </a-tab-pane>
    <a-tab-pane key="2" tab="Подтвержденные">
      Подтвержденные
    </a-tab-pane>
    <template #rightExtra>
      <a-button class="ant-tabs-create-button" type="primary" ghost>
        <PlusOutlined />
        Создать
      </a-button>
    </template>
  </a-tabs>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue'
  const activeKey = ref('1');
</script>

<style scoped>
  .ant-tabs-nav .ant-tabs-create-button {
    margin-left: 16px;
  }
</style>