// تسجيل الدخول
document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email && password) {
        alert('تم تسجيل الدخول بنجاح!');
        // هنا يمكن ربط البيانات بـ Google Sheets أو أي خدمة أخرى
    } else {
        alert('الرجاء إدخال جميع البيانات بشكل صحيح.');
    }
};

// إنشاء حساب
document.getElementById('signupForm').onsubmit = function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password === confirmPassword) {
        alert('تم إنشاء الحساب بنجاح!');
        // هنا يمكن ربط البيانات بـ Google Sheets أو أي خدمة أخرى
    } else {
        alert('كلمات المرور غير متطابقة!');
    }
};
