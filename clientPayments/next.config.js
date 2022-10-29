const NextFederationPlugin = require('@module-federation/nextjs-mf');

const deps = require("./package.json").dependencies;

module.exports = {
    webpack(config, options) {
        config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
        //if (!options.isServer) {
        config.plugins.push(
            new NextFederationPlugin({
                name: 'payments',
                filename: 'static/chunks/remoteEntry.js',
                remotes: {
                    client: `client@http://onlinestore.com/_next/static/chunks/remoteEntry.js`,
                    cart: `cart@http://cart.onlinestore.com/_next/static/chunks/remoteEntry.js`,
                },
                exposes: {
                    "./payments": "./pages/index.tsx"
                },
                shared: {
                    //   ...deps,
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
        //}

        return config;
    },
};
