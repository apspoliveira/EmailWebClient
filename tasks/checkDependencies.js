#!node

const { exec } = require('./helpers/command');
const { external_files, vendor_files } = require('../env/conf.build');

const fileExist = (file) => `[ -e ${file} ]`;

const checkDependencies = function(list, key) {
    const col = list.map((file) => {
	    return exec(`${fileExist(file)}`)
            .then(() => ({ file }))
            .catch((e) => ({ e, file }))
		});
    console.log(col);
    const output = Promise.all(col);
    console.log(output);
    const errors = output.filter(({ e }) => e).map(({ file }) => file);

    if (errors.length) {
        throw new Error(`[${key}] File not found \n ${errors.join('\n')}`)
	    }
    console.log(`[${key}] All dependencies exist`);
}

//(async () => {
    try {
        console.log(`Check installed dependencies we build`);

	checkDependencies(external_files.openpgp, 'openpgp');

	const list = Object.keys(vendor_files);

	for (key of list) {
            checkDependencies(vendor_files[key], key);
        }
	process.exit(0);
    } catch (e) {
        error(e);
	}
//})();
