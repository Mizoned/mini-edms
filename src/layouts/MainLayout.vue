<script setup lang="ts">
  import { h, ref } from 'vue'
  import type { MenuProps } from 'ant-design-vue';
  import { RouterLink } from 'vue-router';
  import type { RouteRecordName  } from 'vue-router';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const selectedKey: RouteRecordName | string = router.currentRoute.value.name ?? 'documents';

  const selectedKeys = ref<(RouteRecordName | string) []>([selectedKey]);

  const items = ref<MenuProps['items']>([
    {
      key: 'documents',
      label: h(RouterLink, { to: '/' }, () => ['Документы']),
      title: 'documents'
    },
    {
      key: 'employees',
      label: h(RouterLink, { to: '/employees' }, () => ['Сотрудники']),
      title: 'employees'
    }
  ]);
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
        :items="items"
      />
    </a-layout-header>
    <a-layout-content>
      <div class="main-layout-content">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<style>
  .ant-layout {
    height: 100%;
  }
  .ant-layout-content {
    overflow-y: auto;
  }

  .ant-layout-content {
    padding: 16px;

    @media screen and (min-width: 768px) {
      padding: 24px;
    }
  }

  .main-layout-content {
    background: #FFFFFF;
    padding: 24px;
  }

  .ant-layout-header {
    padding-inline: 16px;

    @media screen and (min-width: 768px) {
      padding-inline: 24px;
    }
  }
</style>