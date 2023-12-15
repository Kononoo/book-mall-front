import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    const setUser = (user) => {
      user.value = user
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUserInfo,
      setUser
    }
  },
  {
    persist: true
  }
)
