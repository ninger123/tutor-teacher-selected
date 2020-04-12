<template>
  <div class="home-student-container">
    <div class="student-title">{{this.name}} 欢迎来到西安邮电大学本科生与导师双选系统！</div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>指南</span>
      </div>
      <div class="text item">
        １．如果是第一次登录，请到<router-link to="/icon" style="color:rgb(48,65,86);font-weight:bold">个人简历填写页面</router-link>完善信息
      </div>
      <div class="text item">
        ２．查看可选择的导师列表，请到<router-link to="/tutor" style="color:rgb(48,65,86);font-weight:bold">查看指导教师页面</router-link>进行操作
      </div>
      <div class="text item">
        ３．查看自己的简历或志愿列表，请到<router-link to="/guide" style="color:rgb(48,65,86);font-weight:bold">我的志愿及简历页面</router-link>来
      </div>
      <div class="text item">
        ４．查看未读消息或回复导师的消息，请到<router-link to="/chat" style="color:rgb(48,65,86);font-weight:bold">聊天室页面</router-link>来操作
      </div>
    </el-card>
    <div class="myfolw">
      <div class="title"> > 我的双选流程/My Flow</div>
      <div class="flow-stps">
        <el-steps space="200px" :active="active" finish-status="success">
          <el-step title="上传简历"></el-step>
          <el-step title="提交志愿"></el-step>
          <el-step title="导师通过"></el-step>
          <el-step title="学院通过"></el-step>
          <el-step title="双选成功"></el-step>
        </el-steps>
      </div>
      <div class="fail" v-if="this.active === -1">{{this.failmsg}}</div>
    </div>
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
import { getMyFlow } from '@/api/voluntary'
import { getStudentSimple } from '@/api/student'
import { formatDate } from '@/utils/format-date'
import { getUid } from '@/utils/auth'
export default {
  name: 'studentIndex',
  data() {
    return {
      uid: getUid(),
      active: 0,
      name:'',
      failmsg: '',
      resumeData: [{
          "resume-type": '学生简历',
          "date": ''
      }]
    }
  },
  created() {
    getMyFlow().then(response => {
      if(response.data === '未上传简历')　{
        // 黑色到上传简历
        this.active = 0
      } else if(response.data === '上传简历')　{
        // 黑色到提交志愿
        this.active = 1
      } else if(response.data === '导师审核中')　{
        // 黑色到导师通过
        this.active = 2
      } else if(response.data === '学院审核中')　{
        // 黑色到学院通过
        this.active = 3
      } else if(response.data === '志愿成功')　{
        // 全绿
        this.active = 5
      } else if(response.data === '失败')　{
        this.active = -1
        this.failmsg = '！' + response.message
      }
    }),
    getStudentSimple({uid:this.uid}).then(response => {
      if(response.data) {
        this.name = response.data.name
        this.resumeData[0].date = this.formatDate(response.data.date)
      }
    })
  },
  methods: {
    getMyFlow,
    getStudentSimple,
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
      this.$router.push('/icon/index')
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-student-container {
    padding: 32px;
    min-height: 100vh;
    background-color: rgb(240, 242, 245);
    position: relative;
    .student-title {
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
    width: 480px;
  }
  .box-card{
    margin-top: 30px;
    margin-left: 50px;
    .clearfix {
      color:rgb(48,65,86);
      font-size: 20px;
      font-weight: bold;
    }
  }
    .title {
        font-size: 22px;
        font-weight: bold;
        color:rgb(48,65,86);
      }
    .dashboard-text{
      font-size: 20px;
      font-weight: bold;
      color:red;
      .name{
        color: cornflowerblue;
      }
    }
    .resume{
      margin-top: 40px;
      .resume-table {
        margin-top: 30px;
        margin-left: 50px;
        width: 600px;
      }
    }
    .myfolw{
      margin-top: 40px;
      .flow-stps {
        margin-top: 30px;
        margin-left: 50px;
      }
      .fail{
        margin-left:50px;
        margin-top: 20px;
        font-weight: bold;
        font-size: 18px;
        color: red;
      }
    }
    .tutorList{
      margin-top: 40px;
      .box-container{
        display: flex;
        margin-left: 20px;
      }
      .box-card{
        margin: 30px;
        width: 350px;
        .box-content {
          display: flex;
          .info{
            margin-left: 60px;
            font-size: 18px;
            font-weight: bold;
            .position {
              margin-top: 30px;
            }
          }
        }
      }
      .photo {
        img {
          width: 100px;
          height: 75px;
        }
      }
    }
    
  }
</style>
