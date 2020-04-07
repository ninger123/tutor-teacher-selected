<template>
    <div class="vchat-item">
        <div class="vchat-item-header">
            {{currSation.fromId}}
        </div>
        <div class="vchat-item-container" v-show="currNav === 0">
            <div class="container-chat">
                <div class="chat-room"
                     v-loading="chatLoading"
                     element-loading-text="拼命加载中"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                    <v-message :chatList="chatList" @lookPhoto="lookPhoto" @chatLoading="chatLoading = false"></v-message>
                </div>
                <div class="chat-send">
                    <textarea v-model="message" @keyup.enter="send(false)" v-fontColor="user.chatColor"></textarea>
                    <div class="enter">
                        <button class="vchat-button-mini info" @click="clear">清空</button>
                        <button class="vchat-button-mini" @click="send(false)">发送</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vMessage from './message.vue';

export default {
    name:'chatItem',
    props: ['currSation'],
    components:{
        vMessage
    }
}
</script>


<style lang="scss" scoped>
    .vchat-item{
        width:100%;
        height: 100%;
        .vchat-item-header{
            width:100%;
            height: 32px;
            text-align: left;
            font-size: 16px;
            padding: 0 10px;
            box-sizing: border-box;
            background-color: rgba(0,0,0,0.2);
            span{
                display: inline-block;
                height: 100%;
                line-height: 32px;
                padding: 0 5px;
                margin-right: 10px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                opacity: 0.8;
                overflow: hidden;
            }
            span:before{
                content: '';
                display: block;
                width:100%;
                height: 2px;
                background-color: #f5f5f5;
                position: absolute;
                left:0;
                bottom:0;
                /*transition: transform 0.2s;*/
                transform: scale(0);
            }
            span:hover, span.active{
                opacity: 1;
            }
            span.active:before{
                transform: scale(1);
            }
        }
        .vchat-item-container{
            width:100%;
            height: calc(100% - 32px);
            display: flex;
            justify-content: flex-start;
            .container-chat{
                width:100%;
                height: 100%;
                min-width: 423.936px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255,255,255,0.3);
                .chat-room {
                    width: 100%;
                    height: 65%;
                    min-height: 252.2px;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
                    overflow: hidden;
                }
                .message-content{
                    width: 100%;
                    height: 100%;
                }
                .chat-send{
                    width:100%;
                    height: 35%;
                    min-height: 135.8px;
                    box-sizing: border-box;
                    .tool{
                        width:100%;
                        height: 28px;
                        line-height: 28px;
                        text-align: left;
                        background-color: rgba(0,0,0,0.3);
                        padding: 0 10px;
                        box-sizing: border-box;
                        .tool-item{
                            display: inline-block;
                            height: 100%;
                            position: relative;
                            i{
                                padding: 0 5px;
                            }
                            .emoji-container{
                                width:400px;
                                height: 260px;
                                position: absolute;
                                bottom: 30px;
                                left:0;
                                z-index: 10;
                                transition: all 0.2s;
                                /*transform: scaleX(0);*/
                                /*opacity: 0;*/
                            }
                            input{
                                position: absolute;
                                left:0;
                                top:0;
                                width:100%;
                                height: 100%;
                                opacity: 0;
                            }
                        }
                        .tool-item:hover{
                            background-color: rgba(255,255,255,0.3);
                        }
                        .tool-item.active{
                            background-color: rgba(255,255,255,0.3);
                        }
                        .tool-item.active .emoji-container{
                            transform: scaleX(1);
                            opacity: 1;
                        }
                        i{
                            margin: 0;
                        }
                    }
                    textarea{
                        width:100%;
                        height: calc(100% - 70px);
                        background-color: transparent;
                        resize: none;
                        outline: none;
                        font-size: 14px;
                        padding: 5px 10px;
                        box-sizing: border-box;
                        border: none;
                    }
                    .enter{
                        width:100%;
                        height: 32px;
                        display: flex;
                        justify-content: flex-end;
                        button{
                            margin-right: 10px;
                        }
                    }
                }
            }
            .container-handel{
                width:28%;
                min-width: 164.864px;
                height: 100%;
                h3{
                    font-weight: normal;
                    font-size: 16px;
                    text-align: left;
                    line-height: 16px;
                    margin-bottom: 5px;
                    i{
                        float: right;
                    }
                }
                .handel-notice{
                    width:100%;
                    height: 40%;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgba(255,255,255,0.3);
                    padding: 8px 10px;
                    overflow-y: auto;
                    font-size: 12px;
                    text-align: left;
                    ul{
                        overflow-y: auto;
                        li{
                            margin-bottom: 2px;
                        }
                        li:hover{
                            padding: 2px;
                            box-sizing: border-box;
                            background-color: rgba(255,255,255,0.5);
                            cursor: default;
                        }
                    }
                }
                .handel-member{
                    width:100%;
                    height: 60%;
                    box-sizing: border-box;
                    padding: 8px 10px;
                    font-size: 12px;
                    ul{
                        overflow-y: auto;
                        height: 100%;
                    }
                    input{
                        box-sizing: border-box;
                        width:100%;
                        border: 1px solid #d5d5d5;
                        padding-left: 5px;
                        outline: none;
                        color: #323232;
                    }
                    li{
                        padding: 5px 0;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        span{
                            min-width: 110px;
                            text-align: left;
                        }
                    }
                    li:last-child{
                        padding-bottom: 20px;
                    }
                    .loadmore{
                        width: 100%;
                        text-align: center;
                        cursor: pointer;
                    }
                    a{
                        width:26px;
                        min-width: 26px;
                        height: 26px;
                        margin-right: 5px;
                    }
                    a.lineOf{
                        -webkit-filter: grayscale(85%); /* Chrome, Safari, Opera */
                        filter: grayscale(85%);
                    }
                }
            }
        }
    }
</style>