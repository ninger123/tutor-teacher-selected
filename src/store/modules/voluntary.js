import {　getVoluntaryList } from '@/api/voluntary'
import { promised, resolve, reject } from 'q';

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
                commit('SET_MYVOLUNTARY',response.data)
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