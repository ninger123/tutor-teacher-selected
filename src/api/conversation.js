import request from '@/utils/request'

export function getConversationList(uid) {
    return request({
            url: 'conversation/user_list',
            method: 'post',
            data:uid
    })
}

export function getHistoryConversation(data) {
    return request({
        url:'conversation/history',
        method: 'post',
        data
    })
}

export function getUnreadMessage(data) {
    return request({
        url:'conversation/unread',
        method:'post',
        data
    })
}

export function hasConversation(data) {
    return request({
        url:'conversation/has_conversation',
        method:'post',
        data
    })
}