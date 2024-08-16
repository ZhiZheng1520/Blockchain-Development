// src/components/ui/avatar.tsx

import * as React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({ className, children, ...props }) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-full bg-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt, className, ...props }) => {
  return (
    <img src={src} alt={alt} className={`object-cover w-full h-full ${className}`} {...props} />
  );
};

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ className, children, ...props }) => {
  return (
    <div className={`flex items-center justify-center text-white bg-gray-500 ${className}`} {...props}>
      {children}
    </div>
  );
};
