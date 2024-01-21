<script setup lang="ts">
  import { h, ref } from 'vue'
  import type { ItemType, MenuProps } from 'ant-design-vue'
  import { RouterLink } from 'vue-router';
  import type { RouteRecordName  } from 'vue-router';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/authStore'
  import { LogoutOutlined } from '@ant-design/icons-vue';

  const authStore = useAuthStore();

  const router = useRouter();

  const selectedKey: RouteRecordName | string = router.currentRoute.value.name ?? 'documents';

  const selectedKeys = ref<(RouteRecordName | string) []>([selectedKey]);

  const items = ref<MenuProps['items']>([
    {
      key: 'documents',
      label: h(RouterLink, { to: '/' }, () => ['Документы']),
      title: 'documents'
    }
  ]);

  const isAdmin = authStore?.user?.roles?.findIndex((r: { value: string }) => r.value === 'ADMIN');
  if (isAdmin !== -1) {
    const item: ItemType = {
      key: 'employees',
      label: h(RouterLink, { to: '/employees' }, () => ['Сотрудники']),
      title: 'employees'
    };

    items.value?.push(item);
  }

  const logout = () => {
    authStore.logout()
      .then(() => {
        router.push({ name: 'signIn' });
        console.log('hi')
      })
      .catch((error) => {
        console.error(error);
      })
  }
</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        :items="items"
      />
      <div class="a-logout">
        <a-typography-title :level="5" style="color: white;">
          {{ authStore.user.fio }}
        </a-typography-title>
        <a-button @click="logout" shape="round" type="default">
          <template #icon>
            <LogoutOutlined />
          </template>
        </a-button>
      </div>
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

  .ant-menu {
    flex-grow: 1;
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

  .a-logout {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;

    .ant-typography {
      margin: 0;
    }
  }

  .ant-layout-header {
    width: 100%;
    display: flex;
    align-items: center;
    padding-inline: 16px;

    @media screen and (min-width: 768px) {
      padding-inline: 24px;
    }
  }
</style>