import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'

class CommentInputContainer extends Component{
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func
    }
    constructor(){
        super()
        this.state = {
            userName: ''
        }
    }
    componentWillMount(){
        //初始化用户名
        this._loadUserName();
    }
    _loadUserName(){
        this.setState({
            userName: localStorage.userName
        })
    }
    _saveUserName(userName){
        localStorage.setItem("userName",userName)
    }
    handleSubmitComment(comment){
        console.log(comment)
        // 缓存数据在localStorage中
        let { comments } = this.props;
        localStorage.setItem('comments',JSON.stringify([...comments,comment]))
        if(this.props.onSubmit){
            this.props.onSubmit(comment)
        }
    }
    render(){
        return(
            <CommentInput 
                userName={this.state.userName}
                onUserNameInputBlur={this._saveUserName.bind(this)}
                onSubmit={this.handleSubmitComment.bind(this)}
            />
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        comments: state.comments
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onSubmit: (comment)=>{
            dispatch(addComment(comment))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentInputContainer)