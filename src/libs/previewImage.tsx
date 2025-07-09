"use client";
import { useEffect, useState } from "react";

export function ImagePreview({ imageData }: { imageData: { type: string; data: number[] } }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageData && imageData.data) {
      const byteArray = new Uint8Array(imageData.data);
      const blob = new Blob([byteArray], { type: imageData.type }); // หรือ image/jpeg แล้วแต่ชนิดจริง
      const url = URL.createObjectURL(blob);
      setImageUrl(url);

      return () => URL.revokeObjectURL(url); // ทำความสะอาด memory
    }
  }, [imageData]);

  if (!imageUrl) return <p>Loading image...</p>;

  return <img src={imageUrl} alt="Exam" style={{ maxWidth: "700", height: "700", margin: 10 }} />;
}