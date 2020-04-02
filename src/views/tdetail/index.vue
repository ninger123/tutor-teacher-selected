<template>
  <div class="tdetail-container">
    <div class="see-title"> > 查看导师详情/Tutor Detail</div>
    <div class="tutor-info">
        <div class="tutor-top">
            <div class="tutor-name">{{this.tname}}</div> 
            <div class="tutor-photo"><img :src="timage"></div>
        </div>
        <div class="tutor-bottom">
            <div class="spe-info">
                <div class="decs-title">导师信息:</div>
                <div class="info-content">
                    <div class="simply">{{this.tname}}，{{this.title}}，{{this.tschool}}</div>
                    <div class="email">邮箱：{{this.temail}}</div>
                    <div class="search">研究方向：{{this.research_direction}}</div>
                </div>
            </div>
            <div class="spe-info">
                <div class="decs-title">导师经历:</div>
                <div class="info-content">
                    <div><span class="work-time">{{this.formatDate(this.tstarttime)}}-{{this.formatDate(this.tendtime)}}</span> <span class="work-place">{{this.tschool}}</span> <span class="work-position">{{this.tposition}}</span></div>  
                    <div class="work-dec"><span class="search">经历描述：</span>{{this.describes}}</div>
                </div>
            </div>
            <div class="spe-info">
                <div class="decs-title">研究成果:</div>
                <div class="info-content">
                       {{this.research_findings}}  
                </div>
            </div>
        </div>
         <div class="select-voluntary" v-permission="['student']">
          <div　class="choose-tutor">选择报考该导师：</div>
          <el-radio-group v-model="radio" class="radio-group">
            <el-radio :label="1">设为第一志愿</el-radio>
            <el-radio :label="2">设为第二志愿</el-radio>
            <el-radio :label="3">设为第三志愿</el-radio>
          </el-radio-group>
          <div class="submit-button">
          <el-button  type="primary" @click="submit">确认并提交</el-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' 
import { mapGetters } from 'vuex'
import { addVoluntary } from '@/api/voluntary'
import { getUid } from '@/utils/auth'
import { formatDate } from '@/utils/format-date'

export default {
  name: 'Tdetail',
  data() {
    return {
      uid:this.$route.query.uid || getUid(),
      tid: this.$route.query.tid || '',
      timage:'',
      radio: 0
    }
  },
  computed: {
    ...mapGetters([
      'tname',
      'title',
      'temail',
      'research_direction',
      'image',
      'research_findings',
      'tschool',
      'tposition',
      'tstarttime',
      'tendtime',
      'describes',
      'roles'
    ])
  },
  beforeCreate() {
  },
  created() {
    this.$store.dispatch('teacher/getTeacherBasic',{uid:this.uid}).then(response => {
      this.timage = response.data.image
    })
    this.$store.dispatch('teacher/getTeacherProject',{uid:this.uid})
  },
  directives: { permission },
  methods: {
     formatDate,
    submit() {
      const level = this.radio 
      addVoluntary({tid:this.tid,level}).then(response => {
        if(response.code === 200) {
          this.$message({
            message: '提交已成功，请到我的志愿页面查看',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.tdetail-container {
  padding: 20px;
  min-height: 100vh;              

  .see-title {
    font-size: 22px;
    color:rgb(48,65,86);
    font-weight: bold;
  }

  .tutor-info{
      width: 1200px;
      margin: 10px auto;

      .tutor-top{
          width: 240px;
          margin: 30px auto;

        .tutor-name{
          font-size: 22px;
          font-weight: bold;
          text-align: center;
        }

        .tutor-photo{
          margin-top: 20px;
          img {
            width: 240px;
            height: 180px;
          }
        }
      }

      .decs-title{
          font-size: 20px;
          font-weight: bold;
          color: rgb(48,65,86);
      }

      .info-content{
          margin: 0 100px;
      }

      .tutor-bottom {
          margin-bottom: 30px;
          .spe-info {
              margin-top: 20px;
              margin-left: 80px;
              min-height: 100px;
            }
          .info-content {
              div {
                  margin-bottom: 20px;
              }

              .email{
                  font-weight: bold;
              }

              .search{
                  font-weight: bold;
              }

              .work-time{
                  display:inline-block;
                  width: 150px;
              }

              .work-place{
                  margin: 0 30px;
                  display: inline-block;
                  min-width: 200px;
              }
          }
      }
  }

  .select-voluntary{
    margin-left: 80px;

    .choose-tutor {
      font-size: 22px;
      font-weight: bold;
      color:rgb(48,65,86);
    }

    .radio-group{
      margin: 30px;
    }
    
    .submit-button{
      margin-left: 180px;
    }
  }

  
}

</style>