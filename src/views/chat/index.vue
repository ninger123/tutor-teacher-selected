<template>
  <div class="chat-container">
    <div class="see-title"> > 聊天室/Chat Room</div>
    <div class="chat-room-container">
      <div class="chat-aside-container">
        <div class="aside-header">
          <span>联系人列表</span>
          </div>
        <ul class="chat-conversation-ul">
          <li class="chat-conversation-li" v-for="(v, i) in contactsList" :key="v.conversationId" @click="getInRoom(v)">
            <!--
                        <el-badge :value="v.unRead" :max="99" class="mesBadge" :hidden="v.unRead === 0">
                            <a class="vchat-photo">
                                <img :src="v.url" alt="">
                            </a>
                        </el-badge> -->
                          <a class="vchat-photo">
                                <img :src="v.url" alt="">
                          </a>
                        <div class="chat-conversation-li-center">
                            <template>
                                <span class="vchat-line1">{{v.userName}}</span>
                                <p class="vchat-line1">{{v.message}}</p>
                            </template>
                        </div>
                        <div class="chat-conversation-li-right">
                            <span>{{v.date}}</span>
                        </div>
                    </li>
        </ul>
      </div>
      <div class="chat-body-container" v-if="clicked">
        <div class="chat-room">
          <div class="chat-room-header">{{this.currname}}</div>
          <div class="chat-romm-body" id="chat-room-body" style="overflow:auto;">
            <vuescroll :ops="ops" ref="vs">
              <div id="ul-container" >
                <ul ref="msglist" class="vchat-message">
                  <li v-for="(v, i) in currSation" :key="i">
                    <div :class="[{other: v.type==='other'},{mine: v.type ==='mine'}]" class="messageliinfo mes-box">
                      <p class="avatar ohters" v-if="v.type === 'other'">
                        <img :src="currAvater" alt="">
                      </p>
                      <div class="messageInfo">
                            <p class="info">
                                <span>{{v.fromName}}</span>
                                <i>{{formatTime(v.date)}}</i>
                            </p>
                            <p class="mes">{{v.message}}</p>
                      </div>
                      <p class="avatar mines" v-if="v.type === 'mine'">
                        <img :src="avatar" alt="">
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </vuescroll>
          </div>
        </div>
        <div class="chat-send">
          <el-input
            ref="inputarea"
            type="textarea"
            :rows="9"
            @keyup.enter.native = "sendMessage"
            v-model="message">
          </el-input>
          <div class="enter">
              <el-button @click="clear">清空</el-button>
              <el-button type="primary" @click="sendMessage">发送</el-button>
          </div>
        </div>
      </div>
      <div class="chat-no-clicked" v-else>
        <div class="no-clicked-info">
          <img src="./wechat.jpeg">
          <p>点击左侧消息列表查看消息</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chatItem from './components/chat-item.vue';
import { getUid } from '@/utils/auth'
import { formatTime,formatDay } from '@/utils/format-date'
import { getConversationList,getHistoryConversation } from '@/api/conversation'
import { mapGetters } from 'vuex'
import vuescroll from 'vuescroll';

export default {
  name: 'Chat',
  data() {
    return {
      ops: {
          vuescroll: {},
          scrollPanel: {
          },
          rail: {},
          bar: {}
      },
      uid: getUid(),
      contactsList:[],
      currRoom:undefined,
      currSation: [], //当前会话 
      message:'',
      clicked:false,
      currname:'',
      currAvater:'',
      oppsiteId:'',
      type:'',
      websock:null,
    }
  },
   computed: {
    ...mapGetters([
      'myname',
      'avatar'
    ])
  },
  components: {
    chatItem, 
    vuescroll
  },
  created() {
    getConversationList({uid:this.uid}).then(response => {
      var date = new Date()
      var nowday = date.getDate()
      response.data.forEach(element => {
        var messagedate = new Date(element.date)
        var messageday = messagedate.getDate()
        var difference = nowday-messageday
        if(difference === 0) {
          element.date = this.formatTime(element.date)
        } else if(difference === 1) {
          element.date = '昨天'
        } else {
          element.date = this.formatDay(element.date)
        }
      }); 
      this.contactsList = response.data
    })
  },
  methods: {
    formatTime,
    formatDay,
    getInRoom(v) {
      if(this.websock) {
        this.websocketclose()
      }
      this.clicked = true
      this.currRoom = v.conversationId;
      this.currname = v.userName
      this.currAvater = v.url
      v.conversationId.split('_').forEach(item => {
        if(item !== this.uid) {
          this.oppsiteId = item;
        }
      })
      this.$nextTick(() => {
         this.$refs.inputarea.focus()

         // 获取历史消息记录
          getHistoryConversation({conversationId:v.conversationId}).then(response => {
            if(response.data) {
              response.data.forEach(element => {
                if(element.fromName === v.userName) {
                  element.type = 'other'
                } else {
                  element.type = 'mine'
                }
              })
              this.currSation = response.data;
            }
          }).then(() => {
            this.$refs["vs"].scrollTo(
              {
                  y: "100%"
              },
              0
            );
          })

        // init Webcocket
        this.initWebSocket()
      })
    },
    initWebSocket(){ //初始化weosocket
      const wsuri = "ws://295uq99495.wicp.vip:80/websocket/"+this.uid;
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },

    //链接建立好之后调用的方法
    websocketonopen(){
    　console.log('链接开始')
    },

    //收到服务器返回回来的消息
    websocketonmessage(e){
      const data = JSON.parse(e.data)
      data.type = 'other'
      if(data.fromName === this.currname) {
        this.currSation.push(data);
      }

      this.contactsList.forEach(item=> {
        console.log('item.conversationId'+ item.conversationId)
        console.log('this.currRoom'+this.currRoom)
        if( item.conversationId=== this.currRoom ) {
          if (e.fromName === this.currname) {
            item.message = data.message
            item.date = this.formatTime(new Date().getTime())
          }
        }
      })
      this.$nextTick(() => {
        this.$refs["vs"].scrollTo(
              {
                  y: "100%"
              },
              0
            );
      })
    },

    //如果连接建立失败则重连
    websocketonerror(){
        this.initWebSocket();
    },

    //关闭链接
    websocketclose(e){
        console.log('断开连接',e);
    },
    sendMessage() {
      if(this.message.trim() === '') {
        return
      }
      let par ={fromId:this.uid,toId:this.oppsiteId,message:this.message}
      this.websock.send(JSON.stringify(par))
      let newMessage = {type :'mine',fromName:this.myname,date:new Date().getTime(),message:this.message}
      this.currSation.push(newMessage)
      this.contactsList.forEach(item=> {
        if( item.conversationId=== this.currRoom ) {
          item.message = this.message
          item.date = this.formatTime(new Date().getTime())
        }
      })
      this.$nextTick(() => {
        this.$refs["vs"].scrollTo(
              {
                  y: "100%"
              },
              0
        );
        this.clear()
      })
    },
     // 清空input框里输入的文字
    clear() {
      this.message = '';
    }
  }
}
</script>

<style lang=scss>

.el-textarea__inner {
    border: 0 none;
}
</style>

<style lang="scss" scoped>

.chat-container{
  padding: 20px; 

  .see-title {
    font-size: 22px;
    color:rgb(48,65,86);
    font-weight: bold;
  }

  .chat-room-container{
    width: 950px;
    height: 800px;
    margin: 0 auto;
    border: 1px solid yellowgreen;
    display: flex;

    .chat-aside-container {
      width: 300px;
      height: 100%;
      border-right: 1px solid rgba(102, 99, 99, 0.4);

      .aside-header{
        color: white;
        font-size: 18px;
        font-weight: bold;
        height: 40px;
        background: #42b983;

        span{
          display: inline-block;
          margin-top:10px;
          margin-left:10px;
        }
      }

      // ul
      .chat-conversation-ul{
                min-width:147.2px;
                padding-bottom: 20px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255,255,255,0.2);
                overflow-y: auto;
                padding-inline-start: 0;
                margin-block-start:0;
      }
      .chat-conversation-li{
                padding: 10px;
                box-sizing: border-box;
                display: flex;
                overflow: hidden;
                text-align: left;
                position: relative;
                border-bottom: 1px solid gray;
                a img{
                    width:42px;
                    min-width: 42px;
                    height: 42px;
                    margin-right: 10px;
                }
      }
      .chat-conversation-li-center{
                width: 170px;
                font-size: 14px;
                margin-left: 10px;
                span{
                    margin-bottom: 15px;
                    font-weight: bold;
                }
                p {
                    font-size: 13px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
      }
      .chat-conversation-li-right{
                margin-left: 5px;
                min-width: 36px;
                font-size: 12px;
                text-align: right;
                span {
                  display: inline-block;
                  margin-bottom: 5px;
                }
      }
      .chat-conversation-li:hover {
        background-color: rgba(155, 151, 151, 0.1);
      }
    }

    .chat-no-clicked{
      width: 650px;
      height:100%;

      .no-clicked-info{
        width: 360px;
        margin:200px auto;

        img{
          display: block;
          width: 180px;
          margin: 0 auto;
        }

        p {
          color: rgba(143, 142, 142,0.8);
          font-size: 30px;
      }
      }
    }

    .chat-body-container {
      width:650px;
      height: 800px;

      .chat-room {
        border-bottom: 1px solid grey;
      }

      .chat-room-header{
        height: 40px;
        background-color: aquamarine;
        font-weight: bold;
        font-size: 20px;
        padding: 10px;
        text-align: center;
      }

      .chat-romm-body{
        height: 500px;

        .avatar img{
          width:42px;
          min-width: 42px;
          height: 42px;
          margin-right: 10px;
        }

        .vchat-message{
          list-style: none;

          .messageliinfo{
            display: flex;

            .messageInfo{
              max-width:298px;

              p.info{
                font-size: 14px;
                margin-bottom: 5px;
                i{
                    font-size: 10px;
                    color: #b3b3b3;
                    font-style: normal;
                    margin-left: 5px;
                }
            }

              p.mes{
                border-radius: 5px;
                padding: 10px;
                box-sizing: border-box;
                position: relative;
                text-align: left;
                word-wrap:break-word;
                font-size: 14px;
                word-break: break-all;
                display: inline-block;
                color: #323232;
            }
            }
          }
        }
      }

      .chat-send{
        height: 260px;

        .enter{
          width:100%;
          height: 38px;
          display: flex;
          margin-top: 10px;
          justify-content: flex-end;
          button{
            margin-right: 10px;
          }
        }
      }

      .other.mes-box .messageInfo{
        text-align: left;
        margin-left: 10px;
      }
      .other.mes-box{
          justify-content: flex-start;
      }
      .mine.mes-box{
          justify-content: flex-end;
      }
      .mine.mes-box .messageInfo{
          text-align: right;
          margin-right: 10px;
      }
      .mine.mes-box .messageInfo p.mes {
        background-color: #acd9f8;
      }
      .other.mes-box .messageInfo p.mes{
        background-color: #9cbeca;
      }

      .other p.mes:before, .mine p.mes:after{
        width:0;
        height:0;
        content: '';
        display: block;
        position:absolute;
        top:10px;
    }
    .other p.mes:before{
        left:-11px;
        border-bottom: 5px solid #9cbeca;
        border-left: 10px solid transparent;
        border-right: 5px solid transparent;
        border-top: 0;
        transform: rotate(45deg);
    }
    .mine p.mes:after{
        right:-10px;
        border-bottom: 5px solid #acd9f8;
        border-left: 5px solid transparent;
        border-right: 10px solid transparent;
        transform: rotate(-45deg);
    }
    }
  }     
}

</style>
