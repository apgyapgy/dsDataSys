import React, {Component} from 'react';
import './index.scss';
import {Button, Input} from 'antd';
import {connect} from 'react-redux';
import {getCode, login} from '@/api/user';
import {setToken} from '@/utils/auth';
import {UserOutlined, LockOutlined, FieldBinaryOutlined, EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import {showMessage, encodeStr, decodeStr, showModal} from '@/utils/public';
// import StoreTable from 'antd/lib/table/Table';
import store from '@/store/store';
// import {updateUser} from '@/store/actions/userAction';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            codeImg: '',
            loginForm: {
                loginId: '',
                password: '',
                pageCode: '',
            },
            showPass: false, //是否显示密码
        }
    }
    UNSAFE_componentWillMount() {
        if(localStorage.loginId) {
            let loginForm = this.state.loginForm;
            loginForm.loginId = decodeStr(localStorage.loginId);
            loginForm.password = window.atob(localStorage.pass);
            this.setState({loginForm});
            this.getCode();
        }
    }
    login() {
        let loginForm = this.state.loginForm;
        if (!loginForm.loginId) {
            showMessage('请输入账号!')
        } else if(!loginForm.password) {
            showMessage('请输入密码!')
        } else if(!loginForm.pageCode) {
            showMessage('请输入验证码!')
        } else {
            login(loginForm).then(res => {
                let data = res.data;
                data.token && setToken(data.token);
                store.dispatch({type: 'UPDATE_USER', userInfo: data});
                store.dispatch({type: 'UPDATE_TOKEN', token: data.token});
                console.log('store:', store.getState());
                localStorage.loginId = loginForm.loginId;
                localStorage.userNo = window.btoa(data.userNo ? data.userNo : '');
                localStorage.pass = window.btoa(loginForm.password);//base64存储密码
                localStorage.userName = encodeStr(data.userName ? data.userName : '');
                this.props.history.push('/');
            }, res => {
                console.log('login fail:', res);
                loginForm.pageCode = '';
                this.setState({loginForm});
                this.getCode();
            });
        }
    }
    getCode() { //获取验证码
        let loginForm = this.state.loginForm;
        if (!loginForm.loginId) {
            showMessage('请输入账号!');
            return;
        }
        getCode({
           loginId: loginForm.loginId 
        }).then(res => {
            this.setState({
                codeImg: 'data:image/jpg;base64,' + res.desc
            });
        });
    }
    handleInputChange(e, name) { //处理输入框输入
        const { value } = e.target;
        let loginForm = this.state.loginForm;
        loginForm[name] = value;
        this.setState({
            loginForm
        });
    }
    handleShowPass() {//是否显示密码
        this.setState({
            showPass: !this.state.showPass
        });
    }
    render() {
        return(
            <div className="login_wrapper">
                <UserOutlined/>
                <div className="login_main">
                    <div className="title">登录</div>
                    <div className="login_item">
                        <div className="login_item_content">
                            <UserOutlined className="login_item_csvg" />
                            <div className="login_item_input">
                                <Input
                                    className="login_item_input_inner"
                                    onChange={(e) => this.handleInputChange(e, 'loginId')}
                                    placeholder="账号"
                                    maxLength={25}
                                    value={this.state.loginForm.loginId}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="login_item">
                        <div className="login_item_content">
                            <LockOutlined className="login_item_csvg" />
                            <div className="login_item_input">
                                <Input
                                    className="login_item_input_inner pass"
                                    type={this.state.showPass ? 'text' : 'password'}
                                    onChange={(e) => this.handleInputChange(e, 'password')}
                                    placeholder="密码"
                                    maxLength={25}
                                    value={this.state.loginForm.password}
                                />
                                {
                                    this.state.showPass 
                                    ? 
                                        <EyeInvisibleOutlined className="pass_eye" onClick={() => this.handleShowPass()} />
                                    :
                                        <EyeOutlined className="pass_eye" onClick={() => this.handleShowPass()}/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="login_item">
                        <div className="login_item_content">
                            <FieldBinaryOutlined className="login_item_csvg" />
                            <div className="login_item_input">
                                <Input
                                    className="login_item_input_inner code"
                                    onChange={(e) => this.handleInputChange(e, 'pageCode')}
                                    placeholder="验证码"
                                    maxLength={25}
                                    value={this.state.loginForm.pageCode}
                                    onPressEnter={() => this.login()}
                                />
                                <img onClick={() => {this.getCode()}} src={this.state.codeImg} alt="" />
                            </div>
                        </div>
                    </div>
                    <Button onClick={()=>{this.getCode()}} className="code_btn" type="primary"
                        ghost="true"
                    >点击获取验证码</Button>
                    <Button onClick={()=>this.login()} className="login_btn" type="primary">登录</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser(user){
            dispatch({type: 'UPDATE_USER', user: user})
        }
        
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

// D2216 D3060 D3022 g7564 D3068 D3090 G7240 K1156 D3026 D3006 D3010 D3032 D3014 