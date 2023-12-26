<script setup lang="ts">
  import { ref } from 'vue'
  const selectedKeys = ref<string[]>(['1']);
</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <router-link to="/">Документы</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="employees">Сотрудники</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px', height: '100%' }">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
  .ant-layout-content {
    overflow-y: auto;
  }

  .ant-layout-content {
    padding: 16px;

    @media screen and (min-width: 768px) {
      padding: 24px;
    }
  }

  .ant-layout-header {
    padding-inline: 16px;

    @media screen and (min-width: 768px) {
      padding-inline: 24px;
    }
  }
</style>