export const listCate = (categories) => ({
    type: "GET_CATEGORIES",
    payload: categories,
    id: categories.id
})

export const newCategory = (category, admin) => ({
    type: "ADD_CATEGORY",
    id: admin.id,
    payload: category
})

export const editionCategory = (category) => ({
    type: "EDIT_CATEGORY",
    payload: category
})

export const deleteCate = (id_cate) => ({
    type: "DELETE_CATEGORY",
    payload: id_cate
})