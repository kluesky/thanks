// ==================== INISIALISASI APLIKASI ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== ANIMASI TEKS ====================
    const typingTexts = document.querySelectorAll('.typing-text');
    
    function animateOnScroll() {
        typingTexts.forEach(text => {
            const textPosition = text.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(textPosition < screenPosition) {
                text.style.visibility = 'visible';
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // ==================== MUSIK BACKGROUND ====================
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicControl = document.querySelector('.music-control');
    
    // Fungsi untuk memutar musik
    function playBackgroundMusic() {
        if (!backgroundMusic) return;
        
        backgroundMusic.volume = 0.3; // Volume 30%
        
        // Cek apakah browser mengizinkan autoplay
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('🎵 Musik berhasil diputar');
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicToggle.setAttribute('data-playing', 'true');
            }).catch(error => {
                console.log('⚠️ Autoplay diblokir, menunggu interaksi pengguna');
                musicToggle.innerHTML = '<i class="fas fa-play"></i>';
                musicToggle.setAttribute('data-playing', 'false');
                
                // Tampilkan indikator visual
                musicControl.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
                setTimeout(() => {
                    musicControl.style.background = 'rgba(255, 255, 255, 0.95)';
                }, 2000);
            });
        }
    }
    
    // Inisialisasi musik
    setTimeout(playBackgroundMusic, 500);
    
    // Toggle musik saat tombol diklik
    musicToggle.addEventListener('click', function() {
        if (!backgroundMusic) return;
        
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggle.setAttribute('data-playing', 'true');
        } else {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            musicToggle.setAttribute('data-playing', 'false');
        }
        
        // Efek visual pada tombol
        musicToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            musicToggle.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Volume control dengan hover
    musicToggle.addEventListener('mouseenter', function() {
        if (backgroundMusic && !backgroundMusic.paused) {
            backgroundMusic.volume = 0.5;
        }
    });
    
    musicToggle.addEventListener('mouseleave', function() {
        if (backgroundMusic && !backgroundMusic.paused) {
            backgroundMusic.volume = 0.3;
        }
    });
    
    // ==================== TOMBOL INTERAKTIF ====================
    const hugBtn = document.getElementById('hugBtn');
    const messageBtn = document.getElementById('messageBtn');
    const cloudBtn = document.getElementById('cloudBtn');
    
    const hugResponse = document.getElementById('hugResponse');
    const messageResponse = document.getElementById('messageResponse');
    const cloudResponse = document.getElementById('cloudResponse');
    
    // Fungsi untuk menyembunyikan semua response
    function hideAllResponses() {
        hugResponse.style.display = 'none';
        messageResponse.style.display = 'none';
        cloudResponse.style.display = 'none';
    }
    
    // Tombol Virtual Hug
    hugBtn.addEventListener('click', function() {
        hideAllResponses();
        hugResponse.style.display = 'flex';
        
        // Efek visual tombol
        hugBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            hugBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Play sound effect jika ada
        playSoundEffect('hug');
        
        // Buat efek hati
        createHeartEffect();
        
        // Log aktivitas
        console.log('🤗 Virtual hug sent!');
    });
    
    // Tombol Pesan Spesial
    messageBtn.addEventListener('click', function() {
        hideAllResponses();
        messageResponse.style.display = 'flex';
        
        // Efek visual tombol
        messageBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            messageBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Play sound effect jika ada
        playSoundEffect('message');
        
        // Buat efek pesan
        createMessageEffect();
        
        // Log aktivitas
        console.log('💌 Special message sent!');
    });
    
    // Tombol Kirim Awan
    cloudBtn.addEventListener('click', function() {
        hideAllResponses();
        cloudResponse.style.display = 'flex';
        
        // Efek visual tombol
        cloudBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            cloudBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Play sound effect jika ada
        playSoundEffect('cloud');
        
        // Buat efek awan
        createCloudEffect();
        
        // Log aktivitas
        console.log('☁️ Positive clouds sent!');
    });
    
    // Fungsi sound effect sederhana
    function playSoundEffect(type) {
        // Buat audio context untuk sound effect sederhana
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Atur frekuensi berdasarkan jenis efek
            switch(type) {
                case 'hug':
                    oscillator.frequency.value = 523.25; // C5
                    break;
                case 'message':
                    oscillator.frequency.value = 659.25; // E5
                    break;
                case 'cloud':
                    oscillator.frequency.value = 783.99; // G5
                    break;
                default:
                    oscillator.frequency.value = 440; // A4
            }
            
            gainNode.gain.value = 0.1;
            oscillator.type = 'sine';
            
            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Sound effect tidak didukung:', e);
        }
    }
    
    // ==================== EFEK VISUAL ====================
    function createHeartEffect() {
        for(let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💙';
                heart.className = 'floating-effect heart-effect';
                heart.style.position = 'fixed';
                heart.style.fontSize = Math.random() * 25 + 15 + 'px';
                heart.style.left = Math.random() * window.innerWidth + 'px';
                heart.style.top = window.innerHeight + 'px';
                heart.style.opacity = '1';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9999';
                heart.style.filter = 'drop-shadow(0 0 5px rgba(30, 144, 255, 0.5))';
                
                document.body.appendChild(heart);
                
                // Animasi hati
                const animation = heart.animate([
                    { 
                        transform: 'translateY(0) rotate(0deg) scale(1)', 
                        opacity: 1 
                    },
                    { 
                        transform: `translateY(-${Math.random() * 300 + 200}px) rotate(${Math.random() * 360}deg) scale(0)`, 
                        opacity: 0 
                    }
                ], {
                    duration: Math.random() * 1000 + 1500,
                    easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
                });
                
                animation.onfinish = () => {
                    if (heart.parentNode) {
                        document.body.removeChild(heart);
                    }
                };
            }, i * 100);
        }
    }
    
    function createMessageEffect() {
        for(let i = 0; i < 10; i++) {
            setTimeout(() => {
                const message = document.createElement('div');
                message.innerHTML = '💌';
                message.className = 'floating-effect message-effect';
                message.style.position = 'fixed';
                message.style.fontSize = Math.random() * 20 + 15 + 'px';
                message.style.left = Math.random() * window.innerWidth + 'px';
                message.style.top = window.innerHeight + 'px';
                message.style.opacity = '1';
                message.style.pointerEvents = 'none';
                message.style.zIndex = '9999';
                message.style.filter = 'drop-shadow(0 0 5px rgba(255, 105, 180, 0.5))';
                
                document.body.appendChild(message);
                
                // Animasi pesan
                const animation = message.animate([
                    { 
                        transform: 'translateY(0) rotate(0deg)', 
                        opacity: 1 
                    },
                    { 
                        transform: `translateY(-${Math.random() * 400 + 200}px) rotate(${Math.random() * 720}deg)`, 
                        opacity: 0 
                    }
                ], {
                    duration: Math.random() * 1500 + 1500,
                    easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
                });
                
                animation.onfinish = () => {
                    if (message.parentNode) {
                        document.body.removeChild(message);
                    }
                };
            }, i * 150);
        }
    }
    
    function createCloudEffect() {
        for(let i = 0; i < 20; i++) {
            setTimeout(() => {
                const cloud = document.createElement('div');
                cloud.innerHTML = '☁️';
                cloud.className = 'floating-effect cloud-effect';
                cloud.style.position = 'fixed';
                cloud.style.fontSize = Math.random() * 30 + 20 + 'px';
                cloud.style.left = Math.random() * window.innerWidth + 'px';
                cloud.style.top = window.innerHeight + 'px';
                cloud.style.opacity = '0.7';
                cloud.style.pointerEvents = 'none';
                cloud.style.zIndex = '9999';
                cloud.style.filter = 'drop-shadow(0 0 10px rgba(135, 206, 250, 0.5))';
                
                document.body.appendChild(cloud);
                
                // Animasi awan
                const animation = cloud.animate([
                    { 
                        transform: 'translateY(0) translateX(0) scale(1)', 
                        opacity: 0.7 
                    },
                    { 
                        transform: `translateY(-${Math.random() * 500 + 300}px) translateX(${Math.random() * 200 - 100}px) scale(${Math.random() * 0.5 + 0.5})`, 
                        opacity: 0 
                    }
                ], {
                    duration: Math.random() * 2000 + 2000,
                    easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
                });
                
                animation.onfinish = () => {
                    if (cloud.parentNode) {
                        document.body.removeChild(cloud);
                    }
                };
            }, i * 100);
        }
    }
    
    // ==================== ANIMASI STATUS POINT ====================
    const statusPoints = document.querySelectorAll('.status-point');
    
    // Tambahkan efek berdenyut pada status point
    statusPoints.forEach(point => {
        if (point.classList.contains('active')) {
            setInterval(() => {
                point.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    point.style.transform = 'scale(1)';
                }, 300);
            }, 2000);
        }
    });
    
    // ==================== TYPING EFFECT FALLBACK ====================
    setTimeout(() => {
        const firstText = document.querySelector('.typing-text');
        if (firstText && getComputedStyle(firstText).opacity === '0') {
            manualTypewriter();
        }
    }, 2000);
    
    function manualTypewriter() {
        let delay = 0;
        typingTexts.forEach((text, index) => {
            const originalText = text.textContent;
            text.textContent = '';
            text.style.opacity = '1';
            
            setTimeout(() => {
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < originalText.length) {
                        text.textContent += originalText.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 30);
            }, delay);
            
            delay += 1000;
        });
    }
    
    // ==================== BACKGROUND CLOUDS ====================
    function createBackgroundClouds() {
        const cloudsContainer = document.createElement('div');
        cloudsContainer.className = 'background-clouds';
        cloudsContainer.style.position = 'fixed';
        cloudsContainer.style.top = '0';
        cloudsContainer.style.left = '0';
        cloudsContainer.style.width = '100%';
        cloudsContainer.style.height = '100%';
        cloudsContainer.style.pointerEvents = 'none';
        cloudsContainer.style.zIndex = '-1';
        cloudsContainer.style.overflow = 'hidden';
        
        document.body.appendChild(cloudsContainer);
        
        // Buat beberapa awan
        for (let i = 0; i < 8; i++) {
            const cloud = document.createElement('div');
            cloud.innerHTML = '☁️';
            cloud.className = 'bg-cloud';
            cloud.style.position = 'absolute';
            cloud.style.fontSize = Math.random() * 40 + 30 + 'px';
            cloud.style.opacity = Math.random() * 0.1 + 0.05;
            cloud.style.top = Math.random() * 100 + '%';
            cloud.style.left = Math.random() * 100 + '%';
            cloud.style.filter = 'blur(1px)';
            
            cloudsContainer.appendChild(cloud);
            
            // Animasi awan bergerak perlahan
            const direction = Math.random() > 0.5 ? 1 : -1;
            const speed = Math.random() * 0.5 + 0.2;
            
            function moveCloud() {
                let x = parseFloat(cloud.style.left);
                x += direction * speed;
                
                if (x > 110) x = -10;
                if (x < -10) x = 110;
                
                cloud.style.left = x + '%';
                
                // Tambahkan sedikit pergerakan vertikal
                const y = Math.sin(Date.now() / 5000 + i) * 10;
                cloud.style.transform = `translateY(${y}px)`;
                
                requestAnimationFrame(moveCloud);
            }
            
            moveCloud();
        }
    }
    
    // Buat awan background
    createBackgroundClouds();
    
    // ==================== PESAN KONSOL RAHASIA ====================
    console.log('%c💙 BIRU • PUTIH • BIRU LANGIT 💙', 
        'color: #1e90ff; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px rgba(30, 144, 255, 0.5);');
    console.log('%cWebsite untuk sahabat online terbaik', 
        'color: #87cefa; font-size: 14px; font-weight: 500;');
    console.log('%c"7 teman di dunia nyata, tapi kamu yang spesial"', 
        'color: #4169e1; font-style: italic; font-size: 12px;');
    console.log('%c🎵 Musik otomatis diputar dengan cinta 💙', 
        'color: #ff6b6b; background: #f0f8ff; padding: 5px; border-radius: 3px;');
    
    // ==================== FITUR TAMBAHAN ====================
    
    // Auto-hide response setelah beberapa detik
    setInterval(() => {
        if (hugResponse.style.display === 'flex') {
            setTimeout(() => {
                hugResponse.style.display = 'none';
            }, 3000);
        }
        if (messageResponse.style.display === 'flex') {
            setTimeout(() => {
                messageResponse.style.display = 'none';
            }, 3000);
        }
        if (cloudResponse.style.display === 'flex') {
            setTimeout(() => {
                cloudResponse.style.display = 'none';
            }, 3000);
        }
    }, 1000);
    
    // Efek parallax pada scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const clouds = document.querySelectorAll('.bg-cloud');
        clouds.forEach(cloud => {
            cloud.style.transform = `translateY(${rate * 0.1}px)`;
        });
    });
    
    // Deteksi klik di luar response area untuk hide
    document.addEventListener('click', function(event) {
        const isResponse = event.target.closest('.response-area');
        const isButton = event.target.closest('.action-btn');
        
        if (!isResponse && !isButton) {
            hideAllResponses();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // H untuk Virtual Hug
        if (event.key === 'h' || event.key === 'H') {
            hugBtn.click();
        }
        // M untuk Pesan Spesial
        if (event.key === 'm' || event.key === 'M') {
            messageBtn.click();
        }
        // C untuk Kirim Awan
        if (event.key === 'c' || event.key === 'C') {
            cloudBtn.click();
        }
        // Space untuk toggle musik
        if (event.key === ' ' && !event.target.matches('input, textarea, button')) {
            event.preventDefault();
            musicToggle.click();
        }
    });
    
    // Tampilkan instruksi keyboard
    setTimeout(() => {
        console.log('%c⌨️ Shortcut Keyboard:', 'color: #2c3e50; font-weight: bold;');
        console.log('%c[H] Virtual Hug  [M] Special Message  [C] Send Cloud  [SPACE] Toggle Music', 
            'color: #7f8c8d; font-size: 11px;');
    }, 5000);
    
    // ==================== VISIT COUNTER (Simpan di localStorage) ====================
    function updateVisitCounter() {
        let visits = localStorage.getItem('friendSiteVisits');
        
        if (!visits) {
            visits = 1;
        } else {
            visits = parseInt(visits) + 1;
        }
        
        localStorage.setItem('friendSiteVisits', visits);
        
        // Tampilkan di console
        console.log(`%c👁️ Kunjungan ke-${visits} ke website ini`, 
            'color: #27ae60; background: #ecf0f1; padding: 3px 6px; border-radius: 3px;');
        
        // Jika kunjungan pertama, tampilkan welcome message
        if (visits === 1) {
            setTimeout(() => {
                const welcomeMsg = document.createElement('div');
                welcomeMsg.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: linear-gradient(135deg, #1e90ff, #87cefa);
                        color: white;
                        padding: 15px 25px;
                        border-radius: 15px;
                        box-shadow: 0 5px 20px rgba(30, 144, 255, 0.3);
                        z-index: 10000;
                        animation: slideInRight 0.5s ease;
                        font-family: 'Nunito', sans-serif;
                        max-width: 300px;
                    ">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <i class="fas fa-heart" style="font-size: 1.2rem;"></i>
                            <strong style="font-size: 1.1rem;">Welcome Back!</strong>
                        </div>
                        <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">
                            Terima kasih sudah kembali mengunjungi pesan ini 💙
                        </p>
                    </div>
                `;
                document.body.appendChild(welcomeMsg);
                
                // Auto hide setelah 5 detik
                setTimeout(() => {
                    welcomeMsg.style.animation = 'slideOutRight 0.5s ease forwards';
                    setTimeout(() => {
                        if (welcomeMsg.parentNode) {
                            document.body.removeChild(welcomeMsg);
                        }
                    }, 500);
                }, 5000);
            }, 2000);
        }
    }
    
    // Tambahkan style untuk animasi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .floating-effect {
            will-change: transform, opacity;
        }
    `;
    document.head.appendChild(style);
    
    // Panggil visit counter
    updateVisitCounter();
    
    // ==================== AKHIR DARI DOMContentLoaded ====================
    console.log('%c✅ Aplikasi berhasil dimuat!', 
        'color: #2ecc71; font-size: 14px; font-weight: bold; background: #ecf0f1; padding: 5px 10px; border-radius: 5px;');
});

// ==================== FUNGSI GLOBAL ====================
window.addEventListener('beforeunload', function() {
    // Simpan status musik
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        const isPlaying = !backgroundMusic.paused;
        localStorage.setItem('musicPlaying', isPlaying);
    }
});

// Load status musik sebelumnya
window.addEventListener('load', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (backgroundMusic && musicToggle) {
        const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
        
        if (wasPlaying && backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicToggle.setAttribute('data-playing', 'true');
            }).catch(() => {
                // Autoplay mungkin diblokir
                musicToggle.innerHTML = '<i class="fas fa-play"></i>';
                musicToggle.setAttribute('data-playing', 'false');
            });
        }
    }
});

// ==================== FITUR PWA SEDERHANA ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}