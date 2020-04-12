<template>
   <div class="home-school-container">
    <div class="tutor-title"> 
    管理员 欢迎来到西安邮电大学本科生与导师双选系统！
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>指南</span>
      </div>
      <div class="text item">
        １．查看等待志愿审核中的学生，请到<router-link to="/tedit" style="color:rgb(48,65,86);font-weight:bold">学生志愿管理页面</router-link>管理
      </div>
      <div class="text item">
        ２．查看所有学生的状态或志愿，请到<router-link to="/tedit" style="color:rgb(48,65,86);font-weight:bold">所有学生列表页面</router-link>查看
      </div>
      <div class="text item">
        ３．查看所有教师的状态及情况，请到<router-link to="/tedit" style="color:rgb(48,65,86);font-weight:bold">所有导师列表页面</router-link>查看
      </div>
      <div class="text item">
        ４．要进行所有人员用户的管理，请到<router-link to="/tedit" style="color:rgb(48,65,86);font-weight:bold">所有人员管理页面</router-link>操作
      </div>
    </el-card>
    <div class="resume">
      <div class="title"> > 学生志愿审核/Application Manage</div>
      <div class="resume-table"> 
         <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="student_name"
              label="学生姓名"
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
          </el-table>
      </div>
      <div class="info">＊更多请到<router-link to="/tedit" style="color:rgb(48,65,86);font-weight:bold">学生志愿管理页面</router-link></div>
      </div>
  </div>
</template>

<script>
import { viewUnhandledList } from '@/api/voluntary'
export default {
  name: 'schoolIndex',
  components: {
  },
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
        });
        this.tableData = response.data
      }
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.home-school-container {
  padding: 32px;
  min-height: 100vh;
  background-color: rgb(240, 242, 245);
  position: relative;
  .tutor-title {
    color:rgb(48,65,86);
    font-weight: bold;
    font-size: 24px;
  }
  .item {
    margin-bottom: 20px;
    font-size: 16px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    margin-left: 50px;
    width: 480px;
  }
  .box-card{
    margin-top: 30px;
    .clearfix {
      color:rgb(48,65,86);
      font-size: 20px;
      font-weight: bold;
    }
  }
  .resume{
    margin-top: 40px;
    .title{
      font-size: 22px;
      font-weight: bold;
      color:rgb(48,65,86);
    }
    .resume-table {
      margin-top: 30px;
      margin-left: 50px;
      width: 722px;
    }
    .info {
      width: 250px;
      margin-top:20px;
      margin-left:560px;
    }
  }
}
</style>