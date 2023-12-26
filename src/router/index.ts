import { createRouter, createWebHistory } from 'vue-router'
import DocumentsView from '../views/DocumentsView.vue'
import SignIn from '../views/SignIn.vue'
import EmployeesView from '../views/EmployeesView.vue'
import MainLayout from '../layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'mainLayout',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'documents',
          component: DocumentsView,
        },
        {
          path: '/employees',
          name: 'employees',
          component: EmployeesView
        }
      ]
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn
    }
  ]
})

export default router
