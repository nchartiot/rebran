import S3 from "aws-sdk/clients/s3";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const s3 = new S3({
    apiVersion: "2006-03-01",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  s3.getSignedUrl(
    "getObject",
    {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.query.file,
      Expires: 60 * 2, // 2 minutes
    },
    (err, url) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ url });
      }
    }
  );
}
