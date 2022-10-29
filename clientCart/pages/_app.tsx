import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.css'
import dynamic from 'next/dynamic'
import { useEffect } from "react";

import buildClient from "../api/build-client";

const Header: any = dynamic(() => import('client/header'), { ssr: false })

const AppComponent = ({ Component, pageProps, pathName, module, currentUser }: any) => {

    useEffect(() => {
        // @ts-ignore
        import("bootstrap/dist/js/bootstrap.min.js");
    }, []);

    return (
        <div>
            <Header currentUser={currentUser} pathName={pathName} module={module} />
            <div className="container">
                <Component currentUser={currentUser} {...pageProps} />
            </div>
        </div>
    );
};

AppComponent.getInitialProps = async (appContext: any) => {
    const client = buildClient(appContext.ctx);

    const { data } = await client.get("/api/users/currentuser");

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(
            appContext,
            client,
            data.currentUser,
        );
    }

    return {
        pageProps,
        pathName: appContext.ctx.pathname,
        module: { name: 'cart' },
        ...data,
    };
};

export default AppComponent;
