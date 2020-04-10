import {　getVoluntaryList } from '@/api/voluntary'
import { formatDate } from '@/utils/format-date'

const state = {
    myVoluntary:[]
}

const mutations = {
    SET_MYVOLUNTARY: (state,myVoluntary) => {
        state.myVoluntary = myVoluntary
    }
}

const actions = {
    // 获取我的志愿列表
    getVoluntaryList({commit},uid) {
        return new Promise((resolve,reject) => {
            getVoluntaryList(uid).then(response => {
                if(response.data) {
                    response.data.forEach(element => {
                        element.voluntary_time = formatDate(element.voluntary_time)
                        element.level = '第' + element.level +'志愿'
                    });
                    commit('SET_MYVOLUNTARY',response.data)
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