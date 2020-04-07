import request from '@/utils/request'

export function addVoluntary(data) {
    return request({
      url: '/voluntary/add',
      method: 'post',
      data
    })
}

// 学生查询志愿状态的接口
export function getVoluntaryList(data) {
    return request({
        url:'voluntary/student_list',
        method: 'post',
        data
    })
}

//　导师查看已确定的学生状态的接口
export function getHandledList() {
    return request({
        url:'voluntary/teacher_handled_list',
        method:'post'
    })
}

// 导师查看待选学生列表接口
export function getUnhandledList() {
    return request({
        url:'voluntary/teacher_unhandle_list',
        method:'post'
    })
}

// 导师同意待选学生的申请
export function passTheApplication(data) {
    return request({
        url:'voluntary/teacher_pass',
        method: 'post',
        data
    })
}

// 导师拒绝待选学生的申请
export function refuseTheApplication(data) {
    return request({
        url:'voluntary/teacher_refuse',
        method:'post',
        data
    })
}

// 管理员查看流程到学院的学生列表
export function viewUnhandledList() {
    return request({
        url:'voluntary/admin_unhandle_list',
        method:'post'
    })
}

// 管理员同意待选学生的申请
export function adminPassTheApplication(data) {
    return request({
        url:'voluntary/admin_pass',
        method:'post',
        data
    })
}

// 管理员拒绝待选学生的申请
export function adminRefuseTheApplication(data) {
    return request({
        url:'voluntary/admin_refuse',
        method:'post',
        data
    })
}

// 管理员查看所有学生列表
export function allStudentList() {
    return request({
        url:'voluntary/all_student_list',
        method:'post'
    })
}

// 获取我的流程状态接口
export function getMyFlow() {
    return request({
        url:'voluntary/my_voluntary',
        method:'post'
    })
}