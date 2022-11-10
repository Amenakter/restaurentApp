export const fatchUser = () => {
    const userInfo =
        localStorage.getItem("user") !== "undefine"
            ? JSON.parse(localStorage.getItem('user')) :
            localStorage.clear();
    return userInfo;
};

export const fatchCart = () => {
    const cartInfo =
        localStorage.getItem("cartItems") !== "undefined"
            ? JSON.parse(localStorage.getItem("cartItems"))
            : localStorage.clear();

    return cartInfo ? cartInfo : [];
};