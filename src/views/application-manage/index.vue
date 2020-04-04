<template>
  <div class="tutor-container">
    <div class="see-title"> > 学生志愿管理/Application Manage</div>
    <div class="table">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 1322px">
        <el-table-column
          prop="sid"
          label="学生ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="student_name"
          label="学生姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tid"
          label="所选导师ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="teacher_name"
          label="导师姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="voluntary_time"
          label="申请时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modify"
          label="操作"
          width="240">
          <template slot-scope="scope">
            <el-button @click="seeDetail(scope.row)" type="text">查看简历</el-button>
            <el-popover
                placement="top"
                title="确定同意申请吗？"
                width="200"
                trigger="click"
                v-model="scope.row.agreeVisible"
              >
	                <div style="text-align: right; margin: 0">
	                  <el-button type="primary" size="mini" @click="adminPassTheApplication(scope.row)">确定</el-button>
	                  <el-button size="mini" @click="scope.row.agreeVisible = false">取消</el-button>
	                </div>
	                <el-button style="margin-left:10px;" slot="reference" type="text">同意申请</el-button>
              </el-popover>
              <el-popover
                placement="top"
                title="确定拒绝申请吗？"
                width="200"
                trigger="click"
                v-model="scope.row.refuseVisible"
              >
	                <div style="text-align: right; margin: 0">
	                  <el-button type="primary" size="mini" @click="adminRefuseTheApplication(scope.row)">确定</el-button>
	                  <el-button size="mini" @click="scope.row.refuseVisible = false">取消</el-button>
	                </div>
	                <el-button style="margin-left:10px;" slot="reference" type="text">拒绝申请</el-button>
              </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { viewUnhandledList,adminPassTheApplication,adminRefuseTheApplication } from '@/api/voluntary'
import { formatDate } from '@/utils/format-date'

export default {
  name: 'applicationManage',
  inject:['reload'],    //注入App里的reload方法
  data() {
    return {
      tableData: []
    }
  },
  created() {
    viewUnhandledList().then(response=>{
      if(response.code === 200) {
        response.data.forEach(element => {
          element.voluntary_time = this.formatDate(element.voluntary_time)
          element.agreeVisible = false
          element.refuseVisible = false
        });
        this.tableData = response.data
      }
    })
  },
  methods: {
    formatDate,
    adminPassTheApplication(row) {
        adminPassTheApplication({sid:row.sid}).then(response => {
            if(response.code === 200) {
                this.$message({
                　  message: '已同意该学生的申请',
                　  type: 'success'
            　  })
                this.reload()
            }
        })
    },
    adminRefuseTheApplication(row) {
        adminRefuseTheApplication({sid:row.sid}).then(response => {
             if(response.code === 200) {
                this.$message({
                　  message: '已拒绝该学生的申请',
                　  type: 'success'
            　  })
                this.reload()
            }
        })
    },
    seeDetail(row) {
      this.$router.push({path:'/profile',query:{uid:row.student_uid}})
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

  .table{
    margin-top:30px;
    margin-left: 50px;
  }
}

</style>
