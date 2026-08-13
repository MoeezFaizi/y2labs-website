"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";

type AssetImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes?: string;
};

/**
 * `next/image` that removes itself if the file isn't present yet.
 *
 * Several assets in this design are raster renders that have to be exported
 * from Figma by hand (see public/ASSETS.md). Until they land, a plain <img>
 * would show a broken-image glyph in the middle of the hero — this collapses
 * to nothing instead, so layout stays intact and the CSS fallbacks show
 * through. Once the file exists the component behaves like normal next/image.
 */
export function AssetImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority,
  sizes,
}: AssetImageProps) {
  const [missing, setMissing] = useState(false);

  if (missing) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      priority={priority}
      sizes={sizes}
      onError={() => setMissing(true)}
    />
  );
}
