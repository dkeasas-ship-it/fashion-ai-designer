import React from 'react';

const colorOptions = [
  { name: 'أبيض ثلجي', value: '#F8F2E9', note: 'أبيض نقي' },
  { name: 'بيج لؤلؤي', value: '#E8D8C2', note: 'بيج دافئ' },
  { name: 'ذهبي ملكي', value: '#C8A24A', note: 'ذهبي فاخر' },
  { name: 'فستقي', value: '#A97A4B', note: 'فستقي أنيق' },
  { name: 'بني كاراميل', value: '#8A5A3B', note: 'بني مميز' },
  { name: 'وردي وردي', value: '#F3C7D4', note: 'وردي لطيف' },
  { name: 'وردي ملكي', value: '#C96B8A', note: 'وردي فخم' },
  { name: 'أرجواني', value: '#8E3A72', note: 'أرجواني عميق' },
  { name: 'رمادي فضي', value: '#C9C9C9', note: 'فضي ناعم' },
  { name: 'أزرق ملكي', value: '#1F4E79', note: 'أزرق رسمي' },
  { name: 'أزرق غامق', value: '#1F2A44', note: 'أزرق عميق' },
  { name: 'أخضر زمرد', value: '#1C7A4B', note: 'زمردي فاخر' },
  { name: 'أسود ملكي', value: '#111111', note: 'أسود راقي' },
  { name: 'رمادي داكن', value: '#3A3A3A', note: 'رمادي أنيق' },
  { name: 'أرجواني داكن', value: '#5B1E3D', note: 'أرجواني فاخر' },
  { name: 'أصفر مائل للذهبي', value: '#D7B14C', note: 'ذهبي مشرق' }
];

const fabricChoices = [
  { id: 'silk', name: 'حرير', description: 'مظهر فاخر ومناسب للملابس الملكية', badge: 'فاخر' },
  { id: 'satin', name: 'ساتان', description: 'سطح لامع يوفر أناقة balan', badge: 'أنيق' },
  { id: 'velvet', name: 'مخمل', description: 'للمظهر الرفيع والوفير للحرارة', badge: 'فخم' },
  { id: 'lace', name: 'دانتيل', description: 'للأجزاء الزخرفية والرياضية', badge: 'مميز' },
  { id: 'organza', name: 'أورجانزا', description: 'خفة وشفافية مع لمسة ملكية', badge: 'نسيج' },
  { id: 'crepe', name: 'كريب', description: 'مستوى توازن بين الراحة والهيبة', badge: 'مريح' }
];

export default function DesignCustomizationPanel({ preferences = {}, onChange }) {
  const values = {
    baseColor: '#F8F2E9',
    accentColor: '#C8A24A',
    colorPalette: ['#F8F2E9', '#C8A24A', '#111111'],
    fabricType: 'ساتان',
    clientDescription: '',
    styleDirection: 'أنثوي ملكي',
    complexity: 'متوازن',
    ...preferences
  };

  const setPreference = (key, value) => {
    onChange({ ...values, [key]: value });
  };

  const handleColorSelect = (color) => {
    const nextPalette = [color.value, values.accentColor, '#111111'];
    setPreference('baseColor', color.value);
    setPreference('colorPalette', nextPalette);
  };

  const handleFabricSelect = (fabricName) => {
    setPreference('fabricType', fabricName);
  };

  return (
    <section className="rounded-[2rem] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
            <span className="text-base">👑</span>
            تصميم ملكي مخصص
          </div>
          <h3 className="text-2xl font-bold text-gray-900">تخصيص فستانك بذكاء واحترافية</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            اختر الألوان المناسبة، نوع القماش، ودوّن ملاحظاتك بوضوح حتى يكون التصميم قابلاً للتنفيذ من قبل الخياط دون مبالغة أو خروج عن المألوف.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-white/70 px-4 py-3 text-sm text-gray-700 shadow-sm">
          <div className="font-semibold text-gray-900">الأسلوب المفضل</div>
          <div className="mt-1 text-amber-700">{values.styleDirection}</div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">اختيار الألوان</h4>
              <span className="text-sm text-gray-500">أكثر من 15 لونًا مميزًا</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {colorOptions.map((color) => {
                const selected = values.baseColor === color.value;
                return (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={`rounded-2xl border p-3 text-right shadow-sm transition ${selected ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-200 bg-white hover:border-amber-300'}`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full border border-gray-200" style={{ backgroundColor: color.value }} />
                      <span className="text-sm font-semibold text-gray-800">{color.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">{color.note}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">اختيار نوع القماش</h4>
              <span className="text-sm text-gray-500">اختر ما يناسب المظهر المطلوب</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {fabricChoices.map((fabric) => {
                const selected = values.fabricType === fabric.name;
                return (
                  <button
                    key={fabric.id}
                    type="button"
                    onClick={() => handleFabricSelect(fabric.name)}
                    className={`rounded-2xl border p-4 text-right shadow-sm transition ${selected ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white hover:border-amber-300'}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-gray-900">{fabric.name}</span>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-amber-700 shadow-sm">{fabric.badge}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{fabric.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold text-gray-900">وصف العميل / المستخدم</label>
            <textarea
              rows={6}
              value={values.clientDescription || ''}
              onChange={(e) => setPreference('clientDescription', e.target.value)}
              placeholder="اكتب هنا الرؤية العامة للفستان: الشكل، التفاصيل، نوع الستايل، والحدود التي تريدها حتى تبقى التصميم عمليًا ومناسبًا للتنفيذ..."
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-right text-sm text-gray-700 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>نصيحة: اجعل الوصف واضحًا ومحدّدًا لتسهيل التنفيذ</span>
              <span>{(values.clientDescription || '').length}/1000</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">ملخص التخصيص</h4>
              <div className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">جاهز للتنفيذ</div>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <div className="mb-1 font-semibold text-gray-900">اللون الأساسي</div>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full border" style={{ backgroundColor: values.baseColor }} />
                  <span>{colorOptions.find((color) => color.value === values.baseColor)?.name || 'أبيض ثلجي'}</span>
                </div>
              </div>
              <div>
                <div className="mb-1 font-semibold text-gray-900">اللون المميز</div>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full border" style={{ backgroundColor: values.accentColor }} />
                  <span>{values.accentColor}</span>
                </div>
              </div>
              <div>
                <div className="mb-1 font-semibold text-gray-900">نوع القماش</div>
                <div>{values.fabricType}</div>
              </div>
              <div>
                <div className="mb-1 font-semibold text-gray-900">الأسلوب</div>
                <div>{values.styleDirection}</div>
              </div>
              <div>
                <div className="mb-1 font-semibold text-gray-900">ملاحظات العميل</div>
                <div className="rounded-xl bg-gray-50 p-3 text-xs leading-6 text-gray-600">
                  {values.clientDescription || 'لم يتم إدخال ملاحظات بعد، لكن يمكنك تدوين تفاصيل واضحة لتسهيل التنفيذ.'}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <h4 className="text-lg font-semibold text-emerald-900">تنبيه عملي للخياط</h4>
            <p className="mt-2 text-sm leading-6 text-emerald-800">
              يفضل الحفاظ على التصميم مميزًا دون مبالغة، مع مراعاة تنفيذ التفاصيل بطريقة عملية ومناسبة للملابس الملكية والراحة أثناء الارتداء.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
