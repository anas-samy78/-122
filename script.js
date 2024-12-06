// جلب أسعار العملات من API
async function fetchExchangeRates(baseCurrency) {
    const apiUrl = `https://open.er-api.com/v6/latest/${baseCurrency}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.result === "success") {
            return data.rates;
        } else {
            throw new Error("Failed to fetch exchange rates.");
        }
    } catch (error) {
        alert("Error fetching exchange rates: " + error.message);
        return {};
    }
}

// إعداد القوائم بالعملات
async function populateCurrencyOptions() {
    const rates = await fetchExchangeRates("USD");
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    // مسح الخيارات القديمة
    fromCurrency.innerHTML = "";
    toCurrency.innerHTML = "";

    Object.keys(rates).forEach(currency => {
        const optionFrom = new Option(currency, currency);
        const optionTo = new Option(currency, currency);
        fromCurrency.add(optionFrom);
        toCurrency.add(optionTo);
    });

    // تعيين القيم الافتراضية
    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
}

// دالة تحويل العملات
async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (isNaN(amount) || amount <= 0) {
        alert("يرجى إدخال مبلغ صالح.");
        return;
    }

    const rates = await fetchExchangeRates(fromCurrency);

    if (!rates[toCurrency]) {
        alert("فشل في العثور على سعر الصرف للعملة المحددة.");
        return;
    }

    const convertedAmount = amount * rates[toCurrency];
    document.getElementById("resultText").textContent = `النتيجة: ${convertedAmount.toFixed(2)} ${toCurrency}`;
}

// تحميل القوائم عند تشغيل التطبيق
populateCurrencyOptions();
