<template>
  <a-tabs
    v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Активные">
      <a-table
        :columns="columns"
        :data-source="employeeStore.unbannedEmployees"
        :scroll="{ x: 600 }"
        :pagination="paginationConfig"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'roles'">
            {{ record.roles?.map((r: Role) => r?.description ?? '').join(', ') }}
          </template>
          <template v-if="column.key === 'action'">
            <div class="ant-table-actions">
              <a-button class="ant-tabs-create-button" type="primary" ghost>
                <EditOutlined />
                Изменить
              </a-button>
              <a-divider type="vertical" />
              <a-button @click="employeeStore.block(record.id)" class="ant-tabs-create-button" type="primary" danger>
                <LockOutlined />
                Заблокировать
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Заблокированные">
      <a-table
        :columns="columns"
        :data-source="employeeStore.bannedEmployees"
        :scroll="{ x: 600 }"
        :pagination="paginationConfig"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'roles'">
            {{ record.roles?.map((r: Role) => r?.description ?? '').join(', ') }}
          </template>
          <template v-if="column.key === 'name'">
            {{ record.name }}
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="ant-table-actions">
              <a-button @click="employeeStore.unblock(record.id)" class="ant-tabs-create-button" type="primary" danger>
                <UnlockOutlined />
                Разблокировать
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <template #rightExtra>
      <a-button class="ant-tabs-create-button" @click="employeeStore.openModal" type="primary" ghost>
        <PlusOutlined />
        Создать
      </a-button>
    </template>
  </a-tabs>
  <CreateUserModal />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { LockOutlined, UnlockOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue';
import type { TableColumnsType } from 'ant-design-vue'
import CreateUserModal from '@/components/CreateUserModal.vue';
import { useEmployeeStore } from '@/stores/employeesStore';
import type Role from '@/modules/roles/interfaces/role';

const employeeStore = useEmployeeStore();

employeeStore.getAll()

const activeKey = ref('1');

const paginationConfig = {
  pageSize: 8
}

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
    dataIndex: 'fio',
    key: '2',
    width: 200,
    maxWidth: 250,
    fixed: 'left'
  },
  {
    title: 'Роли',
    dataIndex: 'roles',
    key: 'roles',
    width: 150
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: '4',
    width: 150
  },
  {
    key: 'action',
    align: 'right',
    width: 350,
    maxWidth: 350
  }
]
</script>

<style scoped lang="scss"></style>