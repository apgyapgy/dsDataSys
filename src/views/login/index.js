import React,{Component} from 'react';
import './index.scss';
import { Button } from 'antd';
import {connect} from 'react-redux';
import store from '@/store/store';
import {updateUser} from '@/store/actions/userAction';
class Login extends Component{
    componentDidMount(){
        console.log("haha:",this.props)
    }
    login(){
        store.dispatch(updateUser({name:'admin'}));
        this.props.history.push('/')
    }
    render(){
        return(
            <div className="login_wrapper">
                <div className="login_main">
                    <div className="title">登录</div>
                    <div className="login_item">
                        <div className="login_item_content">
                            <span className="login_item_csvg">
                                {/* <svg></svg> */}
                            </span>
                            <div className="login_item_input">
                                <input className="login_item_input_inner" type="text" placeholder="账号"></input>
                            </div>
                        </div>
                    </div>
                    <div className="login_item">
                        <div className="login_item_content">
                            <span className="login_item_csvg">
                                {/* <svg></svg> */}
                            </span>
                            <div className="login_item_input">
                                <input className="login_item_input_inner" type="password" placeholder="密码"></input>
                            </div>
                        </div>
                    </div>
                    <Button onClick={()=>this.login()} className="login_btn" type="primary">登录</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser(user){
            dispatch({type:'UPDATE_USER',user:user})
        }
        
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);