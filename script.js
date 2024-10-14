// تحديد العناصر من صفحة الويب باستخدام selectores
let menu = document.querySelector('#menu-bars'); // تحديد عنصر القائمة
let navbar = document.querySelector('.navbar'); // تحديد عنصر شريط التنقل

// عند النقر على عنصر القائمة، قم بتبديل الصنفين 'fa-times' و 'active'
menu.onclick = () => {
    menu.classList.toggle('fa-times'); // تبديل الصنف 'fa-times' لتغيير شكل أيقونة القائمة
    navbar.classList.toggle('active'); // تبديل الصنف 'active' لعرض أو إخفاء شريط التنقل
}

/* Search */

// عندما يتم التمرير على الصفحة (scroll)، قم بإزالة الأصناف 'fa-times' و 'active'
window.onscroll = () => {
    menu.classList.remove('fa-times'); // إزالة الصنف 'fa-times' عند التمرير
    navbar.classList.remove('active'); // إزالة الصنف 'active' عند التمرير
}

// عند النقر على أيقونة البحث، قم بتبديل الصنف 'active' في نموذج البحث
document.querySelector('#search-icon').onclick = () => {
    document.querySelector('#search-form').classList.toggle('active'); // عرض أو إخفاء نموذج البحث
}

// عند النقر على زر الإغلاق في نموذج البحث، قم بإزالة الصنف 'active'
document.querySelector('#close').onclick = () => {
    document.querySelector('#search-form').classList.remove('active'); // إخفاء نموذج البحث
}

document.addEventListener('DOMContentLoaded', () => {
    // تحديد العناصر من الـ DOM
    const searchForm = document.getElementById('search-form');
    const searchBox = document.getElementById('search-box');
    const closeBtn = document.getElementById('close');
    const searchIcon = document.querySelector('label[for="search-box"]');
    const messageElement = document.getElementById('message');
    const boxes = document.querySelectorAll('.box'); // جميع الأقسام التي تحتوي على تفاصيل الوجبات
  
    // دالة لعرض الرسائل في أعلى الفورم
    function showMessage(message, type = 'info') {
      messageElement.textContent = message;
      messageElement.className = `search-message ${type}`;
      messageElement.style.display = 'block';
      setTimeout(() => {
        messageElement.style.display = 'none';
      }, 1500); // عرض الرسالة لمدة ثانية ونصف
    }
  
    // دالة للبحث
    async function performSearch() {
      const query = searchBox.value.trim().toLowerCase();
      // إخفاء النص السابق في صندوق البحث
      searchBox.value = '';
      // التحقق من وجود نص في صندوق البحث
      if (query === '') {
        showMessage('يرجى إدخال نص للبحث.', 'error');
        return;
      }
  
      // تعريف أسماء أقسام الطعام وروابط صفحاتها مباشرة في الكود
      const pages = [
        { name: 'كريسبي', page: './menu-sections/crispy-section.html' },
        { name: 'مشاوي', page: './menu-sections/grills-section.html' },
        { name: 'بطاطا مقلية', page: './menu-sections/potato-section.html' },
        { name: 'مناسبات كبسة', page: './menu-sections/rice-mansaf-section.html' },
        { name: 'همبرغر', page: './menu-sections/hamburger-section.html' },
        { name: 'شاورما', page: './menu-sections/shawarma-section.html' }
      ];
  
      // تعريف قوائم الوجبات
      const crispy = [
        'وجبة كريسبي كاملة',
        'نصف وجبة كريسبي',
        'سندويش كريسبي عادي',
        'سندويش كريسبي دبل',
        'وجبة كريسبي رول',
        'دجاج كريسبي مع الأرز'
      ];
  
      const girlls = [
        'شيش طاووق',
        'فروج مشوي',
        'كباب باللحم',
        'كباب بالدجاج',
        'كبدة',
        'شفق'
      ];
  
      const potat = [
        'وجبة بطاطا فريت',
        'وجبة بطاطا عائلية',
        'سندويش بطاطا عادي',
        'سندويش بطاطا دبل',
        'كرات بطاطا مقلية محشوة بجبن الموزريلا',
        'فرايز سبيشال'
      ];
  
      const mansaf = [
        'مندي',
        'كبسة لحم',
        'كبسة دجاج',
        'منسف فريكة والأرز باللحم',
        'رز برياني'
      ];
  
      const burger = [
        'برغر دجاج عادي',
        'برغر دجاج دبل',
        'برغر لحم عادي',
        'برغر لحم دبل',
        'وجبة سنتفيه',
        'برغر كريسبي'
      ];
  
      const shawarma = [
        'شاورما فرط كيلو',
        'شاورما نصف كيلو',
        'شاورما عربية',
        'سندويتش شاورما عادية',
        'سندويتش شاورما دبل',
        'شاورما إيطالي'
      ];
  
      // البحث عن الوجبة في القوائم
      const foundDishcrispy = crispy.find(dish => dish.toLowerCase() === query);
      const foundDishgirlls = girlls.find(dish => dish.toLowerCase() === query);
      const foundDishpotato = potat.find(dish => dish.toLowerCase() === query);
      const foundDishmansaf = mansaf.find(dish => dish.toLowerCase() === query);
      const foundDishburger = burger.find(dish => dish.toLowerCase() === query);
      const foundDishshawarma = shawarma.find(dish => dish.toLowerCase() === query);
  
      // التحقق من وجود النص في عناصر المنيو
      let foundInMenu = false;
      boxes.forEach(box => {
        const boxName = box.getAttribute('data-name')?.toLowerCase() || '';
        if (boxName.includes(query)) {
          foundInMenu = true;
          box.classList.remove('blurred');
          box.classList.remove('hidden');
          // الانتقال إلى القسم الذي يتطابق مع الاستعلام
          box.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            boxes.forEach(box => {
              box.classList.remove('blurred');
            });
          }, 3000); // إزالة تأثير الضباب بعد 3 ثوان
        } else {
          box.classList.add('blurred');
          box.classList.remove('hidden');
        }
      });
  
      // التوجيه إلى الصفحة المناسبة بناء على النص المدخل في خانة البحث
      if (foundDishcrispy) {
        window.location.href = `./menu-sections/crispy-section.html?query=${encodeURIComponent(query)}`;
      } else if (foundDishgirlls) {
        window.location.href = `./menu-sections/grills-section.html?query=${encodeURIComponent(query)}`;
      } else if (foundDishpotato) {
        window.location.href = `./menu-sections/potato-section.html?query=${encodeURIComponent(query)}`;
      } else if (foundDishmansaf) {
        window.location.href = `./menu-sections/rice-mansaf-section.html?query=${encodeURIComponent(query)}`;
      } else if (foundDishburger) {
        window.location.href = `./menu-sections/hamburger-section.html?query=${encodeURIComponent(query)}`;
      } else if (foundDishshawarma) {
        window.location.href = `./menu-sections/shawarma-section.html?query=${encodeURIComponent(query)}`;
      } else if (!foundInMenu) {
        
        showMessage('لا توجد نتائج أو ربما أدخلت نصًا غير صحيح', 'error');
        boxes.forEach(box => {
            box.classList.remove('blurred');
            box.classList.remove('hidden');
          });
        }
      }
      
    
  
    // دالة لإغلاق الفورم وتنفيذ البحث
    function closeFormAndSearch() {
      // إغلاق الفورم
      searchForm.classList.add('hidden');
      // تأخير تنفيذ البحث قليلاً للتأكد من أن الفورم قد تم إغلاقه
      setTimeout(() => {
        performSearch();
      }, 100); // تأخير قصير (100 مللي ثانية)
    }
  
    // وظيفة إغلاق فورم البحث
    closeBtn.addEventListener('click', () => {
      searchBox.value = '';
      searchForm.classList.add('hidden');
    });
  
    // وظيفة البحث عند النقر على أيقونة البحث
    searchIcon.addEventListener('click', () => {
      closeFormAndSearch(); // إغلاق النموذج ثم البحث
    });
  
    // وظيفة البحث عند تقديم الفورم
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault(); // منع تقديم الفورم بشكل افتراضي
      closeFormAndSearch(); // إغلاق الفورم ثم البحث
    });
  
    // وظيفة البحث عند الضغط على Enter داخل حقل البحث
    searchBox.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // منع سلوك مفتاح Enter الافتراضي
        closeFormAndSearch(); // إغلاق النموذج ثم البحث
      }
    });
  });

// إعدادات الـ Swiper (مكتبة لإنشاء السلايدر) للعرض التلقائي والتمرير
var swiper = new Swiper(".swiper-container", { // استخدام الكلاس الصحيح
    spaceBetween: 20, // تصحيح المسافة بين الشرائح
    centeredSlides: true, // تفعيل وضع الشرائح المركزية
    autoplay: {
        delay: 3000, // تأخير العرض التلقائي بين الشرائح بالميلي ثانية
        disableOnInteraction: false, // عدم تعطيل التشغيل التلقائي عند التفاعل مع السلايدر
    },
    pagination: {
        el: ".swiper-pagination", // تحديد عنصر التعداد (الدوائر) للسلايدر
        clickable: true, // جعل التعداد قابل للنقر
    },
    loop: true, // تفعيل التكرار اللانهائي للشرائح
});


/* مساحة كتابة الرأي */

// الحصول على العناصر
const submitButton = document.getElementById('submitReview');
const reviewText = document.getElementById('reviewText');

// إضافة مستمع للحدث click على الزر
submitButton.addEventListener('click', function() {
    // مسح محتوى الـ textarea
    reviewText.value = '';
});
