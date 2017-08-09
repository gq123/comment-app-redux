const INIT_COMMENTS = "INIT_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

//reducer
export default function(state, action){
    if(!state){
        state = {
            comments: []
        }
    }
    switch(action.type){
        case INIT_COMMENTS:
            return {
                comments: action.comments
            }
        case ADD_COMMENT:
            return {
                comments: [...state.comments,action.comment]
            }
        case DELETE_COMMENT:
            return {
                comments: [
                    ...state.comments.slice(0,action.commentIndex),
                    ...state.comments.slice(action.commentIndex+1)
                ]
            }
        default: 
            return state 
    }
}

//action creater
// 初始化
export const initComments = (comments)=>{
    return {
        type: INIT_COMMENTS,
        comments
    }
}
// 添加评论
export const addComment = (comment)=>{
    return {
        type: ADD_COMMENT,
        comment
    }
}
// 删除评论
export const deleteComment = (commentIndex)=>{
    return {
        type:DELETE_COMMENT,
        commentIndex
    }
}