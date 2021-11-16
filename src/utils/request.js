import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
    baseURL,
    timeout: 5000
})

instance.interceptors.request.use(function(config) {
    const { profile } = store.state.user
    if (profile.token) {
        config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function(response) {
    return response.data;
}, function(error) {
    if (error.response && error.response.status === 401) {
        store.commit('user/setUser', {})
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
        router.push('/login?redirectUrl=' + fullPath);
    }
    return Promise.reject(error);
});

export default (url, method, submitData) => {
    return instance({
        url,
        method,
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}