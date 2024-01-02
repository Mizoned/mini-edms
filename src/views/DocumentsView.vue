<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Активные">
      <a-table :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
              {{ record.name }}
          </template>
          <template v-else-if="column.key === 'responsible'">
            <a-avatar-group>
              <a-tooltip title="Веприкова Марина" placement="top">
                <a-avatar style="color: #f56a00; background-color: #fde3cf">ВМ</a-avatar>
              </a-tooltip>
              <a-tooltip title="Волокитина Нина" placement="top">
                <a-avatar style="background-color: #fde3cf">ВН</a-avatar>
              </a-tooltip>
              <a-tooltip title="Некрасов Илья" placement="top">
                <a-avatar style="background-color: #87d068">НИ</a-avatar>
              </a-tooltip>
            </a-avatar-group>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a-button class="ant-tabs-create-button" type="primary" ghost>
                <EditOutlined />
                Изменить
              </a-button>
              <a-divider type="vertical" />
              <a-button class="ant-tabs-create-button" type="primary" danger>
                <DeleteOutlined />
                Удалить
              </a-button>
            </span>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Подтвержденные">
      <a-table :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            {{ record.name }}
          </template>
          <template v-else-if="column.key === 'responsible'">
            <a-avatar-group>
              <a-tooltip title="Веприкова Марина" placement="top">
                <a-avatar style="color: #f56a00; background-color: #fde3cf">ВМ</a-avatar>
              </a-tooltip>
              <a-tooltip title="Волокитина Нина" placement="top">
                <a-avatar style="background-color: #fde3cf">ВН</a-avatar>
              </a-tooltip>
              <a-tooltip title="Некрасов Илья" placement="top">
                <a-avatar style="background-color: #87d068">НИ</a-avatar>
              </a-tooltip>
            </a-avatar-group>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a-button class="ant-tabs-create-button" type="primary" ghost>
                <EditOutlined />
                Изменить
              </a-button>
              <a-divider type="vertical" />
              <a-button class="ant-tabs-create-button" type="primary" danger>
                <DeleteOutlined />
                Удалить
              </a-button>
            </span>
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
import { PlusOutlined, DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { TableColumnsType } from 'ant-design-vue'

const activeKey = ref('1')
const data = [
  {
    id: 1,
    key: '1',
    name: 'Документ 1',
    dateCreate: '01.12.2024',
    dateResult: '12.12.2024',
    responsible: ['nice', 'developer']
  },
  {
    id: 2,
    key: '2',
    name: 'Документ 2',
    dateCreate: '12.12.2024',
    dateResult: '12.01.2024',
    responsible: ['loser']
  },
  {
    id: 3,
    key: '3',
    name: 'Документ 3',
    dateCreate: '12.04.2024',
    dateResult: '12.05.2024',
    responsible: ['cool', 'teacher']
  }
]

const columns = ref<TableColumnsType>([
  {
    title: '№',
    dataIndex: 'id',
    key: 'id',
    resizable: true,
    width: 50
  },
  {
    title: 'Название документа',
    dataIndex: 'name',
    key: 'name',
    resizable: true,
    width: 200,
    maxWidth: 300
  },
  {
    title: 'Дата создания',
    dataIndex: 'dateCreate',
    key: 'dateCreate',
    resizable: true,
    width: 150,
    maxWidth: 200
  },
  {
    title: 'Срок выполнения',
    dataIndex: 'dateResult',
    key: 'dateResult'
  },
  {
    title: 'Ответственные',
    key: 'responsible',
    dataIndex: 'responsible',
    width: 200,
    maxWidth: 500
  },
  {
    title: 'Действия',
    key: 'action',
    width: 300
  }
])

function handleResizeColumn(w, col) {
  col.width = w
}
</script>

<style scoped>
.ant-tabs-nav .ant-tabs-create-button {
  margin-left: 16px;
}
</style>