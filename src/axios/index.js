import axios from "axios"
import { Modal } from 'antd'
import Utils from '../utils/utils'
export default class Axios {
    static requestList(_this,url,params){
        var data={
            params:params
        }
        this.ajax({
            url,
            data
        }).then(data=>{
            if(data){
                _this.setState({
                    selectedRowKeys: [],
                    selectedItem: null,
                    list: data.item_list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }
    static ajax(options) {
        let loading;
        if(options.data&&options.data.isShowLoading!==false){
            if (options.data.isShowLoading) {
                loading = document.getElementById('ajaxLoading');
                loading.style.display = 'block';
            }
        }
        let baseApi = "https://mock.mengxuegu.com/mock/6138ad7125a0294d53655fd1/mockapi"
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then(response => {
                if (options.data&&options.data.isShowLoading!==false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status === 200) {
                    let res = response.data;
                    if (res.code === 0) {
                        resolve(res.result);
                    } else {
                        Modal.info({
                            title: "提示",
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data.msg);
                }
            })
        })
    }
}