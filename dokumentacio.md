# Egészséges élet kalkulátor

## Téma
Az oldal célja, hogy segítse a felhasználót az egészséges életmód követésében: 
kiszámolja a BMI-t, becsült napi kalóriaigényt és nyilvántartja az elfogyasztott ételeket.

## Oldalak
| [index.html](https://github.com/B7D60B/nyakasaronattila_8E2D0F39/blob/main/index.html) | [bmi.html](https://github.com/B7D60B/nyakasaronattila_8E2D0F39/blob/main/bmi.html) | [etrend.html](https://github.com/B7D60B/nyakasaronattila_8E2D0F39/blob/main/etrend.html) |
| ------------ | ----------- | ----------- |
| Kezdőlap | BMI és kalória kalkulátor | Étrend napló |

## Technológiák
- HTML: az oldal szerkezete
- CSS: az oldal megjelenése
- JavaScript: interaktív funkciók(pl.: [dark mode](https://github.com/B7D60B/nyakasaronattila_8E2D0F39/blob/main/dark-mode_demonstracio.gif), profil) és számítások

## JavaScript funkciók
```js
1. `szamolBMI(suly, magassag)` – kiszámítja a Test-Tömeg-Index-et és visszaadja a kategóriát  
2. `kaloriaSzamitas(kor, nem, aktivitas)` – becsli a napi kalóriaigényt  
3. `addEtel(nev, kaloria)` – hozzáad egy ételt a listához  
4. `removeEtel(index)` - eltávolít egy ételt a listából
5. `atlagKaloria()` – kiszámítja az ételek átlagos kalóriáját
```

## Programozási tételek
- Összegzés (összes kalória kiszámítása)
- Számlálás (hány étel lett felvéve)

## ChatGPT promptok(több is volt, de azokat nem használtam fel végül)
>*Tudsz egy pár ötletet adni egy ehhez a feladathoz megfelelő oldalhoz?*   
(semmit nem ért végül, mert nem ezeket használtam)

---

>*És olyat esetleg tusz, amiben mind ezek benne vannak? aritmetikai műveleteknek, logikai műveleteknek, elágazásnak, tömbnek, ciklusnak, és függvénynek.*

## DeepSeek promptok(Mert szebb, modernebb weboldalt alkot)
>Bemásoltam a dokumentációt

---

>*esetleg a headert, csak a headert, meg tudod csinálni modernebbé?*(generált egy olyan verziót, melybe voltak értesítések is)

---

>*az értesítéseket hogyan tudom kivenni, nincs rá szükségem*

---

>*meg tudod az egész weboldalt 5 külön fájl-ba csinálni az új reszponzív header-el együtt?*

---

>*tudod szerkeszteni az összeset, hogy ez a header design legyen bennük*(bemásoltam a "modern header-t")

---

>*szerinted meg tudod változtatni a főoldalt, hogy így nézzen ki, és csak ezek legyenek benne?*(az előző prompt-ra utalva)

---

>*szerinted működővé tudod tenni a "profil" funkciót, vissza tudod tenni a késleltetést(valamiért kivette) és tudsz csinálni egy dark-mode funkciót(legfontosabb elem), úgy, hogy alapból azon nyíljon meg a weboldal?*

---

>*azt esetleg hogyan tudom megcsinálni, hogy mobil-on egy téglalap legyen a dark mode button?*(eleinte egy [**Ovális**](https://github.com/B7D60B/nyakasaronattila_8E2D0F39/blob/main/ovalis.png) volt)
