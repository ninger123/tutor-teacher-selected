import { 
  getStudentBasic,getStudentEducation,
  getStudentScore,getStudentProject,
  addStudentBasic,addStudentEducation,
  addStudentScore,addStudentProject,
  updateStudentBasic,updateStudentEducation,
  updateStudentScore,updateStudentProject
} from '@/api/student'

const state = {
  name: '',
  phone:'',
  email:'',
  qq:'',
  simage:'',
  math: undefined,
  english: undefined,
  politics:undefined,
  specialized: undefined,
  total: undefined,
  type:'',
  school: '',
  major: '',
  estartime:'',
  eendtime:'',
  edec:'',
  project:'',
  position:'',
  pstarttime:'',
  pendtime:'',
  pdec:''
}

const mutations = {
  // 学生基本信息
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_QQ: (state,qq) => {
      state.qq = qq
  },
  SET_SIMAGE: (state, simage) => {
    state.simage = simage
  },
  // 学生考研成绩
  SET_MATH: (state, math) => {
    state.math = math
  },
  SET_ENGLISH: (state, english) => {
    state.english = english
  },
  SET_POLITICS: (state, politics) => {
    state.politics = politics
  },
  SET_SPECIALIZED: (state, specialized) => {
    state.specialized = specialized
  },
  SET_TOTAL: (state, total) => {
    state.total = total
  },
  SET_TYPE: (state, type) => {
    state.type = type
  },
  // 学生教育信息
  SET_ESTARTIME: (state, estartime) => {
    state.estartime = estartime
  },
  SET_EENDTIME: (state, eendtime) => {
    state.eendtime = eendtime
  },
  SET_SCHOOL: (state, school) => {
    state.school = school
  },
  SET_MAJOR: (state, major) => {
    state.major = major
  },
  SET_EDEC: (state, edec) => {
    state.edec = edec
  },
  // 学生项目信息
  SET_PROJECT: (state, project) => {
    state.project = project
  },
  SET_POSITION: (state, position) => {
    state.position = position
  },
  SET_PSTARTIME: (state, pstarttime) => {
    state.pstarttime = pstarttime
  },
  SET_PENDTIME: (state, pendtime) => {
    state.pendtime = pendtime
  },
  SET_PDEC: (state, pdec) => {
    state.pdec = pdec
  },
}

const actions = {
  // 获取学生基本信息
  getStudentBasic({ commit },uid) {
    return new Promise((resolve,reject) => {
      getStudentBasic(uid).then(response => {
        if(response.data) {
          const { name,phone,email,qq,image } = response.data
          commit('SET_NAME', name)
          commit('SET_PHONE', phone)
          commit('SET_EMAIL', email)
          commit('SET_QQ', qq)
          commit('SET_SIMAGE',image)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  // 获取学生教育信息
  getStudentEducation({ commit },uid) {
    return new Promise((resolve,reject) => {
      getStudentEducation(uid).then(response => {
        if(response.data) {
          const { time_start,time_end,school,major,sedu_dec } = response.data
          commit('SET_ESTARTIME', time_start)
          commit('SET_EENDTIME', time_end)
          commit('SET_SCHOOL', school)
          commit('SET_MAJOR', major)
          commit('SET_EDEC', sedu_dec)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取学生考研成绩信息
  getStudentScore({commit},uid) {
    return new Promise((resolve,reject) => {
      getStudentScore(uid).then(response => {
        if(response.data) {
          const { math,english,politics,major,total_score,exam_type } = response.data
          commit('SET_MATH', math)
          commit('SET_ENGLISH', english)
          commit('SET_POLITICS', politics)
          commit('SET_SPECIALIZED', major)
          commit('SET_TOTAL', total_score)
          commit('SET_TYPE', exam_type)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //　获取学生的项目经历信息
  getStudentProject({commit},uid) {
    return new Promise((resolve,reject) => {
      getStudentProject(uid).then(response => {
        if(response.data) {
         const { name,position,time_start,time_end,describes } = response.data[0]
         commit('SET_PROJECT', name)
         commit('SET_POSITION', position)
         commit('SET_PSTARTIME', time_start)
         commit('SET_PENDTIME', time_end)
         commit('SET_PDEC', describes)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 新增学生的基本信息
  addStudentBasic({commit},formlist) {
    const {name,phone,eMail,qq,image} = formlist
    return new Promise((resolve,reject) => {
      addStudentBasic(formlist).then(response => {
        commit('SET_NAME',name)
        commit('SET_PHONE', phone)
        commit('SET_EMAIL', eMail)
        commit('SET_QQ', qq)
        commit('SET_SIMAGE',image)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 新增学生的教育信息
  addStudentEducation({commit},formlist) {
    const {time_start,time_end,school,major,sedu_dec} = formlist
    return new Promise((resolve,reject) => {
      addStudentEducation(formlist).then(response => {
        commit('SET_ESTARTIME',time_start)
        commit('SET_EENDTIME', time_end)
        commit('SET_SCHOOL', school)
        commit('SET_MAJOR', major)
        commit('SET_EDEC',sedu_dec)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 新增学生的考研成绩信息
  addStudentScore({commit},formlist) {
    const {math,english,politics,major,total_score,exam_type} = formlist
    return new Promise((resolve,reject) => {
      addStudentScore(formlist).then(response => {
        commit('SET_MATH',math)
        commit('SET_ENGLISH', english)
        commit('SET_POLITICS', politics)
        commit('SET_SPECIALIZED', major)
        commit('SET_TOTAL',total_score)
        commit('SET_TYPE',exam_type)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 新增学生的项目经历信息(未完成)
  addStudentProject({commit},formlist) {
    const {name,position,time_start,time_end,describes} = formlist
    return new Promise((resolve,reject) => {
      addStudentProject(formlist).then(response => {
        commit('SET_PROJECT',name)
        commit('SET_POSITION', position)
        commit('SET_PSTARTIME', time_start)
        commit('SET_PENDTIME', time_end)
        commit('SET_PDEC',describes)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 更新学生的基本信息
  updateStudentBasic({commit},formlist) {
    const {name,phone,eMail,qq,image} = formlist
    return new Promise((resolve,reject) => {
      updateStudentBasic(formlist).then(response => {
        commit('SET_NAME',name)
        commit('SET_PHONE', phone)
        commit('SET_EMAIL', eMail)
        commit('SET_QQ', qq)
        commit('SET_SIMAGE',image)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 更新学生的教育信息
  updateStudentEducation({commit},formlist) {
    const {time_start,time_end,school,major,sedu_dec} = formlist
    return new Promise((resolve,reject) => {
      updateStudentEducation(formlist).then(response => {
        commit('SET_ESTARTIME',time_start)
        commit('SET_EENDTIME', time_end)
        commit('SET_SCHOOL', school)
        commit('SET_MAJOR', major)
        commit('SET_EDEC',sedu_dec)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 更新学生的考研成绩信息
  updateStudentScore({commit},formlist) {
    const {math,english,politics,major,total_score,exam_type} = formlist
    return new Promise((resolve,reject) => {
      updateStudentScore(formlist).then(response => {
        commit('SET_MATH',math)
        commit('SET_ENGLISH', english)
        commit('SET_POLITICS', politics)
        commit('SET_SPECIALIZED', major)
        commit('SET_TOTAL',total_score)
        commit('SET_TYPE',exam_type)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 更新学生的项目经历信息(未完成)
  updateStudentProject({commit},formlist) {
    const {name,position,time_start,time_end,describes} = formlist
    return new Promise((resolve,reject) => {
      updateStudentProject(formlist).then(response => {
        commit('SET_PROJECT',name)
        commit('SET_POSITION', position)
        commit('SET_PSTARTIME', time_start)
        commit('SET_PENDTIME', time_end)
        commit('SET_PDEC',describes)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
