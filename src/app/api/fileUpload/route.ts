import { NextRequest, NextResponse } from "next/server";
import { SignedPostPolicyV4Output } from "@google-cloud/storage";
import { Storage } from "@google-cloud/storage";

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const filename = searchParams.get('file');
    
    if (!filename) {
        return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });
    
    const bucket = storage.bucket(process.env.BUCKET_NAME ?? "");
    const file = bucket.file(filename);
    const options = {
        expires: Date.now() + 20 * 60 * 1000, // 20 minutes
        fields: { "x-goog-meta-source": "nextjs-project-askii" },
    };
    
    try {
        const [response] = await file.generateSignedPostPolicyV4(options);
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 });
    }
}