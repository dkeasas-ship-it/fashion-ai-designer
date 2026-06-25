import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { arService } from '../services/api';

const getFunctionErrorMessage = (error) => {
  if (error?.error && typeof error.error === 'string') return error.error;
  if (error?.message && typeof error.message === 'string') return error.message;
  return 'حدث خطأ غير متوقع';
};

export default function TryOnDialog({ open, onOpenChange, designImageUrl }) {
  const { user } = useAuth();
  const { success, error: showError } = useNotification();

  const fileInputRef = useRef(null);
  const cameraFallbackRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [bodyImage, setBodyImage] = useState(null);
  const [bodyImageFile, setBodyImageFile] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [facingMode, setFacingMode] = useState('user');

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setVideoReady(false);
  }, []);

  const closeCamera = useCallback(() => {
    stopStream();
    setCameraOpen(false);
  }, [stopStream]);

  useEffect(() => {
    if (!open) {
      stopStream();
      setCameraOpen(false);
    }
    return () => stopStream();
  }, [open, stopStream]);

  const setImageFromFile = (file) => {
    setBodyImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setBodyImage(reader.result);
    reader.readAsDataURL(file);
    setResultImage(null);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      showError('حجم الصورة يجب أن يكون أقل من 10MB');
      return;
    }
    setImageFromFile(file);
  };

  const startStream = useCallback(
    async (mode) => {
      if (!navigator.mediaDevices?.getUserMedia) {
        cameraFallbackRef.current?.click();
        return false;
      }
      try {
        stopStream();
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: mode }, width: { ideal: 1280 }, height: { ideal: 1707 } },
          audio: false,
        });

        streamRef.current = stream;
        setVideoReady(false);
        setFacingMode(mode);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
          setVideoReady(true);
        }

        return true;
      } catch {
        return false;
      }
    },
    [stopStream],
  );

  const handleOpenCamera = async () => {
    const ok = await startStream(facingMode);
    if (ok) {
      setCameraOpen(true);
    } else {
      cameraFallbackRef.current?.click();
    }
  };

  const handleFlipCamera = async () => {
    const next = facingMode === 'user' ? 'environment' : 'user';
    const ok = await startStream(next);
    if (!ok) {
      showError('تعذر تبديل الكاميرا');
    }
  };

  const handleCapture = () => {
    if (!videoReady) {
      showError('الكاميرا لم تصبح جاهزة بعد');
      return;
    }

    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) {
      showError('الفيديو غير جاهز بعد');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      showError('تعذر معالجة الصورة');
      return;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          showError('فشل التقاط الصورة');
          return;
        }

        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        setImageFromFile(file);
        closeCamera();
      },
      'image/jpeg',
      0.92,
    );
  };

  const handleRemove = () => {
    setBodyImage(null);
    setBodyImageFile(null);
    setResultImage(null);
  };

  const handleTryOn = async () => {
    if (!bodyImage) return;

    setLoading(true);
    try {
      const payload = {
        userId: user?.id || null,
        designImageUrl,
        bodyImage,
        bodyImageName: bodyImageFile?.name || null,
      };

      const data = await arService.tryOn(payload);
      const tryOnImageUrl = data?.tryOnImageUrl || data?.resultImage || data?.imageUrl;

      if (!tryOnImageUrl) {
        throw new Error('لم يتم إرجاع صورة النتيجة من الخدمة');
      }

      setResultImage(tryOnImageUrl);
      success('تم إنشاء تجربة القياس بنجاح');
    } catch (err) {
      showError(getFunctionErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    stopStream();
    setCameraOpen(false);
    setBodyImage(null);
    setBodyImageFile(null);
    setResultImage(null);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">تجربة القياس الذكي</h2>
            <p className="text-sm text-gray-500">ارفع صورة الجسم أو استخدم الكاميرا ثم ابدأ المعالجة.</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600"
          >
            إغلاق
          </button>
        </div>

        <div className="grid gap-4 p-4 md:grid-cols-2">
          <section className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
              <input
                ref={cameraFallbackRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileSelect}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
              >
                رفع صورة
              </button>
              <button
                type="button"
                onClick={handleOpenCamera}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
              >
                فتح الكاميرا
              </button>
              {cameraOpen && (
                <button
                  type="button"
                  onClick={handleFlipCamera}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  تبديل الكاميرا
                </button>
              )}
              {(bodyImage || resultImage) && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600"
                >
                  إزالة
                </button>
              )}
            </div>

            {cameraOpen ? (
              <div className="rounded-xl border border-gray-200 bg-black p-2">
                <video ref={videoRef} autoPlay playsInline muted className="aspect-[3/4] w-full rounded-lg object-cover" />
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeCamera}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
                  >
                    إلغاء
                  </button>
                  <button
                    type="button"
                    onClick={handleCapture}
                    className="rounded-lg bg-pink-600 px-3 py-2 text-sm font-semibold text-white"
                  >
                    التقاط
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
                اختر صورة للجسم من المعرض أو افتح الكاميرا.
              </div>
            )}

            <button
              type="button"
              disabled={!bodyImage || loading}
              onClick={handleTryOn}
              className={`w-full rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                !bodyImage || loading ? 'cursor-not-allowed bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {loading ? 'جاري المعالجة...' : 'ابدأ تجربة القياس'}
            </button>
          </section>

          <section className="space-y-3">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-800">صورة الجسم</h3>
              {bodyImage ? (
                <img src={bodyImage} alt="body" className="aspect-[3/4] w-full rounded-xl border object-cover" />
              ) : (
                <div className="aspect-[3/4] w-full rounded-xl border border-dashed border-gray-300 bg-gray-50" />
              )}
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-800">نتيجة التجربة</h3>
              {resultImage ? (
                <img src={resultImage} alt="try-on" className="aspect-[3/4] w-full rounded-xl border object-cover" />
              ) : (
                <div className="aspect-[3/4] w-full rounded-xl border border-dashed border-gray-300 bg-gray-50" />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
