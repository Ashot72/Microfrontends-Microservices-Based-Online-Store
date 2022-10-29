import { useEffect } from "react";
import Router from "next/router";

let useRequest: any = () => ({})

if (process.browser) {
    useRequest = (await import('client/useRequest')).default;
}

export default () => {
    const { doRequest } = useRequest({
        url: "/api/users/signout",
        method: "post",
        body: {},
        onSuccess: () => Router.push("/"),
    });

    useEffect(() => {
        doRequest();
    }, []);

    return <div>Signing you out...</div>;
};