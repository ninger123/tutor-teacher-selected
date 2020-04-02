<template>
  <div class="tutor-container">
    <div class="see-title"> > 查看指导教师/Tutor List</div>
    <div class="table">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 1082px">
        <el-table-column
          prop="tid"
          label="导师ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="导师姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="职称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rated"
          label="拟招收"
          width="180">
        </el-table-column>
        <el-table-column
          prop="confirm"
          label="现确定"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modify"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="seeDetail(scope.row)" type="text">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tutor',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.$store.dispatch('teacher/getTeacherList').then(response => {
      this.tableData = this.$store.getters.teacherList
    })
  },
  methods: {
    seeDetail(row) {
      const tid = row.tid
      const uid = row.uid
      this.$router.push({ path: '/tdetail', query: { tid: tid, uid: uid}})
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
