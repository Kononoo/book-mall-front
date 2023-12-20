import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// import {useUserStore} from "@/stores/modules/User";
// export {useUserStore}
// import {useCounterStore} from "@/stores/modules/counter";
// export {useCounterStore}
// 下面相当于上面的简写  接收user和counter模块的按需导出 (可以实现统一导出)
export * from './modules/user'
export * from './modules/counter'
