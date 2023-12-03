'use client';

import Image from "next/image";

import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb';

import { CldUploadWidget } from "next-cloudinary";

declare global {
    var cloudinary: any
}

const uploadPreset = "d27epugp";

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget onUpload={handleUpload} uploadPreset={uploadPreset}
            options={{
                maxFiles: 1
            }}
        >
            {   
                ({ open }) => {
                    return (
                        <div onClick={ () => open?.() }
                            className=" relative flex flex-col justify-center items-center gap-4 cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 text-neutral-600"
                        >
                            <TbPhotoPlus
                                size={50}
                            />

                            <div className="font-semibold text-lg">
                                Click to upload
                            </div>

                            {value && (
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        fill 
                                        style={{ objectFit: 'cover' }} 
                                        src={value} 
                                        alt="House" 
                                    />
                                </div>
                            )}
                        </div>
                    )
                }
            }
        </CldUploadWidget>
    );
}

export default ImageUpload;
