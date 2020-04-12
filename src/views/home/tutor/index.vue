<template>
  <div class="home-tutor-container">
    <div class="tutor-title"> 
    {{this.name}} 欢迎来到西安邮电大学本科生与导师双选系统！
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>指南</span>
      </div>
      <div class="text item">
        １．如果是第一次登录，请到<router-link to="/tedit" style="color:rgb(48,65,86);font-weight:bold">个人信息填写页面</router-link>完善信息
      </div>
      <div class="text item">
        ２．查看等待双选的学生，请到<router-link to="/tedit" style="color:rgb(48,65,86);font-weight:bold">查看待选学生页面</router-link>进行操作
      </div>
      <div class="text item">
        ３．查看已确认的学生的进度，请到<router-link to="/tedit" style="color:rgb(48,65,86);font-weight:bold">查看学生进度页面</router-link>查看
      </div>
      <div class="text item">
        ４．查看未读消息或回复学生的消息，请到<router-link to="/tedit" style="color:rgb(48,65,86);font-weight:bold">聊天室页面</router-link>来操作
      </div>
    </el-card>
    <div class="resume">
      <div class="title"> > 我的简历/My Resume</div>
      <div class="resume-table"> 
         <el-table
            :data="resumeData"
            border
            style="width: 100%">
            <el-table-column
              prop="resume-type"
              label="简历类型"
              width="200">
            </el-table-column>
            <el-table-column
              prop="date"
              label="更新时间"
              width="200">
            </el-table-column>
            <el-table-column
              prop="modify"
              label="操作">
              <template>
                <el-button @click="toPreview" type="text">预览</el-button>
                <el-button @click="toEdit" type="text">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
      </div>
  </div>
</template>

<script>
import { getTeacherSimple } from '@/api/teacher'
import { formatDate } from '@/utils/format-date'
import { getUid } from '@/utils/auth'
export default {
  name: 'tutorIndex',
  components: {
  },
  data() {
    return {
      uid: getUid(),
      name:'',
      resumeData: [{
          "resume-type": '导师简历',
          "date": ''
      }]
    }
  },
  created() {
    getTeacherSimple({uid:this.uid}).then(response => {
      if(response.data) {
        this.name = response.data.name
        this.resumeData[0].date = this.formatDate(response.data.date)
      }
    })
  },
  methods: {
    getTeacherSimple,
    formatDate,
    toPreview() {
      if(this.$store.getters.myname) {
        this.$router.push('/profile')
      } else {
        this.$message({
          message: '请先去填写个人信息哦～',
          type: 'error'
        })
      }
    },
    toEdit() {
      this.$router.push('/tedit')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-tutor-container {
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
        width: 600px;
      }
    }
}
</style>