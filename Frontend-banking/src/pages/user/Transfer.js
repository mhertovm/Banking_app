
import { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Cascader,
} from 'antd';

const Transfer = () => {

    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const [carts, setCarts] = useState();
    const [response, setResponse] = useState()
    
    useEffect(()=>{
        fetch('http://localhost:4000/carts', {
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
        setCarts(data)
    });
    }, [user_id, token])

  function onFinish(values){
    try{
      fetch('http://localhost:4000/transfer', {
      method: 'POST',
      body: JSON.stringify({
        minus_cart_number: values.selectCart[0],
        plus_cart_number: values.plusCartNumber,
        sum : values.sum +i
      }),
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
      "Authorization": token,
      },
      })
      .then((res)=> res.json())
      .then((data)=>{
          setResponse(data.response)
      });
    } catch(err){
      console.log(err)
    }
  }
    
  return (
    <>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600, padding:"50px" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item 
          label="Select Cart"
          name="selectCart"
          rules={[{ required: true, message: 'Please select cart!' }]}
          >
          <Cascader
            style={{ width: "290px" }}
            placeholder="Select Cart"
            options={carts? carts.map((item)=>{
              return {
                key: item.id,
                label: ['Cart Number: ', item.cart_number,", ",'Sum: ',  item.sum, " AMD"],
                value:item.cart_number
              }
            }): false}
          />
        </Form.Item>
        <Form.Item 
          label="Cart Number"
          name="plusCartNumber"
          rules={[{ required: true, message: 'Please input cart number!' }]}
          >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Sum"
          name="sum"
          rules={[{ required: true, message: 'Please input sum!' }]}
          >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Transfer">
          <Button style={{width:"290px"}} htmlType="submit">Transfer</Button>
        </Form.Item>
        <p>{response}</p>
      </Form>
    </>
  );
};
export default Transfer;