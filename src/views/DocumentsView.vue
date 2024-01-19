<template>
  <a-tabs
    v-model:activeKey="activeKey"
    @change="changeTabHandler"
  >
    <a-tab-pane :key="tabKeys.myDocuments" tab="Созданные мною">
      <a-table
        :columns="columns"
        :loading="documentStore.isLoading"
        :data-source="documentStore.userDocuments"
        @resizeColumn="handleResizeColumn" :scroll="{ x: 600 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'responsible'">
            <a-tooltip :title="record.reviewer.fio" placement="top">
              <a-avatar :style="`background-color:${record.status === 'OK' ? '#87d068' : '#ff4d4f'}`">{{ record.reviewer.fio[0].toUpperCase() }}</a-avatar>
            </a-tooltip>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="ant-table-actions">
              <a-tooltip title="Скачать документ" placement="top">
                <a-button class="ant-tabs-create-button" type="primary" ghost download :href="`http://localhost:3000/${record.document}`">
                  <CloudDownloadOutlined />
                </a-button>
              </a-tooltip>
              <a-divider v-if="record.status === 'PROCESS'" type="vertical" />
              <a-button v-if="record.status === 'PROCESS'" class="ant-tabs-create-button" type="primary" danger>
                <DeleteOutlined />
                Удалить
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane :key="tabKeys.myReviews" tab="На согласовании">
      <a-table
        :columns="columnsReview"
        :loading="documentStore.isLoading"
        :data-source="documentStore.reviewersDocuments"
        @resizeColumn="handleResizeColumn" :scroll="{ x: 600 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'responsible'">
            <a-tooltip :title="record.creator.fio" placement="top">
              <a-avatar :style="`background-color:${record.status === 'OK' ? '#87d068' : '#ff4d4f'}`">{{ record.creator.fio[0].toUpperCase() }}</a-avatar>
            </a-tooltip>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="ant-table-actions">
              <a-tooltip title="Скачать документ" placement="top">
                <a-button class="ant-tabs-create-button" type="primary" ghost>
                  <CloudDownloadOutlined />
                </a-button>
              </a-tooltip>
              <a-divider type="vertical" />
              <a-button
                @click="documentStore.acceptDocument(record.id)"
                class="ant-tabs-create-button"
                type="primary"
              >
                <CheckOutlined />
                Согласовать
              </a-button>
              <a-divider type="vertical" />
              <a-button
                @click="documentStore.rejectDocument(record.id)"
                class="ant-tabs-create-button"
                type="primary" danger
              >
                <StopOutlined />
                Отклонить
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane :key="tabKeys.allDocuments" tab="Все документы">
      <a-table
        :columns="columnsDocument"
        :loading="documentStore.isLoading"
        :data-source="documentStore.documents"
        @resizeColumn="handleResizeColumn"
        :scroll="{ x: 600 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'responsible'">
            <a-tooltip :title="record.creator.fio" placement="top">
              <a-avatar :style="`background-color:${record.status === 'OK' ? '#87d068' : '#ff4d4f'}`">{{ record.creator.fio[0].toUpperCase() }}</a-avatar>
            </a-tooltip>
          </template>
          <template v-if="column.key === 'reviewer'">
            <a-tooltip :title="record.reviewer.fio" placement="top">
              <a-avatar :style="`background-color:${record.status === 'OK' ? '#87d068' : '#ff4d4f'}`">{{ record.reviewer.fio[0].toUpperCase() }}</a-avatar>
            </a-tooltip>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="ant-table-actions">
              <a-tooltip title="Скачать документ" placement="top">
                <a-button class="ant-tabs-create-button" type="primary" ghost>
                  <CloudDownloadOutlined />
                </a-button>
              </a-tooltip>
            </div>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <template #rightExtra>
      <a-button @click="documentStore.openModal()" class="ant-tabs-create-button" type="primary" ghost>
        <PlusOutlined />
        Создать
      </a-button>
    </template>
  </a-tabs>
  <create-document-model />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { PlusOutlined, DeleteOutlined, CheckOutlined, StopOutlined, CloudDownloadOutlined } from '@ant-design/icons-vue'
import type { TableColumnsType  } from 'ant-design-vue';
import { useDocumentsStore } from '@/stores/documentsStore'
import CreateDocumentModel from '@/components/CreateDocumentModel.vue'
const fileList = ref([]);

const documentStore = useDocumentsStore();

documentStore.getUserDocuments();
documentStore.getEmployees();

const tabKeys = {
  myDocuments: 'myDocuments',
  myReviews: 'myReviews',
  allDocuments: 'allDocuments'
}

const activeKey = ref(tabKeys.myDocuments);

const columns = ref<TableColumnsType>([
  {
    title: '№',
    dataIndex: 'id',
    key: 'id',
    width: 50,
    fixed: 'left'
  },
  {
    title: 'Название документа',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    maxWidth: 300,
    fixed: 'left'
  },
  {
    title: 'Согласующий',
    key: 'responsible',
    dataIndex: 'responsible',
    width: 200,
    maxWidth: 500
  },
  {
    key: 'action',
    align: 'right',
    width: 350,
    maxWidth: 350
  }
]);

const columnsReview = ref<TableColumnsType>([
  {
    title: '№',
    dataIndex: 'id',
    key: 'id',
    width: 50,
    fixed: 'left'
  },
  {
    title: 'Название документа',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    maxWidth: 300,
    fixed: 'left'
  },
  {
    title: 'Ответственный',
    key: 'responsible',
    dataIndex: 'responsible',
    width: 200,
    maxWidth: 500
  },
  {
    key: 'action',
    align: 'right',
    width: 350,
    maxWidth: 350
  }
]);

const columnsDocument = ref<TableColumnsType>([
  {
    title: '№',
    dataIndex: 'id',
    key: 'id',
    width: 50,
    fixed: 'left'
  },
  {
    title: 'Название документа',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    maxWidth: 300,
    fixed: 'left'
  },
  {
    title: 'Автор документа',
    key: 'responsible',
    dataIndex: 'responsible',
    width: 200,
    maxWidth: 500
  },
  {
    title: 'Согласующий',
    key: 'reviewer',
    dataIndex: 'reviewer',
    width: 200,
    maxWidth: 500
  },
  {
    key: 'action',
    align: 'right',
    width: 350,
    maxWidth: 350
  }
]);


const changeTabHandler = (activeKey: string) => {
  switch (activeKey) {
    case tabKeys.myDocuments:
      documentStore.getUserDocuments();
      break;
    case tabKeys.myReviews:
      documentStore.getUserDocumentsReviewer();
      break;
    case tabKeys.allDocuments:
      documentStore.getAll();
      break;
  }
}

function handleResizeColumn(w, col) {
  col.width = w
}
</script>

<style scoped></style>