// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'

Page({
    data: {
        logs: [],
    },
    onLoad() {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map((log: string) => {
                return {
                    date: log,
                    timeStamp: log
                }
            }),
        })
    },
    removeLog() {
        var logs = wx.getStorageSync('logs') || []
        logs = []
        wx.setStorageSync('logs', logs)
        wx.navigateTo({url:'../index/index'})
    }
})
