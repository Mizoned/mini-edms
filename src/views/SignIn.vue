<template>
  <div class="authorization">
    <a-form
      :model="authStore.authForm"
      name="normal_login"
      class="authorization__form"
      @finish="onFinish"
    >
      <div class="authorization__logo">
        <img src="@/assets/images/logo.svg" alt="">
      </div>

      <a-form-item
        name="email"
        :help="externalErrors.email.length === 0 ? undefined : externalErrors.email"
        :validate-status="externalErrors.email.length !== 0 ? 'error' : undefined"
        :rules="[{ required: true, message: 'Поле обязательно для заполнения!' }]"
      >
        <a-input
          v-model:value="authStore.authForm.email"
          placeholder="Email"
          @change="inputChangeHandler($event, 'email')"
        >
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        name="password"
        :help="externalErrors.password.length === 0 ? undefined : externalErrors.password"
        :validate-status="externalErrors.password.length !== 0 ? 'error' : undefined"
        :rules="[{ required: true, message: 'Поле обязательно для заполнения!' }]"
      >
        <a-input
          v-model:value="authStore.authForm.password"
          type="password"
          placeholder="Password"
          @change="inputChangeHandler($event, 'password')"
        >
          <template #prefix><LockOutlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          :disabled="disabled"
          block
          type="primary"
          html-type="submit"
          :loading="authStore.isLoading"
        >
          Войти
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'
import type { FormInstance } from 'ant-design-vue'
import type { IExternalError } from '@/types'

interface FormExternalErrors {
  email: string;
  password: string;
}

const authStore = useAuthStore();

const authForm = ref<FormInstance>();

const externalErrors = reactive<FormExternalErrors>({
  email: '',
  password: ''
});

const setExternalError = (propertyName: string, message: string) => {
  externalErrors[propertyName as keyof typeof externalErrors] = message;
}
const clearExternalError = (propertyName: string) => {
  externalErrors[propertyName as keyof typeof externalErrors] = '';
}

const inputChangeHandler = (event: InputEvent, propertyName: string) => {
  let value: string = authStore.authForm[propertyName as keyof typeof authStore.authForm];

  if (externalErrors[propertyName as keyof typeof externalErrors]) {
    clearExternalError(propertyName);
  }

  if (!value) {
    authForm.value?.clearValidate(propertyName);
  }
}

const isClearExternalErrors = computed<boolean>(() => {
  const errors: string[] = Object.values(externalErrors);
  return errors.every(e => e == '');
});

const onFinish = (values: any) => {
  if (isClearExternalErrors.value) {
    authStore.signIn()
      .then(() => {
          router.push({ name: 'documents' });
      })
      .catch((error) => {
        authForm.value?.clearValidate(Object.keys(externalErrors));
        const errors: IExternalError[] = error.response.data?.errors ?? []

        if (errors.length) {
          errors.forEach((error: IExternalError) => {
            setExternalError(error.property, error.message);
          });
        }
      })
      .finally(() => {
        authStore.setLoading(false)
      });
  }
};

const disabled = computed(() => {
  return !(
    authStore.authForm.email
    && authStore.authForm.password
    && isClearExternalErrors.value
  );
});
</script>
