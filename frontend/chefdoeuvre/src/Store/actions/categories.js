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