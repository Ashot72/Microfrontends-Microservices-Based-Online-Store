const NextFederationPlugin = require('@module-federation/nextjs-mf');

const deps = require("./package.json").dependencies;

module.exports = {
    webpack(config, options) {
        config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
        // if (!options.isServer) {
        config.plugins.push(
            new NextFederationPlugin({
                name: 'client',
                filename: 'static/chunks/remoteEntry.js',
                remotes: {
                    cart: `cart@http://cart.onlinestore.com/_next/static/chunks/remoteEntry.js`,
                    payments: `payments@http://payments.onlinestore.com/_next/static/chunks/remoteEntry.js`,
                },
                exposes: {
                    "./header": "./components/header.tsx",
                    "./useRequest": "./hooks/use-request.tsx",
                    "./serverError": "./pages/shared/serverError.tsx"
                },
                shared: {
                    // ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: deps["react-dom"],
                    },
                },
            })
        );
        //    }

        return config;
    },
};
