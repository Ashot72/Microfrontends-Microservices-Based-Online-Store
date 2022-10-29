import dynamic from 'next/dynamic'

const RemoteSignOut = dynamic(() => import("cart/signout"), { ssr: false })

const remoteSignOut = () => (<RemoteSignOut />)
export default remoteSignOut
