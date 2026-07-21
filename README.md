# Benim En Güzel Mevsimim Eylül — Statik Sürüm

Framework, paket yöneticisi ve build adımı gerektirmeyen; yalnızca HTML, CSS, JavaScript, SVG, Canvas API ve YouTube IFrame Player API kullanan statik doğum günü sitesi.

## Yerelde açma

En basit yöntem `index.html` dosyasına çift tıklamaktır. YouTube müziğinin tarayıcı güvenlik kuralları nedeniyle sorunsuz yüklenmesi için klasörde küçük bir yerel sunucu açmak daha güvenilirdir:

```bash
python -m http.server 8000
```

Ardından `http://localhost:8000` adresini açın. Herhangi bir kurulum veya build komutu yoktur.

## İçerikleri değiştirme

Bütün kişisel metinler `script.js` dosyasının en başındaki `siteContent` nesnesindedir. Buradan isim, tarih, şarkı, gül metinleri, akrostiş, gerçekler, “Seni Sevmemin Küçük Sebepleri” kartları, çapkın mesajlar ve mektup değiştirilebilir.

Şarkı için `siteContent.song.youtubeVideoId` değerini yeni YouTube video ID’siyle değiştirin. Ses seviyesi `siteContent.song.volume` alanındadır.

## GitHub Pages’ta yayınlama

1. Bu klasörün içeriğini GitHub deposunun varsayılan dalına gönderin.
2. GitHub’da **Settings → Pages** bölümünü açın.
3. **Build and deployment** altında **Deploy from a branch** seçin.
4. Dal olarak `main`, klasör olarak `/ (root)` seçip kaydedin.
5. GitHub’ın verdiği `https://kullaniciadi.github.io/depo-adi/` adresini açın.

Tüm bağlantılar göreli olduğu için site GitHub Pages alt dizinlerinde de çalışır.

## Dosyalar

- `index.html`: Sayfa yapısı ve meta etiketleri
- `styles.css`: Sinematik görünüm, responsive düzen ve animasyonlar
- `script.js`: İçerik verisi ve tüm etkileşimler
- `assets/rose.svg`: Çizilen gül
- `assets/og.png`: Sosyal paylaşım görseli
