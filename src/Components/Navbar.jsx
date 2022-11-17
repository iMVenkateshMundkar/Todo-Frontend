import { Button, Col, Dropdown, Menu, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../Redux/Auth/actions';

const Navbar = () => {
    const { userId, loggedInUser } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogOut = () => {

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
            <h2>To Do</h2>
            <h2 style={{ cursor: "pointer" }} onClick={handleLogOut}>{loggedInUser.name}</h2>
        </Row >
    )
}

export default Navbar