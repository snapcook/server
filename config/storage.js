const { Storage } = require('@google-cloud/storage');
const path = require('path');

const pathKey = path.resolve('./storagekey.json');
const gcpId = process.env.PROJECTID;

const storage = new Storage({
  projectId: gcpId,
  keyFilename: pathKey,
});

module.exports = storage;
