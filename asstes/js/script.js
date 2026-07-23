// باز و بسته کردن مودال‌های عمومی
function openRegisterModal() { document.getElementById('registerModal').classList.add('open'); }
function openLoginModal() { document.getElementById('loginModal').classList.add('open'); }

// باز کردن مودال تیکت
function openTicketModal() { document.getElementById('ticketModal').classList.add('open'); }

function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function toggleFaq(btn) {
    const item = btn.parentElement;
    item.classList.toggle('open');
}

function submitRegister() {
    var username = document.getElementById('regUsername').value.trim();
    var email = document.getElementById('regEmail').value.trim();
    var pass = document.getElementById('regPass').value;
    var passConfirm = document.getElementById('regPassConfirm').value;

    if (!username || !email || !pass || !passConfirm) {
        alert('لطفاً تمام فیلدها را پر کنید!');
        return;
    }
    if (pass !== passConfirm) {
        alert('رمز عبور و تکرار آن یکسان نیستند!');
        return;
    }
    if (localStorage.getItem('user_' + email)) {
        alert('این ایمیل قبلاً ثبت‌نام شده است! لطفاً وارد شوید.');
        closeModal('registerModal');
        openLoginModal();
        return;
    }

    var userData = { username: username, email: email, password: pass };
    localStorage.setItem('user_' + email, JSON.stringify(userData));
    
    alert('ثبت‌نام با موفقیت انجام شد! اکنون وارد حساب خود شوید.');
    closeModal('registerModal');
    document.getElementById('loginEmail').value = email;
    openLoginModal();
}

function submitLogin() {
    var email = document.getElementById('loginEmail').value.trim();
    var pass = document.getElementById('loginPass').value;

    if (!email || !pass) {
        alert('لطفاً ایمیل و رمز عبور را وارد کنید!');
        return;
    }

    var storedUser = localStorage.getItem('user_' + email);
    if (!storedUser) {
        alert('کاربری با این ایمیل یافت نشد! لطفاً ابتدا ثبت‌نام کنید.');
        return;
    }

    var userData = JSON.parse(storedUser);
    if (userData.password !== pass) {
        alert('رمز عبور اشتباه است!');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(userData));
    closeModal('loginModal');
    location.reload();
}

function checkAuth() {
    var currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        var user = JSON.parse(currentUser);
        document.getElementById('authLinks').style.display = 'none';
        document.getElementById('userLinks').style.display = 'flex';
        document.getElementById('greetingUser').innerText = 'خوش آمدید، ' + user.username;

        document.getElementById('guestActions').style.display = 'none';
        document.getElementById('loggedActions').style.display = 'flex';
        document.getElementById('greetingUserMain').innerText = 'خوش آمدید، ' + user.username + '!';
    }
}

function logoutUser() {
    if(confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
        localStorage.removeItem('currentUser');
        location.reload();
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        var btn = document.querySelector('.btn-copy');
        var originalText = btn.innerText;
        btn.innerText = '✅ کپی شد!';
        setTimeout(function(){ btn.innerText = originalText; }, 2000);
    }, function(err) {
        alert('مشکلی در کپی کردن پیش آمد. لطفاً آیدی را دستی کپی کنید.');
    });
}

window.onload = function() { checkAuth(); };