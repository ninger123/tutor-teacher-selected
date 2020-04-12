<template>
  <div class="tutor-container">
    <div class="see-title"> > 已确认学生的进度/Students Progress</div>
    <div class="table">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 1082px">
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
          prop="exam_type"
          label="申请类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="voluntary_time"
          label="确认日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="state"
          label="当前进度"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modify"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="seeStudentDetail(scope.row)" type="text">查看简历</el-button>
            <el-button @click="contactStudent(scope.row)" type="text">联系学生</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getHandledList } from '@/api/voluntary'
import { formatDate } from '@/utils/format-date'

export default {
  name: 'selected-students',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    getHandledList().then(response => {
      if(response.code === 200) {
        response.data.forEach(element => {
          element.voluntary_time = this.formatDate(element.voluntary_time)
        });
        this.tableData = response.data
      }
    })
  },
  methods: {
    seeStudentDetail(row) {
      this.$router.push({path:'/profile',query:{uid:row.student_uid}})
    },
    formatDate,
    contactStudent(row) {
      if(this.$store.getters.myname) {
        this.$router.push({ name:'Chat', params: {uid:row.student_uid,name:row.student_name,url:row.student_image}})
      } else {
        this.$message({
          message: '请先去填写个人信息哦～',
          type: 'error'
        })
      }
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
