import { Button, DatePicker, Form, Input, Modal, PageHeader, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteOneTaskById, getAllTasks, updateOneTaskById } from '../Redux/App/actions'
import { useNavigate } from 'react-router-dom'
import { ADD_TASK_SUCCESS, DELETE_TASK_BY_ID_SUCCESS, UPDATE_TASK_BY_ID_SUCCESS } from '../Redux/App/actionTypes'

const Home = () => {
    const [addNewTask, setAddNewTask] = useState(false);
    const [updateTask, setUpdateTask] = useState(false);
    const [taskForUpdate, setTaskForUpdate] = useState({});
    const { allTasks, isLoading } = useSelector(state => state.app);
    const buttonRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenModel = (cb) => {
        cb(true);
    }

    const changeDateType = (s) => {
        s = s.toString();
        s = s.split(" ");
        s = s[0] + " " + s[1] + " " + s[2] + " " + s[3] + " " + s[4];
        return s;
    }

    const handleAddNewTask = (value) => {
        setAddNewTask(false);
        let startDate = new Date();
        let expiryDate = value.expiryDate._d;
        startDate = changeDateType(startDate);
        expiryDate = changeDateType(expiryDate);
        value.expiryDate = expiryDate;
        value.startDate = startDate;
        console.log(value);
        dispatch(addTask(value)).then(r => {
            if (r.type === ADD_TASK_SUCCESS) {
                dispatch(getAllTasks());
            }
        })
    }

    const handleUpdateTask = (value) => {
        setUpdateTask(false);
        value.expiryDate = changeDateType(value.expiryDate._d);
        dispatch(updateOneTaskById(taskForUpdate._id, value)).then(r => {
            if (r.type === UPDATE_TASK_BY_ID_SUCCESS) {
                dispatch(getAllTasks());
            }
        })
    }

    const handleDeleteTask = (taskId) => {
        dispatch(deleteOneTaskById(taskId)).then(r => {
            if (r.type === DELETE_TASK_BY_ID_SUCCESS) {
                dispatch(getAllTasks());
            }
        })
    }

    const handleCloseModal = () => {
        buttonRef.current.click();
    }

    const handleCancel = (cb) => {
        cb(false);
    }

    useEffect(() => {
        if (allTasks?.length === 0)
            dispatch(getAllTasks());
    }, [allTasks?.length])

    if (allTasks[0]) {
        console.log(typeof allTasks[0].startDate);
    }

    return (
        <div style={{ padding: "50px 150px" }}>
            <PageHeader
                className='site-page-header'
                title='Todo'
                subTitle='Add new task'
                extra={
                    [<PlusCircleOutlined onClick={() => handleOpenModel(setAddNewTask)} style={{ fontSize: "35px", cursor: "pointer" }} />]
                }
            />
            <Modal
                title="Update Task"
                open={updateTask}
                onOk={handleCloseModal}
                onCancel={() => handleCancel(setUpdateTask)}
                footer={
                    [
                        <Button key={"submit"} type={"primary"} onClick={handleCloseModal}>Update Task</Button>,
                        <Button key={"cancel"} onClick={() => handleCancel(setUpdateTask)}>Cancel</Button>
                    ]
                }
            >
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 18 }}
                    width="100%"
                    onFinish={handleUpdateTask}
                >
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Form.Item
                            label="Title"
                            name={"title"}
                            rules={[{ required: true, message: "Taks title is required" }]}
                        >
                            <Input placeholder='Title of the task' />
                        </Form.Item>
                        <Form.Item
                            label="Expiry date"
                            name={"expiryDate"}
                            rules={[{ required: true, message: "Expiry date is required" }]}
                        >
                            <DatePicker disabledDate={(current) => {
                                let customDate = new Date();
                                return current && current < customDate;
                            }} placeholder='Select expiry date' style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name={"description"}
                            rules={[{ required: true, message: "Taks description is required" }]}
                        >
                            <TextArea placeholder='Enter task description'></TextArea>
                        </Form.Item>
                        <Form.Item style={{ display: "none" }}>
                            <Button ref={buttonRef} htmlType='submit'></Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Modal>
            <Modal
                title="Add New Task"
                open={addNewTask}
                onOk={handleCloseModal}
                onCancel={() => handleCancel(setAddNewTask)}
                footer={
                    [
                        <Button key={"submit"} type={"primary"} onClick={handleCloseModal} htmlType={"submit"}>Add Task</Button>,
                        <Button key={"cancel"} onClick={() => handleCancel(setAddNewTask)}>Cancel</Button>
                    ]
                }
            >
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 18 }}
                    width="100%"
                    onFinish={handleAddNewTask}
                >
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Form.Item
                            label="Title"
                            name={"title"}
                            rules={[{ required: true, message: "Taks title is required" }]}>
                            <Input placeholder='Title of the task' />
                        </Form.Item>
                        <Form.Item
                            label="Expiry date"
                            name={"expiryDate"}
                            rules={[{ required: true, message: "Expiry date is required" }]}
                        >
                            <DatePicker disabledDate={(current) => {
                                let customDate = new Date();
                                return current && current < customDate;
                            }} placeholder='Select expiry date' style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name={"description"}
                            rules={[{ required: true, message: "Taks description is required" }]}
                        >
                            <TextArea placeholder='Enter task description'></TextArea>
                        </Form.Item>
                        <Form.Item style={{ display: "none" }}>
                            <Button ref={buttonRef} htmlType='submit'></Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Modal>
            {!isLoading &&
                <Table
                    dataSource={allTasks}
                >
                    <Column title="Title" dataIndex="title" key="title" />
                    <Column title="Start Date" dataIndex="startDate" key="startDate" />
                    <Column title="Expiry Date" dataIndex="expiryDate" key="expiryDate" />
                    <Column title="Delete" key="delete" render={(record) => (<Button
                        onClick={() => handleDeleteTask(record._id)}
                    >Delete</Button>)} />
                    <Column title="Update" key="update" render={(record) => (<Button onClick={
                        () => {
                            setTaskForUpdate(record);
                            setUpdateTask(true);
                        }
                    } >Update</Button>)} />
                    <Column title="View" key="view" render={(record) => (<Button onClick={
                        () => {
                            navigate(`/tasks/${record._id}`)
                        }
                    }>View</Button>)} />
                </Table>
            }
        </div >
    )
}

export default Home