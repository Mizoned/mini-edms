<template>
  <a-modal
    v-model:open="employeeStore.isOpenUpdateModal"
    title="Изменить пользователя"
    :footer="null"
  >
    <a-form
      ref="formRef"
      :model="employeeStore.employeesUpdateForm"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        label="ФИО"
        name="fio"
        :help="externalErrors.fio.length === 0 ? undefined : externalErrors.fio"
        :validate-status="externalErrors.fio.length !== 0 ? 'error' : undefined"
        :rules="[{ required: true, message: 'Поле обязательно для заполнения!' }]"
      >
        <a-input
          v-model:value="employeeStore.employeesUpdateForm.fio"
          placeholder="Иванов Иван Иванович"
          @change="inputChangeHandler($event, 'fio')"
        />
      </a-form-item>
      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Поле обязательно для заполнения!' }]"
        :help="externalErrors.email.length === 0 ? undefined : externalErrors.email"
        :validate-status="externalErrors.email.length !== 0 ? 'error' : undefined"
      >
        <a-input
          v-model:value="employeeStore.employeesUpdateForm.email"
          placeholder="user@mail.ru"
          @change="inputChangeHandler($event, 'email')"
        >
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="Пароль"
        name="password"
        :help="externalErrors.password.length === 0 ? undefined : externalErrors.password"
        :validate-status="externalErrors.password.length !== 0 ? 'error' : undefined"
      >
        <a-input-password
          v-model:value="employeeStore.employeesUpdateForm.password"
          placeholder="Введите пароль"
          @change="inputChangeHandler($event, 'password')"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        label="Роль"
        name="roles"
        :help="externalErrors.roles.length === 0 ? undefined : externalErrors.roles"
        :validate-status="externalErrors.roles.length !== 0 ? 'error' : undefined"
        :rules="[{ required: true, message: 'Поле обязательно для заполнения!', type: 'array' }]"
      >
        <a-select
          mode="multiple"
          placeholder="Выберите роли"
          v-model:value="employeeStore.employeesUpdateForm.roles"
          @change="inputChangeHandler($event, 'roles')"
        >
          <a-select-option value="ADMIN">Администратор</a-select-option>
          <a-select-option value="USER">Пользователь</a-select-option>
        </a-select>
      </a-form-item>
      <a-row :gutter="[8, 16]">
        <a-col :offset="12" :span="6">
          <a-button type="primary" @click="employeeStore.closeUpdateModal()" block danger>Отменить</a-button>
        </a-col>
        <a-col :span="6">
          <a-button
            type="primary"
            html-type="submit"
            :disabled="disabled"
            :loading="employeeStore.isLoading"
            block
          >
            Сохранить
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { computed, reactive, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import { useEmployeeStore } from '@/stores/employeesStore'
import type { FormInstance } from 'ant-design-vue'
import type { IExternalError } from '@/types'

const employeeStore = useEmployeeStore()

const createForm = ref<FormInstance>();

interface FormExternalErrors {
  fio: string;
  email: string;
  password: string;
  roles: string;
}

const externalErrors = reactive<FormExternalErrors>({
  fio: '',
  email: '',
  password: '',
  roles: ''
});

const setExternalError = (propertyName: string, message: string) => {
  externalErrors[propertyName as keyof typeof externalErrors] = message;
}
const clearExternalError = (propertyName: string) => {
  externalErrors[propertyName as keyof typeof externalErrors] = '';
}

const inputChangeHandler = (event: InputEvent, propertyName: string) => {
  let value: string | Array<UnwrapRef<string>> = employeeStore.employeesUpdateForm[propertyName as keyof typeof employeeStore.employeesUpdateForm];

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

const onFinish = async (values: any) => {
  if (isClearExternalErrors.value) {
    employeeStore.isLoading = true
    await employeeStore.update().then((response) => {
      clearValidateForm();
      resetFieldsForm();
      employeeStore.closeUpdateModal();
    }).catch((error) => {
      clearValidateForm();
      const errors: IExternalError[] = error.response.data?.errors ?? [];

      if (errors.length) {
        errors.forEach((error: IExternalError) => {
          setExternalError(error.property, error.message);
        });
      }
    }).finally(() => {
      employeeStore.isLoading = false
    });
  }
}

const disabled = computed(() => {
  return !(
    employeeStore.employeesUpdateForm.email
    && employeeStore.employeesUpdateForm.fio
    && employeeStore.employeesUpdateForm.roles.length
    && isClearExternalErrors.value
  )
})
// && (employeeStore.employeesUpdateForm.password.length !== 0)

</script>

<style scoped></style>