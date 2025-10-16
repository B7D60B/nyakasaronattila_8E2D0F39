// Globális változók
let etelek = [];
let currentTheme = 'dark';

// Oldal betöltése
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode beállítása
    initTheme();
    
    // Header statisztikák animációja
    animateStats();
    
    // BMI számítás
    initBMICalculator();
    
    // Étel hozzáadás
    initFoodLogger();
    
    // Profil modal
    initProfileModal();
});

// Dark mode inicializálás
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
    }
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton();
}

// Téma váltás
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeButton();
}

// Téma gomb frissítése
function updateThemeButton() {
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    }
}

// Header statisztikák animációja
function animateStats() {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const originalValue = stat.textContent;
        stat.textContent = '0';
        
        let counter = 0;
        const target = parseFloat(originalValue.replace(',', ''));
        const increment = target / 30;
        
        const updateCounter = () => {
            if (counter < target) {
                counter += increment;
                stat.textContent = counter.toFixed(1);
                setTimeout(updateCounter, 50);
            } else {
                stat.textContent = originalValue;
            }
        };
        
        setTimeout(updateCounter, 500);
    });
}

// BMI kalkulátor inicializálás
function initBMICalculator() {
    const szamitasGomb = document.getElementById('szamitas-gomb');
    
    if (szamitasGomb) {
        szamitasGomb.addEventListener('click', function() {
            const suly = parseFloat(document.getElementById('suly').value);
            const magassag = parseFloat(document.getElementById('magassag').value);
            const kor = parseInt(document.getElementById('kor').value);
            const nem = document.getElementById('nem').value;
            const aktivitas = parseFloat(document.getElementById('aktivitas').value);
            
            if (!suly || !magassag || !kor) {
                alert('Kérjük, töltse ki az összes mezőt!');
                return;
            }
            
            // BMI számítás
            const bmiEredmeny = szamolBMI(suly, magassag);
            document.getElementById('bmi-eredmeny').innerHTML = `
                <h4>BMI eredmény</h4>
                <p>BMI érték: <strong>${bmiEredmeny.ertek.toFixed(1)}</strong></p>
                <p>Kategória: <span class="bmi-category ${bmiEredmeny.kategoria.toLowerCase()}">${bmiEredmeny.kategoria}</span></p>
            `;
            
            // Kalória számítás
            const kaloriaEredmeny = kaloriaSzamitas(kor, nem, aktivitas, suly, magassag);
            document.getElementById('kaloria-eredmeny').innerHTML = `
                <h4>Napi kalóriaigény</h4>
                <p>Becsült napi kalóriaigény: <strong>${kaloriaEredmeny.toFixed(0)} kcal</strong></p>
            `;
        });
    }
}

// Étel napló inicializálás
function initFoodLogger() {
    const etelHozzaadas = document.getElementById('etel-hozzaadas');
    
    if (etelHozzaadas) {
        etelHozzaadas.addEventListener('click', function() {
            const nev = document.getElementById('etel-nev').value;
            const kaloria = parseInt(document.getElementById('etel-kaloria').value);
            
            if (!nev || !kaloria) {
                alert('Kérjük, töltse ki az összes mezőt!');
                return;
            }
            
            addEtel(nev, kaloria);
            document.getElementById('etel-nev').value = '';
            document.getElementById('etel-kaloria').value = '';
        });
    }
}

// Profil modal inicializálás
function initProfileModal() {
    const profilBtn = document.getElementById('profil-gomb');
    const modal = document.getElementById('profil-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    if (profilBtn && modal) {
        profilBtn.addEventListener('click', function() {
            modal.style.display = 'flex';
            updateProfileStats();
        });
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Kattintás a modalon kívülre
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Profil statisztikák frissítése
function updateProfileStats() {
    const totalEntries = etelek.length;
    const totalCalories = etelek.reduce((sum, etel) => sum + etel.kaloria, 0);
    const avgCalories = totalEntries > 0 ? totalCalories / totalEntries : 0;
    
    // Frissítsd a profil statisztikákat
    const statElements = {
        'total-entries': totalEntries,
        'total-calories': totalCalories,
        'avg-calories': avgCalories.toFixed(1)
    };
    
    for (const [id, value] of Object.entries(statElements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
}

// Függvények

// BMI számítás
function szamolBMI(suly, magassag) {
    let bmi = suly / ((magassag / 100) ** 2);
    let kategoria;
    
    if (bmi < 18.5) kategoria = "Alultáplált";
    else if (bmi < 25) kategoria = "Normál";
    else if (bmi < 30) kategoria = "Túlsúlyos";
    else kategoria = "Elhízott";
    
    return { ertek: bmi, kategoria: kategoria };
}

// Kalória számítás
function kaloriaSzamitas(kor, nem, aktivitas, suly, magassag) {
    let kaloria;
    
    if (nem === "ferfi") {
        kaloria = 66 + (13.7 * suly) + (5 * magassag) - (6.8 * kor);
    } else {
        kaloria = 655 + (9.6 * suly) + (1.8 * magassag) - (4.7 * kor);
    }
    
    kaloria *= aktivitas;
    return kaloria;
}

// Étel hozzáadása
function addEtel(nev, kaloria) {
    etelek.push({ nev, kaloria });
    updateEtelLista();
}

// Étel lista frissítése
function updateEtelLista() {
    const etelListaElem = document.getElementById('etel-lista');
    
    if (etelek.length === 0) {
        etelListaElem.innerHTML = '<p>Még nincsenek felvett ételek</p>';
    } else {
        etelListaElem.innerHTML = '';
        
        // Ciklus - minden étel megjelenítése
        for (let i = 0; i < etelek.length; i++) {
            const etel = etelek[i];
            const etelElem = document.createElement('div');
            etelElem.className = 'food-item';
            etelElem.innerHTML = `
                <div>
                    <strong>${etel.nev}</strong>
                    <br>
                    <span>${etel.kaloria} kcal</span>
                </div>
                <button onclick="removeEtel(${i})">Törlés</button>
            `;
            etelListaElem.appendChild(etelElem);
        }
    }
    
    // Statisztikák frissítése
    updateStatisztikak();
}

// Étel törlése
function removeEtel(index) {
    // Logikai művelet - megerősítés kérése
    if (confirm('Biztosan törölni szeretné ezt az ételt?')) {
        etelek.splice(index, 1);
        updateEtelLista();
    }
}

// Statisztikák frissítése
function updateStatisztikak() {
    // Összegzés - összes kalória
    let osszesKaloria = 0;
    for (let i = 0; i < etelek.length; i++) {
        osszesKaloria += etelek[i].kaloria;
    }
    
    // Számlálás - hány étel
    const osszesEtel = etelek.length;
    
    // Átlag számítás
    const atlagKaloriaValue = osszesEtel > 0 ? osszesKaloria / osszesEtel : 0;
    
    // Eredmények megjelenítése
    document.getElementById('osszes-etel').textContent = osszesEtel;
    document.getElementById('osszes-kaloria').textContent = osszesKaloria;
    document.getElementById('atlag-kaloria').textContent = atlagKaloriaValue.toFixed(1);
}

// Átlag kalória függvény
function atlagKaloria() {
    if (etelek.length === 0) return 0;
    
    let osszes = 0;
    for (let e of etelek) osszes += e.kaloria;
    return osszes / etelek.length;
}