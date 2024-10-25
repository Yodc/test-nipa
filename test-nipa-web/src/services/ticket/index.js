import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import qs from 'qs'
import { defaultInstance } from '../index'
import { removeEmpty } from '../../utils'
import { responseSuccess, responseError } from '../../utils/response'

export const mapField = (item, index) => {
    return {
        index,
        key: uuidv4(),
        'status_name': item.status.status_name,
        ...item,
    }
}

export const getTicketApi = (data) => {

    const params = removeEmpty({
        status_id: data.status_id
    })
    const config = {
        method: 'get',
        url: `/ticket`,
        headers: {
        },
        params
    }
    return defaultInstance
        .request(config)
        .then((res) => {
            return {
                items: _.map(res.data, mapField),
            }
        })
        .catch((err) => {
            if(err?.response?.status == 401){
                localStorage.removeItem('token')
                localStorage.removeItem('auth')
                window.location.href = `${window.location.origin.toString()}${process.env.REACT_APP_BASENAME}`
            }

            return err
        })
}

export const createTicketApi = ({
    title,
    desc,
    contract_info
}) => {

    const data = {
        title: title,
        desc: desc,
        contract_info: contract_info
    }

    const config = {
        method: 'post',
        url: `/ticket`,
        data
    }
    return defaultInstance
        .request(config)
        .then((res) => {
           return res.data
        })
        .catch((err) => {
            return err
        })
}

export const updateTicketApi = ({
    title,
    desc,
    contract_info,
    status_id
},id) => {

    const data = {
        title: title,
        desc: desc,
        contract_info: contract_info,
        status_id: status_id
    }

    const config = {
        method: 'patch',
        url: `/ticket/${id}`,
        data
    }
    return defaultInstance
        .request(config)
        .then((res) => {
           return res
        })
        .catch((err) => {
            return err
        })
}
