const NextFederationPlugin = require('@module-federation/nextjs-mf');

const deps = require("./package.json").dependencies;

module.exports = {
    webpack(config, options) {
        config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
        //if (!options.isServer) {
        config.plugins.push(
            new NextFederationPlugin({
                name: 'cart',
                filename: 'static/chunks/remoteEntry.js',
                remotes: {
                    client: `client@http://onlinestore.com/_next/static/chunks/remoteEntry.js`,
                },
                exposes: {
                    "./register": "./components/register.tsx",
                    "./signin": "./components/signin.tsx",
                    "./signout": "./components/signout.tsx",
                    "./cart": "./pages/index.tsx"
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
        //}

        return config;
    },
};
