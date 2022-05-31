// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
        recodingPosition: false,
        timer: -1
    },
    // 事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs',
        })
    },
    onLoad() {
        // @ts-ignore
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'MC2BZ-AYGLS-ID5OG-6VDXT-CBI5F-KYBOQ'
        });
    },
    getUserProfile() {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
    getUserInfo(e: any) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        console.log(e)
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    startLocation(e: any) {
        if (this.data.timer == -1 && this.data.recodingPosition == false) {
            this.process()
        }
        else {
            clearInterval(this.data.timer)
            this.setData({
                timer: -1,
                recodingPosition: false
            })
        }
    },
    process() {
        // 每 5s 记录位置一次
        var flag = setInterval(() => {
            var logs = wx.getStorageSync('logs')
            wx.getLocation({
                type: 'gcj02',
                success(res) {
                    console.log(res.latitude);
                    console.log(res.longitude);
                    logs.unshift([new Date(Date.now()).toTimeString().slice(0, 8) + " > " + res.latitude.toFixed(4), res.longitude.toFixed(4)])
                    wx.setStorageSync('logs', logs)
                }
            })
        }, 5000)
        this.setData({
            timer: flag,
            recodingPosition: true
        })
    },
    watchLog(e: any) {
        wx.navigateTo({ url: '../logs/logs' })
    }
})
