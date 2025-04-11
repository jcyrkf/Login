// تسجيل الدخول
document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // التحقق من وجود البيانات
    if (email && password) {
        // التحقق من صحة البريد الإلكتروني باستخدام تعبير نمطي (Regex)
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            alert('البريد الإلكتروني غير صالح.');
            return;
        }

        // استخدام Firebase للتحقق من البيانات
        const databaseURL = 'https://user-login-system-af907-default-rtdb.firebaseio.com/'; // رابط قاعدة بيانات Firebase
        const usersRef = `${databaseURL}/users.json`; // الوصول إلى مجموعة المستخدمين

        // جلب البيانات من Firebase
        fetch(usersRef)
            .then(response => response.json())
            .then(data => {
                let userFound = false;
                for (let key in data) {
                    if (data[key].email === email && data[key].password === password) {
                        userFound = true;
                        break;
                    }
                }

                // إذا البيانات صحيحة، تحويل المستخدم إلى الصفحة المحددة
                if (userFound) {
                    window.location.href = 'https://creativeminds2.odoo.com/home';  // توجيه المستخدم إلى الصفحة
                } else {
                    alert('بيانات الدخول غير صحيحة');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('حدث خطأ أثناء الاتصال بقاعدة البيانات');
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

    // التحقق من صحة البريد الإلكتروني باستخدام تعبير نمطي (Regex)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert('البريد الإلكتروني غير صالح.');
        return;
    }

    // التحقق من تطابق كلمة المرور
    if (password === confirmPassword) {

        // التحقق من قوة كلمة المرور (يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام)
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordPattern.test(password)) {
            alert('كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، ورقم، وأن تكون مكونة من 8 أحرف على الأقل.');
            return;
        }

        // تشفير كلمة المرور باستخدام bcrypt (يمكنك تضمين مكتبة bcrypt.js هنا)
        const hashedPassword = bcrypt.hashSync(password, 10); // استخدام bcrypt لتشفير كلمة المرور قبل إرسالها

        // إرسال البيانات إلى Firebase لإضافة المستخدم
        const databaseURL = 'https://user-login-system-af907-default-rtdb.firebaseio.com/'; // رابط قاعدة بيانات Firebase
        const usersRef = `${databaseURL}/users.json`; // الوصول إلى مجموعة المستخدمين

        // جلب البيانات الحالية للمستخدمين
        fetch(usersRef)
            .then(response => response.json())
            .then(data => {
                let emailExists = false;
                for (let key in data) {
                    if (data[key].email === email) {
                        emailExists = true;
                        break;
                    }
                }

                // إذا كان الإيميل موجود مسبقًا
                if (emailExists) {
                    alert('هذا الحساب موجود بالفعل، الرجاء استخدام إيميل آخر.');
                } else {
                    // إضافة المستخدم الجديد إلى قاعدة البيانات
                    fetch(usersRef, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            password: hashedPassword
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert('تم إنشاء الحساب بنجاح!');
                        window.location.href = 'login.html';  // توجيه المستخدم إلى صفحة تسجيل الدخول بعد الإنشاء
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('حدث خطأ أثناء إنشاء الحساب.');
                    });
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
