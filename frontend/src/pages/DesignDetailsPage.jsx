import React, { useMemo, useRef, useState } from 'react';
import { useNotification } from '../hooks/useNotification';
import DesignCustomizationPanel from '../components/DesignCustomizationPanel';

export default function DesignDetailsPage({ designId }) {
  const { success } = useNotification();
  const printRef = useRef(null);

  const [design] = useState({
    designId: designId || 'DES-001',
    name: 'فستان السهرة الملكي',
    description: 'فستان سهرة فاخر بتصميم كلاسيكي حديث ومناسب للحفلات الرسمية.',
    client: {
      name: 'أمل محمد',
      phone: '+966501234567',
      email: 'amal@example.com',
      address: 'الرياض - السعودية'
    },
    orderInfo: {
      orderDate: '2026-06-24',
      deliveryDate: '2026-07-15',
      status: 'قيد التصنيع',
      paymentStatus: 'مدفوع جزئياً'
    },
    dressDetails: {
      type: 'فستان سهرة',
      color: 'أسود',
      length: 'طويل',
      sleeve: 'بدون أكمام',
      neckline: 'دائري عميق',
      fabric: 'حرير ساتان',
      fabricQuantity: 3.5,
      fabricUnit: 'متر',
      details: ['خط وسط مرتفع', 'كسرات أمامية', 'تفاصيل دانتيل', 'خيط براق']
    },
    measurements: {
      bust: 92,
      waist: 72,
      hip: 98,
      shoulder: 38,
      armhole: 20,
      backLength: 45,
      frontLength: 42,
      sleeveLength: 0,
      neckSize: 35,
      additionalNotes: 'القياس تم على الملابس الداخلية مع إبقاء الشريط مريحاً.'
    },
    sizeGuidance: 'يرجى اختيار المقاس بناءً على القياسات الفعلية للمستخدم وليس على المقاس السابق. إذا كان هناك اختلاف بين القياسات والوزن، يُفضّل اختيار المقاس الأكبر لضمان الراحة والملاءمة.',
    measurementInstructions: 'يجب قياس الصدر والخصر والورك على الملابس الداخلية. لا تشد الأشرطة بشكل زائد حتى لا يحصل خطأ في القياس.',
    colors: {
      main: '#000000',
      accent: '#FFD700',
      embroidery: '#C0C0C0'
    },
    materials: [
      { name: 'الساتان', quantity: 3.5, unit: 'متر', cost: 150 },
      { name: 'الدانتيل', quantity: 1.5, unit: 'متر', cost: 80 },
      { name: 'الخيط', quantity: 2, unit: 'بكرة', cost: 20 },
      { name: 'الأزرار', quantity: 8, unit: 'حبة', cost: 40 },
      { name: 'السحاب', quantity: 1, unit: 'قطعة', cost: 15 }
    ],
    costs: {
      materials: 305,
      labor: 400,
      embroidery: 200,
      tax: 141,
      total: 1046
    },
    notes: {
      tailorNotes: 'يرجى الانتباه إلى جودة الحياكة في الجانبين وتوافق لون الخيط مع النسيج.',
      specialRequests: 'التسليم قبل موعد الحفل بيوم واحد على الأقل.',
      internalNotes: 'مناسب للعميل الذي يفضّل الأقمشة الخفيفة والأنوثة الكلاسيكية.'
    }
  });

  const [customization, setCustomization] = useState({
    baseColor: '#F8F2E9',
    accentColor: '#C8A24A',
    colorPalette: ['#F8F2E9', '#C8A24A', '#111111'],
    fabricType: 'ساتان',
    clientDescription: 'أرغب في فستان ملكي أنيق مع خطوط أنيقة، تفاصيل خفيفة، وملمس فاخر مناسب للمناسبة الرسمية.',
    styleDirection: 'أنثوي ملكي',
    complexity: 'متوازن'
  });

  const totalDays = useMemo(() => {
    const start = new Date(design.orderInfo.orderDate);
    const end = new Date(design.orderInfo.deliveryDate);
    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  }, [design.orderInfo.orderDate, design.orderInfo.deliveryDate]);

  const handlePrint = () => {
    window.print();
    success('تم بدء الطباعة بنجاح');
  };

  const handleDownloadText = () => {
    const content = [
      `Design: ${design.name}`,
      `Design ID: ${design.designId}`,
      `Client: ${design.client.name}`,
      `Email: ${design.client.email}`,
      `Phone: ${design.client.phone}`,
      '',
      'Dress Details',
      `Type: ${design.dressDetails.type}`,
      `Color: ${design.dressDetails.color}`,
      `Length: ${design.dressDetails.length}`,
      `Sleeve: ${design.dressDetails.sleeve}`,
      `Neckline: ${design.dressDetails.neckline}`,
      `Fabric: ${design.dressDetails.fabric}`,
      `Fabric Quantity: ${design.dressDetails.fabricQuantity} ${design.dressDetails.fabricUnit}`,
      '',
      'Customization',
      `Base Color: ${customization.baseColor}`,
      `Accent Color: ${customization.accentColor}`,
      `Fabric: ${customization.fabricType}`,
      `Style: ${customization.styleDirection}`,
      `Client Description: ${customization.clientDescription}`,
      '',
      'Measurements',
      `Bust: ${design.measurements.bust}`,
      `Waist: ${design.measurements.waist}`,
      `Hip: ${design.measurements.hip}`,
      `Shoulder: ${design.measurements.shoulder}`,
      `Armhole: ${design.measurements.armhole}`,
      `Back Length: ${design.measurements.backLength}`,
      `Front Length: ${design.measurements.frontLength}`,
      `Neck Size: ${design.measurements.neckSize}`,
      '',
      'Size Guidance',
      design.sizeGuidance,
      '',
      'Measurement Instructions',
      design.measurementInstructions,
      '',
      'Notes',
      design.notes.tailorNotes,
      design.notes.specialRequests
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${design.designId}-printable.txt`;
    link.click();
    success('تم تنزيل الملف بنجاح');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">تفاصيل الفستان</h1>
            <p className="text-gray-600">صفحة جاهزة للطباعة والخياطة مع جميع المعلومات والقياسات والارشادات</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handlePrint} className="rounded-lg bg-blue-600 px-4 py-2 text-white">طباعة</button>
            <button onClick={handleDownloadText} className="rounded-lg bg-green-600 px-4 py-2 text-white">تنزيل نصي</button>
          </div>
        </div>

        <div className="mb-8">
          <DesignCustomizationPanel preferences={customization} onChange={setCustomization} />
        </div>

        <div ref={printRef} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm print:border-0 print:shadow-none md:p-8">
          <div className="mb-6 border-b pb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{design.name}</h2>
                <p className="mt-2 text-gray-600">{design.description}</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <div className="font-semibold">رقم التصميم</div>
                <div className="font-mono">{design.designId}</div>
              </div>
            </div>
          </div>

          <section className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-base">👑</span>
              <h3 className="font-semibold text-amber-900">تخصيص ملكي للفستان</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-900">الألوان المختارة</p>
                <div className="flex flex-wrap gap-2">
                  {customization.colorPalette.map((color, index) => (
                    <span key={`${color}-${index}`} className="flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1 text-sm text-gray-700">
                      <span className="h-4 w-4 rounded-full border" style={{ backgroundColor: color }} />
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-900">نوع القماش</p>
                <p className="text-sm text-gray-700">{customization.fabricType}</p>
                <p className="mt-2 text-sm font-semibold text-gray-900">الأسلوب</p>
                <p className="text-sm text-gray-700">{customization.styleDirection}</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-amber-200 bg-white/70 p-3 text-sm leading-6 text-gray-700">
              <span className="font-semibold">وصف العميل:</span> {customization.clientDescription}
            </div>
          </section>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <section className="rounded-xl bg-gray-50 p-4">
              <h3 className="mb-3 font-semibold text-gray-900">معلومات العميل</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">الاسم:</span> {design.client.name}</p>
                <p><span className="font-semibold">الهاتف:</span> {design.client.phone}</p>
                <p><span className="font-semibold">البريد:</span> {design.client.email}</p>
                <p><span className="font-semibold">العنوان:</span> {design.client.address}</p>
              </div>
            </section>

            <section className="rounded-xl bg-gray-50 p-4">
              <h3 className="mb-3 font-semibold text-gray-900">معلومات الطلب</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">تاريخ الطلب:</span> {design.orderInfo.orderDate}</p>
                <p><span className="font-semibold">موعد التسليم:</span> {design.orderInfo.deliveryDate}</p>
                <p><span className="font-semibold">المدة المتوقعة:</span> {totalDays} يوم</p>
                <p><span className="font-semibold">الحالة:</span> {design.orderInfo.status}</p>
                <p><span className="font-semibold">حالة الدفع:</span> {design.orderInfo.paymentStatus}</p>
              </div>
            </section>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <section className="rounded-xl bg-pink-50 p-4">
              <h3 className="mb-3 font-semibold text-gray-900">تفاصيل الفستان</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">النوع:</span> {design.dressDetails.type}</p>
                <p><span className="font-semibold">اللون:</span> {design.dressDetails.color}</p>
                <p><span className="font-semibold">الطول:</span> {design.dressDetails.length}</p>
                <p><span className="font-semibold">الأكمام:</span> {design.dressDetails.sleeve}</p>
                <p><span className="font-semibold">الرقبة:</span> {design.dressDetails.neckline}</p>
                <p><span className="font-semibold">النسيج:</span> {design.dressDetails.fabric}</p>
                <p><span className="font-semibold">الكمية:</span> {design.dressDetails.fabricQuantity} {design.dressDetails.fabricUnit}</p>
                <ul className="mt-2 list-disc pr-5">
                  {design.dressDetails.details.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
                </ul>
              </div>
            </section>

            <section className="rounded-xl bg-blue-50 p-4">
              <h3 className="mb-3 font-semibold text-gray-900">القياسات</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-700">
                  <tbody>
                    <tr><td className="py-1 font-semibold">الصدر</td><td>{design.measurements.bust} سم</td></tr>
                    <tr><td className="py-1 font-semibold">الخصر</td><td>{design.measurements.waist} سم</td></tr>
                    <tr><td className="py-1 font-semibold">الورك</td><td>{design.measurements.hip} سم</td></tr>
                    <tr><td className="py-1 font-semibold">الكتف</td><td>{design.measurements.shoulder} سم</td></tr>
                    <tr><td className="py-1 font-semibold">الحفرة</td><td>{design.measurements.armhole} سم</td></tr>
                    <tr><td className="py-1 font-semibold">طول الظهر</td><td>{design.measurements.backLength} سم</td></tr>
                    <tr><td className="py-1 font-semibold">طول الأمام</td><td>{design.measurements.frontLength} سم</td></tr>
                    <tr><td className="py-1 font-semibold">الرقبة</td><td>{design.measurements.neckSize} سم</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-gray-600">{design.measurements.additionalNotes}</p>
            </section>
          </div>

          <section className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <h3 className="mb-2 font-semibold text-red-800">تنبيه مهم لاختيار المقاس</h3>
            <p className="text-sm text-red-700">{design.sizeGuidance}</p>
          </section>

          <section className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-800">إرشادات القياس</h3>
            <p className="text-sm text-blue-700">{design.measurementInstructions}</p>
          </section>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <section className="rounded-xl bg-gray-50 p-4">
              <h3 className="mb-3 font-semibold text-gray-900">الألوان والمواد</h3>
              <div className="mb-3 flex gap-3">
                <div className="h-8 w-8 rounded-full border" style={{ backgroundColor: customization.baseColor }} />
                <div className="h-8 w-8 rounded-full border" style={{ backgroundColor: customization.accentColor }} />
                <div className="h-8 w-8 rounded-full border" style={{ backgroundColor: '#111111' }} />
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {design.materials.map((material, index) => (
                  <li key={`${material.name}-${index}`}>
                    {material.name}: {material.quantity} {material.unit} - {material.cost} ريال
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-xl bg-gray-50 p-4">
              <h3 className="mb-3 font-semibold text-gray-900">التكاليف</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">المواد:</span> {design.costs.materials} ريال</p>
                <p><span className="font-semibold">العمل:</span> {design.costs.labor} ريال</p>
                <p><span className="font-semibold">التفاصيل:</span> {design.costs.embroidery} ريال</p>
                <p><span className="font-semibold">الضريبة:</span> {design.costs.tax} ريال</p>
                <p className="text-lg font-bold text-gray-900">الإجمالي: {design.costs.total} ريال</p>
              </div>
            </section>
          </div>

          <section className="rounded-xl border border-gray-200 p-4">
            <h3 className="mb-2 font-semibold text-gray-900">ملاحظات الخياط</h3>
            <p className="mb-3 text-sm text-gray-700">{design.notes.tailorNotes}</p>
            <h3 className="mb-2 font-semibold text-gray-900">طلبات العميل الخاصة</h3>
            <p className="text-sm text-gray-700">{design.notes.specialRequests}</p>
            <h3 className="mt-3 mb-2 font-semibold text-gray-900">ملاحظات داخلية</h3>
            <p className="text-sm text-gray-700">{design.notes.internalNotes}</p>
          </section>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white; }
          button { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-0 { border: 0 !important; }
        }
      `}</style>
    </div>
  );
}
