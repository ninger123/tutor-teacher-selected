<template>
  <div class="tutor-container">
    <div class="resume">
      <div class="resume-title"> > 我的简历/My Resume</div>
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
              prop="update-date"
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
    <div class="aspiration">
      <div class="resume-title"> > 我的志愿/My Aspiration</div>
      <div class="aspiration-table"> 
         <el-table
            :data="aspirationData"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="level"
              label="志愿列表"
              width="200">
            </el-table-column>
            <el-table-column
              prop="exam_type"
              label="申请类型"
              width="200">
            </el-table-column>
            <el-table-column
              prop="voluntary_time"
              label="申请日期"
              width="200">
            </el-table-column>
            <el-table-column
              prop="teacher_name"
              label="导师姓名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="tid"
              label="导师编号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="state"
              label="当前进度"
              width="200"
              class="progress-column">
            </el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { validUpperCase } from '../../utils/validate';
import { getUid } from '@/utils/auth'
export default {
  name: 'Guide',
  data() {
    return {
      uid:getUid(),
      resumeData: [{
        "resume-type": '学生简历',
        "create-date": '2019-03-29',
        "newest-date": '2019-04-16'
      }],
      aspirationData: []
    }
  },
  created() {
    this.$store.dispatch('voluntary/getVoluntaryList',{uid:this.uid}).then(response => {
      this.aspirationData = this.$store.getters.myVoluntary
    })
  },
  mounted() {
    
  },
  methods: {    
    toPreview() {
      this.$router.push('/profile')
    },
    toEdit() {
      this.$router.push('/icon/index')
    }
}
}

</script>

<style lang="scss" scoped>

.tutor-container{
  padding: 20px;
  min-height: 100vh;

  .resume-title {
    font-size: 22px;
    font-weight: bold;
    color:rgb(48,65,86);
  }

  .resume-table{
    margin-top: 30px;
    margin-left: 50px;
    width: 800px;
  }

  .aspiration{
    margin-top: 40px;

    .aspiration-table{
      margin-top: 30px;
      margin-left: 50px;
      width: 1202px;

      .shenhe{
        color: green;
      }
    }
  }
}
</style>