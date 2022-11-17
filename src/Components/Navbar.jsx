import { Col, Menu, Row } from 'antd'
import React from 'react'

const Navbar = () => {
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: '64px' }}
            breakpoint="lg"
            collapsedWidth="0"
        >

            <Row key="1" gutter={16}>
                <Col span={3} key="1">
                    <Menu.Item key="1">nav 1</Menu.Item>
                </Col>
                <Col span={3} key="2">
                    <Menu.Item key="2">nav 2</Menu.Item>
                </Col>
                <Col span={3} key="3">
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Col>
                <Col span={3} offset={9} key="4">
                    <Menu.Item key="4">nav 4</Menu.Item>
                </Col>
                <Col span={3} key="5">
                    <Menu.Item key="5">nav 5</Menu.Item>
                </Col>
            </Row>
        </Menu>
    )
}

export default Navbar