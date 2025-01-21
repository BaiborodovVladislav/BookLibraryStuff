"use client";

import React, { useRef, useState } from "react";
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
import config from "@/lib/config";
import ImageKit from "imagekit";
import Image from "next/image";
import { FilePath } from 'tailwindcss/types/config'
import { toast } from '@/hooks/use-toast'

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.massage}`);
  }
};

const ImageUpload = ({onFileChange}: {onFileChange: (FilePath: string) => void}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const oneError = (error: any) => {
	console.log(error)

	toast({
		title: "Image upload field",
		description: `Your image could not be uploaded. Please try again.`,
		variant: 'destructive'
	    })
  };
  const oneSuccess = (res: any) => {
	setFile(res)
	onFileChange(res.filePath)

	toast({
		title: "Image upload successfully",
		description: `${res.filePath} upload successfully`,
	    })
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={oneError}
        onSuccess={oneSuccess}
        fileName="test-upload.png"
      />

      <button className="upload-btn" onClick={(e) => {e.preventDefault()

if(ikUploadRef.current){
	// @ts-ignore
	ikUploadRef.current?.click()
}

	}}>
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-container"
        />
        <p className="text-base text-light-100">Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
