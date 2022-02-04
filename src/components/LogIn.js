import React from 'react';
import logo from '../data/images/FunwaveLogo-black2.png';
import '../styles/global.scss';

function Login() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-7 p-0">
            <div className="leftSignUp vh-100">
              <p className="px-5 py-3">welcme to</p>
              <p>FUNWAVE</p>
              <button className="btn btn-info">註冊</button>
            </div>
          </div>
          <div className="col-5">
            <img src={logo} alt="funwave" />
            <div>
              <p>LOGIN</p>
              <input type="text" name="email" id="" placeholder="Email" />
              <input type="text" name="password" id="" placeholder="Password" />
              <button>登入</button>
              <input type="checkbox" name="remember" id="" />
              記住我
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
