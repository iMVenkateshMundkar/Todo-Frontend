import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import 'antd/dist/antd.css'
import FormItem from 'antd/es/form/FormItem';
import { useDispatch } from 'react-redux';
import { userLogIn } from '../Redux/Auth/actions';
import { USER_LOG_IN_SUCCESS } from '../Redux/Auth/actionTypes';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const success = (value) => {
        dispatch(userLogIn(value)).then(r => {
            if (r.type === USER_LOG_IN_SUCCESS) {
                navigate("/");
            }
        })
    }

    const failure = (value) => {
        console.log(value);
    }

    return (
        <Form
            name="basic"
            layout="vertical"
            autoComplete="off"
            onFinish={success}
            onFinishFailed={failure}
            initialValues={{ remember: true }}
            className="form"
        >
            <Form.Item>
                <h2>Log In</h2>
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email is required.' }, { type: 'email', message: 'Invalid email address' }]}
            >
                <Input placeholder='Enter your email' />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password is required.' }]}
            >
                <Input.Password placeholder='Enter your password' />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName='checked' noStyle>
                    <Checkbox>Remember</Checkbox>
                </Form.Item>
                <a className='forgot-pass' href="/login">Forgot password</a>
            </Form.Item>
            <Form.Item>
                <Button block type="primary" htmlType="submit">Log in</Button>
            </Form.Item>
            <Form.Item>
                Or <a href="/signup">sign up</a>
            </Form.Item>
        </Form >
    )
}

export default Login