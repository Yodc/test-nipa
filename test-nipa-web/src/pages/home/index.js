import { useState } from 'react'
import { useAsync } from 'react-use'
import _ from 'lodash'
import Styled from './styled'
import 'antd/dist/antd.css'
import './styled.css'
import { getTicketApi, updateTicketApi, createTicketApi } from '../../services/ticket/'
import { getStatusApi } from '../../services/status'
import {
  Layout,
  Card,
  Typography,
  Input,
  Form,
  Row,
  Col,
  InputNumber,
  Button,
  Space,
  Tooltip,
  Modal,
  Select,
  Table,
  Spin
} from 'antd'
import {
  DeleteOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
  ExportOutlined,
  PlusOutlined,
  SearchOutlined,
  CheckOutlined
} from '@ant-design/icons'
const { Title, Text } = Typography;
const { Option } = Select;
const { Meta } = Card;
const { TextArea } = Input;

export default function PageRoom() {

  const [data, setData] = useState([])
  const [actionId, setActionId] = useState([])
  const [form] = Form.useForm()

  const [filters, setFilters] = useState({})
  const [statusFilter, setStatusFilter] = useState([])

  const [loadingPage, setLoadingPage] = useState(true)
  const [status, setStatus] = useState([])

  const getStatus = async () => {
    setLoadingPage(true)
    let datas = await getStatusApi()
    let status = _.map(datas.items, (item, idx) => {
      return {
        label: item.status_name,
        value: item.status_id
      }
    })
    let statusFilter = [{
      'label': 'All Status',
      'value': ''
    }]

    setStatusFilter(statusFilter.concat(status))
    console.log(statusFilter)
    setStatus(status)
    setLoadingPage(false)
  }

  const _list = async () => {
    setLoadingPage(true)
    let data = await getTicketApi(filters)
    setData(data)
  }

  const confirmDelete = (delId) => {
    Modal.confirm({
      title: "Delete",
      icon: <ExclamationCircleOutlined />,
      content: "คุณต้องการลบข้อมูลนี้ใช่หรือไม่",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: async () => {
        _list()
      }
    });
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status_name',
      key: 'status_name',
      width: 100,
    },
    {
      title: 'Create Date',
      dataIndex: 'created_at',
      key: 'room_detail',
      width: 100,
    },
    {
      title: 'Update Date',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 100,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: '5%',
      render: (text, record) => {
        return (
          <Space size="small">
            <Tooltip title={'Edit'}>
              <Button
                type="link"
                icon={<SettingOutlined />}
                onClick={async () => {
                  setActionId(record.ticket_id)
                  form.setFieldsValue({
                    title: record.title,
                    desc: record.desc,
                    contract_info: record.contract_info,
                  })
                  form.setFieldsValue({
                    status_id: record.status_name
                  })
                  showModal()
                }}
              />
            </Tooltip>
            <Tooltip title={'Delete'}>
              <Button
                type="link"
                disabled
                danger
                icon={<DeleteOutlined />}
                onClick={async () => {
                  confirmDelete(record.ticket_id)
                }}
              />
            </Tooltip>
          </Space>
        )
      },
    }
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  useAsync(async () => {
    await _list()
    await getStatus()
    setLoadingPage(false)
  }, [filters])

  return (
    <Styled className='page page-room'>
      <Spin spinning={loadingPage} tip="Loading...">
        <Select style={{width:'15%'}} placeholder="Filter Status"
          onChange={(value) => {
            setFilters({status_id: value})
          }}
          options={statusFilter}
          defaultValue=""
        />
        <Space style={{ float: 'right', paddingRight: 0, display: 'block ruby' }} wrap>
          <Button
            style={{backgroundColor:'red'}}
            onClick={() => {
              setActionId(null)
              form.resetFields()
              showModal()
            }}
          >Add</Button></Space>
        <Card>
          <Table
            columns={columns}
            dataSource={data?.items}
            pagination={{ position: ['none', 'none'] }}
          />
        </Card>
        <Modal
          title="Add/Update Room"
          className='custom-modal'
          visible={isModalVisible}
          onOk={async () => {
            let value = form.getFieldValue()
            if (actionId) {
              await updateTicketApi(value, actionId)
            } else {
              await createTicketApi(value)
            }
            await _list()
            setLoadingPage(false)
            setIsModalVisible(false)
            form.submit()
          }}
          onCancel={() => setIsModalVisible(false)}
        >
          <Spin spinning={loadingPage} tip="Loading...">
            <Form
              form={form}
              onFinish={async (value) => {
                if (actionId) {
                  await updateTicketApi(value, actionId)
                } else {
                  await createTicketApi(value)
                }
                await _list()
                setLoadingPage(false)
                setIsModalVisible(false)
              }}
            >
              <Form.Item
                label="title"
                name="title"
                labelCol={{ span: 6 }}
                rules={[
                  {
                    required: true,
                    message: 'Title',
                  },
                ]}
              >
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item
                label="desc"
                name="desc"
                labelCol={{ span: 6 }}
                rules={[
                  {
                    required: true,
                    message: 'Description',
                  },
                ]}
              >
                <Input placeholder="Description" />
              </Form.Item>
              <Form.Item
                label="contract_info"
                name="contract_info"
                labelCol={{ span: 6 }}
                rules={[
                  {
                    required: true,
                    message: 'Contract Info',
                  },
                ]}
              >
                <Input placeholder="Contract Info" />
              </Form.Item>
              <div style={{ display: actionId ? '' : 'none' }}>
                <Form.Item
                  label="status_id"
                  name="status_id"
                  labelCol={{ span: 6 }}
                  rules={[
                    {
                      required: true,
                      message: 'Status',
                    },
                  ]}
                >
                  <Select placeholder="Contract Info"
                    onChange={(value) => {
                      form.setFieldsValue({
                        status_id: value
                      })
                    }}
                    options={status}
                  />
                </Form.Item>
              </div>
            </Form>
          </Spin>
        </Modal>
      </Spin>
    </Styled>
  )
}

