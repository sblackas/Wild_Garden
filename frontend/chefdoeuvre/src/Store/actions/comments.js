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