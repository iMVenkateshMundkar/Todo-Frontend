import { Col, Grid, Row } from 'antd'
import React from 'react'

const TasksLayout = () => {
    console.log("TasksLayout");
    return (
        // <Grid>
        <div style={{ padding: "10px 100px" }}>
            <Row justify='space-between' gutter={16} style={{ borderTop: "1px solid red", borderLeft: "1px solid red", height: "50px" }}>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >MON</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >TUE</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >WED</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >THU</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >FRI</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >SAT</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >SUN</Col>
            </Row>
            <Row justify='space-between' gutter={16} style={{ borderTop: "1px solid red", borderLeft: "1px solid red", height: "50px" }}>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >col</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >col</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >col</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >col</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >col</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >col</Col>
                <Col style={{ borderRight: "1px solid red", width: "14.28%" }} >col</Col>
            </Row>
        </div>
        
        // </Grid>
    )
}

export default TasksLayout