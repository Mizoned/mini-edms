<template>
  <a-modal
    v-model:open="documentStore.isOpenModal"
    title="Создать пользователя"
    :footer="null"
  >
    <a-form
      ref="formRef"
      :model="documentStore.createForm"
      name="basic"
      :label-col="{ span: 9 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        label="Название документа"
        name="name"
        :help="externalErrors.name.length === 0 ? undefined : externalErrors.name"
        :validate-status="externalErrors.name.length !== 0 ? 'error' : undefined"
        :rules="[{ required: true, message: 'Поле обязательно для заполнения!' }]"
      >
        <a-input
          v-model:value="documentStore.createForm.name"
          placeholder="Документ"
          @change="inputChangeHandler($event, 'name')"
        />
      </a-form-item>
      <a-form-item
        label="Согласующий"
        name="reviewerId"
        :help="externalErrors.reviewerId.length === 0 ? undefined : externalErrors.reviewerId"
        :validate-status="externalErrors.reviewerId.length !== 0 ? 'error' : undefined"
        :rules="[{ required: true, message: 'Поле обязательно для заполнения!', trigger: 'change' }]"
      >
        <a-select
          placeholder="Выберите согласовыющего"
          v-model:value="documentStore.createForm.reviewerId"
          @change="inputChangeHandler($event, 'roles')"
        >
          <a-select-option
            v-for="reviewer in documentStore.reviewers"
            :key="reviewer.id"
            :value="reviewer.id"
          >
            {{ reviewer.fio }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="Документ"
        name="document"
        :help="externalErrors.document.length === 0 ? undefined : externalErrors.document"
        :validate-status="externalErrors.document.length !== 0 ? 'error' : undefined"
        :rules="[{ required: true, message: 'Поле обязательно для заполнения!' }]"
      >
        <a-upload
          style="width: 100%"
          :multiple="false"
          name="file"
          :before-upload="handleChangeFile"
          accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        >
          <a-button>
            <UploadOutlined />
            Загрузить файл
          </a-button>
        </a-upload>
      </a-form-item>
      <a-row :gutter="[8, 16]">
        <a-col :offset="12" :span="6">
          <a-button type="primary" @click="documentStore.closeModal()" block danger>Отменить</a-button>
        </a-col>
        <a-col :span="6">
          <a-button
            type="primary"
            html-type="submit"
            :disabled="disabled"
            :loading="documentStore.isLoading"
            block
          >
            Создать
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { useDocumentsStore } from '@/stores/documentsStore'
import { UploadOutlined } from '@ant-design/icons-vue'
import { computed, reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import type { IExternalError } from '@/types';

const documentStore = useDocumentsStore();

const createForm = ref<FormInstance>();

interface FormExternalErrors {
  name: string;
  reviewerId: string;
  document: string;
}

const externalErrors = reactive<FormExternalErrors>({
  name: '',
  reviewerId: '',
  document: '',
});

const setExternalError = (propertyName: string, message: string) => {
  externalErrors[propertyName as keyof typeof externalErrors] = message;
}
const clearExternalError = (propertyName: string) => {
  externalErrors[propertyName as keyof typeof externalErrors] = '';
}

const inputChangeHandler = (event: InputEvent, propertyName: string) => {
  let value: string | Array<UnwrapRef<string>> = documentStore.createForm[propertyName as keyof typeof documentStore.createForm];

  if (externalErrors[propertyName as keyof typeof externalErrors]) {
    clearExternalError(propertyName);
  }

  if ((typeof value === 'string' && !value) || (Array.isArray(value) && !value.length)) {
    createForm.value?.clearValidate(propertyName);
  }
}

const isClearExternalErrors = computed<boolean>(() => {
  const errors: string[] = Object.values(externalErrors);
  return errors.every(e => e == '');
});

const clearValidateForm = () => {
  createForm.value?.clearValidate();
}

const resetFieldsForm = () => {
  createForm.value?.resetFields();
}

const handleChangeFile = (file: any) => {
  documentStore.createForm.document = file;
  return false;
};

const onFinish = async (values: any) => {
  if (isClearExternalErrors.value) {
    documentStore.isLoading = true
    await documentStore.create().then((response) => {
      clearValidateForm();
      resetFieldsForm();
      documentStore.closeModal();
    }).catch((error) => {
      clearValidateForm();
      const errors: IExternalError[] = error.response.data?.errors ?? [];

      if (errors.length) {
        errors.forEach((error: IExternalError) => {
          setExternalError(error.property, error.message);
        });
      }
    }).finally(() => {
      documentStore.isLoading = false
    });
  }
}

const disabled = computed(() => {
  return !(
    documentStore.createForm.name
    && documentStore.createForm.reviewerId
    && documentStore.createForm.document
    && isClearExternalErrors.value
  )
})
</script>

<style scoped lang="scss"></style>