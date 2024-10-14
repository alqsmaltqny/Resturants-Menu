// محاولة جلب بيانات السلة من localStorage
// إذا لم تكن هناك بيانات مخزنة، يتم استخدام قائمة فارغة كقيمة افتراضية
// لدي 'cart' يحتوي بيانات صالحة للتعامل معها
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// إضافة عنصر إلى السلة
function addToCart(itemName, itemPrice, itemLink) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: itemPrice, link: itemLink, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart)); // حفظ السلة مع رابط الصورة
    showMessage(itemName);
}

// عرض الرسالة
function showMessage() {
    const messageElement = document.getElementById('message');
    messageElement.style.display = 'flex';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000); // الرسالة تظهر لمدة ثلاث ثوان
}

// إغلاق الرسالة
function closeMessage() {
    const messageElement = document.getElementById('message');
    messageElement.style.display = 'none';
}

/*********************************************************************** */
// استرجاع عنصر قائمة الطعام
const menuItems = document.querySelectorAll('.menu__content');

function applyBlurEffect(searchTerm) {
    menuItems.forEach(item => {
        const itemName = item.querySelector('.menu__name').textContent.toLowerCase();
        if (itemName.includes(searchTerm)) {
            item.classList.add('highlight');
            item.classList.remove('blur');
        } else {
            item.classList.add('blur');
            item.classList.remove('highlight');
        }
    });
}

// الحصول على نتيجة البحث
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');

if (searchTerm) {
    applyBlurEffect(searchTerm.toLowerCase());
}



document.addEventListener('DOMContentLoaded', () => {
    // الحصول على معلمات URL من شريط العنوان
    const urlParams = new URLSearchParams(window.location.search);
    // استخراج قيمة استعلام البحث من معلمات URL وتحويلها إلى أحرف صغيرة
    const searchQuery = urlParams.get('query')?.toLowerCase() || '';
  
    // التحقق مما إذا كان هناك نص في استعلام البحث
    if (searchQuery) {
      // تحديد جميع العناصر التي تحتوي على تفاصيل الوجبات
      const boxes = document.querySelectorAll('.menu__content');
      // التكرار على جميع العناصر
      boxes.forEach(box => {
        const name = box.querySelector('.menu__name')?.textContent || '';
  
        if (name.toLowerCase().includes(searchQuery)) {
          // إزالة تأثير الضباب من العنصر الذي يحتوي على النص الذي نبحث عنه
          box.classList.remove('blurred');
        } else {
          // تطبيق تأثير الضباب على العناصر التي لا تحتوي على النص الذي نبحث عنه
          box.classList.add('blurred'); 
        }
      });
  
      // إزالة تأثير الضباب من جميع العناصر بعد مرور 2 ثانيتين
      setTimeout(() => {
        boxes.forEach(box => {
          box.classList.remove('blurred');
        });
      }, 3000); // تأثير الضباب لمدة 3 ثوان
    }
  });
  