import {
    getTeacherBasic,getTeacherProject,
    addTeacherBasic,addTeacherProject,
    updateTeacherBasic,updateTeacherProject,
    getTeacherList
} from '@/api/teacher'

const state = {
    name: '',
    title: '', // 职称
    email:'',
    research_direction:'',
    image: '',
    max_number:'',
    research_findings:'', // 研究成果
    school:'',
    position:'', // 职位
    time_start:'',
    time_end:'',
    describes:'', // 经历描述
    teacherList:[]
}

const mutations = {
    SET_NAME:(state,name) => {
        state.name = name
    },
    SET_TITLE:(state,title) => {
        state.title = title
    },
    SET_EMAIL:(state, email) => {
        state.email = email
    },
    SET_DIRECTION:(state,research_direction) => {
        state.research_direction = research_direction
    },
    SET_MAXNUMBER: (state,max_number) => {
        state.max_number = max_number
    },
    SET_IMAGE:(state,image) => {
        state.image = image
    },
    SET_FINDINGS:(state,research_findings) => {
        state.research_findings = research_findings
    },
    SET_SCHOOL:(state,school) => {
        state.school = school
    },
    SET_POSITION:(state,position) => {
        state.position = position
    },
    SET_TIMESTART:(state,time_start) => {
        state.time_start = time_start
    },
    SET_TIMEEND:(state,time_end) => {
        state.time_end = time_end
    },
    SET_DESC:(state,describes) => {
        state.describes = describes
    },
    SET_TEACHERLIST:(state,teacherList) => {
        state.teacherList = teacherList
    }
}

const actions = {
    // 获取教师的基本信息
    getTeacherBasic({commit},uid) {
        return new Promise((resolve,reject) => {
            getTeacherBasic(uid).then(response => {
                if(response.data) {
                    const { name,title,e_mail,research_direction,max_number,image,research_findings } = response.data
                    commit('SET_NAME', name)
                    commit('SET_TITLE', title)
                    commit('SET_EMAIL',e_mail)
                    commit('SET_DIRECTION', research_direction)
                    commit('SET_MAXNUMBER',max_number)
                    commit('SET_IMAGE', image)
                    commit('SET_FINDINGS',research_findings)
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取教师的项目经历信息
    getTeacherProject({commit},uid) {
        return new Promise((resolve,reject) => {
            getTeacherProject(uid).then(response => {
                if(response.data) {
                    const { name,position,time_start,time_end,describes } = response.data[0]
                    commit('SET_SCHOOL', name)
                    commit('SET_POSITION', position)
                    commit('SET_TIMESTART',time_start)
                    commit('SET_TIMEEND', time_end)
                    commit('SET_DESC', describes)
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 添加教师的基本信息
    addTeacherBasic({commit},formlist) {
        const {name,title,e_mail,research_direction,max_number,image,research_findings} = formlist
        return new Promise((resolve,reject) => {
            addTeacherBasic(formlist).then(response => {
                commit('SET_NAME', name)
                commit('SET_TITLE', title)
                commit('SET_EMAIL',e_mail)
                commit('SET_MAXNUMBER',max_number)
                commit('SET_DIRECTION', research_direction)
                commit('SET_IMAGE', image)
                commit('SET_FINDINGS',research_findings)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 添加教师的项目经历信息
    addTeacherProject({commit},formlist) {
        const {name,position,time_start,time_end,describes} = formlist
        return new Promise((resolve,reject) => {
            addTeacherProject(formlist).then(response => {
                commit('SET_SCHOOL', name)
                commit('SET_POSITION', position)
                commit('SET_TIMESTART',time_start)
                commit('SET_TIMEEND', time_end)
                commit('SET_DESC', describes)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 更新修改教师的基本信息
    updateTeacherBasic({commit},formlist) {
        const {name,title,e_mail,research_direction,max_number,image,research_findings} = formlist
        return new Promise((resolve,reject) => {
            updateTeacherBasic(formlist).then(response => {
                commit('SET_NAME', name)
                commit('SET_TITLE', title)
                commit('SET_EMAIL',e_mail)
                commit('SET_DIRECTION', research_direction)
                commit('SET_MAXNUMBER',max_number)
                commit('SET_IMAGE', image)
                commit('SET_FINDINGS',research_findings)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 更新修改教师的项目经历
    updateTeacherProject({commit},formlist) {
        const {name,position,time_start,time_end,describes} = formlist
        return new Promise((resolve,reject) => {
            updateTeacherProject(formlist).then(response => {
                commit('SET_SCHOOL', name)
                commit('SET_POSITION', position)
                commit('SET_TIMESTART',time_start)
                commit('SET_TIMEEND', time_end)
                commit('SET_DESC', describes)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取导师列表
    getTeacherList({commit}) {
        return new Promise((resolve,reject) => {
            getTeacherList().then(response => {
                if(response.data) {
                    commit('SET_TEACHERLIST',response.data)
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
  namespaced: true,
  mutations,
  actions,
  state
}