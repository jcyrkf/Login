// إعداد Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAgJdpJMbccfc1jtvReuhc-IeIQhHox1sI",  // استبدل بالمفتاح الفعلي
    authDomain: "user-login-system-af907.firebaseapp.com",  // استبدل بالمجال الفعلي
    databaseURL: "https://user-login-system-af907-default-rtdb.firebaseio.com/",
    projectId: "user-login-system-af907",  // استبدل بالمعرف الفعلي
    storageBucket: "user-login-system-af907.appspot.com",  // استبدل بالحاوية الفعلية
    messagingSenderId: "749941405536",  // استبدل بالمعرف الفعلي
    appId: "1:749941405536:web:b5d29dfb0f3ef8ed604ce0",  // استبدل بالمعرف الفعلي
};

// تهيئة Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// تسجيل الدخول
document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // التحقق من وجود البيانات
    if (!email || !password) {
        alert('الرجاء إدخال جميع البيانات بشكل صحيح.');
        return;
    }

    // التحقق من صحة البريد الإلكتروني باستخدام تعبير نمطي (Regex)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert('البريد الإلكتروني غير صالح.');
        return;
    }

    // استخدام Firebase للتحقق من البيانات
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // تسجيل الدخول بنجاح
            window.location.href = 'https://creativeminds2.odoo.com/home';  // توجيه المستخدم إلى الصفحة
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/user-not-found') {
                alert('لا يوجد حساب مرتبط بهذا البريد الإلكتروني.');
            } else if (errorCode === 'auth/wrong-password') {
                alert('كلمة المرور غير صحيحة.');
            } else {
                alert('حدث خطأ: ' + errorMessage);
            }
        });
};

// إنشاء حساب
document.getElementById('signupForm').onsubmit = function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // التحقق من وجود البيانات
    if (!email || !password || !confirmPassword) {
        alert('يرجى ملء جميع الحقول.');
        return;
    }

    // التحقق من صحة البريد الإلكتروني باستخدام تعبير نمطي (Regex)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert('البريد الإلكتروني غير صالح.');
        return;
    }

    // التحقق من تطابق كلمة المرور
    if (password !== confirmPassword) {
        alert('كلمات المرور غير متطابقة!');
        return;
    }

    // التحقق من قوة كلمة المرور (يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، ورقم، وأن تكون مكونة من 8 أحرف على الأقل.');
        return;
    }

    // إنشاء حساب جديد باستخدام Firebase Authentication
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // إضافة بيانات المستخدم إلى Firebase Realtime Database
            const database = firebase.database();
            database.ref('users/' + user.uid).set({
                email: email,
                phone: document.getElementById('phone').value,
            });

            alert('تم إنشاء الحساب بنجاح!');
            window.location.href = 'login.html';  // توجيه المستخدم إلى صفحة تسجيل الدخول بعد الإنشاء
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/email-already-in-use') {
                alert('البريد الإلكتروني موجود مسبقًا، يرجى استخدام بريد آخر.');
            } else if (errorCode === 'auth/invalid-email') {
                alert('البريد الإلكتروني غير صالح.');
            } else if (errorCode === 'auth/weak-password') {
                alert('كلمة المرور ضعيفة، يرجى استخدام كلمة مرور قوية.');
            } else {
                alert('حدث خطأ: ' + errorMessage);
            }
        });
};
