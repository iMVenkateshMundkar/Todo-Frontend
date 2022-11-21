import { Button, Card, Col, DatePicker, Form, Input, Modal, PageHeader, Row, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteOneTaskById, getAllTasks, updateOneTaskById } from '../Redux/App/actions'
import { useNavigate } from 'react-router-dom'
import { ADD_TASK_SUCCESS, DELETE_TASK_BY_ID_SUCCESS, UPDATE_TASK_BY_ID_SUCCESS } from '../Redux/App/actionTypes'
import moment from "moment";

const Home = () => {
    const [addNewTask, setAddNewTask] = useState(false);
    const [updateTask, setUpdateTask] = useState(false);
    const [taskForUpdate, setTaskForUpdate] = useState({});
    const { allTasks, isLoading } = useSelector(state => state.app);
    const { userId } = useSelector(state => state.auth);
    const buttonRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleOpenModel = (cb, op) => {
        cb(true);
        if (op === "Add") {
            form.resetFields();
        }
    }

    const handleAddNewTask = (value) => {
        setAddNewTask(false);
        let startDate = new Date();
        let expiryDate = value.expiryDate._d;
        value.expiryDate = expiryDate;
        value.startDate = startDate;
        value.userId = userId;
        console.log(value);
        dispatch(addTask(value)).then(r => {
            if (r.type === ADD_TASK_SUCCESS) {
                dispatch(getAllTasks(userId));
            }
        })
        form.resetFields();
    }

    const handleUpdateTask = (value) => {
        setUpdateTask(false);
        value.expiryDate = value.expiryDate._d;
        console.log(value);
        dispatch(updateOneTaskById(taskForUpdate._id, value)).then(r => {
            if (r.type === UPDATE_TASK_BY_ID_SUCCESS) {
                dispatch(getAllTasks(userId));
            }
        })
        form.resetFields();
    }

    const handleDeleteTask = (taskId) => {
        dispatch(deleteOneTaskById(taskId)).then(r => {
            if (r.type === DELETE_TASK_BY_ID_SUCCESS) {
                dispatch(getAllTasks(userId));
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
        dispatch(getAllTasks(userId));
    }, [allTasks?.length])

    console.log(allTasks);

    return (
        <div style={{ padding: "50px 50px" }}>
            <PageHeader
                className='site-page-header'
                title='Todo'
                subTitle='Add new task'
                extra={
                    [<PlusCircleOutlined onClick={() => handleOpenModel(setAddNewTask, "Add")} style={{ fontSize: "35px", cursor: "pointer" }} />]
                }
            />
            <Modal
                title="Add New Task"
                visible={addNewTask}
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
                    form={form}
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
                            initialValue={""}
                            rules={[{ required: true, message: "Taks title is required" }]}>
                            <Input placeholder='Title of the task' />
                        </Form.Item>
                        <Form.Item
                            label="Start Date"
                            name={"startDate"}
                            initialValue={""}
                            rules={[{ required: true, message: "Start date is required" }]}
                        >
                            <DatePicker disabledDate={(current) => {
                                if (form.getFieldValue("expiryDate")) {
                                    form.resetFields(["expiryDate"]);
                                }
                                let customDate = new Date();
                                return current && current < customDate;
                            }} placeholder='Select start date' style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Expiry date"
                            name={"expiryDate"}
                            initialValue={""}
                            value={"12"}
                            rules={[{ required: true, message: "Expiry date is required" }]}
                        >
                            <DatePicker disabledDate={(current) => {
                                let customDate = form.getFieldValue("startDate");
                                return current && current < customDate;
                            }} placeholder='Select expiry date' style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name={"description"}
                            initialValue={""}
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
            {
                !isLoading &&
                <>
                    {/* <Table
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
                                console.log(record);
                                let date = new Date(record.expiryDate);
                                form.setFieldsValue({ description: record.description, title: record.title, expiryDate: moment(date, "YYYY-MM-DD") });
                            }
                        } >Update</Button>)} />
                        <Column title="View" key="view" render={(record) => (<Button onClick={
                            () => {
                                navigate(`/tasks/${record._id}`)
                            }
                        }>View</Button>)} />
                    </Table> */}
                    <Row gutter={[15, 15]}>
                        {allTasks.map(task => {
                            return <Col md={{ span: 9 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                                <Card
                                    title={task.title}
                                    style={{ width: "100%", boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.4)", border: "none" }}
                                    extra={<Button onClick={
                                        () => {
                                            navigate(`/tasks/${task._id}`)
                                        }}>View</Button>}
                                >
                                    <p>Description : <span>{task.description}</span></p>
                                    <p>Start Date : <span>{task.startDate}</span></p>
                                    <p>Expiry Date : <span>{task.expiryDate}</span></p>
                                    <Row justify='space-around'>
                                        <Button onClick={() => {
                                            console.log("Hello");
                                            setTaskForUpdate(task);
                                            setUpdateTask(true);
                                            console.log(task);
                                            let expiryDate = new Date(task.expiryDate);
                                            let startDate = new Date(task.startDate);
                                            form.setFieldsValue({ description: task.description, title: task.title, expiryDate: moment(expiryDate, "YYYY-MM-DD"), startDate: moment(startDate, "YYYY-MM-DD") });
                                        }}>Update</Button>
                                        <Button onClick={() => handleDeleteTask(task._id)}>Delete</Button>
                                    </Row>
                                </Card>
                            </Col>
                        })}
                    </Row>
                    <Modal
                        title="Update Task"
                        visible={updateTask}
                        onOk={handleCloseModal}
                        form={form}
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
                            form={form}
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
                                    label="Start Date"
                                    name={"startDate"}
                                    initialValue={""}
                                    rules={[{ required: true, message: "Start date is required" }]}
                                >
                                    <DatePicker disabledDate={(current) => {
                                        if (form.getFieldValue("expiryDate")) {
                                            form.resetFields(["expiryDate"]);
                                        }
                                        let customDate = new Date();
                                        return current && current < customDate;
                                    }} placeholder='Select start date' style={{ width: "100%" }} />
                                </Form.Item>
                                <Form.Item
                                    label="Expiry date"
                                    name={"expiryDate"}
                                    initialValue={""}
                                    value={"12"}
                                    rules={[{ required: true, message: "Expiry date is required" }]}
                                >
                                    <DatePicker disabledDate={(current) => {
                                        let customDate = form.getFieldValue("startDate");
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
                </>
            }
        </div >
    )
}

export default Home