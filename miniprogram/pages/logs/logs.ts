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
        const fs = wx.getFileSystemManager()
        fs.writeFileSync(`${wx.env.USER_DATA_PATH}/hello.txt`, '', 'utf8')
        wx.navigateBack()
    },
    exportLog() {
        wx.shareFileMessage({
            filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
            success() {
                console.log("转发成功");
            },
            fail() {
                console.log("转发失败");
            },
        })
    }
})
