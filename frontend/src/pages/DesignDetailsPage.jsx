import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotification } from '../hooks/useNotification';
import html2pdf from 'html2pdf.js';

export default function DesignDetailsPage({ designId }) {
  const { t } = useTranslation();
  const { success, error: showError } = useNotification();
  const printRef = useRef();
  const [design, setDesign] = useState({
    id: 'DES-001',
    name: 'فستان السهرة الملكي',
    description: 'فستان سهرة فاخر بتصميم كلاسيكي حديث',
    clientName: 'أمل محمد',
    clientPhone: '+966501234567',
    clientEmail: 'amal@example.com',
    orderDate: '2026-06-24',
    deliveryDate: '2026-07-15',
    status: 'قيد التصنيع',
    
    // تفاصيل الفستان
    dressType: 'فستان سهرة',
    color: 'أسود',
    length: 'طويل (الأرضية)',
    sleeve: 'بدون أكمام',
    neckline: 'دائري عميق',
    fabric: 'حرير ساتان',
    fabricQuantity: '3.5 متر',
    
    // المقاسات
    measurements: {
      bust: 92,
      waist: 72,
      hip: 98,
      shoulder: 38,
      armhole: 20,
      backLength: 45,
      frontLength: 42,
      sleeveLength: 0,
      neckSize: 35
    },
    
    // التفاصيل الإضافية
    details: [
      'خط وسط مرتفع',
      'كسرات أمامية',
      'فتحة جانبية',
      'تفاصيل من الدانتيل',
      'خيط براق'
    ],
    
    // الألوان والمواد
    colors: {
      main: '#000000',
      accent: '#FFD700',
      embroidery: '#C0C0C0'
    },
    
    materials: [
      { name: 'الساتان', quantity: '3.5', unit: 'متر', cost: 150 },
      { name: 'الدانتيل', quantity: '1.5', unit: 'متر', cost: 80 },
      { name: 'الخيط', quantity: '2', unit: 'بكرة', cost: 20 },
      { name: 'الأزرار', quantity: '8', unit: 'حبة', cost: 40 },
      { name: 'السحاب', quantity: '1', unit: 'قطعة', cost: 15 }
    ],
    
    // التكاليف
    costs: {
      materials: 305,
      labor: 400,
      embroidery: 200,
      tax: 141,
      total: 1046
    },
    
    // الصور
    images: {
      design: 'https://via.placeholder.com/400x500?text=Design+View',
      sketch: 'https://via.placeholder.com/400x500?text=Sketch',
      detail1: 'https://via.placeholder.com/300x300?text=Detail+1',
      detail2: 'https://via.placeholder.com/300x300?text=Detail+2'
    },
    
    // ملاحظات خاصة
    notes: 'يرجى الانتباه إلى الكسرات الأمامية وجودة الحياكة في الجانبين. تأكد من توافق لون الخيط مع النسيج.',
    specialRequests: 'التسليم قبل موعد الحفل بيوم واحد على الأقل'
  });

  const handlePrint = () => {
    window.print();
    success(t('messages.printStarted') || 'Print started');
  };

  const handleDownloadPDF = () => {
    const element = printRef.current;
    const opt = {
      margin: 10,
      filename: `${design.name}-${design.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    html2pdf().set(opt).from(element).save();
    success(t('messages.pdfDownloaded') || 'PDF downloaded successfully');
  };

  const handleShareDetails = async () => {
    try {
      const text = `
${design.name}
المعرّف: ${design.id}

معلومات العميل:
الاسم: ${design.clientName}
الهاتف: ${design.clientPhone}
البريد: ${design.clientEmail}

تفاصيل الفستان:
النوع: ${design.dressType}
الطول: ${design.length}
اللون: ${design.color}
النسيج: ${design.fabric}

المقاسات الرئيسية:
الصدر: ${design.measurements.bust} سم
الخصر: ${design.measurements.waist} سم
الورك: ${design.measurements.hip} سم

التكلفة الإجمالية: ${design.costs.total} ريال
      `;

      if (navigator.share) {
        await navigator.share({
          title: 'تفاصيل التصميم',
          text: text
        });
        success(t('messages.shared') || 'Shared successfully');
      } else {
        // نسخ إلى الحافظة
        navigator.clipboard.writeText(text);
        success(t('messages.copiedToClipboard') || 'Copied to clipboard');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        showError(t('errors.shareError') || 'Error sharing');
      }
    }
  };

  const getTotalCost = () => {
    return design.costs.total;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Actions */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-800">
                {design.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {t('labels.designId') || 'Design ID'}: <span className="font-mono font-semibold">{design.id}</span>
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                {t('buttons.print') || 'Print'}
              </button>
              
              <button
                onClick={handleDownloadPDF}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {t('buttons.downloadPDF') || 'Download PDF'}
              </button>

              <button
                onClick={handleShareDetails}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633z" />
                </svg>
                {t('buttons.share') || 'Share'}
              </button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex gap-2 flex-wrap">
            <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
              {design.status}
            </span>
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              {design.dressType}
            </span>
          </div>
        </div>

        {/* Printable Content */}
        <div ref={printRef} className="bg-white rounded-lg shadow-lg p-8 space-y-8 print:shadow-none print:rounded-none print:p-0">
          
          {/* Section 1: Basic Information */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">①</span>
              {t('labels.basicInfo') || 'Basic Information'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 text-lg">
                  {t('labels.clientInfo') || 'Client Information'}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-semibold text-gray-700">الاسم:</span> {design.clientName}</p>
                  <p><span className="font-semibold text-gray-700">الهاتف:</span> <a href={`tel:${design.clientPhone}`} className="text-blue-600">{design.clientPhone}</a></p>
                  <p><span className="font-semibold text-gray-700">البريد:</span> <a href={`mailto:${design.clientEmail}`} className="text-blue-600">{design.clientEmail}</a></p>
                </div>
              </div>

              {/* Order Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 text-lg">
                  {t('labels.orderInfo') || 'Order Information'}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-semibold text-gray-700">تاريخ الطلب:</span> {design.orderDate}</p>
                  <p><span className="font-semibold text-gray-700">موعد التسليم:</span> {design.deliveryDate}</p>
                  <p><span className="font-semibold text-gray-700">عدد الأيام:</span> {Math.ceil((new Date(design.deliveryDate) - new Date(design.orderDate)) / (1000 * 60 * 60 * 24))} يوم</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Dress Details */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">②</span>
              {t('labels.dressDetails') || 'Dress Details'}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('labels.type') || 'Type'}</p>
                <p className="font-semibold text-lg text-gray-800">{design.dressType}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('labels.color') || 'Color'}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="w-6 h-6 rounded border-2 border-gray-300"
                    style={{ backgroundColor: design.colors.main }}
                  />
                  <p className="font-semibold text-gray-800">{design.color}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('labels.length') || 'Length'}</p>
                <p className="font-semibold text-lg text-gray-800">{design.length}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('labels.sleeve') || 'Sleeve'}</p>
                <p className="font-semibold text-lg text-gray-800">{design.sleeve}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('labels.neckline') || 'Neckline'}</p>
                <p className="font-semibold text-lg text-gray-800">{design.neckline}</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('labels.fabric') || 'Fabric'}</p>
                <p className="font-semibold text-lg text-gray-800">{design.fabric}</p>
              </div>
            </div>

            {/* Special Details */}
            {design.details.length > 0 && (
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">
                  {t('labels.specialDetails') || 'Special Details'}
                </h3>
                <ul className="grid grid-cols-2 gap-2">
                  {design.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <span className="text-primary">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Section 3: Measurements */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">③</span>
              {t('labels.measurements') || 'Measurements (cm)'}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-semibold bg-gray-100">{t('measurements.bust') || 'Bust'}</td>
                    <td className="py-2 px-3">{design.measurements.bust} سم</td>
                    <td className="py-2 px-3 font-semibold bg-gray-100">{t('measurements.waist') || 'Waist'}</td>
                    <td className="py-2 px-3">{design.measurements.waist} سم</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-semibold bg-gray-100">{t('measurements.hip') || 'Hip'}</td>
                    <td className="py-2 px-3">{design.measurements.hip} سم</td>
                    <td className="py-2 px-3 font-semibold bg-gray-100">{t('measurements.shoulder') || 'Shoulder'}</td>
                    <td className="py-2 px-3">{design.measurements.shoulder} سم</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-semibold bg-gray-100">{t('measurements.armhole') || 'Armhole'}</td>
                    <td className="py-2 px-3">{design.measurements.armhole} سم</td>
                    <td className="py-2 px-3 font-semibold bg-gray-100">{t('measurements.neckSize') || 'Neck'}</td>
                    <td className="py-2 px-3">{design.measurements.neckSize} سم</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Materials */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">④</span>
              {t('labels.materials') || 'Materials & Supplies'}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-3 text-right">{t('labels.material') || 'Material'}</th>
                    <th className="py-2 px-3 text-right">{t('labels.quantity') || 'Quantity'}</th>
                    <th className="py-2 px-3 text-right">{t('labels.unit') || 'Unit'}</th>
                    <th className="py-2 px-3 text-right">{t('labels.cost') || 'Cost (SAR)'}</th>
                  </tr>
                </thead>
                <tbody>
                  {design.materials.map((material, idx) => (
                    <tr key={idx} className={`border-b ${idx % 2 === 0 ? 'bg-gray-50' : ''}`}>
                      <td className="py-2 px-3">{material.name}</td>
                      <td className="py-2 px-3">{material.quantity}</td>
                      <td className="py-2 px-3">{material.unit}</td>
                      <td className="py-2 px-3 font-semibold">{material.cost} ريال</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 5: Fabric Information */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">⑤</span>
              {t('labels.fabricInfo') || 'Fabric Information'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t('labels.mainFabric') || 'Main Fabric'}</p>
                <p className="font-semibold text-lg text-gray-800 mb-3">{design.fabric}</p>
                <p className="text-sm text-gray-600 mb-1">{t('labels.fabricQuantity') || 'Quantity Needed'}</p>
                <p className="font-semibold text-gray-800">{design.fabricQuantity}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">{t('labels.colorPalette') || 'Color Palette'}</p>
                <div className="flex gap-3">
                  <div className="text-center">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 mb-2"
                      style={{ backgroundColor: design.colors.main }}
                    />
                    <p className="text-xs text-gray-600">Main</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 mb-2"
                      style={{ backgroundColor: design.colors.accent }}
                    />
                    <p className="text-xs text-gray-600">Accent</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 mb-2"
                      style={{ backgroundColor: design.colors.embroidery }}
                    />
                    <p className="text-xs text-gray-600">Embroidery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Cost Breakdown */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">⑥</span>
              {t('labels.costBreakdown') || 'Cost Breakdown'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cost Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">{t('labels.materials') || 'Materials'}:</span>
                  <span className="font-semibold text-gray-800">{design.costs.materials} ريال</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">{t('labels.labor') || 'Labor'}:</span>
                  <span className="font-semibold text-gray-800">{design.costs.labor} ريال</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">{t('labels.embroidery') || 'Embroidery & Details'}:</span>
                  <span className="font-semibold text-gray-800">{design.costs.embroidery} ريال</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">{t('labels.tax') || 'Tax (VAT 15%)'}</span>
                  <span className="font-semibold text-gray-800">{design.costs.tax} ريال</span>
                </div>
              </div>

              {/* Total Cost */}
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-br from-primary to-purple-600 text-white p-8 rounded-lg shadow-lg text-center w-full">
                  <p className="text-sm opacity-90 mb-2">{t('labels.totalCost') || 'Total Cost'}</p>
                  <p className="text-4xl font-bold">{design.costs.total}</p>
                  <p className="text-lg mt-2">ريال سعودي</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Special Notes */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">⑦</span>
              {t('labels.notes') || 'Special Notes & Instructions'}
            </h2>

            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <h3 className="font-semibold text-yellow-900 mb-2">
                  {t('labels.tailorNotes') || 'Tailor Notes'}
                </h3>
                <p className="text-yellow-800 whitespace-pre-wrap">{design.notes}</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">
                  {t('labels.specialRequests') || 'Special Client Requests'}
                </h3>
                <p className="text-blue-800 whitespace-pre-wrap">{design.specialRequests}</p>
              </div>
            </div>
          </div>

          {/* Section 8: Images */}
          <div className="pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">⑧</span>
              {t('labels.designImages') || 'Design Images'}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square">
                <img
                  src={design.images.design}
                  alt="Design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square">
                <img
                  src={design.images.sketch}
                  alt="Sketch"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square">
                <img
                  src={design.images.detail1}
                  alt="Detail 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square">
                <img
                  src={design.images.detail2}
                  alt="Detail 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 text-center text-gray-600 text-sm">
            <p>{t('labels.generatedOn') || 'Generated on'}: {new Date().toLocaleDateString('ar-SA')}</p>
            <p className="mt-2 text-xs">© 2026 Fashion AI Designer - {t('labels.allRightsReserved') || 'All Rights Reserved'}.</p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .print\\:shadow-none {
            box-shadow: none;
          }
          .print\\:rounded-none {
            border-radius: 0;
          }
          .print\\:p-0 {
            padding: 0;
          }
          button {
            display: none;
          }
          .max-w-6xl {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
