const fs = require('fs');
const child_process = require('child_process');

const PATH = './package.json';
const MODULE_NAME = '@amalto/platform6-ui';

// Check if file exist
if (fs.existsSync(PATH)) {

    fs.access(PATH, fs.constants.R_OK & fs.constants.W_OK, err => {
        if (err) {
            console.error('Failed to access file: ', err);
        } else {


            // Read file
            fs.readFile(PATH, 'utf8', (err, data) => {
                if (err) {
                    console.error('Failed to read file: ', err);
                } else {

                    try {
                        let jsonPackage = JSON.parse(data);

                        child_process.exec('npm info ' + MODULE_NAME + ' version', (err, stdout, stderr) => {
                            if (err) {
                                console.error('child_process.exec error: ', err);
                            } else {
                                let p6Version = stdout.replace('\n', '');

                                if (jsonPackage && jsonPackage.dependencies && jsonPackage.dependencies[MODULE_NAME]) {
                                    jsonPackage.dependencies[MODULE_NAME] = p6Version;

                                    try {
                                        const stringifiedJsonPackage = JSON.stringify(jsonPackage, null, 4);

                                        // Write back into package.json file
                                        fs.writeFile(PATH, stringifiedJsonPackage, err => {
                                            if (err) {
                                                console.error('Failed to write on file: ', err);
                                            } else {
                                                console.info('Successfully write on file.');
                                            }
                                        })
                                    } catch (err) {
                                        console.error('Failed to stringify json: ', err)
                                    }
                                }
                            }
                        });

                    } catch (err) {
                        console.error('Failed to parse file: ', err);
                    }
                }
            });
        }
    });
}