const { Storage } = require('@google-cloud/storage');
const path = require('path');

const pathKey = path.resolve('./storagekey.json');

const storage = new Storage({
  projectId: 'snapcook-dev',
  keyFilename: pathKey,
});

module.exports = storage;
