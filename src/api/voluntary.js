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