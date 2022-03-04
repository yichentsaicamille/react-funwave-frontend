import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';

import './Cart.scss';
import CartHeader from '../Components/Cart/CartHeader02.js';
import CartMemberInfo from '../Components/Cart/CartMemberInfo.js';
import CartReceiverInfo from '../Components/Cart/CartReceiverInfo.js';
import CartShipping from '../Components/Cart/CartShipping.js';
import { useAuth } from '../../../context/auth'; // 從useContext拿會員資料
import { API_URL } from '../../../utils/config';

function ProductCart02() {
  // 會員資料傳入useContext
  const { auth, setAuth } = useAuth();
  console.log('auth', auth);

  // 將localStorage的資料(productCartDisplay、payment、delivery、amount)存為狀態orderCart、payment、delivery、amount
  const [orderCart, setOrderCart] = useState([]);
  const [payment, setPayment] = useState('信用卡');
  const [delivery, setDelivery] = useState('宅配到府');
  const [amount, setAmount] = useState(0);

  // 表單元素 (要存進order-list、order_details資料表)
  const [order, setOrder] = useState({
    member_id: 0, // 問題待釐清！
    amount: 0,
    payment: 'a',
    payment_status: '未付款',
    delivery: '',
    receiver: '',
    receiver_phone: '',
    address: '',
    convenient_store: '',
    status: '訂單處理中',
    order_time: '2021-12-13 14:33:56', // 待
    order_details: [],
  });

  // 子貨號、單價要存進order_details資料表
  const [orderDetails, setOrderDetails] = useState([]);

  // 表單元素 (可同步會員資料)
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [memberAddress, setMemberAddress] = useState('');

  // 訂購人資訊勾選同步更新會員資料
  const [memberSync, setMemberSync] = useState(false); // true代表訂購人資訊勾選同步更新會員資料

  // 收件人資訊勾選同訂購人資訊
  const [receiverSync, setReceiverSync] = useState(false); // true代表收件人資訊勾選同訂購人資訊

  // 配送資訊勾選同訂購人地址
  const [addressSync, setAddressSync] = useState(false); // true代表配送資訊勾選同訂購人地址

  const [validated, setValidated] = useState(false);

  // 拿取前一頁Cart01儲存在localStorage的購物車品項、付款方式、運送方式、總金額，將其儲存為狀orderCart、payment、delivery
  useEffect(() => {
    const localStorageOrderCart = JSON.parse(
      localStorage.getItem('productCartDisplay') || '[]'
    );
    let localStoragePayment = JSON.parse(
      localStorage.getItem('payment') || '[]'
    );
    let localStorageDelivery = JSON.parse(
      localStorage.getItem('delivery') || '[]'
    );
    let localStorageAmount = JSON.parse(localStorage.getItem('amount') || 0);
    setOrderCart(localStorageOrderCart);
    setPayment(localStoragePayment);
    setDelivery(localStorageDelivery);
    setAmount(localStorageAmount);
  }, []);
  console.log('amount', amount);

  // 將狀態amount存入表單元素(狀態order)
  useEffect(() => {
    setOrder({
      ...order,
      amount: amount,
    });
  }, [amount]);

  // 將整理好的購物車資料orderCart，物件陣列篩選欄位只剩product_no、count
  useEffect(() => {
    let map = orderCart.map((x) => _.pick(x, 'product_no', 'count'));
    setOrderDetails(map);
  }, [orderCart]);
  console.log('orderDetails', orderDetails);

  useEffect(() => {
    setOrder({
      ...order,
      order_details: orderDetails,
    });
  }, [orderDetails]);

  // 會員資料帶入訂購人資訊 (member_id、memberName、memberEmail、memberPhone、memberAddress，從useContext帶入)
  useEffect(() => {
    // 這裡條件還是無法阻擋重整auth為null而壞掉的情況！
    if (auth !== null) {
      setOrder({
        ...order,
        member_id: auth.member_id,
      });

      setMemberName(auth.member_name);
      setMemberEmail(auth.member_email);
      setMemberPhone(auth.member_phone);
      setMemberAddress(auth.member_address);
    } else {
    }
  }, [auth]);

  // 收件人資訊勾選同訂購人資訊
  useEffect(() => {
    if (receiverSync === true) {
      setOrder({
        ...order,
        receiver: memberName,
        receiver_phone: memberPhone,
      });
    } else {
    }
  }, [receiverSync]);

  // 收件人資訊勾選同訂購人資訊
  useEffect(() => {
    if (addressSync === true) {
      setOrder({
        ...order,
        address: memberAddress,
      });
    } else {
    }
  }, [addressSync]);

  // 將狀態payment、delivery存入表單元素(狀態order)
  useEffect(() => {
    setOrder({
      ...order,
      payment: payment,
      delivery: delivery,
    });
  }, [payment, delivery]);

  console.log('payment02', payment);
  console.log('delivery02', delivery);

  async function handleSubmit(e) {
    // 送出資料前的驗證
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();

    // 送出資料存進資料庫
    try {
      let response = await axios.post(`${API_URL}/cartProducts`, order);
      console.log(response.data);
    } catch (e) {
      console.error('error', e.response.data);
    }
  }

  console.log('memberName', memberName);
  console.log('memberEmail', memberEmail);
  console.log('memberPhone', memberPhone);
  console.log('memberAddress', memberAddress);
  console.log('memberSync', memberSync);
  console.log('receiverSync', receiverSync);
  console.log('addressSync', addressSync);
  console.log('orderCart', orderCart);

  return (
    <>
      {auth === null ? (
        Spinner
      ) : (
        <div className="container">
          {/* 購物車三步驟進度條 */}
          <CartHeader />
          <article>
            <div className="row d-flex justify-content-center">
              <div className="col-8 m-0 p-0 shadow borderRadius">
                <div className="p-4 border-bottom text-center">
                  <h1>
                    訂購資訊{order.member_id}
                    {order.payment}
                    {order.delivery}
                    {order.amount}
                  </h1>
                </div>
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                  method="post"
                >
                  {/* 訂購人資訊 */}
                  <CartMemberInfo
                    order={order}
                    setOrder={setOrder}
                    memberName={memberName}
                    setMemberName={setMemberName}
                    memberEmail={memberEmail}
                    setMemberEmail={setMemberEmail}
                    memberPhone={memberPhone}
                    setMemberPhone={setMemberPhone}
                    memberAddress={memberAddress}
                    setMemberAddress={setMemberAddress}
                    memberSync={memberSync}
                    setMemberSync={setMemberSync}
                  />
                  {/* 收件人資訊 */}
                  <CartReceiverInfo
                    order={order}
                    setOrder={setOrder}
                    receiverSync={receiverSync}
                    setReceiverSync={setReceiverSync}
                  />
                  {/* 配送資訊 */}
                  <CartShipping
                    order={order}
                    setOrder={setOrder}
                    delivery={delivery}
                    setDelivery={setDelivery}
                    addressSync={addressSync}
                    setAddressSync={setAddressSync}
                  />

                  {/* 發票資訊，目前無作用！ */}

                  <div className="px-5 py-4">
                    {/* 同意接受服務條款及隱私權政策 */}
                    <Form.Group className="mb-3">
                      <Form.Check
                        required
                        label="我同意接受服務條款及隱私權政策。"
                        feedback="請勾選同意接受服務條款及隱私權政策。"
                        feedbackType="invalid"
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-evenly mt-4">
                      <button className="btn btn-secondary text-white">
                        上一步
                      </button>
                      <Button type="submit">完成訂購！</Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  );
}

export default ProductCart02;
