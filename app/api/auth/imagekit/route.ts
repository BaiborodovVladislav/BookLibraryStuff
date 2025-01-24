import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from 'next/server'

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

if (!publicKey || !privateKey || !urlEndpoint) {
	throw new Error("ImageKit configuration is missing");
    }

const imagekit = new ImageKit({
 privateKey: privateKey, 
 publicKey: publicKey, 
 urlEndpoint: urlEndpoint, 
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}


