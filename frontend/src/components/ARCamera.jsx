import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNotification } from '../hooks/useNotification';

const ARCamera = ({ onCapture, title = 'التقاط صورة الجسم' }) => {
  const { success, error: showError } = useNotification();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [facingMode, setFacingMode] = useState('user');
  const [flashEnabled, setFlashEnabled] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  const startCamera = async () => {
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(() => {});
          setIsReady(true);
          success('تم تفعيل الكاميرا بنجاح');
        };
      }
    } catch (err) {
      showError('تعذر الوصول إلى الكاميرا. يرجى السماح بالوصول من المتصفح.');
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;

    context.drawImage(video, 0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onCapture?.(dataUrl);

    setTimeout(() => setIsCapturing(false), 400);
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  const toggleFlash = async () => {
    try {
      if (!streamRef.current) return;
      const track = streamRef.current.getVideoTracks()[0];
      if (!track?.applyConstraints) return;

      const nextState = !flashEnabled;
      await track.applyConstraints({
        advanced: [{ torch: nextState }]
      });
      setFlashEnabled(nextState);
    } catch (err) {
      showError('الفلش غير متاح على هذا الجهاز');
    }
  };

  const guideMarkup = useMemo(() => (
    <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
      <rect x="14" y="16" width="72" height="68" rx="8" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.2" strokeDasharray="2.5 2.2" />
      <rect x="24" y="30" width="52" height="44" rx="6" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
      <circle cx="50" cy="44" r="10" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
      <path d="M34 78c4-8 10-12 16-12s12 4 16 12" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.1" />
    </svg>
  ), []);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-black shadow-lg">
      <div className="flex items-center justify-between bg-gray-950 px-4 py-3 text-white">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-gray-300">ضع الجسم بالكامل داخل الإطار ومعه مسافة كافية من الجوانب</p>
        </div>
        <div className="rounded-full bg-white/10 px-3 py-1 text-xs">{isReady ? 'جاهز' : 'جاري التحضير'}</div>
      </div>

      <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        <div className="absolute inset-0 pointer-events-none">
          {guideMarkup}
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/50 p-3 text-sm text-white">
            <div className="font-semibold mb-1">إرشادات التقاط الصورة</div>
            <ul className="list-disc pr-5 text-xs leading-5 text-gray-100">
              <li>قف بشكل مباشر وامد ذراعيك بشكل طبيعي</li>
              <li>تأكد من ظهور الجسم بالكامل داخل الإطار</li>
              <li>استخدم خلفية بسيطة وإضاءة جيدة</li>
            </ul>
          </div>
        </div>

        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
            <div className="text-center">
              <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <p>جاري تهيئة الكاميرا...</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between bg-white px-4 py-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggleFlash}
            className="rounded-full border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            {flashEnabled ? '📸 فلش مفعل' : '📸 فلش'}
          </button>
          <button
            type="button"
            onClick={toggleCamera}
            className="rounded-full border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            🔄 كاميرا
          </button>
        </div>

        <button
          type="button"
          onClick={handleCapture}
          disabled={!isReady || isCapturing}
          className={`rounded-full px-5 py-3 text-sm font-semibold text-white ${isReady && !isCapturing ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          {isCapturing ? 'جاري الالتقاط...' : 'التقاط صورة'}
        </button>
      </div>
    </div>
  );
};

export default React.forwardRef((props, ref) => <ARCamera {...props} ref={ref} />);
