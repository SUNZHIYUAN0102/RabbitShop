import Mock from 'mockjs'
import qs from 'qs'

Mock.setup({
    timeout: '500-1000'
})

Mock.mock(/\/my\/test/, 'get', () => {
    const arr = []
    for (let i = 0; i < 5; i++) {
        arr.push(Mock.mock({
            id: '@id',
            name: '@cname',
            picture: '@image(200x100)'
        }))
    }
    return { msg: '获取数据成功', result: arr }
})


Mock.mock(/\/member\/collect/, 'get', (config) => {
    const queryString = config.url.split('?')[1]
    const queryObject = qs.parse(queryString)
    const items = []
    for (let i = 0; i < +queryObject.pageSize; i++) {
        items.push(Mock.mock({
            id: '@id',
            name: '@ctitle(10,20)',
            description: '@ctitle(4,10)',
            price: '@float(100,200,2,2)',
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
        }))
    }
    return {
        msg: '获取数据成功',
        result: {
            counts: 35,
            pageSize: +queryObject.pageSize,
            page: +queryObject.page,
            items
        }
    }
})