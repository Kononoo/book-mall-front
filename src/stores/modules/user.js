import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoAPI } from '@/api/user.js'

export const useUserStore = defineStore(
  'book-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUserInfo = async () => {
      const res = await userGetInfoAPI()
      user.value = res.data.data
    }
    const setUserInfo = (user) => {
      user.value = user
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUserInfo,
      setUserInfo
    }
  },
  // 数据持久化存储
  // 原理：设置state时会把数据自动同步给localStorage，获取数据时优先从localStorage获取
  {
    persist: true
  }
)
