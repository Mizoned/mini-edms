<template>
  <div class="authorization">
    <a-form
      :model="formState"
      name="normal_login"
      class="authorization__form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <div class="authorization__logo">
        <img src="@/assets/images/logo.svg" alt="">
      </div>

      <a-form-item
        name="email"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.email" placeholder="Email">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input v-model:value="formState.password" type="password" placeholder="Password">
          <template #prefix><LockOutlined /></template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-button :disabled="disabled" block type="primary" html-type="submit">
          Войти
        </a-button>
      </a-form-item>
    </a-form>
  </div>

</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
interface FormState {
  email: string;
  password: string;
}
const formState = reactive<FormState>({
  email: '',
  password: '',
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.email && formState.password);
});
</script>
