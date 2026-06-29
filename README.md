# Папка images

Наразі всі зображення на сайті (фото лікарів, фон Hero-секції, аватари у відгуках)
підключені напряму з Unsplash за зовнішніми URL — вони прописані прямо в `index.html`
та `js/script.js` (рядок із `heroBg.style.backgroundImage`).

Якщо хочете розмістити власні фото локально:

1. Додайте файли зображень у цю папку, наприклад:
   - `images/hero-bg.jpg`
   - `images/doctor-1.jpg`, `images/doctor-2.jpg`, `images/doctor-3.jpg`
   - `images/review-1.jpg` ... `images/review-6.jpg`

2. У файлі `index.html` замініть відповідні `src="https://images.unsplash.com/..."`
   на локальні шляхи, наприклад: `src="images/doctor-1.jpg"`.

3. У файлі `js/script.js` знайдіть рядок:
   ```js
   heroBg.style.backgroundImage = "url('https://images.unsplash.com/...')";
   ```
   і замініть URL на `'images/hero-bg.jpg'`.

Це не обов'язково — сайт повністю працює і з посиланнями на Unsplash,
але локальні зображення зроблять сайт незалежним від зовнішнього сервісу
та трохи швидшим у завантаженні.
