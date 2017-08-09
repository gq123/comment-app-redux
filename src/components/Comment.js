import React,{ Component } from 'react'

class Comment extends Component{
    constructor(){
        super();
        this.state={
            timeString:''
        }
    }
   
    componentWillMount(){
        this._updateTimeString();
        this.timer  = setInterval(()=>{
             this._updateTimeString();
        },5000)
    }
    commentWillUnmount(){
        clearInterval(this.timer)
    }
    handleDeleteComment(){
        this.props.onDeleteComment(this.props.index)
    }
    _updateTimeString(){
        let a = (+Date.now() - this.props.comment.createdTime)/1000
        this.setState({
            timeString:a > 60 ? `${Math.round(a/60)}分钟前` : `${Math.round(Math.max(a,1))}秒前`
        })
    }
    _getProcessedContent(content){
        return content.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;")
                    .replace(/`([\S\s]+?)`/g, "<code>$1</code>")
    }
    render(){
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.userName} </span>：
                </div>
                <p dangerouslySetInnerHTML={{
                    __html: this._getProcessedContent(this.props.comment.content)
                }} />
                <span className='comment-createdtime'>
                    {this.state.timeString}
                </span>
                <span className='comment-delete' onClick={this.handleDeleteComment.bind(this)}>
                删除
                </span>
            </div>
        )
    }
}
export default Comment