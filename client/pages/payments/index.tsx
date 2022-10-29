import dynamic from 'next/dynamic'
import type { ICurrentUser, IPayments } from "mfe-shared"

/*
    const RemotePayments: any = dynamic(() => import("payments/payments"));

    RemotePayments.getInitialProps = async (context, client, currentUser) => {

        let getInitialProps = (await import('payments/payments'));
        getInitialProps = getInitialProps.default?.getInitialProps;

        if (getInitialProps) {
            return getInitialProps(context, client, currentUser);
        }
        return {};
    };
    export default RemotePayments;
*/

const RemotePayments: any = dynamic(() => import("payments/payments"),
    { ssr: false });

export interface IPaymentsPage {
    payments: IPayments[];
    error: null | { message: string }
}

const PaymentsPage = ({ error, payments }: IPaymentsPage) =>
    <RemotePayments error={error} payments={payments} />

PaymentsPage.getInitialProps = async (
    context: any,
    client: any,
    currentUser: ICurrentUser,
) => {
    if (process.browser) {
        const page = (await import('payments/payments')).default;

        if (page.getInitialProps) {
            return page.getInitialProps(context, client, currentUser);
        }
    }
    else {
        try {
            const { data: payments } = await client.get('/api/payments')
            return { error: null, payments }
        } catch (error) {
            return { error }
        }
    }
}

export default PaymentsPage;
