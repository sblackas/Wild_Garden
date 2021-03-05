export const newComment = (comment, artist) => ({
    type: "ADD_COMMENT",
    id: artist.id,
    payload: comment
})

export const listComments = (comments) => ({
    type: "GET_ALL_COMMENTS",
    payload: comments
})

export const listCommentsOnArtwork = (comments) => ({
    type: "GET_ARTWORK_COMMENTS",
    payload: comments
})

export const listOfMyComments = (comments) => ({
    type: "GET_MY_COMMENTS",
    payload: comments
})

export const deleteComment = (id_feedback) => ({
    type: "DELETE_COMMENT",
    payload: id_feedback
})

export const editComment = (comment) => ({
    type: "UPDATE_COMMENT",
    payload: comment
})