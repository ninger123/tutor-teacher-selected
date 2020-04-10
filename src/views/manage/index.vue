<template>
  <div class="tutor-container">
    <div class="see-title"> > 所有人员管理/Users Manage</div>
    <el-button type="primary" class="new-add" @click="dialogVisible = true">新增账号</el-button>
    <div class="table">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 722px">
        <el-table-column
          prop="uid"
          label="用户ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userRole"
          label="类型"
          width="180"
          :filters="[{text: '管理员', value: '管理员'}, {text: '教师', value: '教师'}, {text: '学生', value: '学生'}]"
          :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
          prop="username"
          label="账号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modify"
          label="操作"
          width="180">
          <template slot-scope="scope">
             <el-button type="text" @click="seeDetail(scope.row)">查看详情</el-button>
             <el-popover
                placement="top"
                title="确定删除此用户吗？"
                width="200"
                trigger="click"
                v-model="scope.row.visible"
              >
	                <div style="text-align: right; margin: 0">
	                  <el-button type="primary" size="mini" @click="deleteUser(scope.row)">确定</el-button>
	                  <el-button size="mini" @click="scope.row.visible = false">取消</el-button>
	                </div>
	                <el-button style="margin-left:10px;" slot="reference" type="text">删除用户</el-button>
              </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="权限授权">
                <el-radio-group v-model="form.userRole">
                    <el-radio label="管理员"></el-radio>
                    <el-radio label="教师"></el-radio>
                    <el-radio label="学生"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList,addUser,deleteUser } from '@/api/user'

export default {
  name: 'manage',
  inject:['reload'],    //注入App里的reload方法
  data() {
    return {
      form: {
          username: '',
          password: '',
          userRole: '',
      },
      tableData: [],
      dialogVisible: false,
      deleteVisible: false,
      addUsername: '',
      addPassword: '',
      radio: 1
    }
  },
  created() {
    getUserList().then(response => {
      if(response.code === 200) {
        const userList = response.data
        userList.forEach(element => {
          if(element.userRole === 1) {
            element.userRole = '学生'
          } else if(element.userRole === 2) {
            element.userRole = '教师'
          }　else if(element.userRole === 3) {
            element.userRole = '管理员'
          }
          element.visible = false
        });
        this.tableData = userList
      }
    })
  },
  methods: {
    seeDetail(row) {
      if(row.userRole === "学生") {
        this.$router.push({path: '/profile', query: {uid: row.uid}})
      } else if(row.userRole === "教师"){
        this.$router.push({ path: '/tdetail', query: { uid: row.uid}})
      } else {
        this.$router.push('/home')
      }
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    onSubmit() {
        this.dialogVisible = false;
        if(this.form.userRole === '学生') {
            this.form.userRole = 1
        } else if(this.form.userRole === '教师') {
            this.form.userRole = 2     
        }　else if(this.form.userRole === '管理员') {
            this.form.userRole = 3
        }
        addUser(this.form).then(response => {
          if(response.code === 200) {
            this.$message({
            　  message: '新增成功',
            　  type: 'success'
         　  })
            this.reload()
          }
        })
    },
    deleteUser(row){
      deleteUser({uid:row.uid}).then(response => {
        if(response.code === 200 ){
          this.$message({
            　  message: '删除成功',
            　  type: 'success'
         　})
         　this.reload()
        }
        row.visible = false
      })
    },
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
    }
  }
}
</script>

<style lang="scss" scoped>

.tutor-container{
  padding: 20px;
  min-height: 100vh;              

  .see-title {
    font-size: 22px;
    color:rgb(48,65,86);
    font-weight: bold;
  }

  .new-add{
      margin-top: 10px;
      margin-left:670px;

  }

  .table{
    margin-top:10px;
    margin-left: 50px;
  }

  .input{
      margin: 10px;
      width: 230px;
  }

  .lable{
      display: inline-block;
      width: 80px;
  }
}

</style>
