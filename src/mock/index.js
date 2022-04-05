import Mock from 'mockjs'

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