<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Активные">
      <a-table :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn" :scroll="{ x: 600 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'responsible'">
            <a-avatar-group>
              <template v-for="record in record.responsible">
                <a-tooltip :title="record.name" placement="top">
                  <a-avatar :style="`background-color:${record.status ? '#87d068' : '#ff4d4f'}`">{{ record.cName }}</a-avatar>
                </a-tooltip>
              </template>
            </a-avatar-group>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="ant-table-actions">
              <a-tooltip title="Скачать документ" placement="top">
                <a-button class="ant-tabs-create-button" type="primary" ghost>
                  <CloudDownloadOutlined />
                </a-button>
              </a-tooltip>
              <a-divider type="vertical" />
              <a-button class="ant-tabs-create-button" type="primary" ghost>
                <EditOutlined />
                Изменить
              </a-button>
              <a-divider type="vertical" />
              <a-button class="ant-tabs-create-button" type="primary" danger>
                <DeleteOutlined />
                Удалить
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Подтвержденные">
      <a-table :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn" :scroll="{ x: 600 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'responsible'">
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
            <div class="ant-table-actions">
              <a-tooltip title="Скачать документ" placement="top">
                <a-button class="ant-tabs-create-button" type="primary" ghost>
                  <CloudDownloadOutlined />
                </a-button>
              </a-tooltip>
              <a-divider type="vertical" />
              <a-button class="ant-tabs-create-button" type="primary" ghost>
                <EditOutlined />
                Изменить
              </a-button>
              <a-divider type="vertical" />
              <a-button class="ant-tabs-create-button" type="primary" danger>
                <DeleteOutlined />
                Удалить
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
  <a-modal v-model:open="open" title="Изменить документ" @ok="handleOk">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Название документа"
        name="documentName"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Дата создания"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-range-picker v-model:value="value1" />
      </a-form-item>

      <a-form-item
        label="Ответственные"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-select
          v-model:value="value"
          mode="multiple"
          style="width: 100%"
          placeholder="Please select"
          :options="[...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))"
          @change="handleChange"
        ></a-select>
      </a-form-item>

      <a-form-item
        label="Документ"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >

        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChangeDrop"
          @drop="handleDrop"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">Click or drag file to this area to upload</p>
          <p class="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </a-upload-dragger>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { reactive } from 'vue';
import { PlusOutlined, DeleteOutlined, EditOutlined, UserOutlined, InboxOutlined, CloudDownloadOutlined } from '@ant-design/icons-vue'
import type { TableColumnsType, UploadChangeParam  } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import type { Dayjs } from 'dayjs';
const fileList = ref([]);
const handleChangeDrop = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
function handleDrop(e: DragEvent) {
  console.log(e);
}

type RangeValue = [Dayjs, Dayjs];
const value1 = ref<RangeValue>();
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
const value = ref(['a1', 'b2']);

const activeKey = ref('1')
const data = [
  {
    id: 1,
    key: '1',
    name: 'Документ 1',
    dateCreate: '01.12.2024',
    dateResult: '12.12.2024',
    responsible: [
      {
        name: 'Веприкова Марина',
        cName: 'ВМ',
        status: true
      },
      {
        name: 'Волокитина Нина',
        cName: 'ВН',
        status: false
      },
      {
        name: 'Некрасов Илья',
        cName: 'НИ',
        status: false
      }
    ]
  },
  {
    id: 2,
    key: '2',
    name: 'Документ 2',
    dateCreate: '12.12.2024',
    dateResult: '12.01.2024',
    responsible: [
      {
        name: 'Веприкова Марина',
        cName: 'ВМ'
      },
      {
        name: 'Волокитина Нина',
        cName: 'ВН'
      },
      {
        name: 'Некрасов Илья',
        cName: 'НИ'
      }
    ]
  },
  {
    id: 3,
    key: '3',
    name: 'Документ 3',
    dateCreate: '12.04.2024',
    dateResult: '12.05.2024',
    responsible: [
      {
        name: 'Веприкова Марина',
        cName: 'ВМ'
      },
      {
        name: 'Волокитина Нина',
        cName: 'ВН'
      },
      {
        name: 'Некрасов Илья',
        cName: 'НИ'
      }
    ]
  }
]

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

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
    title: 'Дата создания',
    dataIndex: 'dateCreate',
    key: 'dateCreate',
    width: 150,
    maxWidth: 200
  },
  {
    title: 'Срок выполнения',
    dataIndex: 'dateResult',
    key: 'dateResult',
    width: 150,
  },
  {
    title: 'Ответственные',
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
])

function handleResizeColumn(w, col) {
  col.width = w
}

const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
</script>

<style scoped></style>