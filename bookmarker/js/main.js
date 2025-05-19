var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var bookMark = JSON.parse(localStorage.getItem("bookMark")) || [];
var editingIndex = -1;

// ✅ تفعيل الفاليديشن أثناء الكتابة
siteName.addEventListener("input", validateInputs);
siteUrl.addEventListener("input", validateInputs);

displaySite();

// ✅ وظيفة التحقق من صحة الإدخالات
function validateInputs() {
    // 🔹 التحقق من صحة اسم الموقع (يجب أن يكون 3 أحرف على الأقل)
    if (siteName.value.trim().length >= 3) {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
    } else {
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
    }

    // 🔹 التحقق من صحة رابط الموقع
    var urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(\S+)?$/;
    if (urlPattern.test(siteUrl.value.trim())) {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
    } else {
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
    }
}

// ✅ التحقق من عدم تكرار الموقع
function isDuplicate(site) {
    return bookMark.some(item => item.name.toLowerCase() === site.name.toLowerCase() || item.url === site.url);
}

// ✅ إضافة موقع جديد
function addsite() {
    validateInputs();

    if (siteName.classList.contains("is-invalid") || siteUrl.classList.contains("is-invalid")) {
        alert("Please fix the errors before submitting.");
        return;
    }

    var site = {
        name: siteName.value.trim(),
        url: siteUrl.value.trim(),
        id: bookMark.length > 0 ? Math.max(...bookMark.map(site => site.id)) + 1 : 1
    };

    if (isDuplicate(site)) {
        alert("This site already exists!");
        return;
    }

    bookMark.push(site);
    localStorage.setItem("bookMark", JSON.stringify(bookMark));
    displaySite();
    clear();
}

// ✅ عرض البيانات في الجدول
function displaySite() {
    var cartona = "";
    for (var i = 0; i < bookMark.length; i++) {
        cartona += `<tr>
            <td>${bookMark[i].id}</td>
            <td>${bookMark[i].name}</td>
            <td><button onclick="visitButton('${bookMark[i].url}')" class="btn btn-primary"><i class="fa-regular fa-eye"></i> Visit</button></td>
            <td><button onclick="editSite(${i})" class="btn btn-warning"><i class="fa-regular fa-pen-to-square"></i> Edit</button></td>
            <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i> Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableContent").innerHTML = cartona;
}

// ✅ زيارة الموقع
function visitButton(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    window.open(url, "_blank");
}

// ✅ حذف موقع
function deleteSite(index) {
    bookMark.splice(index, 1);
    bookMark.forEach((site, i) => {
        site.id = i + 1;
    });
    localStorage.setItem("bookMark", JSON.stringify(bookMark));
    displaySite();
}

// ✅ تعديل موقع
function editSite(index) {
    siteName.value = bookMark[index].name;
    siteUrl.value = bookMark[index].url;
    editingIndex = index;

    addBtn.style.display = "none";
    updateBtn.style.display = "inline-block";
}

// ✅ تحديث البيانات بعد التعديل
function updateSite() {
    if (editingIndex === -1) return;

    validateInputs();

    if (siteName.classList.contains("is-invalid") || siteUrl.classList.contains("is-invalid")) {
        alert("Please fix the errors before updating.");
        return;
    }

    var updatedSite = {
        name: siteName.value.trim(),
        url: siteUrl.value.trim()
    };

    // منع التكرار بعد التعديل (باستثناء نفس العنصر)
    if (bookMark.some((item, i) => i !== editingIndex && (item.name.toLowerCase() === updatedSite.name.toLowerCase() || item.url === updatedSite.url))) {
        alert("This site already exists!");
        return;
    }

    bookMark[editingIndex].name = updatedSite.name;
    bookMark[editingIndex].url = updatedSite.url;

    localStorage.setItem("bookMark", JSON.stringify(bookMark));
    displaySite();
    clear();
}

// ✅ مسح الإدخالات
function clear() {
    siteName.value = "";
    siteUrl.value = "";
    editingIndex = -1;

    siteName.classList.remove("is-valid", "is-invalid");
    siteUrl.classList.remove("is-valid", "is-invalid");

    addBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
}
