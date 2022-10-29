# Microservices-Based Online Store with Microfrontends using Module Federation
I implemented Microforntends on our [Microservice-Based Online Store](https://github.com/Ashot72/Microservices-based-Online-Store) using Module Federation and deployed it in the local Kubernetes pods.
Micro-frontend is a design approach where an application is split into multiple frontend applications. As a result, independent developers can work on each application. This approach significantly reduces the development time and process.

Please read first how to deploy [Microservice-Based Online Store](https://github.com/Ashot72/Microservices-based-Online-Store).
Because of runtime integration, and the exposed code compiling to Javascript via Module Federation, the type information from Typescript is lost. For that reason we create a shared library and link to each micro forntend to enable type support. We do it via linking.

```
# Navigate to mfe-shared folder
cd mfe-shared

# Run yarn build command. Once it is successful, you will see dist folder and index.d.ts generated file.
yarn build

# Then run yarn link command. It should register "mfe-shared".
yarn link

# Navigate to client, clientcart and clientpayments folders and run yarn "mfe-shared" command.
cd client
yarn "mfe-shared"

ca clientcart
yarn "mfe-shared"

ca clientpayments
yarn "mfe-shared"

```

Go to Microservices-Based Online Store [Video](https://youtu.be/9Apf_SaA6nY) page

Go to Microservices-Based Online Store [Description](https://ashot72.github.io//Microfrontends-Microservices-Based-Online-Store/index.html) page
