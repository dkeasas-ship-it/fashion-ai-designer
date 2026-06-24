import React, { useEffect, useRef } from 'react';

const DesignOverlay = ({ designImage, videoWidth, videoHeight }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !designImage || !videoWidth || !videoHeight) return;

    const ctx = canvasRef.current.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // حساب الحجم المناسب للتصميم بناءً على عرض الفيديو
      const scaledWidth = videoWidth * 0.6;
      const scaledHeight = (img.height / img.width) * scaledWidth;

      // رسم التصميم في المنتصف
      const x = (videoWidth - scaledWidth) / 2;
      const y = (videoHeight - scaledHeight) / 3;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
    };

    img.src = designImage;
  }, [designImage, videoWidth, videoHeight]);

  return (
    <canvas
      ref={canvasRef}
      width={videoWidth}
      height={videoHeight}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default DesignOverlay;
