import request from '@/utils/request'

// 获取学生基本信息
export function getStudentBasic(uid) {
  return request({
    url: '/student/basic',
    method: 'post',
    data:uid
  })    
}

// 获取学生教育信息
export function getStudentEducation(uid) {
  return request({
    url: '/student/education',
    method: 'post',
    data:uid
  })
}

//　获取学生考研成绩
export function getStudentScore(uid) {
  return request({
    url: '/student/score',
    method: 'post',
    data:uid
  })
}

//　获取学生的项目经历
export function getStudentProject(uid) {
  return request({
    url: '/student/project',
    method: 'post',
    data:uid
  })
}

// 获取学生简单简历信息
export function getStudentSimple(data) {
  return request({
    url:'student/resume',
    method:'post',
    data
  })
}

// 新增学生的基本信息
export function addStudentBasic(data) {
  return request({
    url:'student/basic_add',
    method: 'post',
    data
  })
}

// 新增学生的教育信息
export function addStudentEducation(data) {
  return request({
    url:'student/education_add',
    method: 'post',
    data
  })
}

// 新增学生的考研成绩信息
export function addStudentScore(data) {
  return request({
    url:'student/score_add',
    method: 'post',
    data
  })
}

// 新增学生的项目经历信息
export function addStudentProject(data) {
  return request({
    url:'student/project_add',
    method: 'post',
    data
  })
}

// 更新学生的基本信息
export function updateStudentBasic(data) {
  return request({
      url:'student/basic_update',
      method: 'post',
      data
  })
}

// 更新学生的教育信息
export function updateStudentEducation(data) {
  return request({
    url:'student/education_update',
    method: 'post',
    data
  })
}

// 更新学生的考研成绩信息
export function updateStudentScore(data) {
  return request({
    url:'student/score_update',
    method: 'post',
    data
  })
}


// 更新学生的项目经历信息
export function updateStudentProject(data) {
  return request({
    url:'student/project_update',
    method: 'post',
    data
  })
}