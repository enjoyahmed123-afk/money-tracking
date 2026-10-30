export function getErrorMessage(error) {
    const data = error?.response?.data

    if (data?.errors && data?.errors.length > 0) return data.errors[0].message

    if (data?.message) {
        return data.message
    }


    return "Something went wrong. please try agin"
}