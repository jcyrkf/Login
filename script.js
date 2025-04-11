// تسجيل الدخول
document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email && password) {
        alert('تم تسجيل الدخول بنجاح!');
        // هنا يمكن ربط البيانات بـ Google Sheets أو أي خدمة أخرى
        fetch('https://your-odoo-instance.com/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AIzaSyAgJdpJMbccfc1jtvReuhc-IeIQhHox1sI'  // إضافة الـ Web API Key هنا
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'dashboard.html';  // أو الصفحة التي ترغب في توجيه المستخدم إليها
            } else {
                alert('بيانات الدخول غير صحيحة');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('حدث خطأ أثناء الاتصال بالخادم. حاول لاحقًا.');
        });
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

    // التحقق من تطابق كلمة المرور
    if (password === confirmPassword) {
        // إرسال البيانات إلى Odoo عبر API
        fetch('https://your-odoo-instance.com/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AIzaSyAgJdpJMbccfc1jtvReuhc-IeIQhHox1sI'  // إضافة الـ Web API Key هنا
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('تم إنشاء الحساب بنجاح!');
                window.location.href = 'login.html';  // توجيه المستخدم إلى صفحة تسجيل الدخول
            } else {
                alert('حدث خطأ أثناء إنشاء الحساب.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('حدث خطأ أثناء التواصل مع الخادم.');
        });
    } else {
        alert('كلمات المرور غير متطابقة!');
    }
};
