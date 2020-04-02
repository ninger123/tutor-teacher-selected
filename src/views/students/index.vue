<template>
  <div class="tutor-container">
    <div class="see-title"> > 所有学生列表/Students List</div>
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
          prop="sname"
          label="学生姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tid"
          label="选择导师的ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tname"
          label="导师姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modify"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="seeDetail(scope.row)" type="text">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'students',
  data() {
    return {
      tableData: [{
          sid: '10010',
          sname: '小马',
          tid:'001',
          tname:'老郭',
          status:'导师审核中'
        }, {
          sid: '10010',
          sname: '小马',
          tid:'001',
          tname:'老郭',
          status:'学院审核中'
        }, {
          sid: '10010',
          sname: '小马',
          tid:'001',
          tname:'老郭',
          status:'导师审核中'
        }, {
          sid: '10010',
          sname: '小马',
          tid:'001',
          tname:'老郭',
          status:'导师审核中'
        },{
          sid: '10010',
          sname: '小马',
          tid:'001',
          tname:'老郭',
          status:'导师审核中'
        }]
    }
  },
  mounted() {
    
  },
  methods: {
    seeDetail(row) {
      console.log(row);
      this.$router.push('/profile/index')
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
