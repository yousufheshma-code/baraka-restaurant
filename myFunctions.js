function toggleDetails(id) {
    const row = document.getElementById(id);
    row.style.display = (row.style.display === "table-row") ? "none" : "table-row";
}

function showOrderForm() {
    const selectedCount = document.querySelectorAll('.meal-check:checked').length;
    if (selectedCount === 0) {
        alert("يرجى اختيار وجبة واحدة على الأقل للمتابعة.");
        return;
    }
    document.getElementById('orderFormContainer').style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
}

function processOrder() {
    const nid = document.getElementById('nationalId').value;
    const name = document.getElementById('fullName').value;
    const birthDate = document.getElementById('birthDate').value;
    const mobile = document.getElementById('mobile').value;

    const nidRegex = /^(0[1-9]|1[0-4])\d{9}$/;
    if (!nidRegex.test(nid)) {
        alert("خطأ: الرقم الوطني إلزامي ويجب أن يكون 11 خانة تبدأ برمز محافظة صحيح (01-14).");
        return;
    }

    if (name.trim() !== "") {
        const nameRegex = /^[\u0600-\u06FF\s]+$/;
        if (!nameRegex.test(name)) {
            alert("خطأ: الاسم يجب أن يكون باللغة العربية فقط.");
            return;
        }
    }

    if (birthDate.trim() !== "") {
        const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
        if (!dateRegex.test(birthDate)) {
            alert("خطأ: تنسيق التاريخ غير صحيح (يوم-شهر-سنة).");
            return;
        }
    }

    if (mobile.trim() !== "") {
        const mobileRegex = /^09(3|4|5|6|8|9)\d{7}$/;
        if (!mobileRegex.test(mobile)) {
            alert("خطأ: رقم الموبايل يجب أن يبدأ بـ 09 ويتبع لسيريتل أو MTN.");
            return;
        }
    }

    let subtotal = 0;
    let items = [];
    document.querySelectorAll('.meal-check:checked').forEach(cb => {
        subtotal += parseInt(cb.getAttribute('data-price'));
        items.push(cb.getAttribute('data-name'));
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    alert(`تم استلام طلبك بنجاح!
-------------------------
الرقم الوطني: ${nid}
الوجبات: ${items.join(' - ')}
السعر: ${subtotal} ل.س
الضريبة (5%): ${tax} ل.س
المجموع الكلي: ${total} ل.س`);
}
