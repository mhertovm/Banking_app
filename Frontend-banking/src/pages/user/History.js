import {useState, useEffect} from 'react';
import {
    FieldTimeOutlined,
  } from '@ant-design/icons';
import { Table } from 'antd';

function History () {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const [transfers, setTransfers]=useState();
    
    useEffect(()=>{
        fetch('http://localhost:4000/transfers', {
        method: 'POST',
        body: JSON.stringify({
            user_id: user_id 
        }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        "Authorization": token,
        },
    })
    .then((res)=> res.json())
    .then((data)=>{
        setTransfers(data)
    });
    }, [user_id, token]) 

    const columns = [
        {
            key: 'cartNumber',
            render: (_, record) => (
                <FieldTimeOutlined />
            ),
        },
        {
            title: 'Cart Minus',
            key: 'cartMinus',
            render: (_, record) => (
                <p style={{color:"red"}}>{record.cartMinus_id}</p>
            ),
            
        },
        {
            title: 'Cart Plus',
            key: 'cartPlus',
            render: (_, record) => (
                <p style={{color:"green"}}>{record.cartPlus_id}</p>
            ),
        },
        {
            title: 'Sum Transfer',
            dataIndex: 'sum_transfer',
            key: 'sumTransfer',
        },
        {
            title: 'Time Transfer',
            dataIndex: 'time_transfer',
            key: 'timeTransfer',
        },
    ];
    return(
        <>
            <Table columns={columns} dataSource={transfers} />
        </>
    )
};

export default History;