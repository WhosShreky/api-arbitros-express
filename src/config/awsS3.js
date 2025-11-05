// Helper to construct public S3 URLs. We use public-read objects in the bucket.
const S3_BASE_URL = process.env.S3_BASE_URL || '';
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || '';

function publicUrlForKey(key) {
  if (S3_BASE_URL) return `${S3_BASE_URL.replace(/\/$/, '')}/${key}`;
  if (S3_BUCKET_NAME) return `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
  return `/images/${key}`; // fallback local
}

module.exports = { publicUrlForKey };
