<template>
  <div class="dashboard-editor-container">
    <div class="see-title"> > 个人简历填写/Resume Edit</div>
    <div class="edit-container">
      <div class="steps">
        <el-steps :active="active" finish-status="success" space="300px">
          <el-step title="基本信息"></el-step>
          <el-step title="初试成绩"></el-step>
          <el-step title="教育背景"></el-step>
          <el-step title="项目经历"></el-step>
        </el-steps>
      </div>
      <div class="right-side">
        <el-form ref="form" :model="form" :rules="rule" label-width="100px" style="width:500px">
          <!-- 个人基本信息　-->
          <div class="basic-info infos" v-show="active === 0">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="E-mail" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="QQ号" prop="qq">
              <el-input v-model="form.qq"></el-input>
            </el-form-item>
            <el-form-item label="个人照片">
              <!--action为上传的地址，on-remove为文件列表移除文件时的钩子 -->
              <el-upload
                class="upload-photo"
                action="http://295uq99495.wicp.vip/fileUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="successUpload"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="attachList">
                <el-button size="small" type="primary">上传照片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                <div slot="tip" class="el-upload__tips">＊更新时不上传即保留当前的照片</div>
              </el-upload>
            </el-form-item>
          </div>
          <!-- 考研成绩　-->
          <div class="grade-info infos" v-show="active === 1">
            <el-form-item label="数学成绩" prop="math">
              <el-input v-model="form.math" placeholder="请输入数字"></el-input>
            </el-form-item>
            <el-form-item label="英语成绩" prop="english">
              <el-input v-model="form.english" placeholder="请输入数字"></el-input>
            </el-form-item>
            <el-form-item label="政治成绩" prop="politics">
              <el-input v-model="form.politics" placeholder="请输入数字"></el-input>
            </el-form-item>
            <el-form-item label="专业成绩" prop="specialized">
              <el-input v-model="form.specialized" placeholder="请输入数字"></el-input>
            </el-form-item>
            <el-form-item label="总成绩" prop="total">
              <el-input v-model="form.total" placeholder="请输入数字"></el-input>
            </el-form-item>
            <el-form-item label="报考类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择报考类型">
                <el-option label="全日制" value="全日制研究生"></el-option>
                <el-option label="非全日制" value="非全日制研究生"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 教育信息　-->
          <div class="education-info infos" v-show="active === 2">
            <el-form-item label="本科学校" prop="school">
              <el-input v-model="form.school"></el-input>
            </el-form-item>
            <el-form-item label="所学专业" prop="major">
              <el-input v-model="form.major"></el-input>
            </el-form-item>
            <el-form-item label="时间跨度">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" v-model="form.estarttime"  value-format="timestamp" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2"> -</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" v-model="form.eendtime"  value-format="timestamp" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="描述信息" prop="sedu_dec">
              <el-input type="textarea" placeholder="尽量简洁，突出重点，成绩优异的话建议写上GPA及排名等信息。" v-model="form.sedu_dec"></el-input>
            </el-form-item>
          </div>
          <!-- 项目经历　-->
          <div class="project-info infos" v-show="active === 3 || active === 4">
            <el-form-item label="项目名称" prop="project">
              <el-input v-model="form.project"></el-input>
            </el-form-item>
            <el-form-item label="主要职位" prop="position">
              <el-input v-model="form.position"></el-input>
            </el-form-item>
            <el-form-item label="时间跨度">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期"  format="yyyy 年 MM 月 dd 日" v-model="form.pstarttime" value-format="timestamp" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期"  format="yyyy 年 MM 月 dd 日" v-model="form.pendtime" value-format="timestamp" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="职责描述" prop="pdec">
              <el-input type="textarea" placeholder="简要描述你的职责范围、工作任务及取得的成绩" v-model="form.pdec"></el-input>
            </el-form-item>
          </div>
          <div class="buttons" v-show=" active!==3 ">
            <el-button style="margin-top: 12px;" @click="next">保存并下一步</el-button>
            <el-button style="margin-top: 12px;" @click="pre">返回上一步</el-button>
          </div>
          <el-form-item v-show=" active===3 ">
            <el-button style="margin-top:12px;margin-left:24px;" @click="onSubmit('form')">保存并提交</el-button>
            <el-button style="margin-top:12px;" @click="pre">返回上一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getUid } from '@/utils/auth'

export default {
  name: 'DashboardEditor',
  data() {
    return {
      uid:getUid(),
      active: 0,
      edit: false,
      form: {
        // 基本信息
          name:'',
          phone: '',
          email: '',
          qq:'',
          image:'',
      　// 考研成绩
          math:undefined,
          english:undefined,
          politics:undefined,
          specialized:undefined,
          total:undefined,
          type: '',
        // 教育经历
          school:'',
          major:'',
          estarttime: '',
          eendtime: '',
          sedu_dec:'',
        // 项目经历
          project:'',
          pstarttime:'',
          pendtime:'',
          position:'',
          pdec:'',
      },
      rule: {
            name: [
               { required: true, message: '请输入姓名', trigger: 'blur' },
               { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
               {
                  required: true,
                  pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
                  message: '姓名不支持特殊字符',
                  trigger: 'blur'
               }
            ],
            phone: [
              {required:true, message:'请输入手机号', trigger: 'blur'},
            ],
            email: [
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ],
            qq: [
              { required: true, message: '请输入qq号', trigger: 'blur' }
            ],
            math: [
              { required: true, message: '请输入数学成绩的数字', trigger: 'blur' },
            ],
            english: [
               { required: true, message: '请输入英语成绩的数字', trigger: 'blur' }
            ],
            politics:[
              { required: true, message: '请输入政治成绩的数字', trigger: 'blur' }
            ],
            specialized:[
              { required: true, message: '请输入专业成绩的数字', trigger: 'blur' }
            ],
            total:[
              { required: true, message: '请输入总成绩的数字', trigger: 'blur' }
            ],
            type: [
              { required: true, message: '请选择类型', trigger: 'blur' }
            ],
            school: [
              { required: true, message: '请输入学校', trigger: 'blur' }
            ],
            major: [
              { required: true, message: '请选择专业', trigger: 'blur' }
            ],
            sedu_dec: [
              { required: true, message: '请选择描述信息', trigger: 'blur' }
            ],
            project: [
              { required: true, message: '请选择类型', trigger: 'blur' }
            ],
            position: [
              { required: true, message: '请选择类型', trigger: 'blur' }
            ],
            pdec: [
              { required: true, message: '请选择类型', trigger: 'blur' }
            ]

      },
       attachList: []
    }
  },
  created() {
   this.$store.dispatch('student/getStudentBasic',{uid:this.uid}).then(response => {
     if(response.data) {
        this.edit = true
        this.form.name = this.$store.getters.name
        this.form.phone = this.$store.getters.phone
        this.form.email = this.$store.getters.email
        this.form.qq = this.$store.getters.qq
        this.form.image = this.$store.getters.image
     } else {
       this.edit = false
     }
   }),
   this.$store.dispatch('student/getStudentScore',{uid:this.uid}).then(response => {
     if(response.data) {
       this.edit = true
       this.form.math = this.$store.getters.math
       this.form.english = this.$store.getters.english
       this.form.politics = this.$store.getters.politics
       this.form.specialized = this.$store.getters.specialized
       this.form.total = this.$store.getters.total
       this.form.type = this.$store.getters.type
     } else {
       this.edit = false
     }
   }),
   this.$store.dispatch('student/getStudentEducation',{uid:this.uid}).then(response => {
     if(response.data) {
      this.edit = true
      this.form.school = this.$store.getters.school
      this.form.major = this.$store.getters.major
      this.form.estarttime = this.$store.getters.estartime
      this.form.eendtime = this.$store.getters.eendtime
      this.form.sedu_dec = this.$store.getters.edec
     } else {
       this.edit = false
     }
   }),
   this.$store.dispatch('student/getStudentProject',{uid:this.uid}).then(response => {
     if(response.data) {
      this.edit = true
      this.form.project = this.$store.getters.project
      this.form.position = this.$store.getters.position
      this.form.pstarttime = this.$store.getters.pstarttime
      this.form.pendtime = this.$store.getters.pendtime
      this.form.pdec = this.$store.getters.pdec
     } else {
       this.edit = false
     }
   })
  },
  mounted() {
  },
  methods: {
    next() {
        if (this.active++ === 5) this.active = 0;
    },
    pre() {
      if (this.active-- === 0) this.active = 0;
    },
    onSubmit(form) {
       this.$refs[form].validate((valid) => {
          if (valid) {
            const {name,phone,email,qq,image,school,major,estarttime,eendtime,sedu_dec,math,english,politics,specialized,total,type,project,position,pstarttime,pendtime,pdec} = this.form
            if(this.edit) {
              // 修改＆更新
              this.$store.dispatch('student/updateStudentBasic',{name,phone,eMail:email,qq,image})
              this.$store.dispatch('student/updateStudentEducation',{school,major,sedu_dec,time_start:estarttime,time_end:eendtime})
              this.$store.dispatch('student/updateStudentScore',{math:parseInt(math),english:parseInt(english),politics:parseInt(politics),major:parseInt(specialized),total_score:parseInt(total),exam_type:type})
              this.$store.dispatch('student/updateStudentProject',{name:project,position,describes:pdec,time_start:pstarttime,time_end:pendtime,pid:2})
              this.$message({
              message: '信息修改成功，请到我的简历页面查看',
              type: 'success'
          　 });
            } else {
              // 添加
            　this.$store.dispatch('student/addStudentBasic',{name,phone,eMail:email,qq,image}).then(response => {
                if(response.code===200) {
                  this.$store.dispatch('student/addStudentEducation',{school,major,sedu_dec,time_start:estarttime,time_end:eendtime})
                　this.$store.dispatch('student/addStudentScore',{math:parseInt(math),english:parseInt(english),politics:parseInt(politics),major:parseInt(specialized),total_score:parseInt(total),exam_type:type})
                　this.$store.dispatch('student/addStudentProject',{name:project,position,describes:pdec,time_start:pstarttime,time_end:pendtime})
                　this.$message({
                    message: '信息添加成功，请到我的简历页面查看',
                    type: 'success'
                　});
                }
              })
            }
          } else {
            this.$message({
                message: '失败，请把信息填写正确且完整',
                type: 'error'
              });
            return false;
          }
       })
    },  
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子	
    handlePreview(file) {
        console.log(file);
    },
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.fileName }？`);
    },
    successUpload(response,file,fileList) {
      this.form.image = response.data
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    min-height: 100vh;
    padding: 20px;

    .see-title {
      font-size: 22px;
      color:rgb(48,65,86);
      font-weight: bold;
    }
    
    .edit-container{
      margin-top:30px;
      margin-left: 50px;
    }

    .infos {
      margin-top: 20px;
    }

    .right-side{
      width:600px;
      margin-left:80px;

      .buttons{
        display: flex;
        justify-content: center;
      }

    }
  }

  .el-upload__tips {
      font-size: 12px;
      color:rgb(250, 63, 63);
  }
</style>
