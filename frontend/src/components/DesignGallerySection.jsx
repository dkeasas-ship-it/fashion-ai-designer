import React from 'react';

const designCollections = [
  {
    title: 'الأزياء الزفافية',
    subtitle: 'تصاميم فاخرة تجمع بين الرقة والهيبة',
    accent: 'from-rose-500 to-pink-600',
    cards: [
      {
        name: 'فستان الزفاف الملكي',
        description: 'تنورة طويلة مع صدر مزخرف وتفاصيل دانتيل أنيقة.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
        tags: ['حرير', 'دانتيل', 'مناسب للعرائس']
      },
      {
        name: 'فستان الزفاف الهادئ',
        description: 'تصميم بسيط لكنه فاخر مع خط رقبة أنيق.',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
        tags: ['مخمل', 'سادة', 'أنيق']
      }
    ]
  },
  {
    title: 'أزياء السهرة',
    subtitle: 'تناغم بين الأناقة والتميز في كل مناسبة',
    accent: 'from-violet-500 to-fuchsia-600',
    cards: [
      {
        name: 'فستان السهرة الكلاسيكي',
        description: 'تصميم عصري مع خطوط أنيقة ومظهر ملكي.',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
        tags: ['ساتان', 'مؤثر', 'مناسب للحفلات']
      },
      {
        name: 'فستان سهرة لامع',
        description: 'مظهر براق مع تفاصيل خفيفة وتناسب المناسبات الرسمية.',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
        tags: ['تألق', 'نسخة رسمية', 'فخامة']
      }
    ]
  },
  {
    title: 'الأزياء الكاجوال',
    subtitle: 'راحة ومظهر أنيق بأسلوب عصري',
    accent: 'from-emerald-500 to-teal-600',
    cards: [
      {
        name: 'فستان النهار المريح',
        description: 'خامة خفيفة ومريحة مع ألوان هادئة وملفتة.',
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
        tags: ['مريح', 'خفيف', 'نهاري']
      },
      {
        name: 'فستان يومي أنيق',
        description: 'تصميم عملي ومناسب للارتداء اليومي مع لمسة فخمة.',
        image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=80',
        tags: ['عملية', 'متعددة الاستخدام', 'مناسبة']
      }
    ]
  },
  {
    title: 'الأزياء المحتشمة الملكية',
    subtitle: 'فساتين عصرية مميزة بتصاميم محتشمة فاخرة تجمع الأناقة والوقار',
    accent: 'from-amber-500 to-yellow-600',
    cards: [
      {
        name: 'فستان ملكي أميري',
        description: 'فستان محتشم فاخر بأكمام طويلة مزخرفة وتطريز ذهبي ملكي، يمنحك مظهراً أميرياً رفيعاً في المناسبات الكبرى.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
        tags: ['ملكي', 'تطريز ذهبي', 'أكمام طويلة', 'فاخر']
      },
      {
        name: 'فستان الأميرة الشرقي',
        description: 'تصميم عصري يمزج بين الجمال الشرقي والأناقة المحتشمة بقماش حرير ناعم وفتحة رقبة عالية مزدانة بالترتر.',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80',
        tags: ['شرقي', 'حرير', 'ترتر', 'عصري']
      },
      {
        name: 'فستان الروز المحتشم',
        description: 'فستان وردي هادئ بقصة واسعة أنيقة وحزام خصر رفيع، مثالي للمناسبات النهارية والسهرات الراقية.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
        tags: ['وردي', 'قصة واسعة', 'نهاري', 'أنيق']
      },
      {
        name: 'فستان العباءة العصرية',
        description: 'عباءة فستان عصرية بتفاصيل دانتيل فاخرة على الأكمام والحافة السفلية، تجمع بين الحشمة والرقي بأسلوب حديث.',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
        tags: ['دانتيل', 'عصرية', 'محتشمة', 'رقي']
      },
      {
        name: 'فستان الجوهرة الكحلي',
        description: 'فستان كحلي محتشم بأكمام بيضاء ناعمة وحزام متميز يبرز القوام برقة وأناقة لا مثيل لها في السهرات والحفلات.',
        image: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?auto=format&fit=crop&w=900&q=80',
        tags: ['كحلي', 'سهرات', 'حزام', 'مميز']
      },
      {
        name: 'فستان التاج الذهبي',
        description: 'فستان محتشم بلون ذهبي دافئ مع تطريز يدوي فاخر على الصدر والأكمام، يليق بكل امرأة تستحق التميز الحقيقي.',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
        tags: ['ذهبي', 'تطريز يدوي', 'فاخر', 'ملكي']
      }
    ]
  }
];

const DesignGallerySection = () => {
  return (
    <section className="w-full rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-pink-600">
            معرض التصاميم الذكي
          </p>
          <h2 className="text-3xl font-bold text-gray-900">
            تصاميم احترافية تناسب كل مناسبة ومزاج
          </h2>
          <p className="mt-3 text-base text-gray-600">
            اجمع بين الراحة والتصميم المتقن مع مجموعة متنوعة من الأزياء التي تراعي الذوق الشخصي، نوع المناسبة، والراحة خلال التجربة.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 rounded-2xl bg-gray-50 p-3 text-center text-sm text-gray-700">
          <div>
            <div className="text-xl font-bold text-gray-900">56+</div>
            <div>تصميم</div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">7</div>
            <div>مناسبات</div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">100%</div>
            <div>تخصيص</div>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {designCollections.map((collection) => (
          <div key={collection.title}>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{collection.title}</h3>
                <p className="text-sm text-gray-600">{collection.subtitle}</p>
              </div>
              <div className={`rounded-full bg-gradient-to-r ${collection.accent} px-4 py-2 text-sm font-semibold text-white`}>
                أحدث الأساليب
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {collection.cards.map((design) => (
                <article key={design.name} className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm">
                  <img src={design.image} alt={design.name} className="h-56 w-full object-cover" />
                  <div className="p-5">
                    <h4 className="text-xl font-semibold text-gray-900">{design.name}</h4>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{design.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {design.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="mt-5 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600">
                      عرض التفاصيل
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DesignGallerySection;
