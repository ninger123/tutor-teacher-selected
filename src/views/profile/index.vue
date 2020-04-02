<template>
  <div class="preview-container">
    <div class="see-title"> > 学生简历/Student's Resume</div>
    <div id="pdfDom" class="pdf-container">
      <div class="left-container">
        <div class="left-content">
          <img class="image" :src="image">
          <div class="info"><svg-icon icon-class="phone"  class-name='custom-class' /><span class="phone">{{this.phone}}</span></div>
          <div class="info"><svg-icon icon-class="email"  class-name='custom-class' /><span class="phone">{{this.email}}</span></div>
          <div class="info"><svg-icon icon-class="qq"  class-name='custom-class' /><span class="phone">{{this.qq}}</span></div>
          <div class="skill">
            <div class="white">
              <svg-icon icon-class="edit"  class-name='edit' />
            </div>
            <span class="skill-text">技能特长</span>
          </div>
          <div class="rate">  
            <div class="rate-demo">
              <span>html:</span>
              <el-rate
                  v-model="htmlValue"
                  class="elrate"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
              </el-rate>
            </div>
            <div class="rate-demo">
              <span>css:</span>
              <el-rate
                  v-model="cssValue"
                  class="elrate"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
              </el-rate>
            </div>
          </div>
        </div>
      </div>
      <div class="right-container">
        <div class="right-content">
          <div class="name">{{this.name}}</div>
          <div class="education"> 
            <div class="normal-title">
              <div class="blue"><svg-icon icon-class="educate"  class-name='edit' /></div>
              <span class="normal-text">教育背景</span>
            </div>
            <div class="info">
              <span class="time">{{formatDate(this.estartime)}}-{{formatDate(this.eendtime)}}</span>
              <span class="names">{{this.school}}</span>
              <span class="major">{{this.major}}</span>
            </div>
            <div class="decs">
             {{this.edec}}
            </div>
          </div>
          <div class="grade">
            <div class="normal-title">
              <div class="blue"><svg-icon icon-class="grade" class-name='grade-icon' /></div>
              <span class="normal-text">初试成绩</span>
            </div>
            <div class="grade-content">
              <div class="math-grade">数学成绩：{{ this.math }}</div>
              <div class="math-grade">英语成绩：{{ this.english }}</div>
              <div class="math-grade">政治成绩：{{ this.politics }}</div>
              <div class="math-grade">专业成绩：{{ this.specialized }}</div>
              <div class="totle-grade">总分成绩：{{this.total}}</div>
              <div class="exam-type">报考类型：{{this.type}}</div>
            </div>
          </div>
          <div class="project">
            <div class="normal-title">
              <div class="blue"><svg-icon icon-class="project"  class-name='project-icon' /></div>
              <span class="normal-text">项目经历</span>
            </div>
            <div class="info">
              <span class="time">{{formatDate(this.pstarttime)}}-{{formatDate(this.pendtime)}}</span>
              <span class="names">{{this.project}}</span>
              <span class="major">{{this.position}}</span>
            </div>
             <div class="decs">
              {{this.pdec}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button type="primary" class="btn btn-primary" v-on:click="buttonClick()">导出PDF</el-button>
  </div>
</template>

<script>
import { getPdf } from '@/utils/html-to-pdf'
import { mapGetters } from 'vuex'
import { getUid } from '@/utils/auth'
import { formatDate } from '@/utils/format-date'

export default {
  name: 'Profile',
  data() {
    return {
      uid:this.$route.query.uid || getUid(),
      htmlValue:4,
      cssValue: 3.5,
      image:''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'phone',
      'email',
      'qq',
      'simage',
      'math',
      'english',
      'politics',
      'specialized',
      'total',
      'type',
      'school',
      'major',
      'estartime',
      'eendtime',
      'edec',
      'project',
      'position',
      'pstarttime',
      'pendtime',
      'pdec',
    ])
  },
  created() {
    this.$store.dispatch('student/getStudentBasic',{uid:this.uid}).then(response => {
      this.image = response.data.image
    })
    this.$store.dispatch('student/getStudentScore',{uid:this.uid})
    this.$store.dispatch('student/getStudentEducation',{uid:this.uid})
    this.$store.dispatch('student/getStudentProject',{uid:this.uid})
  },
  methods: {
    formatDate,
    buttonClick: () => {
      getPdf()
    }
  }
}
</script>

<style lang="scss" scoped>

.preview-container{
  padding: 20px;
  min-height: 100vh;

  .see-title {
    font-size: 22px;
    color:rgb(48,65,86);
    font-weight: bold;
  }

  .pdf-container{
    margin: 30px auto;
    display: flex;
    width: 1050px;
    border:1px solid #414141;
    min-height: 100vh;

    .left-container{
      width: 320px;
      background: #254665;
      padding: 50px;

      .left-content{
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        .image{
            width:180px;
            height: 240px;
            border: 4px solid #e5e5e5;
            margin: 20px auto;
        }

        .info{
          margin-top:20px;
          color: #fff;
        }

        .custom-class{
          margin-right: 10px;
        }

        .skill{
          margin-top: 80px;
          display: flex;
          align-items:center;
          
          .white {
            width: 30px;
            height: 30px;
            border-radius:50%;
            background: white;
            text-align:center;

            .edit {
              margin-top: 5px;
              font-size: 18px;
            }
          }

          .skill-text{
            font-size: 20px;
            font-weight: bold;
            color: #fff;
            margin-left: 10px;
          }
        }

        .rate {
          margin-top: 10px;

          .rate-demo{
            display: flex;
            color: white;
            font-weight: bold;
            font-size: 20px;
            margin-top:10px;

            .elrate {
              margin-left: 10px;
            }
          }
        }
      }
    }

    .right-container{
      width: 730px;
      padding: 50px;

      .right-content{

        .normal-title {
          display: flex;
          align-items: center;

          .blue {
            width: 30px;
            height: 30px;
            border-radius:50%;
            background: #254665;
            text-align:center;
            color: white;
            padding:4px;
            font-size:20px;

            .grade-icon{
              font-size: 16px;
            }

            .project-icon{
              font-size: 18px;
            }
          }

          .normal-text {
            padding-bottom: 2px;
            font-size: 22px;
            margin-left: 8px;
            color: #254665;
            font-weight: bolder;
            border-bottom: 1px solid #254665;
            width: 610px;            
          }
        }

        .info {
          margin-top: 10px;
          padding: 0 10px;
          font-weight: bold;
          color: #414141;
          display: flex;
          justify-content: space-between;
        }

        .decs {
          margin-top:20px;
          padding: 0 10px;
          color:#747474;
        }

        .name{
          color: #414141;
          font-size: 32px;
        }

        .education{
          margin-top: 50px;
          width: 650px;
          min-height: 120px;
        }

        .grade {
          margin-top: 40px;

          .grade-content {
            display: flex;
            flex-wrap : wrap;
            margin-top: 10px;
            font-weight: bold;
            color: #414141;

            div {
              width: 280px;
              margin: 10px;
            }
          }
        }

        .project {
          margin-top: 40px;
          min-height: 120px;
        }
      }
    }
  }

  .btn-primary{
    display: block;
    margin: 10px auto;
  }
  
}
</style>