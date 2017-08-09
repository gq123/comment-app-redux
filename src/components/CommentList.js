import React,{ Component } from 'react'
import Comment from './Comment'

class CommentList extends Component{
    static defaultProps = {
        commentlist: []
    }
    handleDeleteComment(index){
        this.props.onDeleComment(index)
    }
    render(){
        return (
            <div>
                {this.props.commentlist.map((v,i)=>
                    <Comment 
                    comment={v} 
                    key={i} 
                    index={i} 
                    onDeleteComment={this.handleDeleteComment.bind(this)} />
                    )
                }
            </div>
        )
    }
}
export default CommentList