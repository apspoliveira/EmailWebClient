const bindPrefix = (name) => `src/app/node_modules/${name}`;

module.exports = {
    external_files: {
        openpgp: ['openpgp/dist/openpgp.worker.min.js', 'openpgp/dist/openpgp.min.js'].map(bindPrefix)
    },

    vendor_files: {
        js: [
	     'bcryptjs/dist/bcrypt.js',
	     'asmcrypto.js/asmcrypto.js',
	     'babel-polyfill/dist/polyfill.js',
	     'pmcrypto/build/pmcrypt.js'
	     ].map(bindPrefix),
    }
};