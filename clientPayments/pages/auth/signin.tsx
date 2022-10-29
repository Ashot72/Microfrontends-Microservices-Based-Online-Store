import dynamic from 'next/dynamic'

const RemoteSignIn = dynamic(() => import("cart/signin"), { ssr: false })

const remoteSignIn = () => (<RemoteSignIn />)
export default remoteSignIn
