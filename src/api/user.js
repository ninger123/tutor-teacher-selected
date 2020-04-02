import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'user/user_info',
    method: 'post',
    data: {"token":token}
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserList() {
  return request({
    url:'user/list',
    method: 'post'
  })
}

export function addUser(data) {
  return request({
    url:'user/add',
    method:'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url:'user/delete',
    method:'post',
    data
  })
}