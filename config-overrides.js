const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
    alias({
        '@assets': 'src/assets',
        '@components': 'src/components',
        '@global': 'src/global',
        '@icons': 'src/global/icons.js',
        '@pages': 'src/pages',
        '@hooks': 'src/hooks',
        '@api': 'src/store/api',
        '@slices': 'src/store/slices',
    })(config);

    return config;
};