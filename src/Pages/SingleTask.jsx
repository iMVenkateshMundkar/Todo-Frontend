import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card, Row, Space } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getOneTaskById } from '../Redux/App/actions';

const SingleTask = () => {
    const { id } = useParams();
    const { oneTask, isLoading } = useSelector(state => state.app);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // console.log(location.pathname);

    useEffect(() => {
        if (id) {
            dispatch(getOneTaskById(id));
        }
    }, [id]);

    return (
        <>
            {!isLoading &&
                <Row>
                    <ArrowLeftOutlined onClick={() => navigate('/')} style={{ fontSize: "25px", cursor: "pointer", padding: "20px" }} />
                    < Card style={{ width: "50%", margin: " 25px auto" }} title={oneTask.title}>
                        <p>Description : <span>{oneTask.description}</span></p>
                        <p>Start Date : <span>{oneTask.startDate}</span></p>
                        <p>Expiry Date : <span>{oneTask.expiryDate}</span></p>
                    </Card>
                </Row>
            }
        </>
    )
}

export default SingleTask