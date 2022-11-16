import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogIn, userSignUp } from '../Redux/Auth/actions';
import { USER_SIGN_UP_SUCCESS } from '../Redux/Auth/actionTypes';

const Signup = () => {
    const dispatch = useDispatch();


    const success = (value) => {
        console.log(value);
        dispatch(userSignUp({
            username: value.username,
            name: value.name,
            password: value.password
        })).then(r => {
            if (r.type === USER_SIGN_UP_SUCCESS) {
                dispatch(userLogIn({
                    username: value.username,
                    password: value.password
                }));
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
            className="form"
        >
            <Form.Item>
                <h2>Sign Up</h2>
            </Form.Item>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Name is required.' }]}
            >
                <Input placeholder='Enter your name' />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email is required.' }]}
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
            <Form.Item
                label="Confirm Password"
                name="cPassword"
                rules={[{ required: true, message: 'Password is required.' },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error("The two passwords that you entered do not match!"));
                    }
                })
                ]}
            >
                <Input.Password placeholder='Enter your password' />
            </Form.Item>
            <Form.Item>
                <Button block type="primary" htmlType="submit">Sign up</Button>
            </Form.Item>
            <Form.Item>
                Or <a href="/login">log in</a>
            </Form.Item>
        </Form >
    )
}

export default Signup