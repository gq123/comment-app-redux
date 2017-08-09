import React,{ Component,PropTypes } from 'react'
import CommentList from '../components/CommentList'
import { deleteComment,initComments } from '../reducers/comments'
import { connect } from 'react-redux'

class CommentListContainer extends Component{
    static PropTypes={
        comments: PropTypes.array,
        initComments: PropTypes.func,
        onDeleteComment: PropTypes.func
    }
    componentWillMount(){
        this._initComments()
    }
    handleDeleComment(index){
        const { comments } = this.props
        // props 是不能变的，所以这里新建一个删除了特定下标的评论列表
        const newComments = [
        ...comments.slice(0,index),
        ...comments.slice(index + 1)
        ]
        // 保存最新的评论列表到 LocalStorage
        localStorage.setItem('comments', JSON.stringify(newComments))
        this.props.onDeleComment(index)
    }
    _initComments(){
        let comments = localStorage.comments
        comments = comments ? JSON.parse(comments) : []
        if(this.props.initComments){
            this.props.initComments(comments)
        }
    }
    render(){
        return (
            <CommentList 
                commentlist = {this.props.comments} 
                onDeleComment = {this.handleDeleComment.bind(this)} 
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
        initComments:(comments)=>{
            dispatch(initComments(comments))
        },
        onDeleComment:(commentIndex)=>{
            dispatch(deleteComment(commentIndex))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentListContainer)