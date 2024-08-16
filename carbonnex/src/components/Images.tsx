"use client"
import Image from 'next/image';
import LogoImage from '../../public/CarbonNex.png';
import LandingPageImagePng from '../../public/Cute.png'

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <Image src={LogoImage} alt="CarboNex Logo" />
    </div>
  );
}

export function LandingPageImage({ className }: LogoProps) {
  return (
    <div className={className}>
      <Image src={LandingPageImagePng} alt="Landing Page Image" />
    </div>
  );
}
