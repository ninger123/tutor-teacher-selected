<template>
  <div class="tutor-container">
    <div class="see-title"> > 所有导师列表/Tutors List</div>
    <div class="table">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 1202px">
        <el-table-column
          prop="tid"
          label="导师ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tname"
          label="导师姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="situation"
          label="招收情况"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="联系导师"
          width="220">
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
  name: 'tutors',
  data() {
    return {
      tableData: [
        {
          tid:'001',
          tname:'老郭',
          situation:'2/5',
          email:'17691191896@163.com'
        }, 
        {
          tid:'002',
          tname:'老李',
          situation:'3/7',
          email:'17691191896@163.com'
        }, 
        {
          tid:'111',
          tname:'老王',
          situation:'3/7',
          email:'3052676556@qq.com'
        }, 
        {
          tid:'312',
          tname:'老张',
          situation:'2/5',
          email:'3052676556@qq.com'
        },
        {
          tid:'421',
          tname:'老四',
          situation:'3/7',
          email:'3052676556@qq.com'
        }],
    }
  },
  mounted() {
    
  },
  methods: {
    seeDetail(row) {
      console.log(row);
      this.$router.push('/tdetail')
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
