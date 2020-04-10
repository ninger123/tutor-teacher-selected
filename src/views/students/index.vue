<template>
  <div class="tutor-container">
    <div class="see-title"> > 所有学生列表/Students List</div>
    <div class="info">*未填写基本信息的学生不在此列表展示</div>
    <div class="table">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 1282px">
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
          label="申请状态"
          width="200">
        </el-table-column>
        <el-table-column
          prop="modify"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="seeDetail(scope.row)" type="text">学生简历</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { allStudentList } from '@/api/voluntary'
import { formatDate } from '@/utils/format-date'

export default {
  name: 'students',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    allStudentList().then(response=>{
      if(response.code === 200) {
        response.data.forEach(element => {
          element.voluntary_time = this.formatDate(element.voluntary_time)
        });
        this.tableData = response.data
      }
    })
  },
  methods: {
    formatDate,
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

  .info {
    font-size: 16px;
    color:rgb(245, 92, 92);
    margin-top: 20px;
    margin-left: 20px;
  }

  .table{
    margin-top:30px;
    margin-left: 50px;
  }
}

</style>
