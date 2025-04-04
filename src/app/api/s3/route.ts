import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

const AWS_REGION = process.env.AWS_REGION ?? "";
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME ?? "";

export async function POST(req: NextRequest) {
  try {
    const { filename } = await req.json();

    const extension = filename.split('.').pop()?.toLowerCase();
    let contentType = '';
    
    if (extension === 'mp4') {
      contentType = 'video/mp4';
    } else if (extension === 'webm') {
      contentType = 'video/webm';
    } else if (extension === 'ogg') {
      contentType = 'video/ogg';
    } else {
      contentType = 'application/octet-stream';
    }

    const client = new S3Client({ region: AWS_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: AWS_BUCKET_NAME,
      Key: uuidv4(),
      Conditions: [
        ["content-length-range", 0, 10485760],
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 3600,
    });
    return new Response(JSON.stringify({ url, fields }), {
        status: 200,
      });
  } catch (e) {
    console.log(e);
  }
}
