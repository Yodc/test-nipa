import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import qs from 'qs'
import { defaultInstance } from '../index'
import { removeEmpty } from '../../utils'
import { responseSuccess, responseError } from '../../utils/response'

export const mapField = (item, index) => {
    const id = item?.user_id
    return {
        index,
        key: uuidv4(),
        ...item,
    }
}

export const getStatusApi = () => {


    const params = removeEmpty({})

    const config = {
        method: 'get',
        url: `/status`,
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
            return err
        })
}