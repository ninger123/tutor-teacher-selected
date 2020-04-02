import request from '@/utils/request'

// 获取教师基本信息
export function getTeacherBasic(uid) {
    return request({
        url: '/teacher/basic',
        method: 'post',
        data: uid
    })
}

// 获取教师项目经历
export function getTeacherProject(uid) {
    return request({
        url:'/teacher/project',
        method:'post',
        data:uid
    })
}

// 新增教师基本信息
export function addTeacherBasic(data) {
    return request({
        url:'teacher/basic_add',
        method:'post',
        data
    })
}

// 新增教师项目经历信息
export function addTeacherProject(data) {
    return request({
      url:'teacher/project_add',
      method: 'post',
      data
    })
}

// 更新教师的基本信息
export function updateTeacherBasic(data) {
    return request({
        url:'teacher/basic_update',
        method: 'post',
        data
    })
}

// 更新教师项目经历信息
export function updateTeacherProject(data) {
    return request({
      url:'teacher/project_update',
      method: 'post',
      data
    })
}

// 获取查看导师列表
export function getTeacherList() {
    return request({
        url:'teacher/list',
        method:'post'
    })
}