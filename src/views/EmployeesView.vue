<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Активные">
      <div style="display: block;">
        <a-table :columns="columns" :data-source="data" :scroll="{ x: 600 }">
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'action'">
              <div class="ant-table-actions">
                <a-button class="ant-tabs-create-button" type="primary" ghost>
                  <EditOutlined />
                  Изменить
                </a-button>
                <a-divider type="vertical" />
                <a-button class="ant-tabs-create-button" type="primary" danger>
                  <LockOutlined />
                  Заблокировать
                </a-button>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Заблокированные">
      <a-table :columns="columns" :data-source="data" :scroll="{ x: 600 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            {{ record.name }}
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="ant-table-actions">
              <a-button class="ant-tabs-create-button" type="primary" danger>
                <UnlockOutlined />
                Разблокировать
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
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
import { ref } from 'vue'
import { LockOutlined, UnlockOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { TableColumnsType } from 'ant-design-vue'

const activeKey = ref('1')

const data = [
  {
    id: 1,
    key: '1',
    name: 'Волокитина Нина Александровна',
    role: 'Сотрудник',
    login: 'user1'
  },
  {
    id: 2,
    key: '2',
    name: 'Веприкова Марина Александровна',
    role: 'Администратор',
    login: 'user2'
  },
  {
    id: 3,
    key: '3',
    name: 'Некрасов Илья Александрович',
    role: 'Сотруднк',
    login: 'user3'
  }
]

const columns: TableColumnsType = [
  {
    title: '№',
    dataIndex: 'id',
    key: '1',
    width: 50,
    fixed: 'left'
  },
  {
    title: 'ФИО',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    maxWidth: 250,
    fixed: 'left'
  },
  {
    title: 'Роль',
    dataIndex: 'role',
    key: '2',
    width: 150
  },
  {
    title: 'Логин',
    dataIndex: 'login',
    key: '3',
    width: 150
  },
  {
    key: 'action',
    align: 'right',
    width: 350,
    maxWidth: 350
  }
]

function handleResizeColumn(w, col) {
  col.width = w
}
</script>

<style scoped>
.ant-tabs-nav .ant-tabs-create-button {
  margin-left: 16px;
}
</style>