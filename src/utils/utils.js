import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;
const data = {
    formateDate(time) {
        let date = new Date(time);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    },
    pagination(data, callback) {
        // console.log(data);
        return {
            onChange: (current) => {
                callback(current)
            },

            current: data.page,
            pageSize: data.page_size,
            total: data.total,
            showTotal: () => {
                return `共 ${data.total}条`
            },
            showQuitckJumper: true
        }
    },
    getOptionList(data) {
        if (!data) {
            return []
        }
        let option = [];
        data.map(item => {
            return option.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return option;
    },
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
}
export default data;