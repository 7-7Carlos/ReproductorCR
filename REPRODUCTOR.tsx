
"use client";
import React, { useEffect, useRef } from 'react';

export default function MusicPlayerPage() {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const audioPlayer = document.createElement('audio');
    audioPlayer.id = 'audioPlayer';
    document.body.appendChild(audioPlayer);
    
    audioPlayer.addEventListener('error', (e) => {
      console.error("Error de audio:", e);
      showNotification('Error en el archivo de audio');
    });

    const playPauseButton = document.getElementById('playPauseButton');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const loopButton = document.getElementById('loopButton');
    const loopIcon = document.getElementById('loopIcon');
    const progressBar = document.getElementById('progressBar');
    const progressBarContainer = document.getElementById('progressBarContainer');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    const trackTitle = document.getElementById('trackTitle');
    const selectFolderButton = document.getElementById('selectFolderButton');
    const folderInput = document.getElementById('folderInput');
    const playlistContent = document.getElementById('playlistContent');
    const favoritesContent = document.getElementById('favoritesContent');
    const favoritesButton = document.getElementById('favoritesButton');
    const equalizerContainer = document.getElementById('equalizerContainer');
    const selectBackgroundButton = document.getElementById('selectBackgroundButton');
    const backgroundInput = document.getElementById('backgroundInput');
    const body = document.body;
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const closeVideoButton = document.getElementById('closeVideoButton');
    const videoPlayPause = document.getElementById('videoPlayPause');
    const videoPlayIcon = document.getElementById('videoPlayIcon');
    const videoPauseIcon = document.getElementById('videoPauseIcon');
    const videoPlayer = document.getElementById('videoElement') as HTMLVideoElement;
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const videoPrev = document.getElementById('videoPrev');
    const videoNext = document.getElementById('videoNext');
    const videoLoop = document.getElementById('videoLoop');
    const videoFullscreen = document.getElementById('videoFullscreen');
    const selectVideoButton = document.getElementById('selectVideoButton');
    const videoInput = document.getElementById('videoInput');
    const videoPlayButton = document.getElementById('videoPlayButton');
    const backgroundLoopButton = document.getElementById('backgroundLoopButton');
    
    let prevBackgroundButton = document.getElementById('prevBackgroundButton');
    let pauseBackgroundButton = document.getElementById('pauseBackgroundButton');
    let nextBackgroundButton = document.getElementById('nextBackgroundButton');
    let backgroundControls = document.getElementById('backgroundControls');
    
    let audioContext: AudioContext | undefined;
    let audioSource: MediaElementAudioSourceNode | null = null; 
    let eqFilters: { bass: BiquadFilterNode | null, mid: BiquadFilterNode | null, treble: BiquadFilterNode | null } = {
      bass: null,
      mid: null,
      treble: null
    };
    let analyser: AnalyserNode | undefined;
    let animationFrame: number | null;
    let masterGain: GainNode | undefined;
    let originalAudioVolume = 1.0;

    let originalPlaylistFiles: { name: string; path: string }[] = [];
    let favoriteTrackPaths = JSON.parse(localStorage.getItem('favoriteTrackPaths') || '[]');
    let currentTrackIndex = -1;
    let isPlaying = false;
    let loopMode = 0;
    let isDraggingProgress = false;
    let isVideoPlaying = false;
    let videoLoopMode = false;
    let videoFiles: { name: string; path: string }[] = [];
    let currentVideoIndex = -1;
    let backgroundLoopActive = false;
    
    let audioWasPlayingBeforeVideo = false;
    let audioTimeBeforeVideo = 0;
    let currentVideoURL: string | null = null;
    let videoTimeouts: NodeJS.Timeout[] = [];
    let videoIntervals: NodeJS.Timeout[] = [];
    
    let infiniteBackgroundContainer = document.getElementById('infiniteBackground');
    let currentBackgroundIndex = 0;
    let backgroundImages: { src: string; name: string }[] = [];
    let isBackgroundTransitioning = false;
    let backgroundAutoPlay = true;
    let backgroundInterval: NodeJS.Timeout;

    function formatTime(seconds: number) {
      if (isNaN(seconds)) return '0:00';
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function showNotification(text: string) {
      if (!notificationText || !notification) return;
      notificationText.textContent = text;
      notification.classList.remove('hide');
      notification.classList.add('show');
      if ((window as any).notificationTimer) clearTimeout((window as any).notificationTimer);
      (window as any).notificationTimer = setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
      }, 4000);
      
      const sonicWave = document.createElement('div');
      sonicWave.className = 'sonic-wave';
      sonicWave.style.left = 'calc(100% - 50px)';
      sonicWave.style.top = '20px';
      document.body.appendChild(sonicWave);
      
      setTimeout(() => {
        sonicWave.remove();
      }, 1500);
    }

    function createParticles() {
      const container = document.getElementById('particles');
      if (!container) return;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isS24Ultra = navigator.userAgent.includes('SM-S918') || navigator.userAgent.includes('SM-S918B') || 
                        navigator.userAgent.includes('SM-S918N') || navigator.userAgent.includes('SM-S918U');
      
      const particleCount = isS24Ultra ? 20 : (isMobile ? 30 : 50);
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100 + 100;
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        const depth = Math.random() * 50;
        particle.style.transform = `translateZ(${depth}px)`;
        particle.style.webkitTransform = `translateZ(${depth}px)`;
        
        const hue = Math.random() * 360;
        const opacity = isS24Ultra ? 0.3 : (isMobile ? 0.4 : 0.6);
        particle.style.backgroundColor = `hsla(${hue}, 100%, 60%, ${opacity})`;
        
        particle.style.contain = 'layout style paint';
        particle.style.willChange = 'transform';
        particle.style.backfaceVisibility = 'hidden';
        particle.style.webkitBackfaceVisibility = 'hidden';
        
        container.appendChild(particle);
      }
    }

    function createAudioParticle(x: number, y: number) {
      const particle = document.createElement('div');
      particle.className = 'audio-particle';
      const size = Math.random() * 20 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }

    function createEnergyParticles(x: number, y: number) {
      const particleCount = 8;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'energy-particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--tx', (Math.random() * 2 - 1).toFixed(2));
        particle.style.setProperty('--ty', (Math.random() * 2 - 1).toFixed(2));
        particle.style.backgroundColor = `hsl(${Math.random() * 60 + 20}, 100%, 50%)`;
        document.body.appendChild(particle);
        
        setTimeout(() => {
          particle.remove();
        }, 2000);
      }
    }

    selectFolderButton?.addEventListener('click', () => folderInput?.click());
    folderInput?.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;
      const files = Array.from(target.files).filter(f => f.type.startsWith('audio/'));
      if (files.length) {
        originalPlaylistFiles = files.map(f => ({
          name: f.name,
          path: URL.createObjectURL(f)
        }));
        currentTrackIndex = 0;
        updatePlaylistUI();
        loadTrack(0);
        showNotification(`Cargados ${files.length} audios`);
        if (isPlaying) playAudio();
      } else {
        showNotification('No se seleccionaron audios válidos.');
      }
    });

    selectVideoButton?.addEventListener('click', () => videoInput?.click());
    videoInput?.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;
      const files = Array.from(target.files).filter(f => f.type.startsWith('video/'));
      if (files.length > 0) {
        videoFiles = files.map(f => ({
          name: f.name,
          path: URL.createObjectURL(f)
        }));
        currentVideoIndex = 0;
        openPanel('videoPlayerContainer');
        target.value = '';
      } else {
        showNotification('No se seleccionaron videos válidos.');
      }
    });

    selectBackgroundButton?.addEventListener('click', () => backgroundInput?.click());
    backgroundInput?.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;
      const files = Array.from(target.files).filter(f => f.type.startsWith('image/'));
      if (files.length === 0) {
        showNotification('No se seleccionaron imágenes válidas.');
        return;
      }
      
      backgroundImages = [];
      currentBackgroundIndex = 0;
      
      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = e => {
          if (!e.target?.result) return;
          backgroundImages.push({
            src: e.target.result as string,
            name: file.name
          });
          
          if (index === 0) {
            setupInfiniteBackground();
            showNotification(`Cargados ${files.length} fondos. Iniciando reproducción infinita.`);
          }
        };
        reader.readAsDataURL(file);
      });
    });

    function setupInfiniteBackground() {
      if (!infiniteBackgroundContainer) {
        infiniteBackgroundContainer = document.getElementById('infiniteBackground');
      }
      if (!infiniteBackgroundContainer) return;
      
      if (backgroundImages.length === 0) return;
      
      infiniteBackgroundContainer.innerHTML = '';
      
      backgroundImages.forEach((bg, index) => {
        const img = document.createElement('img');
        img.src = bg.src;
        img.className = index === 0 ? 'active' : 'preload';
        img.dataset.index = `${index}`;
        infiniteBackgroundContainer?.appendChild(img);
      });
      
      if (backgroundControls) {
        if (backgroundImages.length > 1) {
          backgroundControls.style.display = 'block';
        } else {
          backgroundControls.style.display = 'none';
        }
      }
      
      startInfiniteBackgroundTransition();
    }

    function startInfiniteBackgroundTransition() {
      if (backgroundImages.length <= 1) return;
      
      if (backgroundInterval) {
        clearInterval(backgroundInterval);
      }
      
      backgroundInterval = setInterval(() => {
        if (!isBackgroundTransitioning && backgroundAutoPlay) {
          transitionToNextBackground();
        }
      }, 5000);
    }

    function transitionToNextBackground() {
      if (isBackgroundTransitioning || backgroundImages.length <= 1) return;
      
      isBackgroundTransitioning = true;
      
      const currentImg = infiniteBackgroundContainer?.querySelector('.active');
      const nextIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
      const nextImg = infiniteBackgroundContainer?.querySelector(`[data-index="${nextIndex}"]`);
      
      if (currentImg && nextImg) {
        currentImg.classList.remove('active');
        nextImg.classList.remove('preload');
        nextImg.classList.add('active');
        
        setTimeout(() => {
          currentImg.classList.add('preload');
          currentBackgroundIndex = nextIndex;
          isBackgroundTransitioning = false;
        }, 500);
      }
    }

    function setSpecificBackground(index: number) {
      if (index < 0 || index >= backgroundImages.length || !infiniteBackgroundContainer) return;
      
      const allImgs = infiniteBackgroundContainer.querySelectorAll('img');
      allImgs.forEach((img, i) => {
        if (i === index) {
          img.classList.remove('preload');
          img.classList.add('active');
        } else {
          img.classList.remove('active');
          img.classList.add('preload');
        }
      });
      
      currentBackgroundIndex = index;
    }

    prevBackgroundButton?.addEventListener('click', () => {
        if (backgroundImages.length <= 1) return;
        const prevIndex = (currentBackgroundIndex - 1 + backgroundImages.length) % backgroundImages.length;
        setSpecificBackground(prevIndex);
        showNotification(`Fondo: ${backgroundImages[prevIndex].name}`);
    });

    nextBackgroundButton?.addEventListener('click', () => {
        if (backgroundImages.length <= 1) return;
        const nextIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
        setSpecificBackground(nextIndex);
        showNotification(`Fondo: ${backgroundImages[nextIndex].name}`);
    });

    pauseBackgroundButton?.addEventListener('click', () => {
        backgroundAutoPlay = !backgroundAutoPlay;
        
        if (backgroundAutoPlay) {
          startInfiniteBackgroundTransition();
          if (pauseBackgroundButton) pauseBackgroundButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
          showNotification('Fondo automático: Activado');
        } else {
          if (backgroundInterval) {
            clearInterval(backgroundInterval);
          }
          if (pauseBackgroundButton) pauseBackgroundButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
          showNotification('Fondo automático: Pausado');
        }
    });

    function loadTrack(index: number) {
      if (!trackTitle || !progressBar || !currentTimeSpan || !durationSpan) return;
      if (!Array.isArray(originalPlaylistFiles) || originalPlaylistFiles.length === 0) {
        pauseAudio();
        trackTitle.textContent = 'Selecciona un audio';
        progressBar.style.transform = 'scaleX(0)';
        currentTimeSpan.textContent = '0:00';
        durationSpan.textContent = '0:00';
        currentTrackIndex = -1;
        updatePlaylistUI();
        return;
      }
      if (typeof index !== 'number' || index < 0 || index >= originalPlaylistFiles.length) {
        showNotification('Índice de pista inválido.');
        return;
      }
      document.querySelectorAll('.playlist-item.active').forEach(el => el.classList.remove('active'));
      const track = originalPlaylistFiles[index];
      audioPlayer.src = track.path;
      audioPlayer.load();
      currentTrackIndex = index;
      if (isPlaying) playAudio();
      trackTitle.textContent = track.name;
      trackTitle.classList.add('track-change', 'track-transition');
      setTimeout(() => {
        trackTitle.classList.remove('track-change');
        setTimeout(() => trackTitle.classList.remove('track-transition'), 800);
      }, 1000);
      progressBar.style.transform = 'scaleX(0)';
      currentTimeSpan.textContent = '0:00';
      durationSpan.textContent = '0:00';
      updatePlaylistActiveItem();
      updateFavoritesButton();
      updateMediaSession(track.name);
      const rect = trackTitle.getBoundingClientRect();
      createEnergyParticles(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
    }

    function playAudio() {
      if (!audioContext || !audioSource) {
        setupEqualizer();
      }

      if (audioContext && audioContext.state === "suspended") {
        audioContext.resume().then(() => {
          playAudioInternal();
        }).catch(e => {
          console.error("Error al reanudar:", e);
          showNotification('Error al iniciar audio');
        });
      } else {
        playAudioInternal();
      }
    }

    function playAudioInternal() {
      audioPlayer.play().then(() => {
        isPlaying = true;
        if (playPauseIcon) playPauseIcon.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
        if (analyser) drawEQVisualizer();
        
        playPauseButton?.classList.add('audio-distortion');
        setTimeout(() => {
          playPauseButton?.classList.remove('audio-distortion');
        }, 500);
      }).catch(e => {
        console.error("Error al reproducir:", e);
        showNotification('Toca el botón de reproducción');
      });
    }

    function pauseAudio() {
      audioPlayer.pause();
      isPlaying = false;
      if(playPauseIcon) playPauseIcon.setAttribute('d', 'M8 5v14l11-7z');
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    }

    function updateMediaSession(title: string) {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: title || 'Desconocido',
          artist: 'Reproductor 3D',
          album: 'Reproducción'
        });
        navigator.mediaSession.setActionHandler('play', () => {
          if (isVideoPlaying) videoPlayer?.play();
          else playAudio();
        });
        navigator.mediaSession.setActionHandler('pause', () => {
          if (isVideoPlaying) videoPlayer?.pause();
          else pauseAudio();
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => {
          if (isVideoPlaying && videoFiles.length > 0) videoPrev?.click();
          else prevButton?.click();
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
          if (isVideoPlaying && videoFiles.length > 0) videoNext?.click();
          else nextButton?.click();
        });
      }
    }

    playPauseButton?.addEventListener('click', () => {
      if (originalPlaylistFiles.length === 0) {
        showNotification('Selecciona una carpeta primero.');
        return;
      }
      
      if (audioPlayer.paused || !isPlaying) {
        playAudio();
      } else {
        pauseAudio();
      }
    });

    prevButton?.addEventListener('click', () => {
      if (originalPlaylistFiles.length === 0) return;
      let newIndex = (currentTrackIndex - 1 + originalPlaylistFiles.length) % originalPlaylistFiles.length;
      if (newIndex < 0 || newIndex >= originalPlaylistFiles.length) {
        showNotification('No hay pista anterior.');
        return;
      }
      loadTrack(newIndex);
      playAudio();
    });

    nextButton?.addEventListener('click', () => {
      if (originalPlaylistFiles.length === 0) return;
      let newIndex = (currentTrackIndex + 1) % originalPlaylistFiles.length;
      if (newIndex < 0 || newIndex >= originalPlaylistFiles.length) {
        showNotification('No hay pista siguiente.');
        return;
      }
      loadTrack(newIndex);
      playAudio();
    });

    loopButton?.addEventListener('click', () => {
      loopMode = (loopMode + 1) % 3;
      switch(loopMode) {
        case 0:
          if(loopIcon) (loopIcon as HTMLElement).style.fill = '';
          audioPlayer.loop = false;
          loopButton.classList.remove('active');
          showNotification('Repetición: Desactivada');
          break;
        case 1:
          if(loopIcon) (loopIcon as HTMLElement).style.fill = 'var(--accent-color)';
          audioPlayer.loop = false;
          loopButton.classList.add('active');
          showNotification('Repetición: Lista completa');
          break;
        case 2:
          if(loopIcon) (loopIcon as HTMLElement).style.fill = 'var(--accent-color)';
          audioPlayer.loop = true;
          loopButton.classList.add('active');
          showNotification('Repetición: Pista actual');
          break;
      }
      
      loopButton.classList.add('hologram-appear');
      setTimeout(() => {
        loopButton.classList.remove('hologram-appear');
      }, 1000);
    });

    audioPlayer.addEventListener('ended', () => {
      if (loopMode === 1) {
        currentTrackIndex = (currentTrackIndex + 1) % originalPlaylistFiles.length;
        loadTrack(currentTrackIndex);
        playAudio();
      } else if (loopMode === 2) {
        // Loop current handled by audioPlayer.loop
      } else {
        pauseAudio();
      }
    });

    audioPlayer.addEventListener('timeupdate', () => {
      if (!isDraggingProgress && audioPlayer.duration && isFinite(audioPlayer.duration)) {
        const factor = audioPlayer.currentTime / audioPlayer.duration;
        if (progressBar) (progressBar as HTMLElement).style.transform = `scaleX(${factor})`;
        if (currentTimeSpan) currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
        if (durationSpan) durationSpan.textContent = formatTime(audioPlayer.duration);
      }
    });

    progressBarContainer?.addEventListener('click', e => {
      if (audioPlayer.duration) {
        const rect = progressBarContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const factor = clickX / rect.width;
        audioPlayer.currentTime = factor * audioPlayer.duration;
        if(progressBar) (progressBar as HTMLElement).style.transform = `scaleX(${factor})`;
      }
    });

    function updateFavoritesButton() {
      if (currentTrackIndex < 0 || currentTrackIndex >= originalPlaylistFiles.length) {
        favoritesButton?.classList.remove('favorite-active', 'active');
        return;
      }
      const currentTrack = originalPlaylistFiles[currentTrackIndex];
      const isFav = favoriteTrackPaths.includes(currentTrack.path);
      favoritesButton?.classList.toggle('favorite-active', isFav);
      favoritesButton?.classList.toggle('active', isFav);
    }

    favoritesButton?.addEventListener('click', () => {
      if (currentTrackIndex < 0 || currentTrackIndex >= originalPlaylistFiles.length) {
        showNotification('Selecciona una pista primero.');
        return;
      }
      const currentTrack = originalPlaylistFiles[currentTrackIndex];
      const idx = favoriteTrackPaths.indexOf(currentTrack.path);
      if (idx === -1) {
        favoriteTrackPaths.push(currentTrack.path);
        showNotification('Aadido a favoritos');
      } else {
        favoriteTrackPaths.splice(idx, 1);
        showNotification('Eliminado de favoritos');
      }
      localStorage.setItem('favoriteTrackPaths', JSON.stringify(favoriteTrackPaths));
      updateFavoritesButton();
      updateFavoritesUI();
      
      favoritesButton.classList.add('rhythmic-pulse');
      setTimeout(() => {
        favoritesButton.classList.remove('rhythmic-pulse');
      }, 2000);
    });

    function updateFavoritesUI() {
      if (!favoritesContent) return;
      favoritesContent.innerHTML = '';
      if (favoriteTrackPaths.length === 0) {
        favoritesContent.innerHTML = '<div style="text-align:center;padding:20px;color:#888;">Sin favoritos aún.</div>';
        return;
      }
      favoriteTrackPaths.forEach(path => {
        const track = originalPlaylistFiles.find(t => t.path === path);
        if (track) {
          const div = document.createElement('div');
          div.className = 'playlist-item';
          div.innerHTML = `<span>${track.name}</span>`;
          div.addEventListener('click', () => {
            const trackIndex = originalPlaylistFiles.findIndex(t => t.path === path);
            if (trackIndex !== -1) {
              loadTrack(trackIndex);
              playAudio();
              closeAllPanels();
            }
          });
          favoritesContent.appendChild(div);
        }
      });
    }

    function updatePlaylistActiveItem() {
      if (!playlistContent) return;
      const items = playlistContent.querySelectorAll('.playlist-item');
      items.forEach((item, i) => {
        if (i === currentTrackIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    function updatePlaylistUI() {
      if (!playlistContent) return;
      if (playlistContent.childElementCount !== originalPlaylistFiles.length) {
        playlistContent.innerHTML = '';
        if (originalPlaylistFiles.length === 0) {
          playlistContent.innerHTML = '<div style="text-align:center;padding:20px;color:#888;">Selecciona audios para crear tu lista.</div>';
          return;
        }
        originalPlaylistFiles.forEach((track, i) => {
          const div = document.createElement('div');
          div.className = 'playlist-item' + (i === currentTrackIndex ? ' active' : '');
          div.innerHTML = `<span>${track.name}</span>`;
          div.addEventListener('click', () => {
            if (currentTrackIndex !== i) {
              loadTrack(i);
              playAudio();
              closeAllPanels();
            }
          });
          playlistContent.appendChild(div);
        });
      } else {
        updatePlaylistActiveItem();
      }
    }

    function setupEqualizer() {
      try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            originalAudioVolume = audioPlayer.volume;

            if (!audioSource) {
                audioSource = audioContext.createMediaElementSource(audioPlayer);
            }

            masterGain = audioContext.createGain();
            masterGain.gain.value = originalAudioVolume; 
            
            eqFilters.bass = audioContext.createBiquadFilter();
            eqFilters.mid = audioContext.createBiquadFilter();
            eqFilters.treble = audioContext.createBiquadFilter();
            
            eqFilters.bass.type = 'lowshelf';
            eqFilters.bass.frequency.value = 150;
            eqFilters.bass.gain.value = 0;

            eqFilters.mid.type = 'peaking';
            eqFilters.mid.frequency.value = 1500;
            eqFilters.mid.Q.value = 1;
            eqFilters.mid.gain.value = 0;

            eqFilters.treble.type = 'highshelf';
            eqFilters.treble.frequency.value = 3000;
            eqFilters.treble.gain.value = 0;
            
            audioSource.connect(eqFilters.bass);
            eqFilters.bass.connect(eqFilters.mid);
            eqFilters.mid.connect(eqFilters.treble);
            eqFilters.treble.connect(masterGain);
            masterGain.connect(audioContext.destination);

            analyser = audioContext.createAnalyser();
            masterGain.connect(analyser);

            (document.querySelector('[data-band="bass"]') as HTMLInputElement).value = '0';
            (document.querySelector('[data-band="mid"]') as HTMLInputElement).value = '0';
            (document.querySelector('[data-band="treble"]') as HTMLInputElement).value = '0';

            document.querySelectorAll('.eq-range').forEach(slider => {
                slider.addEventListener('input', function(this: HTMLInputElement) {
                    const band = this.dataset.band as keyof typeof eqFilters;
                    const value = parseFloat(this.value);
                    if(eqFilters[band]) eqFilters[band]!.gain.value = value;
                    audioPlayer.volume = originalAudioVolume; 
                });
            });

            document.querySelectorAll('.eq-preset').forEach(button => {
                button.addEventListener('click', function(this: HTMLButtonElement) {
                    const preset = this.dataset.preset;
                    let bassValue = 0, midValue = 0, trebleValue = 0;

                    if (preset === 'flat') {
                        bassValue = 0; midValue = 0; trebleValue = 0;
                    } else if (preset === 'pop') {
                        bassValue = 5; midValue = 2; trebleValue = 4;
                    } else if (preset === 'rock') {
                        bassValue = 7; midValue = 4; trebleValue = 5;
                    } else if (preset === 'jazz') {
                        bassValue = 3; midValue = 2; trebleValue = 1;
                    }
                    
                    if(eqFilters.bass) eqFilters.bass.gain.value = bassValue;
                    if(eqFilters.mid) eqFilters.mid.gain.value = midValue;
                    if(eqFilters.treble) eqFilters.treble.gain.value = trebleValue;
                    (document.querySelector('[data-band="bass"]') as HTMLInputElement).value = `${bassValue}`;
                    (document.querySelector('[data-band="mid"]') as HTMLInputElement).value = `${midValue}`;
                    (document.querySelector('[data-band="treble"]') as HTMLInputElement).value = `${trebleValue}`;
                    
                    showNotification(`Ecualizador: ${this.textContent}`);
                });
            });
        }
      } catch (e) {
        console.error("Error al configurar ecualizador:", e);
        showNotification('Ecualizador no disponible');
      }
    }

    function drawEQVisualizer() {
      const canvas = document.getElementById('eqVisualizer') as HTMLCanvasElement;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!analyser || !ctx) return;

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function renderFrame() {
        if (!isPlaying || !equalizerContainer?.classList.contains('visible')) {
          animationFrame = null;
          return;
        }

        animationFrame = requestAnimationFrame(renderFrame);
        analyser!.getByteFrequencyData(dataArray);
        
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          let barHeight = dataArray[i] / 2;
          if (barHeight < 0) barHeight = 0; 
          
          const hue = (i / bufferLength) * 360;
          const saturation = 100;
          const lightness = 50 + (barHeight / 255) * 40;
          ctx!.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          
          ctx!.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      }
      renderFrame();
    }
    
    function playVideo(index: number) {
      if (!Array.isArray(videoFiles) || videoFiles.length === 0 || !videoPlayer) return;
      if (typeof index !== 'number' || index < 0 || index >= videoFiles.length) return;
      
      body.classList.add('app-paused');
      
      audioWasPlayingBeforeVideo = isPlaying;
      audioTimeBeforeVideo = audioPlayer.currentTime;
      if (isPlaying) {
        pauseAudio();
        showNotification('Audio pausado automáticamente');
      }
      
      if (currentVideoURL && currentVideoURL.startsWith('blob:')) {
        try { URL.revokeObjectURL(currentVideoURL); } catch (e) {}
      }
      const video = videoFiles[index];
      videoPlayer.src = video.path;
      currentVideoURL = video.path.startsWith('blob:') ? video.path : null;
      videoPlayer.load();
      currentVideoIndex = index;

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        videoPlayer.setAttribute('playsinline', '');
        videoPlayer.setAttribute('webkit-playsinline', '');
        videoPlayer.setAttribute('muted', '');
        videoPlayer.muted = true;
        setTimeout(() => { if (videoPlayer) videoPlayer.muted = false; }, 500);
      }
      videoPlayer.play().then(() => {
        isVideoPlaying = true;
        showNotification(`Reproduciendo: ${video.name}`);
      }).catch(e => {
        showNotification('Error al reproducir video.');
        isVideoPlaying = false;
        closePanel('videoPlayerContainer');
      });
    }

    videoPlayPause?.addEventListener('click', () => {
      if (videoPlayer?.paused) {
        videoPlayer?.play();
      } else {
        videoPlayer?.pause();
      }
    });

    closeVideoButton?.addEventListener('click', () => {
      closePanel('videoPlayerContainer');
    });

    videoPlayer?.addEventListener('ended', () => {
      if (videoLoopMode) {
        videoPlayer.play();
      } else if (videoFiles.length > 1) {
        currentVideoIndex = (currentVideoIndex + 1) % videoFiles.length;
        playVideo(currentVideoIndex);
      } else {
        closePanel('videoPlayerContainer');
      }
    });
    
    videoPlayer?.addEventListener('play', () => { isVideoPlaying = true; if(videoPauseIcon) (videoPauseIcon as HTMLElement).style.display = 'block'; if(videoPlayIcon) (videoPlayIcon as HTMLElement).style.display = 'none'; });
    videoPlayer?.addEventListener('pause', () => { isVideoPlaying = false; if(videoPauseIcon) (videoPauseIcon as HTMLElement).style.display = 'none'; if(videoPlayIcon) (videoPlayIcon as HTMLElement).style.display = 'block'; });
    
    videoLoop?.addEventListener('click', () => {
      videoLoopMode = !videoLoopMode;
      if (videoPlayer) videoPlayer.loop = videoLoopMode;
      videoLoop.classList.toggle('active', videoLoopMode);
      showNotification(`Bucle de video: ${videoLoopMode ? 'Activado' : 'Desactivado'}`);
    });

    videoNext?.addEventListener('click', () => {
      if (videoFiles.length > 1) {
        let newIndex = (currentVideoIndex + 1) % videoFiles.length;
        playVideo(newIndex);
      }
    });

    videoPrev?.addEventListener('click', () => {
      if (videoFiles.length > 1) {
        let newIndex = (currentVideoIndex - 1 + videoFiles.length) % videoFiles.length;
        playVideo(newIndex);
      }
    });

    videoFullscreen?.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoPlayerContainer?.requestFullscreen().catch(err => {
          console.error('Error al activar pantalla completa:', err);
        });
      }
    });

    document.addEventListener('fullscreenchange', () => {
      videoFullscreen?.classList.toggle('active', !!document.fullscreenElement);
    });

    backgroundLoopButton?.addEventListener('click', () => {
      backgroundLoopActive = !backgroundLoopActive;
      backgroundLoopButton.classList.toggle('active', backgroundLoopActive);
      audioPlayer.loop = backgroundLoopActive;
      showNotification(`Bucle de fondo: ${backgroundLoopActive ? 'Activado' : 'Desactivado'}`);
    });
    
    let activePanelId: string | null = null;

    function initializePanelLogic() {
        document.querySelectorAll('[data-panel-id]').forEach(button => {
            button.addEventListener('click', (e) => {
                const panelId = (e.currentTarget as HTMLElement).dataset.panelId;
                if (panelId) {
                    openPanel(panelId);
                }
            });
        });
        
        videoPlayButton?.addEventListener('click', () => {
            if (videoFiles.length > 0) {
                openPanel('videoPlayerContainer');
            } else {
                showNotification('Selecciona un archivo de video primero.');
            }
        });

        document.querySelectorAll('.close-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const panelId = (e.currentTarget as HTMLElement).dataset.panelId || ((e.currentTarget as HTMLElement).id === 'closeVideoButton' ? 'videoPlayerContainer' : null);
                if(panelId) {
                    closePanel(panelId);
                }
            });
        });
    }

    function openPanel(panelId: string) {
        if (activePanelId && activePanelId !== panelId) {
            const currentlyActivePanel = document.getElementById(activePanelId);
            if(currentlyActivePanel) currentlyActivePanel.classList.remove('visible');
        }

        const panelToOpen = document.getElementById(panelId);
        if (!panelToOpen) return;

        body.classList.add('app-paused');

        panelToOpen.classList.add('visible');
        activePanelId = panelId;

        if (panelId === 'videoPlayerContainer' && currentVideoIndex !== -1) {
            playVideo(currentVideoIndex);
        }
        if (panelId === 'equalizerContainer') {
            if (!audioContext) setupEqualizer();
            if (isPlaying && analyser) drawEQVisualizer();
        }
    }

    function closePanel(panelId: string) {
        const panelToClose = document.getElementById(panelId);
        if (!panelToClose) return;

        panelToClose.classList.remove('visible');
        
        if (panelId === 'videoPlayerContainer') {
            videoPlayer?.pause();
            isVideoPlaying = false;
            if (audioWasPlayingBeforeVideo) {
                audioPlayer.currentTime = audioTimeBeforeVideo;
                playAudio();
            }
        }
        
        if (panelId === 'equalizerContainer') {
            if (eqFilters.bass) eqFilters.bass.gain.value = 0;
            if (eqFilters.mid) eqFilters.mid.gain.value = 0;
            if (eqFilters.treble) eqFilters.treble.gain.value = 0;
            if (masterGain) masterGain.gain.value = originalAudioVolume;
            document.querySelectorAll('.eq-range').forEach(s => (s as HTMLInputElement).value = '0');
        }
        
        body.classList.remove('app-paused');
        activePanelId = null;
    }

    function closeAllPanels() {
        if(activePanelId) {
            closePanel(activePanelId);
        }
    }

    function initializeOptimizations() {
      let isAndroid = /Android/i.test(navigator.userAgent);
      if (isAndroid) {
        document.body.style.setProperty('transform', 'translateZ(0)');
        const style = document.createElement('style');
        style.textContent = `
          .particle { animation-duration: 20s !important; }
        `;
        document.head.appendChild(style);
      }
    }

    createParticles();
    updatePlaylistUI();
    updateFavoritesUI();
    initializeOptimizations();
    initializePanelLogic();

  }, []);

  return (
    <>
      <style>{`
        html, body {
          overscroll-behavior: contain;
        }
        :root {
          --bg-color: #121212;
          --text-color: #eee;
          --accent-color: #ff6b00;
          --accent-color-light: #ff8c00;
          --panel-bg: rgba(20, 20, 20, 0.2);
          --shadow-dark: rgba(0,0,0,0.9);
          --shadow-light: rgba(255, 140, 0, 0.8);
          --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          --color-1:  rgba(255, 107, 0, 0.3);
          --color-2:  rgba(64, 224, 208, 0.3);
          --color-3:  rgba(255, 20, 147, 0.3);
          --color-4:  rgba(255, 215, 0, 0.3);
          --color-5:  rgba(220, 20, 60, 0.3);
          --color-6: rgba(0, 250, 154, 0.3);
          --color-7: rgba(255, 160, 122, 0.3);
          --color-8: rgba(30, 144, 255, 0.3);
          --color-9: rgba(128, 0, 128, 0.3);
          --color-10: rgba(255, 228, 181, 0.3);
          --depth-1: 5px;
          --depth-2: 10px;
          --depth-3: 15px;
          --depth-4: 20px;
          --depth-5: 25px;
          --btn-inner-shadow: inset 0 5px 10px rgba(0,0,0,0.5), inset 0 -2px 5px rgba(255,255,255,0.05);
          --btn-hover-shadow: inset 0 0 10px rgba(255, 140, 0, 0.2);
          --btn-active-shadow: inset 0 0 20px var(--accent-color);
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        body {
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          font-family: var(--font-family);
          color: var(--text-color);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          perspective: 2000px;
          overflow: hidden;
          padding: 20px;
          background-size: cover;
          background-position: center;
          position: relative;
          will-change: background;
          -webkit-overflow-scrolling: touch;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          background-color: #1a1a2e;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: auto;
          contain: layout style paint;
          -webkit-transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        body::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          pointer-events: none;
          z-index: -1;
          transform: translateZ(0);
          will-change: transform;
        }
        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, var(--accent-color) 0%, transparent 70%), linear-gradient(45deg, var(--color-1), var(--color-2), var(--color-3), var(--color-4));
          opacity: 0.08;
          z-index: -2;
          animation: tunnelEffect 40s infinite linear;
          animation-play-state: var(--tunnel-animation, running);
          pointer-events: none;
          will-change: transform;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          contain: layout style paint;
        }
        @keyframes tunnelEffect {
          0% { transform: translate(-25%, -25%) rotate(0deg); }
          100% { transform: translate(0%, 0%) rotate(360deg); }
        }
        .player-container {
          background: transparent;
          border-radius: 30px;
          padding: 30px;
          width: 100%;
          max-width: 380px;
          transform-style: preserve-3d;
          transform: rotateX(10deg) rotateY(15deg) translateZ(var(--depth-3));
          animation: float3D 8s ease-in-out infinite;
          backdrop-filter: none !important;
          position: relative;
          z-index: 10;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
          will-change: transform;
          border: none !important;
          contain: layout style paint;
          -webkit-transform: rotateX(10deg) rotateY(15deg) translateZ(var(--depth-3));
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transition: opacity 0.5s ease, visibility 0.5s ease, transform 0.5s ease;
        }
        @keyframes float3D {
          0%, 100% { transform: rotateX(10deg) rotateY(15deg) translateZ(var(--depth-3)) translateY(0); -webkit-transform: rotateX(10deg) rotateY(15deg) translateZ(var(--depth-3)) translateY(0); }
          50% { transform: rotateX(15deg) rotateY(25deg) translateZ(var(--depth-5)) translateY(-15px); -webkit-transform: rotateX(15deg) rotateY(25deg) translateZ(var(--depth-5)) translateY(-15px); }
        }
        .app-paused .player-container {
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            transform: scale(0.8) !important;
        }
        .app-paused .particle,
        .app-paused .player-container *,
        body.app-paused::after {
            animation-play-state: paused !important;
        }
        .panel-container, .video-player-container {
            display: none;
            opacity: 0;
            visibility: hidden;
            z-index: 100;
            transform: translate(-50%, -50%) scale(0.9);
            transition: opacity 0.5s ease, transform 0.5s ease, visibility 0.5s ease;
        }
        .panel-container.visible, .video-player-container.visible {
            display: flex;
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5));
        }
        .video-player-container.visible {
          display: flex;
        }
        .track-info {
          text-align: center;
          margin-bottom: 25px;
          transform: translateZ(var(--depth-4));
          position: relative;
          z-index: 2;
        }
        .track-title {
          font-size: 1.1rem;
          font-weight: 900;
          color: #fff;
          text-shadow: 0 0 10px rgba(255, 107, 0, 0.8);
          letter-spacing: 1px;
          display: block;
          transform: translateZ(var(--depth-5)) rotateX(5deg);
          margin-bottom: 8px;
          padding: 0 !important;
          background: transparent !important;
          border-radius: 15px;
          display: inline-block;
          will-change: transform;
          backdrop-filter: none !important;
          border: none !important;
          transition: color 0.3s ease, opacity 0.3s ease;
        }
        .panel-container.visible ~ .player-container .control-button {
          opacity: 0.5 !important;
          transition: all 0.3s ease !important;
        }
        .track-change {
          animation: trackChange 1s ease-in-out;
        }
        @keyframes trackChange {
          0% { transform: translateZ(var(--depth-5)) rotateX(5deg) translateX(-20px) opacity(0); }
          50% { transform: translateZ(var(--depth-5)) rotateX(5deg) translateX(20px) opacity(1); }
          100% { transform: translateZ(var(--depth-5)) rotateX(5deg) translateX(0) opacity(1); }
        }
        .progress-container {
          position: relative;
          height: 15px;
          background: rgba(0, 0, 0, 0.3) !important;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: var(--btn-inner-shadow);
          margin-bottom: 30px;
          will-change: width;
          backdrop-filter: blur(2px);
          border: none !important;
        }
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-color), var(--accent-color-light));
          width: 0%;
          box-shadow: 0 0 20px var(--accent-color-light);
          position: relative;
          transition: width 0.1s linear;
          will-change: width;
        }
        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,107,0,0.1));
          animation: shine 3s infinite;
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          20% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        .time-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #ddd;
          margin-top: 10px;
          transform: translateZ(var(--depth-2));
          text-shadow: 0 0 5px rgba(0,0,0,0.5);
          will-change: contents;
        }
        .controls {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 40px;
          transform-style: preserve-3d;
        }
        .control-button,
        .action-button,
        .folder-select-button,
        .close-button,
        .eq-preset {
          border: none;
          box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 0 10px rgba(255, 107, 0, 0.5), var(--btn-inner-shadow);
          background: rgba(30, 30, 30, 0.4) !important;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          will-change: transform, box-shadow, background;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0);
          animation: neonPulse 2s infinite alternate;
        }
        .control-button:active,
        .control-button.active {
          border: 2px solid var(--accent-color);
          box-shadow: 0 0 10px var(--accent-color-light);
        }
        @keyframes neonPulse {
          0% { box-shadow: var(--btn-inner-shadow), 0 0 5px rgba(255, 107, 0, 0.2); }
          100% { box-shadow: var(--btn-inner-shadow), 0 0 15px var(--accent-color); }
        }
        .control-button:hover,
        .action-button:hover,
        .folder-select-button:hover,
        .close-button:hover,
        .eq-preset:hover {
          box-shadow: 0 15px 25px rgba(0,0,0,0.7), 0 0 15px rgba(255, 107, 0, 0.6), var(--btn-hover-shadow);
          transform: translateY(-5px) scale(1.05) translateZ(var(--depth-3));
          filter: brightness(1.1);
        }
        .control-button:active,
        .action-button:active,
        .folder-select-button:active,
        .close-button:active,
        .eq-preset:active,
        .eq-preset.active {
          transform: translateY(8px) scale(0.95) translateZ(var(--depth-1));
          box-shadow: var(--btn-active-shadow), inset 0 0 15px rgba(0,0,0,0.5);
          filter: brightness(0.9);
          animation: none;
        }
        .control-button svg,
        .action-button svg,
        .folder-select-button svg,
        .close-button svg {
          fill: var(--accent-color);
          filter: drop-shadow(0 0 5px var(--accent-color-light));
        }
        .folder-select-button {
          margin: 15px auto 0;
          padding: 12px 20px;
          font-weight: 800;
          font-size: 0.9rem;
          color: var(--accent-color);
          background: var(--color-3);
          border-radius: 40px;
          width: 100%;
          max-width: 280px;
          text-align: center;
          justify-content: center;
          gap: 15px;
          box-shadow: var(--btn-inner-shadow);
          will-change: transform;
          border: 1px solid rgba(255, 255, 255, 0);
        }
        .eq-presets {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .eq-preset {
          padding: 8px 15px;
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          color: var(--text-color);
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: var(--btn-inner-shadow);
          will-change: transform;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .eq-preset:hover {
          background: var(--accent-color);
          color: #121212;
        }
        .style-holographic {
          background: linear-gradient(45deg, rgba(255, 107, 0, 0.3), rgba(0, 191, 255, 0.3), rgba(255, 20, 147, 0.3), rgba(255, 107, 0, 0.3)) !important;
          background-size: 400% 400% !important;
          animation: holographicShift 3s ease-in-out infinite !important;
          border: 2px solid rgba(255, 255, 255, 0.3) !important;
        }
        .style-3d-elevated {
          transform: translateZ(20px) rotateX(10deg) rotateY(15deg);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 15px 30px rgba(255, 107, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 107, 0, 0.4) !important;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .style-3d-elevated:hover {
          transform: translateZ(30px) rotateX(15deg) rotateY(20deg) scale(1.05);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 20px 40px rgba(255, 107, 0, 0.7), inset 0 0 30px rgba(255, 255, 255, 0.2), 0 0 40px rgba(255, 107, 0, 0.6) !important;
          filter: brightness(1.2);
        }
        .style-3d-elevated:active {
          transform: translateZ(10px) rotateX(5deg) rotateY(10deg) scale(0.95);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 5px 15px rgba(255, 107, 0, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 107, 0, 0.3) !important;
        }
        .control-button,
        .action-button,
        .folder-select-button,
        .eq-preset {
            pointer-events: auto !important;
        }
        .control-button > *,
        .action-button > *,
        .folder-select-button > *,
        .close-button > *,
        .eq-preset > * {
            pointer-events: auto;
        }
        .style-magic::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, var(--accent-color), rgba(148, 0, 211, 0.8), rgba(0, 191, 255, 0.8), var(--accent-color)) !important;
          background-size: 400% 400% !important;
          animation: magicBorder 2s ease-in-out infinite !important;
          border-radius: inherit !important;
          z-index: -1 !important;
        }
        @keyframes magicBorder {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .eq-preset:active {
          box-shadow: var(--btn-active-shadow);
        }
        .notification {
          position: fixed;
          top: 25px;
          right: 25px;
          background: transparent !important;
          color: transparent !important;
          padding: 0 !important;
          border-radius: 0 !important;
          border-left: none !important;
          box-shadow: none !important;
          z-index: 1000 !important;
          display: flex !important;
          align-items: center;
          opacity: 0;
          pointer-events: none;
          backdrop-filter: none !important;
          font-weight: 800;
          transform-style: preserve-3d;
          will-change: transform;
          transition: opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 0);
          transform: translateZ(var(--depth-4));
        }
        .video-player-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 90vw;
          max-width: 900px;
          height: 70vh;
          background: transparent !important;
          border-radius: 25px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-style: preserve-3d;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          z-index: 10000 !important;
          border: 2px solid rgba(255, 107, 0, 0.3) !important;
          box-shadow: none !important;
          will-change: transform, opacity;
          pointer-events: none !important;
          -webkit-transform: translate(-50%, -50%) scale(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          isolation: isolate;
        }
        @media (max-width: 480px) {
          .control-button,
          .action-button {
            width: 70px;
            height: 70px;
          }
        }
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: floatParticle 15s infinite linear;
          will-change: transform;
          contain: layout style paint;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transition: opacity 0.5s ease, animation-play-state 0.3s ease;
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0) translateZ(0); -webkit-transform: translateY(0) translateX(0) translateZ(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(100px) translateZ(50px); -webkit-transform: translateY(-100vh) translateX(100px) translateZ(50px); opacity: 0; }
        }
        .playlist-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          position: sticky;
          top: 0;
          background: rgba(0, 0, 0, 0);
          z-index: 101;
          transform: translateZ(var(--depth-4));
          backdrop-filter: none !important;
          border-radius: 20px 20px 0 0;
          padding: 15px 20px;
        }
        .playlist-title {
          font-size: 1.4rem;
          font-weight: 900;
          color: var(--accent-color);
          text-shadow: 0 0 10px var(--accent-color-light), 3px 3px 0 rgba(0,0,0,0.7), 6px 6px 8px rgba(0,0,0,0.5);
          transform: translateZ(var(--depth-4));
          display: inline-block;
          letter-spacing: 1px;
          will-change: transform;
        }
        .close-button {
          background: rgba(30,30,30,0.5);
          border: none;
          cursor: pointer;
          padding: 10px;
          border-radius: 50%;
          transition: background 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateZ(var(--depth-3));
          will-change: transform;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .close-button:hover {
          background: rgba(255,255,255,0.2);
        }
        .close-button svg {
          width: 24px;
          height: 24px;
          fill: var(--text-color);
        }
        .playlist-item {
          padding: 15px 20px;
          cursor: pointer;
          margin-bottom: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border-radius: 15px;
          display: flex;
          align-items: center;
          transform-style: preserve-3d;
          position: relative;
          background: rgba(30, 30, 30, 0);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          transform: translateZ(var(--depth-2)) rotateX(5deg);
          transition: all 0.3s ease;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translate3d(0,0,0);
          contain: layout style paint;
          pointer-events: auto;
          touch-action: manipulation;
        }
        .playlist-item span {
          display: block;
          text-shadow: 1px 1px 0 rgba(0,0,0,0.7), 2px 2px 3px rgba(0,0,0,0.5);
          transform: translateZ(var(--depth-1));
          letter-spacing: 0.5px;
          font-weight: 600;
          color: #ddd;
          transition: all 0.3s ease;
          will-change: transform;
        }
        .playlist-item:hover {
          background: rgba(255, 140, 0, 0);
          transform: translateZ(var(--depth-4)) rotateX(10deg);
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
        .playlist-item:hover span {
          color: #fff;
          text-shadow: 0 0 8px var(--accent-color-light), 2px 2px 0 rgba(0,0,0,0.8), 4px 4px 6px rgba(0,0,0,0.6);
        }
        .playlist-item.active {
          background: none !important;
          transform: translateZ(var(--depth-5)) rotateX(15deg);
          box-shadow: 0 15px 30px rgba(255,107,0,0.5);
        }
        .playlist-item.active span {
          color: #000;
          font-weight: 700;
          text-shadow: 0 0 5px rgba(255,255,255,0.5), 1px 1px 0 rgba(255,255,255,0.3);
        }
        .panel-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          background: transparent !important;
          backdrop-filter: none !important;
          border: none !important;
          width: 90%;
          max-width: 500px;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 20px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.8);
          backdrop-filter: blur(15px) !important;
          max-height: 80vh;
          overflow-y: scroll !important;
          overflow-x: hidden !important;
          padding: 25px;
          display: none;
          transform-style: preserve-3d;
          z-index: 100;
          opacity: 0;
          will-change: transform;
          border: none !important;
          isolation: isolate;
          flex-direction: column;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
        .video-controls {
          display: flex;
          justify-content: center;
          gap: 15px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .notification.show {
          opacity: 1;
          color: initial;
          pointer-events: auto;
          transform: translateX(0) rotateY(0deg) translateZ(var(--depth-5)); 
        }
        .notification.hide {
          opacity: 0;
          color: transparent;
          pointer-events: none;
          transform: translateZ(var(--depth-4));
        }
        .notification svg {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .favorite-active svg {
          fill: var(--accent-color) !important;
          filter: drop-shadow(0 0 8px var(--accent-color-light)) !important;
        }
        #equalizerContainer {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 90%;
          max-width: 500px;
          background: rgba(0, 0, 0, 0.05);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1000;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.8);
          backdrop-filter: blur(20px);
          transform-style: preserve-3d;
          border: none !important;
        }
        #eqControls {
          display: flex;
          flex-direction: column;
          gap: 20px;
          transform: translateZ(var(--depth-2));
        }
        #eqVisualizer {
          width: 100%;
          height: 120px;
          background: rgba(0,0,0,0);
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0);
        }
        .eq-sliders {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }
        .eq-slider {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }
        .eq-slider label {
          font-size: 1rem;
          color: #ddd;
          text-shadow: 0 0 5px rgba(0,0,0,0.5);
        }
        .eq-range {
          width: 100%;
          height: 25px;
          -webkit-appearance: none;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          outline: none;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0);
        }
        .eq-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 25px;
          height: 25px;
          background: var(--accent-color);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255,107,0,0.8);
          border: 2px solid rgba(255,255,255,0.8);
          transform: translateZ(var(--depth-2));
          transition: all 0.2s ease;
        }
        .eq-range::-webkit-slider-thumb:hover {
          transform: scale(1.1) translateZ(var(--depth-3));
          box-shadow: 0 0 15px rgba(255,107,0,1);
        }
        .eq-presets {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 20px;
        }
        .eq-preset {
          padding: 10px 20px;
          background: rgba(255,255,255,0.15);
          border-radius: 20px;
          color: var(--text-color);
          cursor: pointer;
          transition: background 0.3s;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .eq-preset:hover {
          background: var(--accent-color);
          color: #000;
        }
        @keyframes colorCycle {
          0%    { background-color: var(--color-1); }
          10% { background-color: var(--color-2); }
          20% { background-color: var(--color-3); }
          30% { background-color: var(--color-4); }
          40% { background-color: var(--color-5); }
          50%   { background-color: var(--color-6); }
          60% { background-color: var(--color-7); }
          70% { background-color: var(--color-8); }
          80%   { background-color: var(--color-9); }
          90% { background-color: var(--color-10); }
          100%  { background-color: var(--color-1); }
        }
        .color-cycling {
          animation: colorCycle 60s infinite;
        }
        input[type="file"] {
          display: none;
        }
        .control-button {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--color-1);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(var(--depth-2));
          animation: colorCycle 20s infinite;
          will-change: transform;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .control-button:active, .control-button.active {
          border: 2px solid var(--accent-color);
          box-shadow: 0 0 10px var(--accent-color-light);
        }
        .control-button:hover {
          transform: translateZ(var(--depth-3)) translateY(-5px);
          box-shadow: var(--btn-hover-shadow);
        }
        .control-button:active,
        .control-button.active {
          transform: translateZ(var(--depth-1)) translateY(10px);
          box-shadow: var(--btn-active-shadow);
        }
        .control-button svg {
          width: 45%;
          height: 45%;
          fill: var(--accent-color);
          filter: drop-shadow(0 0 5px var(--accent-color-light));
        }
        .action-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 25px;
          transform-style: preserve-3d;
        }
        .action-button {
          width: 100%;
          height: 65px;
          border-radius: 50%;
          background: var(--color-2);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(var(--depth-2));
          animation: colorCycle 20s infinite;
          will-change: transform;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .action-button:hover {
          transform: translateZ(var(--depth-3)) translateY(-5px);
          box-shadow: 0 0 15px rgba(255,107,0,0.8);
        }
        .action-button:active,
        .action-button.active {
          transform: translateY(8px) translateZ(var(--depth-2)) !important;
          background: inherit !important;
          color: inherit !important;
          box-shadow: var(--btn-active-shadow);
        }
        .action-button svg {
          width: 55%;
          height: 55%;
          fill: currentColor;
          filter: drop-shadow(0 0 4px var(--accent-color-light));
        }
        .folder-select-button,
        .background-select-button,
        .video-select-button {
          margin: 15px auto 0;
          padding: 12px 20px;
          border-radius: 40px;
          font-weight: 800;
          font-size: 0.9rem;
          color: var(--accent-color);
          background: var(--color-3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          transform-style: preserve-3d;
          position: relative;
          transform: translateZ(var(--depth-2));
          width: 100%;
          max-width: 280px;
          z-index: 2;
          will-change: transform;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .folder-select-button:hover,
        .background-select-button:hover,
        .video-select-button:hover {
          transform: translateZ(var(--depth-3)) translateY(-5px);
          box-shadow: 0 0 15px rgba(255,107,0,0.8);
        }
        .folder-select-button:active,
        .background-select-button:active,
        .video-select-button:active,
        .folder-select-button.active,
        .background-select-button.active,
        .video-select-button.active {
          transform: translateZ(var(--depth-1)) translateY(8px);
          background: var(--accent-color);
          color: #000;
          box-shadow: var(--btn-active-shadow);
        }
        .folder-select-button svg,
        .background-select-button.svg,
        .video-select-button.svg {
          width: 24px;
          height: 24px;
          fill: currentColor;
          filter: drop-shadow(0 0 5px var(--accent-color-light));
        }
        .video-player-container {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 90vw;
          max-width: 900px;
          height: 70vh;
          background: rgba(0, 0, 0, 0.95);
          border-radius: 25px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-style: preserve-3d;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 10000 !important;
          border: 2px solid rgba(255, 107, 0, 0.3) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.9), 0 0 30px rgba(255, 107, 0, 0.5), inset 0 0 20px rgba(255, 107, 0, 0.1);
          will-change: transform, opacity;
          pointer-events: none !important;
          visibility: hidden !important;
          -webkit-transform: translate(-50%, -50%) scale(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          isolation: isolate;
        }
        .video-controls {
          display: flex;
          justify-content: center;
          gap: 15px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        @media (max-width: 480px) {
          .player-container { padding: 20px; max-width: 340px; }
          .control-button { width: 70px; height: 70px; }
          .action-button { width: 55px; height: 55px; }
          .action-buttons { grid-template-columns: repeat(3, 1fr); gap: 10px; }
          .folder-select-button,
          .background-select-button,
          .video-select-button { font-size: 0.8rem; padding: 10px 15px; }
          .track-title { font-size: 1rem; }
        }
        #eqVisualizer {
          width: 100%;
          height: 120px;
          background: rgba(0, 0, 0, 0);
          border-radius: 10px;
          margin-bottom: 20px;
          display: block;
        }
        @keyframes floatMultiDirection {
          0% { transform: translate(0, 0) rotate(0deg); -webkit-transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(5px, -5px) rotate(2deg); -webkit-transform: translate(5px, -5px) rotate(2deg); }
          50% { transform: translate(-5px, 5px) rotate(-2deg); -webkit-transform: translate(-5px, 5px) rotate(-2deg); }
          75% { transform: translate(5px, 5px) rotate(1deg); -webkit-transform: translate(5px, 5px) rotate(1deg); }
          100% { transform: translate(0, 0) rotate(0deg); -webkit-transform: translate(0, 0) rotate(0deg); }
        }
        .control-button,
        .action-button,
        .folder-select-button,
        .close-button,
        .eq-preset {
          animation-name: floatMultiDirection;
          animation-duration: 4s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          contain: layout style paint;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .control-button:nth-of-type(1) { animation-delay: 0s; }
        .control-button:nth-of-type(2) { animation-delay: 0.6s; }
        .control-button:nth-of-type(3) { animation-delay: 1.2s; }
        .action-button:nth-of-type(1) { animation-delay: 0.3s; }
        .action-button:nth-of-type(2) { animation-delay: 0.9s; }
        .action-button:nth-of-type(3) { animation-delay: 1.5s; }
        .action-button:nth-of-type(4) { animation-delay: 2.1s; }
        .action-button:nth-of-type(5) { animation-delay: 2.7s; }
        .action-button:nth-of-type(6) { animation-delay: 3.3s; }
        .action-button:nth-of-type(7) { animation-delay: 3.9s; }
        .folder-select-button:nth-of-type(1) { animation-delay: 0.45s; }
        .folder-select-button:nth-of-type(2) { animation-delay: 1.05s; }
        .folder-select-button:nth-of-type(3) { animation-delay: 1.65s; }
        .close-button:nth-of-type(1) { animation-delay: 0.15s; }
        .close-button:nth-of-type(2) { animation-delay: 0.75s; }
        .close-button:nth-of-type(3) { animation-delay: 1.35s; }
        .eq-preset:nth-of-type(1) { animation-delay: 0.2s; }
        .eq-preset:nth-of-type(2) { animation-delay: 0.8s; }
        .eq-preset:nth-of-type(3) { animation-delay: 1.4s; }
        .eq-preset:nth-of-type(4) { animation-delay: 2.0s; }
        #playlistContainer,
        #favoritesContainer {
          background: rgba(0, 0, 0, 0) !important;
          backdrop-filter: none !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.8) !important;
          overflow-y: scroll !important;
          overflow-x: hidden !important;
          -webkit-overflow-scrolling: touch !important;
          overscroll-behavior: contain !important;
        }
        #playlistContent,
        #favoritesContent {
          min-height: 200px;
          overflow: visible !important;
          -webkit-overflow-scrolling: touch;
          pointer-events: auto;
        }
        .control-button:active,
        .action-button:active,
        .folder-select-button:active,
        .close-button:active,
        .eq-preset:active,
        .eq-preset.active {
          box-shadow: var(--btn-active-shadow);
          background: var(--accent-color) !important;
          color: #000 !important;
          filter: brightness(0.9);
          transform: translateY(8px);
        }
        @keyframes trackChange {
          0% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(180deg) scale(0.8); }
          100% { transform: rotateY(360deg) scale(1); }
        }
        .track-change {
          animation: trackChange 1s ease-in-out;
        }
        .control-button::after,
        .action-button::after,
        .folder-select-button::after,
        .close-button::after,
        .eq-preset::after {
          content: '';
          position: absolute;
          top: -10%;
          left: -10%;
          width: 30%;
          height: 30%;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: rotate(45deg);
          pointer-events: none;
        }
        .player-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent !important;
          pointer-events: none !important;
          z-index: -1;
          opacity: 0;
          transition: none !important;
        }
        .player-container:hover::before {
          opacity: 1;
        }
        .audio-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          background: var(--accent-color);
          box-shadow: 0 0 10px var(--accent-color);
          opacity: 0.7;
          animation: audioPulse 1s forwards;
        }
        @keyframes audioPulse {
          0% { transform: scale(0); opacity: 0.7; }
          100% { transform: scale(2); opacity: 0; }
        }
        audio,
        video,
        .player-container,
        .panel-container,
        #equalizerContainer,
        #playlistContainer,
        #favoritesContainer {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        body {
          position: relative;
          z-index: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        body::before {
          content: "";
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1000');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.4;
          z-index: -1;
          pointer-events: none;
          transform: translateZ(0);
          will-change: transform;
          -webkit-transform: translateZ(0);
          background-color: #1a1a2e;
        }
        .infinite-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -3;
          pointer-events: none;
          overflow: hidden;
          transform: translateZ(0);
          will-change: transform;
          -webkit-transform: translateZ(0);
        }
        .infinite-background img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.5s ease;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: opacity, transform;
          max-width: 100%;
          max-height: 100%;
          min-width: 100%;
          min-height: 100%;
          background-color: transparent;
        }
        .infinite-background img.active {
          opacity: 1;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .infinite-background img.preload {
          opacity: 0;
          transform: scale(1.01) translateZ(0);
        }
        @media (max-width: 480px) {
          #equalizerContainer { padding: 15px; max-height: 90vh; max-width: 90%; }
          .eq-sliders { gap: 15px; }
          .eq-slider label { font-size: 0.9rem; }
          .eq-preset { padding: 8px 15px; font-size: 0.9rem; }
          #eqVisualizer { height: 100px; }
        }
        .progress-bar {
          transform-origin: left;
          transform: scaleX(0);
          width: 100% !important;
          transition: transform 0.1s linear;
        }
        .panel-container.visible {
          overflow-y: scroll !important;
          overflow-x: hidden !important;
          -webkit-overflow-scrolling: touch !important;
          overscroll-behavior: contain !important;
          touch-action: pan-y;
        }
        @media (max-width: 768px) {
          .panel-container { max-height: 70vh !important; overflow-y: scroll !important; -webkit-overflow-scrolling: touch !important; }
          #playlistContent, #favoritesContent { min-height: 150px; padding-bottom: 20px; }
          .playlist-item { padding: 12px 15px; margin-bottom: 8px; touch-action: manipulation; -webkit-tap-highlight-color: rgba(255, 107, 0, 0.3); }
        }
        #backgroundLoopButton {
          display: none !important;
        }
        #backgroundLoopButton {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          z-index: 1000;
          background: rgba(30, 30, 30, 0.7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
        }
        #backgroundLoopButton svg {
          width: 60%;
          height: 60%;
          fill: var(--accent-color);
        }
        #backgroundLoopButton.active svg {
          fill: var(--accent-color-light);
          filter: drop-shadow(0 0 5px var(--accent-color));
        }
        .glow { animation: glowEffect 2s infinite alternate; }
        @keyframes glowEffect { 0% { box-shadow: 0 0 10px rgba(255, 107, 0, 0.5); } 100% { box-shadow: 0 0 30px rgba(255, 107, 0, 1); } }
        .pulse { animation: pulseEffect 1.5s infinite; }
        @keyframes pulseEffect { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .rotate-3d { animation: rotate3d 10s infinite linear; }
        @keyframes rotate3d { 0% { transform: rotateX(0) rotateY(0); } 25% { transform: rotateX(10deg) rotateY(45deg); } 50% { transform: rotateX(0) rotateY(90deg); } 75% { transform: rotateX(-10deg) rotateY(135deg); } 100% { transform: rotateX(0) rotateY(180deg); } }
        .panel-container:hover { transform: translate(-50%, -50%) translateZ(var(--depth-5)) rotateX(5deg) rotateY(5deg) !important; box-shadow: 0 40px 80px rgba(0,0,0,0.9), 0 0 30px rgba(255, 107, 0, 0.6) !important; }
        .glass-effect { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background: rgba(40, 40, 40, 0.25) !important; border: 1px solid rgba(255, 255, 255, 0.18) !important; }
        .holographic-effect { background: linear-gradient(135deg, rgba(255, 107, 0, 0.1), rgba(0, 191, 255, 0.1), rgba(50, 205, 50, 0.1), rgba(255, 20, 147, 0.1)) !important; box-shadow: 0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.1); }
        .sonic-wave { position: absolute; border-radius: 50%; border: 2px solid var(--accent-color); transform: scale(0); opacity: 1; pointer-events: none; animation: sonicWave 1.5s ease-out; }
        @keyframes sonicWave { to { transform: scale(3); opacity: 0; } }
        .energy-particle { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--accent-color); pointer-events: none; animation: energyParticle 2s ease-out forwards; }
        @keyframes energyParticle { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(calc(var(--tx) * 100px), calc(var(--ty) * 100px)) scale(0); opacity: 0; } }
        .audio-distortion { animation: audioDistortion 0.1s infinite alternate; }
        @keyframes audioDistortion { 0% { filter: drop-shadow(0 0 5px var(--accent-color)); } 100% { filter: drop-shadow(0 0 15px var(--accent-color)) hue-rotate(20deg); } }
        .track-transition { animation: trackTransition 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both; }
        @keyframes trackTransition { 0% { opacity: 0; transform: translateY(50px) rotateX(45deg); } 100% { opacity: 1; transform: translateY(0) rotateX(0); } }
        .hologram-appear { animation: hologramAppear 1s ease-out both; }
        @keyframes hologramAppear { 0% { opacity: 0; transform: translateY(30px) scale(0.9) rotateX(60deg); filter: blur(10px); } 100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0); filter: blur(0); } }
        .rhythmic-pulse { animation: rhythmicPulse 2s infinite ease-in-out; }
        @keyframes rhythmicPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .progress-container { position: relative; height: 10px; background: rgba(0, 0, 0, 0.3); border-radius: 5px; overflow: hidden; box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4); }
        .progress-bar { height: 100%; background: linear-gradient(90deg, var(--accent-color), var(--accent-color-light), #fff); box-shadow: 0 0 10px var(--accent-color-light), inset 0 -2px 5px rgba(255, 255, 255, 0.2); transition: transform 0.1s linear; }
        .control-button { position: relative; overflow: visible; }
        .control-button::before { content: ''; position: absolute; top: -5px; left: -5px; right: -5px; bottom: -5px; border-radius: 50%; border: 2px solid var(--accent-color); opacity: 0; transition: all 0.3s ease; }
        .control-button:hover::before { opacity: 0.5; top: -8px; left: -8px; right: -8px; bottom: -8px; }
        .playlist-item { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .playlist-item::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--accent-color); transform: scaleY(0); transform-origin: top; transition: transform 0.3s ease; }
        .playlist-item:hover::before { transform: scaleY(1); }
        #eqVisualizer { background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)); border: 1px solid rgba(255, 255, 255, 0.1); }
        .player-container { background: transparent !important; border: none !important; }
        .video-player-container:not(.visible) { transform: translate(-50%, -50%) scale(0) !important; -webkit-transform: translate(-50%, -50%) scale(0) !important; opacity: 0 !important; visibility: hidden !important; display: none !important; z-index: -1 !important; pointer-events: none !important; animation: none !important; transition: none !important; }
        .video-player-container.closing { transform: translate(-50%, -50%) scale(0) !important; -webkit-transform: translate(-50%, -50%) scale(0) !important; opacity: 0 !important; visibility: hidden !important; display: none !important; z-index: -1 !important; pointer-events: none !important; animation: none !important; transition: none !important; }
        .control-button:not(.close-button),
        .action-button,
        .folder-select-button,
        .eq-preset {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%) !important;
          border: 2px solid var(--accent-color) !important;
          position: relative;
          overflow: visible !important;
        }
        .close-button {
          clip-path: none !important;
          position: relative;
          overflow: visible !important;
        }
        .panel-container { clip-path: none !important; overflow: visible !important; }
        #playlistContainer, #favoritesContainer, #equalizerContainer, .video-player-container { clip-path: none !important; overflow: visible !important; }
        #playlistContainer.visible,
        #favoritesContainer.visible {
          overflow-y: scroll !important;
          overflow-x: hidden !important;
          -webkit-overflow-scrolling: touch !important;
          overscroll-behavior: contain !important;
          touch-action: pan-y !important;
        }
        #playlistContent,
        #favoritesContent {
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch !important;
          overscroll-behavior: contain !important;
          touch-action: pan-y !important;
          min-height: 200px;
          padding-bottom: 20px;
        }
        .control-button::after,
        .action-button::after,
        .folder-select-button::after,
        .close-button::after,
        .eq-preset::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          z-index: -1;
          pointer-events: none;
          animation: colorCycle 20s infinite linear;
          opacity: 0.7;
        }
        .transparent-text {
          opacity: 0 !important;
          color: transparent !important;
          transition: opacity 0.3s ease, color 0.3s ease;
        }
        .depth-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: depthPulse 1s ease-out;
          z-index: -1;
        }
        @keyframes depthPulse {
          0% { transform: translateZ(0px); opacity: 1; }
          100% { transform: translateZ(50px); opacity: 0; }
        }
      `}</style>
      <div className="infinite-background" id="infiniteBackground"></div>
      <div className="particles" id="particles"></div>
      
      <button id="backgroundLoopButton" className="color-cycling" aria-label="Bucle de audio">
        <svg viewBox="0 0 24 24"><path d="M12 4V1l-4 4 4 4V6c3.31 0 6 2.69 6 6 0 1-.25 1.97-.7 2.8l1.46 1.46C19.53 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1 .25-1.97.7-2.8L5.24 7.74C4.47 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
      </button>

      <div className="player-container glass-effect holographic-effect" id="playerContainer">
        <div className="track-info">
          <div className="track-title track-transition" id="trackTitle">Selecciona un audio</div>
        </div>
        <div className="progress-container" id="progressBarContainer">
          <div className="progress-bar" id="progressBar"></div>
        </div>
        <div className="time-info">
          <span id="currentTime">0:00</span>
          <span id="duration">0:00</span>
        </div>
        <div className="controls">
          <button className="control-button color-cycling" id="prevButton" aria-label="Anterior">
            <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          <button className="control-button color-cycling glow pulse" id="playPauseButton" aria-label="Reproducir/Pausar">
            <svg viewBox="0 0 24 24"><path id="playPauseIcon" d="M8 5v14l11-7z"/></svg>
          </button>
          <button className="control-button color-cycling" id="nextButton" aria-label="Siguiente">
            <svg viewBox="0 0 24 24"><path d="M16 18h2V6h-2zm-2-14v14H6V4h8zm-2 14V4h-4v14h4z"/></svg>
          </button>
        </div>
        <div className="action-buttons">
          <button className="action-button color-cycling" id="loopButton" aria-label="Repetir">
            <svg viewBox="0 0 24 24"><path id="loopIcon" d="M12 4V1l-4 4 4 4V6c3.31 0 6 2.69 6 6 0 1-.25 1.97-.7 2.8l1.46 1.46C19.53 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1 .25-1.97.7-2.8L5.24 7.74C4.47 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
          </svg>
          </button>
          <button className="action-button color-cycling" data-panel-id="favoritesContainer" aria-label="Mostrar Favoritos">
            <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/> </svg>
          </button>
          <button className="action-button color-cycling" id="favoritesButton" aria-label="Agregar/Quitar Favorito">
            <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </button>
          <button className="action-button color-cycling" data-panel-id="playlistContainer" aria-label="Mostrar Lista de Reproducción">
            <svg viewBox="0 0 24 24"><path d="M4 14h6v-2H4v2zm0 5h6v-2H4v2zm0-10h12V7H4v2zm14 0h2V7h-2v2zm0 5h2v-2h-2v2zm0 5h2v-2h-2v2z"/></svg>
          </button>
          <button className="action-button color-cycling" data-panel-id="equalizerContainer" aria-label="Ecualizador">
            <svg viewBox="0 0 24 24"><path d="M10 20H8V4h2v16zm6-16h-2v16h2V4z"/></svg>
          </button>
          <button className="action-button color-cycling" id="videoPlayButton" aria-label="Reproducir Video">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5V7l6 4.5-6 4.5z"/></svg>
          </button>
        </div>
        <button className="folder-select-button color-cycling" id="selectFolderButton">
          <svg viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
          Audios
        </button>
        <input type="file" id="folderInput" multiple accept="audio/*" webkitdirectory="" directory="" />
        <button className="folder-select-button color-cycling" id="selectVideoButton">
          <svg viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
          Video
        </button>
        <input type="file" id="videoInput" multiple accept="video/*" />
        <button className="folder-select-button color-cycling" id="selectBackgroundButton">
          <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H5V5h14v14z"/><path d="M8.5 13.5l2.5 3.01L14.5 12 8.5 13.5z"/></svg>
          Fondo
        </button>
        <input type="file" id="backgroundInput" accept="image/*" multiple style={{display: 'none'}} />
        
        <div className="background-controls" id="backgroundControls" style={{display: 'none', marginTop: '15px', textAlign: 'center'}}>
          <button className="action-button color-cycling" id="prevBackgroundButton" style={{width: '50px', height: '50px', margin: '0 5px'}} title="Fondo anterior">
            <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <button className="action-button color-cycling" id="pauseBackgroundButton" style={{width: '50px', height: '50px', margin: '0 5px'}} title="Pausar/Reanudar fondo">
            <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </button>
          <button className="action-button color-cycling" id="nextBackgroundButton" style={{width: '50px', height: '50px', margin: '0 5px'}} title="Siguiente fondo">
            <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
      </div>

        <div className="panel-container glass-effect" id="playlistContainer">
          <div className="playlist-header">
            <div className="playlist-title">Lista de Reproducción</div>
            <button className="close-button" data-panel-id="playlistContainer" aria-label="Cerrar lista">
              <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 12 19 6.41z"/></svg>
            </button>
          </div>
          <div id="playlistContent"></div>
        </div>

        <div className="panel-container glass-effect" id="favoritesContainer">
          <div className="playlist-header">
            <div className="playlist-title">Tus Favoritos</div>
            <button className="close-button" data-panel-id="favoritesContainer" aria-label="Cerrar favoritos">
              <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 12 19 6.41z"/></svg>
            </button>
          </div>
          <div id="favoritesContent"></div>
        </div>

        <div className="panel-container glass-effect" id="equalizerContainer">
          <div className="playlist-header">
            <div className="playlist-title">Ecualizador</div>
            <button className="close-button" data-panel-id="equalizerContainer" aria-label="Cerrar ecualizador">
              <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 12 19 6.41z"/></svg>
            </button>
          </div>
          <div id="eqControls">
            <canvas id="eqVisualizer" width="300" height="100"></canvas>
            <div className="eq-sliders">
              <div className="eq-slider">
                <label>Bajos</label>
                <input type="range" min="-20" max="20" defaultValue="0" className="eq-range" data-band="bass" />
              </div>
              <div className="eq-slider">
                <label>Medios</label>
                <input type="range" min="-20" max="20" defaultValue="0" className="eq-range" data-band="mid" />
              </div>
              <div className="eq-slider">
                <label>Agudos</label>
                <input type="range" min="-20" max="20" defaultValue="0" className="eq-range" data-band="treble" />
              </div>
            </div>
            <div className="eq-presets">
              <button className="eq-preset" data-preset="flat">Plano</button>
              <button className="eq-preset" data-preset="pop">Pop</button>
              <button className="eq-preset" data-preset="rock">Rock</button>
              <button className="eq-preset" data-preset="jazz">Jazz</button>
            </div>
          </div>
        </div>

        <div className="notification" id="notification" role="alert" aria-live="assertive">
          <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <span id="notificationText">Notificación</span>
        </div>

        <div className="video-player-container glass-effect" id="videoPlayerContainer">
          <button className="close-button" id="closeVideoButton" aria-label="Cerrar video">
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 12 19 6.41z"/></svg>
          </button>
          <div style={{flexGrow:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
            <video id="videoElement" style={{width:'100%', height:'100%', objectFit:'contain'}} playsInline></video>
          </div>
          <div className="video-controls">
            <button className="action-button color-cycling" id="videoLoop" title="Bucle">
              <svg viewBox="0 0 24 24"><path d="M12 4V1l-4 4 4 4V6c3.31 0 6 2.69 6 6 0 1-.25 1.97-.7 2.8l1.46 1.46C19.53 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1 .25-1.97.7-2.8L5.24 7.74C4.47 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
            </button>
            <button className="action-button color-cycling" id="videoPrev" title="Anterior">
              <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
            </button>
            <button className="action-button color-cycling" id="videoPlayPause" title="Play/Pausa">
              <svg id="videoPlayIcon" viewBox="0 0 24 24" style={{display:'none'}}><path d="M8 5v14l11-7z"/></svg>
              <svg id="videoPauseIcon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>
            <button className="action-button color-cycling" id="videoNext" title="Siguiente">
              <svg viewBox="0 0 24 24"><path d="M16 18h2V6h-2zm-2-14v14H6V4h8zm-2 14V4h-4v14h4z"/></svg>
            </button>
            <button className="action-button color-cycling" id="videoFullscreen" title="Pantalla completa">
              <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7l-2-2v5zm12 7h-3v2h5V7h-2v3h-4V7l4-4 4 h4v10zm-6-9V3h-4v2h4v3zm12 14h-5v-2h2v-3h3v5zm-12 0h-3v2h5v-5h-2v3z"/></svg>
            </button>
          </div>
        </div>
    </>
  );
}

