import { fatchCart, fatchUser } from "../Utls/FatchLocalStorageData"

const userInfo = fatchUser();
const cartInfo = fatchCart();


export const initialState = {
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo
}