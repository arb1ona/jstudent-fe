import Axios from 'axios'
import Cookie from 'js-cookie'
import { favs_ADD_ITEM, favs_REMOVE_ITEM } from "../constants/favsConstants";


const addTofavs = (productId, qty) => async (dispatch, getState) => {

    try {
        const { data } = await Axios.get("/api/products/" + productId)
        dispatch({
            type: favs_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });
        const { favs: { favsItems } } = getState(); // 2nd change after the store
        Cookie.set("favsItems", JSON.stringify(favsItems)) // save the favsitems after dispathcing in cookie
    } catch (error) {
    }
}

const removeFromfavs = (productId) => (dispatch, getState) => {
    dispatch({ type: favs_REMOVE_ITEM, payload: productId })

    const { favs: { favsItems } } = getState();
    Cookie.set("favsItems", JSON.stringify(favsItems))
};


// const removeFromfavs = (productId) => {
//     dispatch({ type: favs_REMOVE_ITEM, payload: productId })
// }
export { addTofavs, removeFromfavs }