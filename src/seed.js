// Small helper to print seed data with S3 public URLs (requires S3_BASE_URL or S3_BUCKET_NAME env var)
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const seed = require('../seeds/arbitros.json');
const { publicUrlForKey } = require('./config/awsS3');

async function hashIfNeeded(item) {
  // If a passwordHash already exists, keep it. Otherwise hash the plain `password` value.
  let passwordHash = item.passwordHash;
  if (!passwordHash && item.password) {
    passwordHash = await bcrypt.hash(String(item.password), 8);
  }
  return { ...item, imageUrl: publicUrlForKey(item.imageKey), passwordHash };
}

(async function main(){
  const out = await Promise.all(seed.map(s => hashIfNeeded(s)));
  // Write to file
  const outPath = path.join(__dirname, '..', 'seeds', 'arbitros-with-urls.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('Wrote', outPath);
  console.log(JSON.stringify(out, null, 2));
})();
