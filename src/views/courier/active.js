import React,{Component} from 'react';
export default class CourierActive extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        console.log("componentDidMount:",this.props)
    }
    render(){
        return (
            <div className="main_content">active</div>
        )
    }
}