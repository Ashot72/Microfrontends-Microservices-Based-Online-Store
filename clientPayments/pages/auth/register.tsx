import dynamic from 'next/dynamic'

const RemoteRegister = dynamic(() => import("cart/register"), { ssr: false })

const remoteRegister = () => (<RemoteRegister />)
export default remoteRegister

