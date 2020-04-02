<template>
  <div class="dashboard-editor-container">
    <!--
    <div class="dashboard-text"><span class="name">小李</span> 欢迎来到本科生与导师双选系统！</div> -->
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
              prop="create-date"
              label="创建时间"
              width="200">
            </el-table-column>
            <el-table-column
              prop="newest-date"
              label="最后更新时间"
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
    <div class="myfolw">
      <div class="title"> > 我的流程/My Flow</div>
      <div class="flow-stps">
        <el-steps space="200px" :active="active" finish-status="success">
          <el-step title="上传简历"></el-step>
          <el-step title="选择导师"></el-step>
          <el-step title="导师确认"></el-step>
          <el-step title="学院审核"></el-step>
          <el-step title="有学上了"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="tutorList">
      <div class="title"> > 导师列表/My Flow</div>
      <div class="box-container">
      <el-card class="box-card">
        <div class="box-content">
        <div class="photo"><img src="./tutor-image.jpg"></div>
        <div class="info">
          <div class="name">陈皓</div>
          <div class="position">副教授</div>
        </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="box-content">
        <div class="photo"><img src="./tutor-image.jpg"></div>
        <div class="info">
          <div class="name">陈皓</div>
          <div class="position">副教授</div>
        </div>
        </div>
      </el-card>
      </div>
      <div class="box-container">
      <el-card class="box-card">
        <div class="box-content">
        <div class="photo"><img src="./tutor-image.jpg"></div>
        <div class="info">
          <div class="name">陈皓</div>
          <div class="position">副教授</div>
        </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="box-content">
        <div class="photo"><img src="./tutor-image.jpg"></div>
        <div class="info">
          <div class="name">陈皓</div>
          <div class="position">副教授</div>
        </div>
        </div>
      </el-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'DashboardEditor',
  components: {},
  data() {
    return {
      active: 2,
      resumeData: [{
          "resume-type": '学生简历',
          "create-date": '2019-03-29',
          "newest-date": '2019-04-16'
      }]
    }
  },
  /*
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
  */
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    min-height: 100vh;
    padding: 20px;

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

      .resume-table {
        margin-top: 30px;
        margin-left: 50px;
        width: 800px;
      }
    }

    .myfolw{
      margin-top: 40px;

      .flow-stps {
        margin-top: 30px;
        margin-left: 50px;
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

