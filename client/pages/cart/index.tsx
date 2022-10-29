import dynamic from 'next/dynamic'
import type { ICurrentUser, ICart } from "mfe-shared"

/*
const RemoteCart: any = dynamic(() => import("cart/cart"));

RemoteCart.getInitialProps = async (context, client, currentUser) => {

    let getInitialProps = (await import('cart/cart'));
    getInitialProps = getInitialProps.default?.getInitialProps;

    if (getInitialProps) {
        return getInitialProps(context, client, currentUser);
    }
    return {};
};
export default RemoteCart;
*/


const RemoteCart: any = dynamic(() => import("cart/cart"),
    { ssr: false });

export interface ICartPage {
    cart: ICart;
    error: null | { message: string }
    currentUser: ICurrentUser
}

const CartPage = ({ error, cart, currentUser }: ICartPage) =>
    <RemoteCart error={error} cart={cart} currentUser={currentUser} />

CartPage.getInitialProps = async (
    context: any,
    client: any,
    currentUser: ICurrentUser,
) => {
    if (process.browser) {
        const page = (await import('cart/cart')).default;

        if (page.getInitialProps) {
            return page.getInitialProps(context, client, currentUser);
        }
    }
    else {
        try {
            const { data: cart } = await client.get('/api/cart')
            return { error: null, cart, currentUser }
        } catch (error) {
            return { error }
        }
    }
}

export default CartPage;


