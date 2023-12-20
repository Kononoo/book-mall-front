<template>
  <div style="padding: 30px;">
    <el-card class="box-card;" shadow="always" style="width: 93%">
      <template #header>
        <div class="card-header" style="text-align: left">
          <span>管理地址</span>
          <el-button class="button" type="text" @click="addAddress">新增</el-button>
        </div>
        <el-table
            :data="addressData"
            style="width: 100%"
            ref="table">
          <el-table-column type="index"></el-table-column>
          <el-table-column
              prop="adname"
              label="收货人"
              width="100">
            <template #default="scope">
              <el-input size="default" v-model="scope.row.adname" v-if="addressEdit[scope.$index]"></el-input>
              <span v-else>{{scope.row.adname}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="adphone"
              label="联系方式"
              width="140">
            <template #default="scope">
              <el-input size="default" v-model="scope.row.adphone" v-if="addressEdit[scope.$index]"></el-input>
              <span v-else>{{scope.row.adphone}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="adpca"
              label="收货地址"
              width="240"
              align="center"
          >
            <template #default="scope">
              <!--级联选择器选择地址-->
              <el-cascader
                  v-model="scope.row.adpca"
                  :options="pcaOptions"
                  :props="addressProps"
                  placeholder="请选择"
                  @change="handleAddressNode"
                  filterable
                  :disabled="!addressEdit[scope.$index]"
              ></el-cascader>
            </template>
          </el-table-column>
          <el-table-column
              prop="addetail"
              label="详细地址"
              width="180">
            <template #default="scope">
              <el-input size="default" v-model="scope.row.addetail" v-if="addressEdit[scope.$index]"></el-input>
              <span v-else>{{scope.row.addetail}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="adisdefault"
              label="默认地址"
              width="100">
            <template #default="scope">
              <div v-if="addressEdit[scope.$index]">
                <el-checkbox
                    v-model= scope.row.adisdefault
                    :true-label = "1"
                    :false-label = "0"
                    @change="changetest"
                >
                  设为默认
                </el-checkbox>
              </div>
              <div v-else>
                <el-tag  v-if="scope.row.adisdefault === 1" type="success" size="small" >默认</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              align="center"
              width="180"
          >
            <template #default="scope">
              <el-button
                  size="small"
                  icon="el-icon-edit"
                  v-if="!addressEdit[scope.$index]"
                  @click="editAddress(scope.$index)"
              >编辑
              </el-button>
              <el-button
                  size="small"
                  icon="el-icon-check"
                  v-else
                  @click="saveAddress(scope.$index, scope.row)"
              >保存
              </el-button>
              <el-popconfirm
                  confirmButtonText='好的'
                  cancelButtonText='不用了'
                  icon="el-icon-info"
                  title="确定删除该地址？"
                  @confirm="deleteAddress(scope.$index, scope.row)"
              >
                <template #reference>
                  <el-button
                      size="small"
                      icon="el-icon-delete"
                  >删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </el-card>

  </div>
</template>

<script>
import service from "@/utils/request";
import {ElMessage} from "element-plus";
import pca from '@/assets/adress/pca-code.json';


export default {
  name: "Address",
  data() {
    return {
      addressData: [], //table绑定表格数据
      addressEdit: [], //用于动态修改行内数据
      addressInput: {
        adname: '',
        adphone: '',
        adpca: '',
        addetail: '',
        adisdefault: 0 ,
      },
      pcaOptions:pca,
      addressProps:{
        label: 'name',
        children: 'children',
        value: 'code'
      }
    }
  },
  created() {
    this.loadAddressData()
  },
  methods: {
    // 以下为 loadAddressData 方法的完善
    loadAddressData() {
      // 发送请求获取数据
      service({
        method: "get",
        url: "/address/get",

      })
          .then((response) => {
            // 处理成功响应
            this.addressData = response.data;
            this.addressEdit = new Array(this.addressData.length).fill(false);
          })
          .catch((error) => {
            // 处理错误响应
            console.error("Failed to fetch address data:", error);
            // 可以添加一些提示用户的逻辑，比如 ElMessage 提示
            ElMessage.error("获取地址数据失败，请重试");
          });
    },
    addAddress() {
      // 创建一个新的地址对象，可以根据你的数据结构进行修改
      const newAddress = {
        adname: this.addressInput.adname,
        adphone: this.addressInput.adphone,
        adpca: this.addressInput.adpca,
        addetail: this.addressInput.addetail,
        adisdefault: this.addressInput.adisdefault,
      };

      // 发起后端请求，将新地址保存到数据库
      service({
        method: "post", // 根据实际情况使用 post 或其他 HTTP 方法
        url: "/api/address", // 修改为你的后端地址
        data: newAddress,

      })
          .then((response) => {
            // 请求成功处理
            console.log("Address added successfully:", response.data);

            // 刷新地址数据，如果需要
            this.loadAddressData();
          })
          .catch((error) => {
            // 请求失败处理
            console.error("Error adding address:", error);
          });

      // 添加新地址到前端数据
      this.addressData.push(newAddress);
      this.addressEdit[this.addressData.length - 1] = true;
    },
    editAddress(index){
      this.addressEdit[index] = !this.addressEdit[index]
    },
    saveAddress(index,value)
    {
      this.addressEdit[index] = !this.addressEdit[index]
    },
    deleteAddress(index,value){
      this.addressData.splice(index,1)
    },
    handleAddressNode(value){    //value为数组
      this.addressData.adpca = value[2]   //三级级联地址，只需要把第三级存入数据库即可
    },
    changetest(val){
      console.log(typeof (val))
      console.log(val)
    }

  }
}
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-header span{
  color: #b1b3b8

}
</style>
