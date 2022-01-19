import xml2js from 'xml2js';
import fs from 'fs';
import fg from 'fast-glob';

const start = async () => {
    const filepaths = await fg(['xml/*.xml']);

    filepaths.forEach((filepath) => {
        const xmlParser = new xml2js.Parser({ explicitArray: false });
        const updatedFilepath = 'json' + filepath.substring(3, filepath.length - 4) + '.json';

        fs.readFile(filepath, (err: any, data: any) => {
            xmlParser.parseString(data, (err: any, result: any) => {
                fs.writeFile(updatedFilepath, JSON.stringify(result, null, 2), (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.info(filepath + ' successfully converted to ' + updatedFilepath);
                    }
                });
            });
        });
    });
};

start();
