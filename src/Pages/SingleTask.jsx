import { Card, Row } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getOneTaskById } from '../Redux/App/actions';

const SingleTask = () => {
    const { id } = useParams();
    const { oneTask, isLoading } = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getOneTaskById(id));
        }
    }, [id]);

    return (
        <>
            {!isLoading &&
                < Card style={{ width: "50%", margin: "50px auto" }} title={oneTask.title}>
                    <p>Description : <span>{oneTask.description}</span></p>
                    <p>Start Date : <span>{oneTask.startDate}</span></p>
                    <p>Expiry Date : <span>{oneTask.expiryDate}</span></p>
                </Card>
            }
        </>
    )
}

export default SingleTask