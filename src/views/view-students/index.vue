<template>
  <div class="tutor-container">
    <div class="see-title"> > 查看待选学生/Students List</div>
    <div class="table">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 1402px">
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
          prop="school"
          label="本科学校"
          width="180">
        </el-table-column>
        <el-table-column
          prop="total_score"
          label="初试分数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="exam_type"
          label="申请类型"
          width="180">
        </el-table-column>
         <el-table-column
          prop="voluntary_time"
          label="申请日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modify"
          label="操作"
          width="320">
          <template slot-scope="scope">
            <el-button @click="seeStudentResume(scope.row)" type="text">查看简历</el-button>
            <el-button @click="passTheApplication(scope.row)" type="text">接受申请</el-button>
            <el-button @click="refuseTheApplication(scope.row)" type="text">拒绝申请</el-button>
            <el-button @click="contactStudent(scope.row)" type="text">联系学生</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getUnhandledList,passTheApplication,refuseTheApplication } from '@/api/voluntary'

export default {
  name: 'view-students',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    getUnhandledList().then(response => {
      this.tableData = response.data
    })
  },
  methods: {
    seeStudentResume(row) {
      this.$router.push({path: '/profile', query: {uid: row.student_uid}})
    },
    passTheApplication(row) {
      passTheApplication({sid:row.sid}).then(response => {
         if(response.code === 200) {
          this.$message({
            message: '已同意申请，请到查看学生进度页面查看',
            type: 'success'
          })
          this.$router.go(0);
        }
      })
    },
    contactStudent(row) {
      if(this.$store.getters.myname) {
        this.$router.push({ name:'Chat', params: {uid:row.student_uid,name:row.student_name,url:row.student_image}})
      } else {
        this.$message({
          message: '请先去填写个人信息哦～',
          type: 'error'
        })
      }
    },
    refuseTheApplication(row) {
      refuseTheApplication({sid:row.sid}).then(response => {
        if(response.code === 200) {
          this.$message({
            message: '已拒绝申请',
            type: 'success'
          })
          this.$router.go(0);
        }
      })
    },
    seeDetail(row) {
      console.log(row)
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
