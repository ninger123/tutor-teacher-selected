<template>
  <div class="tutor-container">
    <div class="see-title"> > 所有导师列表/Tutors List</div>
    <div class="table">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 902px">
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
          prop="rated"
          label="预招收"
          width="180">
        </el-table-column>
        <el-table-column
          prop="confirm"
          label="已确定"
          width="180">
        </el-table-column>
        <el-table-column 
          prop="modify"
          label="操作" 
          width="180">
            <template slot-scope="scope">
               <el-button @click="seeDetail(scope.row)" type="text">导师详情</el-button>
               <el-button @click="seeDetail(scope.row)" type="text">联系导师</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tutors',
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    this.$store.dispatch('teacher/getTeacherList').then(response => {
      this.tableData = this.$store.getters.teacherList
    })
  },
  methods: {
    seeDetail(row) {
      this.$router.push({path:'/tdetail',query:{uid:row.uid,tid:row.tid}})
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
