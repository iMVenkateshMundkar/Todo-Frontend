import { Button, Col, Dropdown, Menu, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getUserById, userLogOut } from '../Redux/Auth/actions';

const Navbar = () => {
    const { userId, loggedInUser } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(userLogOut(userId));
    }

    useEffect(() => {
        if (userId) {
            dispatch(getUserById(userId));
        }
    }, [userId])

    return (
        <Row
            style={{ padding: '0px 5%', backgroundColor: "cyan" }}
            justify={"space-between"}
            align={"middle"}
        >
            <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>To Do</h2>
            <h2 style={{ cursor: "pointer" }} onClick={handleLogOut}>{loggedInUser.name}</h2>
        </Row >
    )
}

export default Navbar