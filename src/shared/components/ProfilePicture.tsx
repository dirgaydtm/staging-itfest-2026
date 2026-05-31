"use client";

import Image from "next/image";

interface ProfilePictureProps {
    seed?: string | null;
    alt: string;
    size: number;
    className?: string;
}

const ProfilePicture = ({ seed, alt, size, className }: ProfilePictureProps) => {
    return (
        <Image
            width={size}
            height={size}
            className={className}
            alt={alt}
            unoptimized
            src={`https://api.dicebear.com/10.x/bottts-neutral/svg?seed=${seed || "user"}`}
        />
    );
};

export default ProfilePicture;