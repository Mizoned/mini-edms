import { reactive, ref } from 'vue'
import { defineStore } from 'pinia';
import { jwtDecode } from "jwt-decode";
import AuthService from '@/service/authService'

interface LoginUserDto {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('authStore', () => {
  const isLoading = ref<boolean>(false);
  const accessToken = ref<string>('');
  let user = ref({});

  //TODO что-то не так с вытаскванием токена из localStorage
  const token = localStorage.getItem('accessToken') || '';

  if (token) {
    user = jwtDecode(token);
  }

  const authForm = reactive<LoginUserDto>({
    email: '',
    password: ''
  })

  const signIn = async () => {
    setLoading()
    return AuthService.signIn(authForm.email, authForm.password)
      .then((response) => {
        const accessToken: string = response.data.accessToken;
        setAccessToken(accessToken);
        const user = jwtDecode(accessToken ?? '');
        setUser(user);
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  const setLoading = (value: boolean = true) => {
    isLoading.value = value;
  }

  const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
    accessToken.value = token;
  }

  const setUser = (obj: object) => {
    localStorage.setItem('user', JSON.stringify(obj));
    user.value = obj;
  }

  const logout = () => {
    return AuthService.logout()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return { user, isLoading, signIn, logout, authForm, setLoading };
})
