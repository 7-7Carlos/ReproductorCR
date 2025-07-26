<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="theme-color" content="#ff6b00" />
  <title>Carlos</title>
  <style>
    html, body {
      overscroll-behavior: contain;
    }
    
    /* === Variables CSS === */
    :root {
      --bg-color: #121212;
      --text-color: #eee;
      --accent-color: #ff6b00;
      --accent-color-light: #ff8c00;
      --panel-bg: rgba(20, 20, 20, 0.2);
      --shadow-dark: rgba(0,0,0,0.9);
      --shadow-light: rgba(255, 140, 0, 0.8);
      --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

      /* 10 colores completamente diferentes */
      --color-1:  rgba(255, 107, 0, 0.3);     /* naranja brillante */
      --color-2:  rgba(64, 224, 208, 0.3);    /* turquesa */
      --color-3:  rgba(255, 20, 147, 0.3);    /* fucsia */
      --color-4:  rgba(255, 215, 0, 0.3);     /* amarillo oro */
      --color-5:  rgba(220, 20, 60, 0.3);     /* rojo carmín */
      --color-6: rgba(0, 250, 154, 0.3);     /* verde menta */
      --color-7: rgba(255, 160, 122, 0.3);   /* salmón claro */
      --color-8: rgba(30, 144, 255, 0.3);    /* azul dodger */
      --color-9: rgba(128, 0, 128, 0.3);     /* púrpura */
      --color-10: rgba(255, 228, 181, 0.3);   /* beige claro */

      /* Profundidad para efectos 3D */
      --depth-1: 5px;
      --depth-2: 10px;
      --depth-3: 15px;
      --depth-4: 20px;
      --depth-5: 25px;

      /* Estilo de botón interior (relieve hacia dentro) */
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
          /* Optimizaciones para Android */
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /* Prevenir destellos blancos */
    background-color: #1a1a2e;
    /* Optimización de renderizado */
    transform: translateZ(0);
    backface-visibility: hidden;
    /* Optimizaciones específicas para reducir calentamiento */
    will-change: auto;
    contain: layout style paint;
    /* Reducir uso de GPU */
    -webkit-transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    /* Optimizar para pantallas de alta densidad */
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
      background: rgba(0, 0, 0, 0.2); /* Fondo oscuro semi-transparente */
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      pointer-events: none;
      z-index: -1;
      /* Optimización para Android */
      transform: translateZ(0);
      will-change: transform;
    }

    /* Tunnel Effect */
    body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      background: 
        radial-gradient(circle at center, var(--accent-color) 0%, transparent 70%),
        linear-gradient(45deg, var(--color-1), var(--color-2), var(--color-3), var(--color-4));
      opacity: 0.08;
      z-index: -2;
      animation: tunnelEffect 40s infinite linear;
      animation-play-state: var(--tunnel-animation, running);
      pointer-events: none;
      /* Optimización para reducir calentamiento */
      will-change: transform;
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      /* Reducir complejidad en dispositivos móviles */
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
      /* Optimización para reducir calentamiento */
      contain: layout style paint;
      -webkit-transform: rotateX(10deg) rotateY(15deg) translateZ(var(--depth-3));
      /* Reducir complejidad en móviles */
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    @keyframes float3D {
      0%, 100% { 
        transform: rotateX(5deg) rotateY(10deg) translateZ(var(--depth-2)) translateY(0); 
        -webkit-transform: rotateX(5deg) rotateY(10deg) translateZ(var(--depth-2)) translateY(0);
        box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 0 10px rgba(255, 107, 0, 0.5);
      }
      50% { 
        transform: rotateX(8deg) rotateY(15deg) translateZ(var(--depth-4)) translateY(-10px); 
        -webkit-transform: rotateX(8deg) rotateY(15deg) translateZ(var(--depth-4)) translateY(-10px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.7), 0 0 15px var(--accent-color);
      }
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

    /* Efecto de transparencia cuando se abren módulos */
    .panel-container.visible ~ .player-container .control-button {
      opacity: 0.5 !important;
      transition: all 0.3s ease !important;
    }

    /* Efecto de transición al cambiar de pista */
    .track-change {
      animation: trackChange 1s ease-in-out;
    }

    @keyframes trackChange {
      0% {
        transform: translateZ(var(--depth-5)) rotateX(5deg) translateX(-20px) opacity(0);
      }
      50% {
        transform: translateZ(var(--depth-5)) rotateX(5deg) translateX(20px) opacity(1);
      }
      100% {
        transform: translateZ(var(--depth-5)) rotateX(5deg) translateX(0) opacity(1);
      }
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

    /* Nuevos efectos para todos los botones */
    .control-button,
    .action-button,
    .folder-select-button,
    .close-button,
    .eq-preset {
      border: none;
      box-shadow: 
        0 15px 35px rgba(0, 0, 0, 0.8),
        0 10px 20px rgba(0,0,0,0.5),
        0 0 15px rgba(255, 107, 0, 0.7),
        var(--btn-inner-shadow);
      background: rgba(30, 30, 30, 0.4) !important; /* Color base */
      border-radius: 50%;
      cursor: pointer;
      transform: translateY(-10px) scale(1.05) perspective(1000px) rotateX(10deg);
      position: relative;
      overflow: visible;
      
      /* Efecto 3D - Borde inferior */
      &::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: -10px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 50%;
        z-index: -1;
        filter: blur(5px);
        transform: translateZ(-20px);
        transition: all 0.3s ease;
      }
      
      /* Efecto 3D - Borde lateral */
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.1);
        box-shadow: 
          inset 0 0 15px rgba(255, 255, 255, 0.1),
          0 0 20px rgba(0, 0, 0, 0.8);
        pointer-events: none;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      will-change: transform, box-shadow, background;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.15);
      
      /* Efecto de neón pulsante y flotante */
      animation: neonPulse 2s infinite alternate, float3D 6s ease-in-out infinite;
      
      /* Efecto de elevación 3D */
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%);
        pointer-events: none;
      }
    }

    /* Efecto 1: Pulsación de neón */
    @keyframes neonPulse {
      0% { box-shadow: var(--btn-inner-shadow), 0 0 5px rgba(255, 107, 0, 0.2); }
      100% { box-shadow: var(--btn-inner-shadow), 0 0 15px var(--accent-color); }
    }

    /* Efecto 2: Resplandor al pasar el ratón */
    .control-button:hover,
    .action-button:hover,
    .folder-select-button:hover,
    .close-button:hover,
    .eq-preset:hover {
      box-shadow: 
        0 25px 45px rgba(0, 0, 0, 0.9),
        0 15px 25px rgba(0,0,0,0.7),
        0 0 25px rgba(255, 107, 0, 0.8),
        var(--btn-hover-shadow);
      transform: translateY(-15px) scale(1.1) perspective(1000px) rotateX(15deg);
      filter: brightness(1.2);
      animation: neonPulse 1s infinite alternate, float3D 4s ease-in-out infinite;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      
      &::before {
        bottom: -15px;
        filter: blur(8px);
        background: rgba(0, 0, 0, 0.6);
      }
      
      &::after {
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 
          inset 0 0 25px rgba(255, 255, 255, 0.2),
          0 0 30px rgba(0, 0, 0, 1);
      }
    }

    /* Efecto 3: Animación de profundidad al hacer clic */
    .control-button:active,
    .action-button:active,
    .folder-select-button:active,
    .close-button:active,
    .eq-preset:active,
    .eq-preset.active {
      transform: translateY(-5px) scale(0.98) perspective(1000px) rotateX(5deg);
      filter: brightness(0.9);
      box-shadow: 
        0 10px 20px rgba(0, 0, 0, 0.6),
        0 5px 10px rgba(0,0,0,0.4),
        0 0 10px rgba(255, 107, 0, 0.6),
        var(--btn-inner-shadow);
      
      &::before {
        bottom: -5px;
        filter: blur(2px);
        background: rgba(0, 0, 0, 0.3);
      }
      
      &::after {
        border-color: var(--accent-color);
        box-shadow: 
          inset 0 0 15px rgba(255, 107, 0, 0.3),
          0 0 20px rgba(0, 0, 0, 0.8);
      }
      transform: translateY(8px) scale(0.95) translateZ(var(--depth-1));
      box-shadow: 
        var(--btn-active-shadow),
        inset 0 0 15px rgba(0,0,0,0.5);
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

    /* ========== ESTILO HOLOGRÁFICO ========== */
    .style-holographic {
      background: linear-gradient(45deg, 
        rgba(255, 107, 0, 0.3), 
        rgba(0, 191, 255, 0.3), 
        rgba(255, 20, 147, 0.3), 
        rgba(255, 107, 0, 0.3)) !important;
      background-size: 400% 400% !important;
      animation: holographicShift 3s ease-in-out infinite !important;
      border: 2px solid rgba(255, 255, 255, 0.3) !important;
    }

    /* ========== NUEVO ESTILO 3D ELEVADO ========== */
    .style-3d-elevated {
      transform: translateZ(20px) rotateX(10deg) rotateY(15deg);
      box-shadow: 
        0 20px 50px rgba(0, 0, 0, 0.7),
        0 15px 30px rgba(255, 107, 0, 0.5),
        inset 0 0 20px rgba(255, 255, 255, 0.1),
        0 0 30px rgba(255, 107, 0, 0.4) !important;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .style-3d-elevated:hover {
      transform: translateZ(30px) rotateX(15deg) rotateY(20deg) scale(1.05);
      box-shadow: 
        0 25px 60px rgba(0, 0, 0, 0.9),
        0 20px 40px rgba(255, 107, 0, 0.7),
        inset 0 0 30px rgba(255, 255, 255, 0.2),
        0 0 40px rgba(255, 107, 0, 0.6) !important;
      filter: brightness(1.2);
    }

    .style-3d-elevated:active {
      transform: translateZ(10px) rotateX(5deg) rotateY(10deg) scale(0.95);
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.6),
        0 5px 15px rgba(255, 107, 0, 0.4),
        inset 0 0 15px rgba(255, 255, 255, 0.1),
        0 0 20px rgba(255, 107, 0, 0.3) !important;
    }

    /* SOLUCIÓN DEFINITIVA - HABILITAR EVENTOS */
    .control-button,
    .action-button,
    .folder-select-button,
    .eq-preset {
        pointer-events: auto !important;
    }

    /* Asegurar que los elementos hijos no bloqueen eventos */
    .control-button > *,
    .action-button > *,
    .folder-select-button > *,
    .close-button > *,
    .eq-preset > * {
        pointer-events: auto;
    }

    /* Efecto de borde mágico adicional */
    .style-magic::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, 
        var(--accent-color), 
        rgba(148, 0, 211, 0.8), 
        rgba(0, 191, 255, 0.8), 
        var(--accent-color)) !important;
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
      background: transparent !important; /* fondo transparente */
      color: transparent !important; /* texto invisible */
      padding: 0 !important;
      border-radius: 0 !important; /* valor válido */
      border-left: none !important;
      box-shadow: none !important;
      z-index: 1000 !important;
      display: flex !important;
      align-items: center;
      opacity: 0; /* invisible sin mover */
      pointer-events: none; /* para que no interfiera con clics */
      backdrop-filter: none !important;
      font-weight: 800;
      transform-style: preserve-3d;
      will-change: transform;
      transition: opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 0); /* transición suave */
      transform: translateZ(var(--depth-4)); /* mantiene profundidad */
    }

    /* Efecto hover consistente */
    button:hover,
    .action-button:hover, 
    .control-button:hover, 
    .eq-preset:hover,
    .folder-select-button:hover,
    .background-select-button:hover,
    .video-select-button:hover,
    .video-controls .action-button:hover {
      animation-play-state: paused;
      transform: translateY(-5px) scale(1.1);
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4));
    }
    
    .video-controls .action-button:hover {
      animation-play-state: paused;
      transform: translateY(-3px) scale(1.1);
    }

    /* Estilos del contenedor del reproductor de video */
    .video-player-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: transparent !important;
      opacity: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 10000 !important;
      pointer-events: auto !important;
      visibility: hidden;
      transition: opacity 0.3s ease-in-out;
      border: none !important;
      box-shadow: none !important;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      overflow: hidden;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    .video-player-container.visible {
      background: transparent !important;
      opacity: 1 !important;
      visibility: visible !important;
      display: flex !important;
      z-index: 10000 !important; /* Aumentado a 10000 */
      pointer-events: auto !important;
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      isolation: isolate;
      will-change: transform, opacity;
    }

    @keyframes videoAppear {
      0% { 
        transform: translate(-50%, -50%) scale(0) translateZ(var(--depth-1)); 
        -webkit-transform: translate(-50%, -50%) scale(0) translateZ(var(--depth-1));
        opacity: 0; 
      }
      100% { 
        transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5)); 
        -webkit-transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5));
        opacity: 1; 
      }
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
      /* Optimización para reducir calentamiento */
      contain: layout style paint;
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      /* Reducir complejidad en móviles */
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    @keyframes floatParticle {
      0% { 
        transform: translateY(0) translateX(0) translateZ(0); 
        -webkit-transform: translateY(0) translateX(0) translateZ(0);
        opacity: 0; 
      }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { 
        transform: translateY(-100vh) translateX(100px) translateZ(50px); 
        -webkit-transform: translateY(-100vh) translateX(100px) translateZ(50px);
        opacity: 0; 
      }
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
      text-shadow: 
        0 0 10px var(--accent-color-light),
        3px 3px 0 rgba(0,0,0,0.7),
        6px 6px 8px rgba(0,0,0,0.5);
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
      will-change: transform;
      border: 1px solid rgba(255,255,255,0);
      /* Corrección para estabilidad */
      will-change: transform, opacity;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transform: translate3d(0,0,0);
      contain: layout style paint;
      /* Asegurar que el elemento sea interactivo */
      pointer-events: auto;
      /* Prevenir que el scroll se detenga en este elemento */
      touch-action: manipulation;
    }

    .playlist-item span {
      display: block;
      text-shadow: 
        1px 1px 0 rgba(0,0,0,0.7),
        2px 2px 3px rgba(0,0,0,0.5);
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
      text-shadow: 
        0 0 8px var(--accent-color-light),
        2px 2px 0 rgba(0,0,0,0.8),
        4px 4px 6px rgba(0,0,0,0.6);
    }

    .playlist-item.active {
      background: rgba(255, 255, 255, 0.1) !important;
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
      max-width: 500px; /* Aumentado para mejor visibilidad */
      background: rgba(0, 0, 0, 0);
      border-radius: 20px;
      box-shadow: 0 30px 60px rgba(0,0,0,0.8);
      backdrop-filter: none !important;
      max-height: 80vh;
      overflow-y: scroll !important;
      overflow-x: hidden !important;
      padding: 25px;
      display: none;
      transform-style: preserve-3d;
      z-index: 100;
      transform: translateZ(var(--depth-5));
      opacity: 0;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      will-change: transform;
      border: none !important;
      isolation: isolate;
      /* Habilitar scroll táctil */
      -webkit-overflow-scrolling: touch;
      /* Prevenir que el scroll se propague al body */
      overscroll-behavior: contain;
    }

    .panel-container.visible {
      display: block;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5));
      animation: panelAppear 0.5s forwards;
    }

    @keyframes panelAppear {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9) translateZ(var(--depth-1)); }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5)); }
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
      opacity: 1; /* visible */
  color: initial; /* texto visible */
  pointer-events: auto; /* permite interacción */
  transform: translateX(0) rotateY(0deg) translateZ(var(--depth-5)); 
    }

    .notification.hide {
      opacity: 0; /* invisible */
  color: transparent;
  pointer-events: none;
  transform: translateZ(var(--depth-4)); /* vuelve a posición base */
    }

    .notification svg {
      opacity: 0; /* ocultar el SVG también */
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
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 500px;
      background: rgba(0, 0, 0, 0.05);
      display: none;
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 1000;
      border-radius: 20px;
      padding: 25px;
      box-shadow: 0 30px 60px rgba(0,0,0,0.8);
      backdrop-filter: blur(20px);
      transform-style: preserve-3d;
      transform: translateZ(var(--depth-5));
      border: none !important;
    }
    
    #equalizerContainer.visible {
      display: block;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5));
      animation: panelAppear 0.5s forwards;
    }
    
    #eqControls {
      display: flex;
      flex-direction: column;
      gap: 20px;
      transform: translateZ(var(--depth-2));
    }

    #eqVisualizer {
      width: 100%;
      height: 120px; /* Aumentado para mejor visibilidad */
      background: rgba(0,0,0,0);
      border-radius: 10px;
      margin-bottom: 20px;
      box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0);
    }

    .eq-sliders {
      display: flex;
      flex-direction: column;
      gap: 20px; /* Aumentado para mejor espaciado */
      width: 100%; /* Asegura que ocupe todo el ancho */
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
      height: 25px; /* Aumentado para mejor manipulación */
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
      gap: 15px; /* Aumentado para mejor espaciado */
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 20px;
    }

    .eq-preset {
      padding: 10px 20px; /* Aumentado para mejor tamaño */
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
      will-change: transform, filter, box-shadow;
      border: 1px solid rgba(255,255,255,0);
      box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 0 10px rgba(255, 107, 0, 0.5), var(--btn-inner-shadow) !important;
      animation: neonPulse 2s infinite alternate, float3D 6s ease-in-out infinite !important;
      transition: all 0.3s ease !important;
      
      /* Efecto de borde cuando está activo */
      &.active {
        border: 2px solid var(--accent-color);
        box-shadow: 0 0 15px var(--accent-color-light), var(--btn-active-shadow) !important;
      }
    }

    .control-button:hover {
      transform: translateY(-5px) scale(1.1) !important;
      box-shadow: 0 15px 25px rgba(0,0,0,0.7), 0 0 15px rgba(255, 107, 0, 0.6), var(--btn-hover-shadow) !important;
      filter: brightness(1.1);
      animation: neonPulse 1s infinite alternate, float3D 4s ease-in-out infinite !important;
    }

    .control-button:active,
    .control-button.active {
      transform: translateY(0) scale(0.95) !important;
      box-shadow: var(--btn-active-shadow), inset 0 0 15px rgba(0,0,0,0.5) !important;
      filter: brightness(0.9);
      animation: none !important;
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
      will-change: transform, filter, box-shadow;
      border: 1px solid rgba(255,255,255,0);
      box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 0 10px rgba(255, 107, 0, 0.5), var(--btn-inner-shadow) !important;
      animation: neonPulse 2s infinite alternate, float3D 6s ease-in-out infinite !important;
      transition: all 0.3s ease !important;
    }

    .action-button:hover {
      transform: translateY(-5px) scale(1.1) !important;
      box-shadow: 0 15px 25px rgba(0,0,0,0.7), 0 0 15px rgba(255, 107, 0, 0.6), var(--btn-hover-shadow) !important;
      filter: brightness(1.1);
      animation: neonPulse 1s infinite alternate, float3D 4s ease-in-out infinite !important;
    }

    .action-button:active,
    .action-button.active {
      transform: translateY(0) scale(0.95) !important;
      background: inherit !important;
      color: inherit !important;
      box-shadow: var(--btn-active-shadow), inset 0 0 15px rgba(0,0,0,0.5) !important;
      filter: brightness(0.9);
      animation: none !important;
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
      transform: translateY(0) !important;
      width: 100%;
      max-width: 280px;
      z-index: 2;
      will-change: transform, filter;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .folder-select-button:hover,
    .background-select-button:hover,
    .video-select-button:hover {
      transform: translateY(-5px) scale(1.1) !important;
      box-shadow: 0 0 15px rgba(255,107,0,0.8);
      animation-play-state: paused !important;
    }

    .folder-select-button:active,
    .background-select-button:active,
    .video-select-button:active,
    .folder-select-button.active,
    .background-select-button.active,
    .video-select-button.active {
      transform: translateY(0) scale(0.95) !important;
      background: var(--accent-color);
      color: #000;
      box-shadow: var(--btn-active-shadow);
      animation-play-state: running !important;
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
      transform: translate(-50%, -50%) scale(0);
      width: 90vw;
      max-width: 900px;
      height: 70vh;
      background: rgba(0, 0, 0, 0.95);
      border-radius: 25px;
      opacity: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform-style: preserve-3d;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 10000 !important; /* Aumentado a 10000 */
      border: 2px solid rgba(255, 107, 0, 0.3) !important;
      box-shadow: 
        0 30px 60px rgba(0,0,0,0.9),
        0 0 30px rgba(255, 107, 0, 0.5),
        inset 0 0 20px rgba(255, 107, 0, 0.1);
      will-change: transform, opacity;
      pointer-events: auto !important; /* Asegurar que reciba eventos */
      /* Prevenir que desaparezca */
      visibility: visible !important;
      /* Optimización para Android */
      -webkit-transform: translate(-50%, -50%) scale(0);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      isolation: isolate;
    }

    .video-player-container.visible {
      transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5));
      -webkit-transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5));
      opacity: 1;
      animation: videoAppear 0.7s forwards;
      /* Asegurar visibilidad */
      visibility: visible !important;
      display: flex !important;
    }

    @keyframes videoAppear {
      0% { 
        transform: translate(-50%, -50%) scale(0) translateZ(var(--depth-1)); 
        -webkit-transform: translate(-50%, -50%) scale(0) translateZ(var(--depth-1));
        opacity: 0; 
      }
      100% { 
        transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5)); 
        -webkit-transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5));
        opacity: 1; 
      }
    }

    .panel-container.visible {
      display: block;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5));
      animation: panelAppear 0.5s forwards;
    }

    @keyframes panelAppear {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9) translateZ(var(--depth-1)); }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1) translateZ(var(--depth-5)); }
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
      .player-container {
        padding: 20px;
        max-width: 340px;
      }
      .control-button {
        width: 70px;
        height: 70px;
      }
      .action-button {
        width: 55px;
        height: 55px;
      }
      .action-buttons {
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      .folder-select-button,
      .background-select-button,
      .video-select-button {
        font-size: 0.8rem;
        padding: 10px 15px;
      }
      .track-title {
        font-size: 1rem;
      }
    }

    /* Nuevos estilos para el ecualizador visual */
    #eqVisualizer {
      width: 100%;
      height: 120px;
      background: rgba(0, 0, 0, 0);
      border-radius: 10px;
      margin-bottom: 20px;
      display: block;
    }
    
    @keyframes floatMultiDirection {
      0% {
        transform: translate(0, 0) rotate(0deg) translateZ(20px) rotateX(10deg) rotateY(15deg);
      }
      25% {
        transform: translate(5px, -5px) rotate(2deg) translateZ(20px) rotateX(10deg) rotateY(15deg);
      }
      50% {
        transform: translate(-5px, 5px) rotate(-2deg) translateZ(20px) rotateX(10deg) rotateY(15deg);
      }
      75% {
        transform: translate(5px, 5px) rotate(1deg) translateZ(20px) rotateX(10deg) rotateY(15deg);
      }
      100% {
        transform: translate(0, 0) rotate(0deg) translateZ(20px) rotateX(10deg) rotateY(15deg);
      }
    }

    /* Aplica la animación a todos los botones indicados */
    button,
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
      /* Optimización para reducir calentamiento */
      contain: layout style paint;
      /* Reducir complejidad en móviles */
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    /* Control Buttons (3 botones) */
    .control-button:nth-of-type(1) { animation-delay: 0s; }
    .control-button:nth-of-type(2) { animation-delay: 0.6s; }
    .control-button:nth-of-type(3) { animation-delay: 1.2s; }

    /* Action Buttons (7 botones) */
    .action-button:nth-of-type(1) { animation-delay: 0.3s; }
    .action-button:nth-of-type(2) { animation-delay: 0.9s; }
    .action-button:nth-of-type(3) { animation-delay: 1.5s; }
    .action-button:nth-of-type(4) { animation-delay: 2.1s; }
    .action-button:nth-of-type(5) { animation-delay: 2.7s; }
    .action-button:nth-of-type(6) { animation-delay: 3.3s; }
    .action-button:nth-of-type(7) { animation-delay: 3.9s; }

    /* Folder Select Buttons (3 botones) */
    .folder-select-button:nth-of-type(1) { animation-delay: 0.45s; }
    .folder-select-button:nth-of-type(2) { animation-delay: 1.05s; }
    .folder-select-button:nth-of-type(3) { animation-delay: 1.65s; }

    /* Close Buttons (3 botones) */
    .close-button:nth-of-type(1) { animation-delay: 0.15s; }
    .close-button:nth-of-type(2) { animation-delay: 0.75s; }
    .close-button:nth-of-type(3) { animation-delay: 1.35s; }

    /* EQ Presets (4 botones) */
    .eq-preset:nth-of-type(1) { animation-delay: 0.2s; }
    .eq-preset:nth-of-type(2) { animation-delay: 0.8s; }
    .eq-preset:nth-of-type(3) { animation-delay: 1.4s; }
    .eq-preset:nth-of-type(4) { animation-delay: 2.0s; }
    
    #playlistContainer,
    #favoritesContainer {
      background: rgba(0, 0, 0, 0) !important;
      backdrop-filter: none !important;
      box-shadow: 0 30px 60px rgba(0,0,0,0.8) !important;
      /* Asegurar que el scroll funcione correctamente */
      overflow-y: scroll !important;
      overflow-x: hidden !important;
      overscroll-behavior: contain !important;
    }
    
    /* Estilos específicos para el contenido de las listas */
    #playlistContent,
    #favoritesContent {
      /* Asegurar que el contenido sea scrolleable */
      min-height: 200px;
      /* Prevenir que el contenido se corte */
      overflow: visible !important;
      /* Habilitar scroll táctil */
      -webkit-overflow-scrolling: touch;
      /* Asegurar que los elementos hijos sean interactivos */
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

    /* Nuevos efectos 3D */
    @keyframes trackChange {
      0% { transform: rotateY(0deg) scale(1); }
      50% { transform: rotateY(180deg) scale(0.8); }
      100% { transform: rotateY(360deg) scale(1); }
    }

    .track-change {
      animation: trackChange 1s ease-in-out;
    }

    /* Reflejos en botones */
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

    /* Sombras dinámicas */
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

    /* Nuevo efecto para las partículas de audio */
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
    
    /* Eliminar bordes, outlines y sombras en reproductores y paneles */
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
      /* Optimización adicional para Android */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body::before {
      content: ""; /* Tunnel Effect */
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: url('https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1000');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.4;
      z-index: -1;
      pointer-events: none;
      /* Optimización para Android */
      transform: translateZ(0);
      will-change: transform;
      -webkit-transform: translateZ(0);
      /* Prevenir destellos */
      background-color: #1a1a2e;
    }

    /* ========== SISTEMA DE FONDO INFINITO OPTIMIZADO PARA ANDROID ========== */
    .infinite-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -3;
      pointer-events: none;
      overflow: hidden;
      /* Optimización para Android */
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
      /* Optimización completa para cualquier imagen */
      image-rendering: -webkit-optimize-contrast;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
      image-rendering: pixelated;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      transform: translateZ(0);
      will-change: opacity, transform;
      /* Soporte para diferentes formatos */
      max-width: 100%;
      max-height: 100%;
      min-width: 100%;
      min-height: 100%;
      /* Prevenir destellos */
      background-color: transparent;
    }

    .infinite-background img.active {
      opacity: 1;
      /* Optimización para transiciones suaves */
      transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .infinite-background img.preload {
      opacity: 0;
      /* Precarga optimizada */
      transform: scale(1.01) translateZ(0);
    }

    /* ===== CORRECCIONES SOLICITADAS ===== */
    /* 1. Corrección para ecualizador en móvil */
    @media (max-width: 480px) {
      #equalizerContainer {
        padding: 15px;
        max-height: 90vh;
        max-width: 90%;
      }
      
      .eq-sliders {
        gap: 15px;
      }
      
      .eq-slider label {
        font-size: 0.9rem;
      }
      
      .eq-preset {
        padding: 8px 15px;
        font-size: 0.9rem;
      }
      
      #eqVisualizer {
        height: 100px;
      }
    }

    /* 2. Corrección para barra de progreso */
    .progress-bar {
      transform-origin: left;
      transform: scaleX(0);
      width: 100% !important;
      transition: transform 0.1s linear;
    }
    
    /* 3. Corrección para scroll en listas de reproducción y favoritos */
    .panel-container.visible {
      /* Asegurar que el scroll esté habilitado cuando el panel está visible */
      overflow-y: scroll !important;
      overflow-x: hidden !important;
      -webkit-overflow-scrolling: touch !important;
      overscroll-behavior: contain !important;
      /* Prevenir que el scroll se propague al body */
      touch-action: pan-y;
    }
    
    /* Estilos para dispositivos móviles */
    @media (max-width: 768px) {
      .panel-container {
        max-height: 70vh !important;
        overflow-y: scroll !important;
        -webkit-overflow-scrolling: touch !important;
      }
      
      #playlistContent,
      #favoritesContent {
        min-height: 150px;
        padding-bottom: 20px;
      }
      
      .playlist-item {
        padding: 12px 15px;
        margin-bottom: 8px;
        /* Asegurar que sea táctil */
        touch-action: manipulation;
        -webkit-tap-highlight-color: rgba(255, 107, 0, 0.3);
      }
    }

    /* 3. Botón de bucle para reproductor en segundo plano */
    #backgroundLoopButton {
      display: none !important;
    }

    .video-player-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent !important;
      border: none !important;
      pointer-events: none !important;
      z-index: 1000;
    }

    .video-player-container .close-button {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10002 !important;
      background: rgba(0, 0, 0, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.3);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex !important;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      color: white;
    }
    
    .video-player-container .close-button:hover {
      background: rgba(255, 0, 0, 0.8);
      transform: scale(1.1);
    }
    
    .video-player-container .close-button svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
    
    .video-wrapper {
      position: relative;
      width: 100%;
      height: calc(100% - 40px); /* Ajuste para el espacio superior */
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      background: transparent;
    }
    
    .video-wrapper video {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      background: transparent;
      border: none;
      box-shadow: none;
    }
    
    .video-controls {
      position: absolute;
      bottom: -80px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 15px;
      padding: 10px 0;
      z-index: 10003;
      background: transparent;
      border: none;
      box-shadow: none;
    }
    
    .video-controls .action-button {
      background: var(--color-1); /* Color inicial que será sobrescrito por la animación */
      border: 1px solid rgba(255, 255, 255, 0);
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease !important;
      margin: 0;
      padding: 0;
      box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 0 10px rgba(255, 107, 0, 0.5), var(--btn-inner-shadow) !important;
      animation: 
        neonPulse 2s infinite alternate, 
        float3D 6s ease-in-out infinite,
        colorCycle 60s infinite !important; /* Añadida la animación de cambio de colores */
      will-change: transform, box-shadow, background-color;
    }
    
    .video-controls .action-button:hover {
      transform: scale(1.2) translateY(-5px) !important;
      color: var(--accent-color) !important;
      box-shadow: 0 15px 25px rgba(0,0,0,0.7), 0 0 15px rgba(255, 107, 0, 0.6), var(--btn-hover-shadow) !important;
      filter: brightness(1.1);
      animation: 
        neonPulse 1s infinite alternate, 
        float3D 4s ease-in-out infinite,
        colorCycle 30s infinite !important; /* Animación más rápida al hacer hover */
    }
    
    .video-controls .action-button svg {
      width: 30px;
      height: 30px;
      fill: currentColor;
      transition: all 0.3s ease;
      filter: drop-shadow(0 0 5px var(--accent-color-light));
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
    
    /* Nuevos efectos visuales */
    .glow {
      animation: glowEffect 2s infinite alternate;
    }
    
    @keyframes glowEffect {
      0% { box-shadow: 0 0 10px rgba(255, 107, 0, 0.5); }
      100% { box-shadow: 0 0 30px rgba(255, 107, 0, 1); }
    }
    
    .pulse {
      animation: pulseEffect 1.5s infinite;
    }
    
    @keyframes pulseEffect {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .rotate-3d {
      animation: rotate3d 10s infinite linear;
    }
    
    @keyframes rotate3d {
      0% { transform: rotateX(0) rotateY(0); }
      25% { transform: rotateX(10deg) rotateY(45deg); }
      50% { transform: rotateX(0) rotateY(90deg); }
      75% { transform: rotateX(-10deg) rotateY(135deg); }
      100% { transform: rotateX(0) rotateY(180deg); }
    }

    /* ========== NUEVOS EFECTOS 3D ========== */
    /* 1. Efecto de profundidad en hover para paneles */
    .panel-container:hover {
      transform: translate(-50%, -50%) translateZ(var(--depth-5)) rotateX(5deg) rotateY(5deg) !important;
      box-shadow: 0 40px 80px rgba(0,0,0,0.9), 0 0 30px rgba(255, 107, 0, 0.6) !important;
    }

    /* 2. Efecto de cristal esmerilado */
    .glass-effect {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: rgba(40, 40, 40, 0.25) !important;
      border: 1px solid rgba(255, 255, 255, 0.18) !important;
    }

    /* 3. Efecto de iluminación holográfica */
    .holographic-effect {
      background: linear-gradient(
        135deg,
        rgba(255, 107, 0, 0.1),
        rgba(0, 191, 255, 0.1),
        rgba(50, 205, 50, 0.1),
        rgba(255, 20, 147, 0.1)
      ) !important;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.1),
                  inset 0 0 20px rgba(255, 255, 255, 0.1);
    }

    /* ========== NUEVOS EFECTOS VISUALES ========== */
    /* 1. Efecto de onda sónica */
    .sonic-wave {
      position: absolute;
      border-radius: 50%;
      border: 2px solid var(--accent-color);
      transform: scale(0);
      opacity: 1;
      pointer-events: none;
      animation: sonicWave 1.5s ease-out;
    }

    @keyframes sonicWave {
      to {
        transform: scale(3);
        opacity: 0;
      }
    }

    /* 2. Efecto de partículas de energía */
    .energy-particle {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-color);
      pointer-events: none;
      animation: energyParticle 2s ease-out forwards;
    }

    @keyframes energyParticle {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(
          calc(var(--tx) * 100px),
          calc(var(--ty) * 100px)
        ) scale(0);
        opacity: 0;
      }
    }

    /* 3. Efecto de distorsión de audio */
    .audio-distortion {
      animation: audioDistortion 0.1s infinite alternate;
    }

    @keyframes audioDistortion {
      0% {
        filter: drop-shadow(0 0 5px var(--accent-color));
      }
      100% {
        filter: drop-shadow(0 0 15px var(--accent-color)) hue-rotate(20deg);
      }
    }

    /* ========== NUEVAS TRANSICIONES ========== */
    /* 1. Transición de cambio de pista */
    .track-transition {
      animation: trackTransition 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
    }

    @keyframes trackTransition {
      0% {
        opacity: 0;
        transform: translateY(50px) rotateX(45deg);
      }
      100% {
        opacity: 1;
        transform: translateY(0) rotateX(0);
      }
    }

    /* 2. Transición de aparición holográfica */
    .hologram-appear {
      animation: hologramAppear 1s ease-out both;
    }

    @keyframes hologramAppear {
      0% {
        opacity: 0;
        transform: translateY(30px) scale(0.9) rotateX(60deg);
        filter: blur(10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1) rotateX(0);
        filter: blur(0);
      }
    }

    /* 3. Transición de pulsación rítmica */
    .rhythmic-pulse {
      animation: rhythmicPulse 2s infinite ease-in-out;
    }

    @keyframes rhythmicPulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    /* ========== MEJORAS DE ESTILO ========== */
    /* 1. Mejoras para la barra de progreso */
    .progress-container {
      position: relative;
      height: 10px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      overflow: hidden;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(
        90deg,
        var(--accent-color),
        var(--accent-color-light),
        #fff
      );
      box-shadow: 0 0 10px var(--accent-color-light),
                  inset 0 -2px 5px rgba(255, 255, 255, 0.2);
      transition: transform 0.1s linear;
    }

    /* 2. Mejoras para los botones de control */
    .control-button {
      position: relative;
      overflow: visible;
    }

    .control-button::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border-radius: 50%;
      border: 2px solid var(--accent-color);
      opacity: 0;
      transition: all 0.3s ease;
    }

    .control-button:hover::before {
      opacity: 0.5;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
    }

    /* 3. Mejoras para los elementos de lista */
    .playlist-item {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .playlist-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--accent-color);
      transform: scaleY(0);
      transform-origin: top;
      transition: transform 0.3s ease;
    }

    .playlist-item:hover::before {
      transform: scaleY(1);
    }

    /* 4. Mejoras para el ecualizador visual */
    #eqVisualizer {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.5)
      );
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* 5. Mejoras para el fondo del reproductor */
    .player-container {
      background: transparent !important;
      border: none !important;
    }

    /* ========== ESTILOS DEL REPRODUCTOR DE VIDEO ========== */
    .video-player-container.visible {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      -webkit-transform: translate(-50%, -50%) !important;
      width: 90% !important;
      max-width: 1000px;
      height: auto !important;
      max-height: 90vh;
      aspect-ratio: 16/9;
      display: flex !important;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0;
      margin: 0 !important;
      background: rgba(0, 0, 0, 0.8) !important;
      z-index: 10000 !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      border-radius: 10px;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      will-change: transform, opacity;
      isolation: isolate;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .video-player-container.visible video {
      width: 100% !important;
      height: 100% !important;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain !important;
      background-color: transparent !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: relative;
      margin: 0;
      padding: 0;
      border: none !important;
      box-shadow: none !important;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      will-change: transform;
    }
    
    /* Prevenir que otros elementos interfieran con el video player */
    .video-player-container.visible * {
      pointer-events: auto !important;
    }
    
    /* Protección contra eventos de otros elementos */
    body:has(.video-player-container.visible) {
      overflow: hidden;
    }
    
    /* Asegurar que el video player está siempre por encima de partículas y efectos */
    .video-player-container.visible ~ .particles,
    .video-player-container.visible ~ .infinite-background {
      z-index: 1 !important;
    }
    
    /* ========== ESTILOS PARA CIERRE COMPLETO DEL VIDEO PLAYER ========== */
    .video-player-container:not(.visible) {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      z-index: -1 !important;
      /* Reset de transformaciones */
      transform: none !important;
      -webkit-transform: none !important;
      /* Desactivar animaciones */
      animation: none !important;
      transition: none !important;
    }
    
    /* Estilos para cuando el video player se está cerrando */
    .video-player-container.closing {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      z-index: -1 !important;
      /* Reset de transformaciones */
      transform: none !important;
      -webkit-transform: none !important;
      /* Desactivar animaciones */
      animation: none !important;
      transition: none !important;
    }

    /* ===== CORRECCIONES SOLICITADAS ===== */
    /* 1. Remover .close-button de reglas clip-path */
    .control-button,
    .action-button,
    .folder-select-button,
    .eq-preset {
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%) !important;
      border: 2px solid var(--accent-color) !important;
      background: linear-gradient(45deg, 
        rgba(255, 107, 0, 0.3), 
        rgba(0, 191, 255, 0.3), 
        rgba(255, 20, 147, 0.3), 
        rgba(255, 107, 0, 0.3)) !important;
      background-size: 400% 400% !important;
      animation: holographicShift 3s ease-in-out infinite, floatMultiDirection 4s ease-in-out infinite alternate !important;
      box-shadow: 
        0 20px 50px rgba(0, 0, 0, 0.7),
        0 15px 30px rgba(255, 107, 0, 0.5),
        inset 0 0 20px rgba(255, 255, 255, 0.1),
        0 0 30px rgba(255, 107, 0, 0.4),
        0 0 15px var(--accent-color),
        inset 0 0 10px rgba(255, 107, 0, 0.2) !important;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    }

    /* Hover */
    .control-button:hover,
    .action-button:hover,
    .folder-select-button:hover,
    .eq-preset:hover {
      clip-path: polygon(50% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%) !important;
      transform: translateZ(30px) rotateX(15deg) rotateY(20deg) scale(1.05) !important;
      box-shadow: 
        0 25px 60px rgba(0, 0, 0, 0.9),
        0 20px 40px rgba(255, 107, 0, 0.7),
        inset 0 0 30px rgba(255, 255, 255, 0.2),
        0 0 40px rgba(255, 107, 0, 0.6),
        0 0 15px var(--accent-color),
        inset 0 0 10px rgba(255, 107, 0, 0.2) !important;
      filter: brightness(1.2) !important;
    }

    /* Active */
    .control-button:active,
    .action-button:active,
    .folder-select-button:active,
    .eq-preset:active {
      transform: translateZ(10px) rotateX(5deg) rotateY(10deg) scale(0.95) !important;
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.6),
        0 5px 15px rgba(255, 107, 0, 0.4),
        inset 0 0 15px rgba(255, 255, 255, 0.1),
        0 0 20px rgba(255, 107, 0, 0.3),
        0 0 15px var(--accent-color),
        inset 0 0 10px rgba(255, 107, 0, 0.2) !important;
    }

    /* 2. Regla para que .close-button NO tenga clip-path */
    .close-button {
      clip-path: none !important;
    }

    /* 3. Asegurar contenedores de paneles sin clip-path */
    .panel-container {
      clip-path: none !important;
    }
    
    /* Mantener efectos hover */
    .control-button:hover,
    .action-button:hover,
    .folder-select-button:hover,
    .close-button:hover,
    .eq-preset:hover {
      transform: translateZ(30px) rotateX(15deg) rotateY(20deg) scale(1.05) !important;
      box-shadow: 
        0 25px 60px rgba(0, 0, 0, 0.9),
        0 20px 40px rgba(255, 107, 0, 0.7),
        inset 0 0 30px rgba(255, 255, 255, 0.2),
        0 0 40px rgba(255, 107, 0, 0.6) !important;
    }

    .control-button,
    .action-button,
    .folder-select-button,
    .close-button,
    .eq-preset {
      background: var(--button-bg, var(--color-1)) !important;
    }

    /* Agregar esta nueva regla AL FINAL del CSS */
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
      z-index: -1; /* Detrás del contenido */
      pointer-events: none;
      animation: colorCycle 20s infinite linear;
      opacity: 0.7;
    }
    
    /* CORRECCIÓN DE EVENTOS PARA BOTONES HEXAGONALES */
    .control-button.style-hexagonal,
    .action-button.style-hexagonal,
    .folder-select-button.style-hexagonal,
    .eq-preset.style-hexagonal {
        pointer-events: auto !important;
    }

    .style-hexagonal::before {
        pointer-events: auto !important;
    }

    /* SOLO APLICAR A BOTONES PRINCIPALES (EXCLUYENDO CLOSE-BUTTON) */
    .control-button:not(.close-button),
    .action-button,
    .folder-select-button,
    .eq-preset {
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%) !important;
      border: 2px solid var(--accent-color) !important;
      position: relative;
      overflow: visible !important;
      /* Mantén aquí las demás propiedades que tenías para botones, como box-shadow, etc */
    }

    /* EXCLUIR BOTONES DE CERRAR PANELES (no recortar) */
    .close-button {
      clip-path: none !important;
      position: relative; /* si hace falta */
      overflow: visible !important;
    }

    /* EXCLUIR CONTENEDORES DE PANELES (sin clip-path para que no bloqueen clics) */
    .panel-container {
      clip-path: none !important;
      overflow: visible !important;
    }

    /* ASEGURAR QUE LOS PANELES Y CONTENEDORES GRANDES NO TENGAN CLIP-PATH */
    #playlistContainer, 
    #favoritesContainer, 
    #equalizerContainer,
    .video-player-container {
      clip-path: none !important;
      overflow: visible !important;
    }
    
    /* CORRECCIÓN FINAL PARA SCROLL EN LISTAS */
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
      /* Asegurar que el contenido sea scrolleable */
      min-height: 200px;
      padding-bottom: 20px;
    }
    
/* ===== SOLUCIÓN DE VISIBILIDAD DE MÓDULOS (VERSIÓN FINAL) ===== */

/* Por defecto, todos los módulos dentro del wrapper están ocultos */
#app-wrapper > div {
  display: none;
  visibility: hidden;
  opacity: 0;
}

/* Cuando un módulo tiene la clase 'active', se muestra */
#app-wrapper > div.active {
  display: flex; /* Usamos flex para que funcione tanto para el player como para los paneles */
  flex-direction: column; /* Asegura que los elementos internos se apilen verticalmente */
  visibility: visible;
  opacity: 1;
  animation: moduleFadeIn 0.5s forwards;
}

/* Asegura que los paneles se centren correctamente */
#app-wrapper > .panel-container.active,
#app-wrapper > .video-player-container.active {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
    
    /* Fondo siempre visible */
    body::before {
      display: block !important;
      opacity: 0.4 !important;
      z-index: -1 !important;
    }
    
    /* ========== ANIMACIONES DE TRANSICIÓN ========== */
    @keyframes moduleFadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes moduleFadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(20px); }
    }
  </style>
<style>
  .transparent-text {
    opacity: 0 !important;
    color: transparent !important;
    transition: opacity 0.3s ease, color 0.3s ease;
  }
</style>
<style>
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

/* Mostrar solo el módulo activo */
.player-container {
  display: none;
  opacity: 0;
  visibility: hidden;
}

/* Estilos para módulos secundarios */
#playlistContainer,
#favoritesContainer,
#equalizerContainer,
#videoPlayerContainer {
  display: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 90%;
  height: 80%;
  overflow: auto;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Asegurar que el contenido de los paneles ocupe el espacio disponible */
#playlistContent,
#favoritesContent,
.equalizer-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 15px;
  box-sizing: border-box;
}

/* Módulos secundarios activos */
#playlistContainer.active,
#favoritesContainer.active,
#equalizerContainer.active,
#videoPlayerContainer.active {
  display: flex;
  opacity: 1;
  visibility: visible;
}

/* Estilo del reproductor principal */
.player-container.active {
  display: flex;
  opacity: 1;
  visibility: visible;
}

/* Ocultar controles del reproductor cuando no está activo */
.player-container:not(.active) .controls,
.player-container:not(.active) .action-buttons {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  height: 0;
  overflow: hidden;
}

/* Forzar visibilidad durante la carga */
body.loading .player-container {
  display: flex !important;
  opacity: 1 !important;
}

/* ===== SOLUCIÓN DEFINITIVA DE VISIBILIDAD INICIAL ===== */
/* Eliminamos la regla que dependía de body.player-active */
/* body.player-active #playerContainer {
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}
body.player-active #playerContainer > * {
  visibility: visible !important;
  opacity: 1 !important;
} */

/* ===== SOLUCIÓN FINAL: Estilo 3D Elevado y Animación Flotante Unificada ===== */

/* 1. Definición de la animación de flotación 3D */
@keyframes float-and-elevate {
  0%, 100% {
    transform: translateZ(20px) rotateX(10deg) rotateY(15deg) translateY(0);
  }
  50% {
    transform: translateZ(25px) rotateX(12deg) rotateY(17deg) translateY(-5px);
  }
}

/* 2. Regla CSS unificada para botones principales (elevados y flotantes) */
.control-button:not(.close-button),
.action-button,
.folder-select-button,
.eq-preset {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  border: 1px solid rgba(255, 107, 0, 0.5);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.8), /* Sombra principal para elevación */
    inset 0 2px 2px rgba(255, 255, 255, 0.2), /* Brillo interior superior */
    inset 0 -2px 2px rgba(0, 0, 0, 0.3), /* Sombra interior inferior */
    0 2px 2px rgba(255, 255, 255, 0.2); /* Borde iluminado */
  animation: float-and-elevate 6s ease-in-out infinite, colorCycle 20s infinite linear;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: visible; /* Importante para que las sombras se vean */
  position: relative;
  will-change: transform;
}

/* 3. Animación de flotación para botones circulares (como el de cerrar) */
.close-button {
    animation: float-and-elevate 6s ease-in-out infinite;
}

/* 4. Efectos Hover y Active mejorados para reforzar el 3D */
.control-button:not(.close-button):hover,
.action-button:hover,
.folder-select-button:hover,
.eq-preset:hover {
  transform: translateZ(35px) rotateX(15deg) rotateY(20deg) scale(1.1);
  box-shadow: 
    0 25px 45px rgba(0, 0, 0, 0.9),
    inset 0 3px 3px rgba(255, 255, 255, 0.3),
    inset 0 -3px 3px rgba(0, 0, 0, 0.4),
    0 0 20px var(--accent-color);
  filter: brightness(1.2);
}

.control-button:not(.close-button):active,
.action-button:active,
.folder-select-button:active,
.eq-preset:active {
  transform: translateZ(15px) rotateX(8deg) rotateY(12deg) scale(0.95);
  box-shadow: 
    0 5px 15px rgba(0, 0, 0, 0.7),
    inset 0 3px 5px rgba(0, 0, 0, 0.5);
  filter: brightness(0.9);
}
</style>
</head>
<body class="loading"> <!-- Eliminada la clase player-active -->
  <div class="infinite-background" id="infiniteBackground"></div>
  <div class="particles" id="particles"></div>
  
  <button id="backgroundLoopButton" class="color-cycling" aria-label="Bucle de audio">
    <svg viewBox="0 0 24 24"><path d="M12 4V1l-4 4 4 4V6c3.31 0 6 2.69 6 6 0 1-.25 1.97-.7 2.8l1.46 1.46C19.53 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1 .25-1.97-.7-2.8L5.24 7.74C4.47 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
  </button>

  <!-- Agregado el wrapper para los módulos -->
  <div id="app-wrapper">
    <div class="player-container glass-effect holographic-effect" id="playerContainer">
    <div class="track-info">
      <div class="track-title track-transition" id="trackTitle">Selecciona un audio</div>
    </div>
    <div class="progress-container" id="progressBarContainer">
      <div class="progress-bar" id="progressBar"></div>
    </div>
    <div class="time-info">
      <span id="currentTime">0:00</span>
      <span id="duration">0:00</span>
    </div>
    <div class="controls">
      <button class="control-button color-cycling" id="prevButton" aria-label="Anterior">
        <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
      </button>
      <button class="control-button color-cycling glow pulse" id="playPauseButton" aria-label="Reproducir/Pausar">
        <svg viewBox="0 0 24 24"><path id="playPauseIcon" d="M8 5v14l11-7z"/></svg>
      </button>
      <button class="control-button color-cycling" id="nextButton" aria-label="Siguiente">
        <svg viewBox="0 0 24 24"><path d="M16 18h2V6h-2zm-2-14v14H6V4h8zm-2 14V4h-4v14h4z"/></svg>
      </button>
    </div>
    <div class="action-buttons">
      <button class="action-button color-cycling" id="loopButton" aria-label="Repetir">
        <svg viewBox="0 0 24 24"><path id="loopIcon" d="M12 4V1l-4 4 4 4V6c3.31 0 6 2.69 6 6 0 1-.25 1.97-.7 2.8l1.46 1.46C19.53 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1 .25-1.97-.7-2.8L5.24 7.74C4.47 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
        </svg>
      </button>
      <button class="action-button color-cycling" id="favoritesToggleButton" aria-label="Mostrar Favoritos">
        <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </button>
      <button class="action-button color-cycling" id="favoritesButton" aria-label="Agregar/Quitar Favorito">
        <svg viewBox="00 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </button>
      <button class="action-button color-cycling" id="playlistButton" aria-label="Mostrar Lista de Reproducción">
        <svg viewBox="0 0 24 24"><path d="M4 14h6v-2H4v2zm0 5h6v-2H4v2zm0-10h12V7H4v2zm14 0h2V7h-2v2zm0 5h2v-2h-2v2zm0 5h2v-2h-2v2z"/></svg>
      </button>
      <button class="action-button color-cycling" id="eqButton" aria-label="Ecualizador">
        <svg viewBox="0 0 24 24"><path d="M10 20H8V4h2v16zm6-16h-2v16h2V4z"/></svg>
      </button>
      <button class="action-button color-cycling" id="videoPlayButton" aria-label="Reproducir Video">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5V7l6 4.5-6 4.5z"/></svg>
      </button>
    </div>
    
    <button class="folder-select-button color-cycling" id="selectFolderButton">
      <svg viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
      Audios
    </button>
    <input type="file" id="folderInput" multiple accept="audio/*" webkitdirectory directory />
    
    <button class="folder-select-button color-cycling" id="selectVideoButton">
      <svg viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
      Video
    </button>
    <input type="file" id="videoInput" multiple accept="video/*" />
    
    <button class="folder-select-button color-cycling" id="selectBackgroundButton">
      <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H5V5h14v14z"/><path d="M8.5 13.5l2.5 3.01L14.5 12 8.5 13.5z"/></svg>
      Fondo
    </button>
    <input type="file" id="backgroundInput" accept="image/*" multiple style="display: none;" />
  </div> <!-- FIN DEL DIV playerContainer -->

  <!-- PANELES COMO HERMANOS DEL playerContainer PERO DENTRO DEL WRAPPER -->

  <div class="panel-container glass-effect" id="playlistContainer">
    <div class="playlist-header">
      <div class="playlist-title">Lista de Reproducción</div>
      <button class="close-button" id="closePlaylist" aria-label="Cerrar lista">
        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 12 19 6.41z"/></svg>
      </button>
    </div>
    <div id="playlistContent"></div>
  </div>

  <div class="panel-container glass-effect" id="favoritesContainer">
    <div class="playlist-header">
      <div class="playlist-title">Tus Favoritos</div>
      <button class="close-button" id="closeFavorites" aria-label="Cerrar favoritos">
        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 12 19 6.41z"/></svg>
      </button>
    </div>
    <div id="favoritesContent"></div>
  </div>

  <div class="panel-container glass-effect" id="equalizerContainer">
    <div class="playlist-header">
      <div class="playlist-title">Ecualizador</div>
      <button class="close-button" id="closeEqualizer" aria-label="Cerrar ecualizador">
        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 12 19 6.41z"/></svg>
      </button>
    </div>
    <div id="eqControls">
      <canvas id="eqVisualizer" width="300" height="100"></canvas>
      <div class="eq-sliders">
        <div class="eq-slider">
          <label>Bajos</label>
          <input type="range" min="-20" max="20" value="0" class="eq-range" data-band="bass">
        </div>
        <div class="eq-slider">
          <label>Medios</label>
          <input type="range" min="-20" max="20" value="0" class="eq-range" data-band="mid">
        </div>
        <div class="eq-slider">
          <label>Agudos</label>
          <input type="range" min="-20" max="20" value="0" class="eq-range" data-band="treble">
        </div>
      </div>
      <div class="eq-presets">
        <button class="eq-preset" data-preset="flat">Plano</button>
        <button class="eq-preset" data-preset="pop">Pop</button>
        <button class="eq-preset" data-preset="rock">Rock</button>
        <button class="eq-preset" data-preset="jazz">Jazz</button>
      </div>
    </div>
  </div>

  <div class="video-player-container" id="videoPlayerContainer">
    <button class="close-button" id="closeVideoButton" aria-label="Cerrar video">
      <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 12 19 6.41z"/></svg>
    </button>
    <div class="video-wrapper">
      <video id="videoElement" playsinline></video>
    </div>
    <div class="video-controls">
      <button class="action-button color-cycling" id="videoLoop" title="Bucle">
        <svg viewBox="0 0 24 24"><path d="M12 4V1l-4 4 4 4V6c3.31 0 6 2.69 6 6 0 1-.25 1.97-.7 2.8l1.46 1.46C19.53 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1 .25-1.97-.7-2.8L5.24 7.74C4.47 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
      </button>
      <button class="action-button color-cycling" id="videoPrev" title="Anterior">
        <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
      </button>
      <button class="action-button color-cycling" id="videoPlayPause" title="Play/Pausa">
        <svg id="videoPlayIcon" viewBox="0 0 24 24" style="display:none;"><path d="M8 5v14l11-7z"/></svg>
        <svg id="videoPauseIcon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      </button>
      <button class="action-button color-cycling" id="videoNext" title="Siguiente">
        <svg viewBox="0 0 24 24"><path d="M16 18h2V6h-2zm-2-14v14H6V4h8zm-2 14V4h-4v14h4z"/></svg>
      </button>
      <button class="action-button color-cycling" id="videoFullscreen" title="Pantalla completa">
        <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7l-2-2v5zm12 7h-3v2h5V7h-2v3h-4V7l4-4 4 h4v10zm-6-9V3h-4v2h4v3zm12 14h-5v-2h2v-3h3v5zm-12 0h-3v2h5v-5h-2v3z"/></svg>
      </button>
    </div>
  </div>
  </div> <!-- FIN DEL DIV app-wrapper -->


  <script>
    // Variables globales para control de módulos
    let activeModule = null;
    // Actualizamos las referencias para que apunten a los elementos dentro de #app-wrapper
    let modules = {
      player: document.getElementById('playerContainer'),
      playlist: document.getElementById('playlistContainer'),
      favorites: document.getElementById('favoritesContainer'),
      equalizer: document.getElementById('equalizerContainer'),
      video: document.getElementById('videoPlayerContainer')
    };

// Función para activar un módulo específico
function activateModule(moduleId) {
  console.log(`Activando módulo: ${moduleId}`);
  
  // Ocultar todos los módulos primero
  for (const id in modules) {
    if (modules[id]) {
      modules[id].classList.remove('active');
      modules[id].style.display = 'none';
    }
  }

  // Mostrar y activar solo el módulo deseado
  if (modules[moduleId]) {
    modules[moduleId].style.display = 'block';
    modules[moduleId].classList.add('active');
    
    // Si es el módulo de video, asegurarse de que el contenedor sea visible
    if (moduleId === 'video') {
      const videoContainer = document.querySelector('.video-player-container');
      if (videoContainer) {
        videoContainer.style.display = 'block';
        videoContainer.classList.add('visible');
      }
    } else {
      // Si no es el módulo de video, asegurarse de que el reproductor esté visible
      if (modules.player) {
        modules.player.style.display = 'block';
      }
    }
  }

  // Manejar la transparencia del título
  const trackTitle = document.getElementById('trackTitle');
  if (moduleId !== 'player' && moduleId !== 'video') {
    trackTitle.classList.add('transparent-text');
  } else {
    trackTitle.classList.remove('transparent-text');
  }

  console.log(`Módulo activado: ${moduleId}`);
}

    // Inicializar módulos
    function initializeModules() {
      // Activar el módulo principal por defecto
      activateModule('player');
      
      // Desactivar todos los demás módulos (ya se maneja en activateModule, pero lo mantenemos por si acaso)
      Object.keys(modules).forEach(key => {
        if (key !== 'player') {
          modules[key].classList.add('module-hidden'); // Esta clase no tiene reglas CSS, podemos quitarla si queremos simplificar
          modules[key].classList.add('paused'); // Esta clase tampoco tiene reglas CSS, quitar si no se usa
        }
      });
    }

    // Resto del código JavaScript existente...
    const audioPlayer = document.createElement('audio');
    audioPlayer.id = 'audioPlayer';
    document.body.appendChild(audioPlayer);
    
    // Manejador de errores de audio
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
    const playlistButton = document.getElementById('playlistButton');
    const playlistContent = document.getElementById('playlistContent');
    const favoritesToggleButton = document.getElementById('favoritesToggleButton');
    const favoritesContent = document.getElementById('favoritesContent');
    const favoritesButton = document.getElementById('favoritesButton');
    const eqButton = document.getElementById('eqButton');
    const closeEqualizer = document.getElementById('closeEqualizer');
    const selectBackgroundButton = document.getElementById('selectBackgroundButton');
    const backgroundInput = document.getElementById('backgroundInput');
    const body = document.body;
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const closePlaylist = document.getElementById('closePlaylist');
    const closeFavorites = document.getElementById('closeFavorites');
    const closeVideoButton = document.getElementById('closeVideoButton');
    const videoPlayPause = document.getElementById('videoPlayPause');
    const videoPlayIcon = document.getElementById('videoPlayIcon');
    const videoPauseIcon = document.getElementById('videoPauseIcon');
    const videoPlayer = document.getElementById('videoElement');
    const videoPrev = document.getElementById('videoPrev');
    const videoNext = document.getElementById('videoNext');
    const videoLoop = document.getElementById('videoLoop');
    const videoFullscreen = document.getElementById('videoFullscreen');
    const selectVideoButton = document.getElementById('selectVideoButton');
    const videoInput = document.getElementById('videoInput');
    const videoPlayButton = document.getElementById('videoPlayButton');
    const backgroundLoopButton = document.getElementById('backgroundLoopButton');
    
    // Referencias para controles de fondo infinito
    let prevBackgroundButton = document.getElementById('prevBackgroundButton');
    let pauseBackgroundButton = document.getElementById('pauseBackgroundButton');
    let nextBackgroundButton = document.getElementById('nextBackgroundButton');
    let backgroundControls = document.getElementById('backgroundControls');
    
    // Variables para el ecualizador y audioContext
    let audioContext;
    let audioSource = null; 
    let eqFilters = {
      bass: null,
      mid: null,
      treble: null
    };
    let analyser;
    let animationFrame;
    let masterGain;
    let originalAudioVolume = 1.0; // Variable para almacenar el volumen original del audioPlayer

    // Variables existentes
    let originalPlaylistFiles = [];
    let favoriteTrackPaths = JSON.parse(localStorage.getItem('favoriteTrackPaths') || '[]');
    let currentTrackIndex = -1;
    let isPlaying = false;
    let loopMode = 0;
    let isDraggingProgress = false;
    let isVideoPlaying = false;
    let videoFiles = [];
    let currentVideoIndex = -1;
    let backgroundLoopActive = false;
    
    // Variables para control de audio/video
    let audioWasPlayingBeforeVideo = false;
    let audioTimeBeforeVideo = 0;
    let currentVideoURL = null;
    let videoTimeouts = [];
    let videoIntervals = [];
    
    // Variables para fondo infinito
    let infiniteBackgroundContainer = document.getElementById('infiniteBackground');
    let currentBackgroundIndex = 0;
    let backgroundImages = [];
    let isBackgroundTransitioning = false;
    let backgroundAutoPlay = true;
    let backgroundInterval;

    function formatTime(seconds) {
      if (isNaN(seconds)) return '0:00';
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function showNotification(text) {
      notificationText.textContent = text;
      notification.classList.remove('hide');
      notification.classList.add('show');
      if (window.notificationTimer) clearTimeout(window.notificationTimer);
      window.notificationTimer = setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
      }, 4000);
      
      // Crear efecto de onda sónica
      const sonicWave = document.createElement('div');
      sonicWave.className = 'sonic-wave';
      sonicWave.style.left = 'calc(100% - 50px)';
      sonicWave.style.top = '20px';
      document.body.appendChild(sonicWave);
      
      // Eliminar después de la animación
      setTimeout(() => {
        sonicWave.remove();
      }, 1500);
    }

    function createParticles() {
      const container = document.getElementById('particles');
      // Reducir número de partículas para dispositivos móviles
      const isMobile = /Android|webOS|iPhone|iPad|Ipod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
        
        // Color vibrante aleatorio
        const hue = Math.random() * 360;
        const opacity = isS24Ultra ? 0.3 : (isMobile ? 0.4 : 0.6);
        particle.style.backgroundColor = `hsla(${hue}, 100%, 60%, ${opacity})`;
        
        // Optimizaciones para reducir calentamiento
        particle.style.contain = 'layout style paint';
        particle.style.willChange = 'transform';
        particle.style.backfaceVisibility = 'hidden';
        particle.style.webkitBackfaceVisibility = 'hidden';
        
        container.appendChild(particle);
      }
    }

    function createAudioParticle(x, y) {
      const particle = document.createElement('div');
      particle.className = 'audio-particle';
      const size = Math.random() * 20 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      document.body.appendChild(particle);
      
      // Eliminar después de la animación
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }

    function createEnergyParticles(x, y) {
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
        
        // Eliminar después de la animación
        setTimeout(() => {
          particle.remove();
        }, 2000);
      }
    }

    selectFolderButton.addEventListener('click', () => folderInput.click());
    folderInput.addEventListener('change', e => {
      const files = Array.from(e.target.files).filter(f => f.type.startsWith('audio/'));
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

    selectVideoButton.addEventListener('click', () => videoInput.click());
    videoInput.addEventListener('change', e => {
      const files = Array.from(e.target.files).filter(f => f.type.startsWith('video/'));
      if (files.length > 0) {
        videoFiles = files.map(f => ({
          name: f.name,
          path: URL.createObjectURL(f)
        }));
        currentVideoIndex = 0;
        playVideo(currentVideoIndex);
        e.target.value = '';
      } else {
        showNotification('No se seleccionaron videos válidos.');
      }
    });

    selectBackgroundButton.addEventListener('click', () => backgroundInput.click());
    backgroundInput.addEventListener('change', e => {
      const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
      if (files.length === 0) {
        showNotification('No se seleccionaron imágenes válidas.');
        return;
      }
      
      // Limpiar fondos anteriores
      backgroundImages = [];
      currentBackgroundIndex = 0;
      
      // Cargar todas las imágenes
      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = e => {
          backgroundImages.push({
            src: e.target.result,
            name: file.name
          });
          
          // Si es la primera imagen, mostrarla inmediatamente
          if (index === 0) {
            setupInfiniteBackground();
            showNotification(`Cargados ${files.length} fondos. Iniciando reproducción infinita.`);
          }
        };
        reader.readAsDataURL(file);
      });
    });

    // ========== FUNCIONES PARA FONDO INFINITO ==========
    function setupInfiniteBackground() {
      if (!infiniteBackgroundContainer) {
        infiniteBackgroundContainer = document.getElementById('infiniteBackground');
      }
      
      if (backgroundImages.length === 0) return;
      
      // Limpiar contenedor
      infiniteBackgroundContainer.innerHTML = '';
      
      // Crear elementos de imagen para preload
      backgroundImages.forEach((bg, index) => {
        const img = document.createElement('img');
        img.src = bg.src;
        img.className = index === 0 ? 'active' : 'preload';
        img.dataset.index = index;
        infiniteBackgroundContainer.appendChild(img);
      });
      
      // Mostrar controles de fondo si hay más de una imagen
      if (backgroundControls) {
        if (backgroundImages.length > 1) {
          backgroundControls.style.display = 'block';
        } else {
          backgroundControls.style.display = 'none';
        }
      }
      
      // Iniciar transición automática
      startInfiniteBackgroundTransition();
    }

    function startInfiniteBackgroundTransition() {
      if (backgroundImages.length <= 1) return;
      
      // Limpiar intervalo anterior si existe
      if (backgroundInterval) {
        clearInterval(backgroundInterval);
      }
      
      backgroundInterval = setInterval(() => {
        if (!isBackgroundTransitioning && backgroundAutoPlay) {
          transitionToNextBackground();
        }
      }, 5000); // Cambiar cada 5 segundos
    }

    function transitionToNextBackground() {
      if (isBackgroundTransitioning || backgroundImages.length <= 1) return;
      
      isBackgroundTransitioning = true;
      
      const currentImg = infiniteBackgroundContainer.querySelector('.active');
      const nextIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
      const nextImg = infiniteBackgroundContainer.querySelector(`[data-index="${nextIndex}"]`);
      
      if (currentImg && nextImg) {
        // Transición suave
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

    function setSpecificBackground(index) {
      if (index < 0 || index >= backgroundImages.length) return;
      
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

    // ========== EVENT LISTENERS PARA CONTROLES DE FONDO ==========
    if (prevBackgroundButton) {
      prevBackgroundButton.addEventListener('click', () => {
        if (backgroundImages.length <= 1) return;
        
        const prevIndex = (currentBackgroundIndex - 1 + backgroundImages.length) % backgroundImages.length;
        setSpecificBackground(prevIndex);
        showNotification(`Fondo: ${backgroundImages[prevIndex].name}`);
      });
    }

    if (nextBackgroundButton) {
      nextBackgroundButton.addEventListener('click', () => {
        if (backgroundImages.length <= 1) return;
        
        const nextIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
        setSpecificBackground(nextIndex);
        showNotification(`Fondo: ${backgroundImages[nextIndex].name}`);
      });
    }

    if (pauseBackgroundButton) {
      pauseBackgroundButton.addEventListener('click', () => {
        backgroundAutoPlay = !backgroundAutoPlay;
        
        if (backgroundAutoPlay) {
          startInfiniteBackgroundTransition();
          pauseBackgroundButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
          showNotification('Fondo automático: Activado');
        } else {
          if (backgroundInterval) {
            clearInterval(backgroundInterval);
          }
          pauseBackgroundButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
          showNotification('Fondo automático: Pausado');
        }
      });
    }
    
    function clearInfiniteBackground() {
      if (backgroundInterval) {
        clearInterval(backgroundInterval);
        backgroundInterval = null;
      }
      
      if (infiniteBackgroundContainer) {
        infiniteBackgroundContainer.innerHTML = '';
      }
      
      backgroundImages = [];
      currentBackgroundIndex = 0;
      backgroundAutoPlay = true;
      if (backgroundControls) {
        backgroundControls.style.display = 'none';
      }
    }

    function loadTrack(index) {
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
      // Si el audioContext no ha sido creado o la fuente no ha sido conectada
      if (!audioContext || !audioSource) {
        setupEqualizer(); // Esto creará y conectará todo
      }

      // Reanudar contexto si está suspendido
      if (audioContext && audioContext.state === "suspended") {
        audioContext.resume().then(() => {
          console.log("AudioContext reanudado");
          playAudioInternal();
        }).catch(e => {
          console.error("Error al reanudar:", e);
          showNotification('Error al iniciar audio');
        });
      } else {
        playAudioInternal();
      }
    }

    // Función auxiliar para manejar la reproducción
    function playAudioInternal() {
      audioPlayer.play().then(() => {
        isPlaying = true;
        playPauseIcon.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
        if (analyser) drawEQVisualizer ();
        
        playPauseButton.classList.add('audio-distortion');
        setTimeout(() => {
          playPauseButton.classList.remove('audio-distortion');
        }, 500);
      }).catch(e => {
        console.error("Error al reproducir:", e);
        showNotification('Toca el botón de reproducción');
      });
    }

    function pauseAudio() {
      audioPlayer.pause();
      isPlaying = false;
      playPauseIcon.setAttribute('d', 'M8 5v14l11-7z');
      // Detener la animación del ecualizador
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null; // Reiniciar la variable de control
      }
    }

    function updateMediaSession(title) {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: title || 'Desconocido',
          artist: 'Reproductor 3D',
          album: 'Reproducción'
        });
        navigator.mediaSession.setActionHandler('play', () => {
          if (isVideoPlaying) videoPlayer.play();
          else playAudio();
        });
        navigator.mediaSession.setActionHandler('pause', () => {
          if (isVideoPlaying) videoPlayer.pause();
          else pauseAudio();
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => {
          if (isVideoPlaying && videoFiles.length > 0) videoPrev.click();
          else prevButton.click();
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
          if (isVideoPlaying && videoFiles.length > 0) videoNext.click();
          else nextButton.click();
        });
      }
    }

    playPauseButton.addEventListener('click', () => {
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

    prevButton.addEventListener('click', () => {
      if (originalPlaylistFiles.length === 0) return;
      let newIndex = (currentTrackIndex - 1 + originalPlaylistFiles.length) % originalPlaylistFiles.length;
      if (newIndex < 0 || newIndex >= originalPlaylistFiles.length) {
        showNotification('No hay pista anterior.');
        return;
      }
      loadTrack(newIndex);
      playAudio();
    });

    nextButton.addEventListener('click', () => {
      if (originalPlaylistFiles.length === 0) return;
      let newIndex = (currentTrackIndex + 1) % originalPlaylistFiles.length;
      if (newIndex < 0 || newIndex >= originalPlaylistFiles.length) {
        showNotification('No hay pista siguiente.');
        return;
      }
      loadTrack(newIndex);
      playAudio();
    });

    loopButton.addEventListener('click', () => {
      loopMode = (loopMode + 1) % 3;
      switch(loopMode) {
        case 0:
          loopIcon.style.fill = '';
          audioPlayer.loop = false;
          loopButton.classList.remove('active');
          showNotification('Repetición: Desactivada');
          break;
        case 1:
          loopIcon.style.fill = 'var(--accent-color)';
          audioPlayer.loop = false;
          loopButton.classList.add('active');
          showNotification('Repetición: Lista completa');
          break;
        case 2:
          loopIcon.style.fill = 'var(--accent-color)';
          audioPlayer.loop = true;
          loopButton.classList.add('active');
          showNotification('Repetición: Pista actual');
          break;
      }
      
      // Efecto holográfico al cambiar modo de bucle
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
        progressBar.style.transform = `scaleX(${factor})`;
        currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
        durationSpan.textContent = formatTime(audioPlayer.duration);
      }
    });

    progressBarContainer.addEventListener('click', e => {
      if (audioPlayer.duration) {
        const rect = progressBarContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const factor = clickX / rect.width;
        audioPlayer.currentTime = factor * audioPlayer.duration;
        progressBar.style.transform = `scaleX(${factor})`;
      }
    });

    function updateFavoritesButton() {
      if (currentTrackIndex < 0 || currentTrackIndex >= originalPlaylistFiles.length) {
        favoritesButton.classList.remove('favorite-active', 'active');
        return;
      }
      const currentTrack = originalPlaylistFiles[currentTrackIndex];
      const isFav = favoriteTrackPaths.includes(currentTrack.path);
      favoritesButton.classList.toggle('favorite-active', isFav);
      favoritesButton.classList.toggle('active', isFav);
    }

    favoritesButton.addEventListener('click', () => {
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
      
      // Efecto de pulsación rítmica al agregar/quitar favoritos
      favoritesButton.classList.add('rhythmic-pulse');
      setTimeout(() => {
        favoritesButton.classList.remove('rhythmic-pulse');
      }, 2000);
    });

    favoritesToggleButton.addEventListener('click', () => {
      activateModule('favorites');
      updateFavoritesUI();
    });

    function updateFavoritesUI() {
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
            currentTrackIndex = originalPlaylistFiles.findIndex(t => t.path === path);
            if (currentTrackIndex !== -1) {
              loadTrack(currentTrackIndex);
              playAudio();
              activateModule('player');
            }
          });
          favoritesContent.appendChild(div);
        }
      });
    }

    playlistButton.addEventListener('click', () => {
      activateModule('playlist');
      updatePlaylistUI();
    });

    // Nueva función para actualizar solo la clase 'active' en la lista
    function updatePlaylistActiveItem() {
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
      // Solo renderizar la lista si la cantidad de pistas cambió
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
              currentTrackIndex = i;
              loadTrack(i);
              playAudio();
              activateModule('player');
            }
          });
          playlistContent.appendChild(div);
        });
      } else {
        // Solo actualizar la clase 'active'
        updatePlaylistActiveItem();
      }
    }

    eqButton.addEventListener('click', () => {
        activateModule('equalizer');
        // Si el AudioContext no se ha inicializado, lo hacemos aquí.
        // Esto también establece los nodos del ecualizador.
        if (!audioContext) {
            setupEqualizer();
        }
        // Asegurarse de que el visualizador se inicie si el audio está sonando
        if (isPlaying && analyser) {
            if (!animationFrame) drawEQVisualizer();
        }
    });

    function setupEqualizer() {
      try {
        // Almacenar el volumen actual del audioPlayer como el volumen original.
        // Esto se hace solo una vez al iniciar el ecualizador.
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            originalAudioVolume = audioPlayer.volume; // Guarda el volumen antes de manipular el AudioContext
            console.log("AudioContext creado. Volumen original guardado:", originalAudioVolume);

            // Crear el nodo fuente SOLO UNA VEZ.
            // Si ya existe (p. ej., por una llamada previa a playAudio), no lo recreamos.
            if (!audioSource) {
                audioSource = audioContext.createMediaElementSource(audioPlayer);
                console.log("MediaElementSource creado.");
            }

            // Crear nodo de ganancia maestro.
            masterGain = audioContext.createGain();
            masterGain.gain.value = originalAudioVolume; // Inicializar con el volumen original del audioPlayer
            
            // Crear los filtros del ecualizador
            eqFilters.bass = audioContext.createBiquadFilter();
            eqFilters.mid = audioContext.createBiquadFilter();
            eqFilters.treble = audioContext.createBiquadFilter();
            
            // Configurar los tipos y frecuencias de los filtros
            eqFilters.bass.type = 'lowshelf';
            eqFilters.bass.frequency.value = 150;
            eqFilters.bass.gain.value = 0;  // Iniciar en 0 para no alterar el sonido al abrir

            eqFilters.mid.type = 'peaking';
            eqFilters.mid.frequency.value = 1500;
            eqFilters.mid.Q.value = 1;
            eqFilters.mid.gain.value = 0;  // Iniciar en 0

            eqFilters.treble.type = 'highshelf';
            eqFilters.treble.frequency.value = 3000;
            eqFilters.treble.gain.value = 0;  // Iniciar en 0
            
            // Conectar la cadena de audio:
            // audioSource -> bassFilter -> midFilter -> trebleFilter -> masterGain -> audioContext.destination
            audioSource.connect(eqFilters.bass);
            eqFilters.bass.connect(eqFilters.mid);
            eqFilters.mid.connect(eqFilters.treble);
            eqFilters.treble.connect(masterGain);
            masterGain.connect(audioContext.destination);

            // Crear analizador para el visualizador (se conecta al masterGain para visualizar el sonido final)
            analyser = audioContext.createAnalyser();
            masterGain.connect(analyser); // Conecta el analizador al final de la cadena del ecualizador
            console.log("Analizador conectado al masterGain.");

            // Inicializar sliders a 0
            document.querySelector('[data-band="bass"]').value = 0;
            document.querySelector('[data-band="mid"]').value = 0;
            document.querySelector('[data-band="treble"]').value = 0;

            // Manejadores para los sliders del ecualizador
            document.querySelectorAll('.eq-range').forEach(slider => {
                slider.addEventListener('input', function() {
                    const band = this.dataset.band;
                    const value = parseFloat(this.value);
                    eqFilters[band].gain.value = value;
                    // Asegurarse que el volumen del audioPlayer no se afecte por los sliders
                    audioPlayer.volume = originalAudioVolume; 
                });
            });

            // Manejadores para los presets del ecualizador
            document.querySelectorAll('.eq-preset').forEach(button => {
                button.addEventListener('click', function() {
                    const preset = this.dataset.preset;
                    let bassValue = 0, midValue = 0, trebleValue = 0;

                    if (preset === 'flat') {
                        // Restablecer valores a 0
                        bassValue = 0;
                        midValue = 0;
                        trebleValue = 0;
                        // Restablecer los sliders visualmente
                        document.querySelector('[data-band="bass"]').value = 0;
                        document.querySelector('[data-band="mid"]').value = 0;
                        document.querySelector('[data-band="treble"]').value = 0;
                        // Asegurar que el volumen del audioPlayer se mantenga
                        audioPlayer.volume = originalAudioVolume; 
                    } else {
                        if (preset === 'pop') {
                            bassValue = 5;
                            midValue = 2;
                            trebleValue = 4;
                        } else if (preset === 'rock') {
                            bassValue = 7;
                            midValue = 4;
                            trebleValue = 5;
                        } else if (preset === 'jazz') {
                            bassValue = 3;
                            midValue = 2;
                            trebleValue = 1;
                        }
                        // Aplicar preset a los filtros
                        eqFilters.bass.gain.value = bassValue;
                        eqFilters.mid.gain.value = midValue;
                        eqFilters.treble.gain.value = trebleValue;
                        // Actualizar los sliders visualmente
                        document.querySelector('[data-band="bass"]').value = bassValue;
                        document.querySelector('[data-band="mid"]').value = midValue;
                        document.querySelector('[data-band="treble"]').value = trebleValue;
                    }
                    showNotification(`Ecualizador: ${this.textContent}`);
                });
            });
            console.log("Ecualizador configurado y conectado.");
        } else {
            console.log("AudioContext ya existe, no se re-configura el ecualizador.");
            // Si el ecualizador ya existe, solo aseguramos que los sliders reflejen los valores actuales
            document.querySelector('[data-band="bass"]').value = eqFilters.bass.gain.value;
            document.querySelector('[data-band="mid"]').value = eqFilters.mid.gain.value;
            document.querySelector('[data-band="treble"]').value = eqFilters.treble.gain.value;
        }
      } catch (e) {
        console.error("Error al configurar ecualizador:", e);
        showNotification('Ecualizador no disponible');
      }
    }

    function drawEQVisualizer() {
      const canvas = document.getElementById('eqVisualizer');
      const ctx = canvas.getContext('2d');
      if (!analyser) {
        console.warn("Analyser no está disponible para el visualizador.");
        return;
      }
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function renderFrame() {
        if (!isPlaying && audioContext.state !== 'running') { // Solo dibuja si está reproduciendo o el contexto está activo
          // Si el audio está pausado o el contexto suspendido, limpiar y detener la animación
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          animationFrame = null; // Detener el bucle de animación
          return;
        }

        animationFrame = requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas en cada frame
        
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          let barHeight = dataArray[i] / 2; // Ajustar la altura para que sea más visible
          
          // Asegurarse de que la altura de la barra no sea negativa
          if (barHeight < 0) barHeight = 0; 
          
          // Color dinámico basado en la intensidad
          const hue = (i / bufferLength) * 360; // Colores del espectro
          const saturation = 100;
          const lightness = 50 + (barHeight / 255) * 40; // Luz vará con la intensidad
          ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1; // Espacio entre barras
        }
      }
      renderFrame(); // Iniciar el bucle de animación
    }

    closeEqualizer.addEventListener('click', () => {
      activateModule('player');
      // Restablecer los sliders visualmente a 0
      document.querySelector('[data-band="bass"]').value = 0;
      document.querySelector('[data-band="mid"]').value = 0;
      document.querySelector('[data-band="treble"]').value = 0;

      // Restablecer la ganancia de los filtros del ecualizador a 0
      if (eqFilters.bass) eqFilters.bass.gain.value = 0;
      if (eqFilters.mid) eqFilters.mid.gain.value = 0;
      if (eqFilters.treble) eqFilters.treble.gain.value = 0;

      // Restablecer el masterGain del AudioContext al volumen original del audioPlayer
      if (masterGain) masterGain.gain.value = originalAudioVolume;
      
      // Detener y limpiar el visualizador
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      const canvas = document.getElementById('eqVisualizer');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    videoPlayButton.addEventListener('click', () => {
      if (videoFiles.length > 0) {
        activateModule('video');
        playVideo(currentVideoIndex === -1 ? 0 : currentVideoIndex);
      } else {
        showNotification('Selecciona un archivo de video primero.');
      }
    });

    function playVideo(index) {
      if (!Array.isArray(videoFiles) || videoFiles.length === 0) {
        showNotification('No hay videos cargados.');
        return;
      }
      if (typeof index !== 'number' || index < 0 || index >= videoFiles.length) {
        showNotification('Índice de video inválido.');
        return;
      }
      
      // Guardar el estado del audio
      audioWasPlayingBeforeVideo = isPlaying;
      audioTimeBeforeVideo = audioPlayer.currentTime;
      
      // Pausar el audio si está sonando
      if (isPlaying) {
        pauseAudio();
        showNotification('Audio pausado automáticamente');
      }
      
      // Obtener referencias a los elementos
      const videoContainer = document.getElementById('videoPlayerContainer');
      const videoElement = document.getElementById('videoElement');
      
      if (!videoContainer || !videoElement) {
        showNotification('Error: No se pudo encontrar el reproductor de video');
        return;
      }
      
      // Asegurarse de que el video esté silenciado inicialmente para evitar problemas de autoplay
      videoElement.muted = true;
      
      // Configurar el elemento de video
      videoElement.style.display = 'block';
      videoElement.style.visibility = 'visible';
      videoElement.style.opacity = '1';
      videoElement.style.width = '100%';
      videoElement.style.height = 'auto';
      videoElement.style.maxHeight = '90vh';
      videoElement.style.objectFit = 'contain';
      
      // Liberar la URL anterior si es blob
      if (currentVideoURL && currentVideoURL.startsWith('blob:')) {
        try { URL.revokeObjectURL(currentVideoURL); } catch (e) {}
        currentVideoURL = null;
      }
      
      // Cargar el video seleccionado
      const video = videoFiles[index];
      videoElement.src = video.path;
      
      // Guardar la URL actual si es blob
      if (video.path.startsWith('blob:')) {
        currentVideoURL = video.path;
      } else {
        currentVideoURL = null;
      }
      
      // Configuración para móviles
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('webkit-playsinline', '');
      
      // Manejar la carga y reproducción
      const playVideoWithSound = () => {
        // Intentar reproducir con sonido
        videoElement.play().then(() => {
          // Si se reproduce correctamente, intentar desactivar el mute
          if (videoElement.muted) {
            videoElement.muted = false;
            // Si el navegador lo permite, reproducir con sonido
            videoElement.play().catch(() => {
              // Si falla, mantener silenciado
              videoElement.muted = true;
            });
          }
        }).catch(error => {
          console.error('Error al reproducir el video con sonido:', error);
          // Si falla, intentar reproducir silenciado
          videoElement.muted = true;
          videoElement.play().catch(e => console.error('Error al reproducir con mute:', e));
        });
      };
      
      // Configurar el evento de carga
      const onVideoLoaded = () => {
        // Activar el módulo de video después de cargar
        activateModule('video');
        
        // Asegurar que el contenedor sea visible
        videoContainer.style.display = 'flex';
        videoContainer.style.visibility = 'visible';
        videoContainer.style.opacity = '1';
        videoContainer.classList.add('visible');
        
        // Intentar reproducir después de un pequeño retraso
        setTimeout(playVideoWithSound, 100);
        
        // Eliminar el event listener para evitar múltiples llamadas
        videoElement.removeEventListener('loadeddata', onVideoLoaded);
      };
      
      // Agregar event listener para cuando el video esté cargado
      videoElement.addEventListener('loadeddata', onVideoLoaded);
      
      // Si el video ya está cargado, reproducir inmediatamente
      if (videoElement.readyState >= 3) { // HAVE_FUTURE_DATA o mayor
        onVideoLoaded();
      }
      
      // Cargar el video
      videoElement.load();
      currentVideoIndex = index;
      videoPlayer.play().then(() => {
        isVideoPlaying = true;
        showNotification(`Reproduciendo: ${video.name}`);
      }).catch(e => {
        showNotification('Error al reproducir video.');
        isVideoPlaying = false;
        activateModule('player');
      });
    }

    videoPlayPause.addEventListener('click', () => {
      if (videoPlayer.paused) {
        videoPlayer.play();
      } else {
        videoPlayer.pause();
      }
    });

    closeVideoButton.addEventListener('click', () => {
      closeVideoPlayerCompletely();
    });

    videoPlayer.addEventListener('ended', () => {
      if (videoLoopMode) {
        videoPlayer.play();
      } else if (videoFiles.length > 1) {
        currentVideoIndex = (currentVideoIndex + 1) % videoFiles.length;
        playVideo(currentVideoIndex);
      } else {
        // Si no hay más videos, restaurar el audio
        if (audioWasPlayingBeforeVideo && originalPlaylistFiles.length > 0) {
          audioPlayer.currentTime = audioTimeBeforeVideo;
          playAudio();
          showNotification('Video finalizado - Audio reanudado automáticamente');
        } else {
          showNotification('Video finalizado');
        }
        closeVideoPlayerCompletely();
      }
    });

    videoPlayer.addEventListener('play', () => {
      isVideoPlaying = true;
      videoPauseIcon.style.display = 'block';
      videoPlayIcon.style.display = 'none';
    });

    videoPlayer.addEventListener('pause', () => {
      isVideoPlaying = false;
      videoPauseIcon.style.display = 'none';
      videoPlayIcon.style.display = 'block';
    });

    videoLoop.addEventListener('click', () => {
      videoLoopMode = !videoLoopMode;
      videoPlayer.loop = videoLoopMode;
      videoLoop.classList.toggle('active', videoLoopMode);
      showNotification(`Bucle de video: ${videoLoopMode ? 'Activado' : 'Desactivado'}`);
    });

    videoNext.addEventListener('click', () => {
      if (videoFiles.length > 1) {
        let newIndex = (currentVideoIndex + 1) % videoFiles.length;
        if (newIndex < 0 || newIndex >= videoFiles.length) {
          showNotification('No hay video siguiente.');
          return;
        }
        playVideo(newIndex);
      }
    });

    videoPrev.addEventListener('click', () => {
      if (videoFiles.length > 1) {
        let newIndex = (currentVideoIndex - 1 + videoFiles.length) % videoFiles.length;
        if (newIndex < 0 || newIndex >= videoFiles.length) {
          showNotification('No hay video anterior.');
          return;
        }
        playVideo(newIndex);
      }
    });

    videoFullscreen.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        modules.video.requestFullscreen().catch(err => {
          console.error('Error al activar pantalla completa:', err);
        });
      }
    });

    document.addEventListener('fullscreenchange', () => {
      videoFullscreen.classList.toggle('active', !!document.fullscreenElement);
    });

    backgroundLoopButton.addEventListener('click', () => {
      backgroundLoopActive = !backgroundLoopActive;
      backgroundLoopButton.classList.toggle('active', backgroundLoopActive);
      audioPlayer.loop = backgroundLoopActive;
      showNotification(`Bucle de fondo: ${backgroundLoopActive ? 'Activado' : 'Desactivado'}`);
    });

    closePlaylist.addEventListener('click', () => activateModule('player'));
    closeFavorites.addEventListener('click', () => activateModule('player'));

    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM Content Loaded - Iniciando aplicación');
      initializeModules();
      createParticles();
      updatePlaylistUI();
      updateFavoritesUI();
      setButtonStylesAndRandomColors(); // Asegúrate de llamar a esta función si no lo hacías ya aquí.
      
      // Inicializar variable CSS para la animación del fondo
      document.documentElement.style.setProperty('--tunnel-animation', 'running');
      
      // Habilitar scroll en paneles de lista y favoritos
      const enablePanelScroll = () => {
        const panels = document.querySelectorAll('#playlistContainer, #favoritesContainer');
        panels.forEach(panel => {
          panel.style.overflowY = 'scroll';
          panel.style.webkitOverflowScrolling = 'touch';
          panel.style.overscrollBehavior = 'contain';
          
          const content = panel.querySelector('#playlistContent, #favoritesContent');
          if (content) {
            content.style.overflowY = 'scroll';
            content.style.webkitOverflowScrolling = 'touch';
            content.style.overscrollBehavior = 'contain';
          }
        });
      };
      
      // Ejecutar inmediatamente y después de un delay
      enablePanelScroll();
      setTimeout(enablePanelScroll, 1000);
      
      // Habilitar scroll en eventos táctiles
      document.addEventListener('touchstart', () => {
        enablePanelScroll();
      }, { passive: true });
      
      // Agregar efecto parallax al contenedor principal
      const playerContainer = document.getElementById('playerContainer');
      playerContainer.addEventListener('mousemove', (e) => {
        const rect = playerContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / centerX * 15;
        const rotateX = (centerY - y) / centerY * 15;
        
        playerContainer.style.transform = `rotateX(${10 + rotateX}deg) rotateY(${15 + rotateY}deg) translateZ(var(--depth-3))`;
        
        // Actualizar posición para sombra dinámica
        playerContainer.style.setProperty('--mouse-x', `${x}px`);
        playerContainer.style.setProperty('--mouse-y', `${y}px`);
      });
      
      // Crear partículas de audio al hacer clic en cualquier botón
      document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
          const rect = button.getBoundingClientRect();
          const centerX = rect.left + rect.width/2;
          const centerY = rect.top + rect.height/2;
          createAudioParticle(centerX, centerY);
          createEnergyParticles(centerX, centerY);
        });
      });

      // Efecto Rubber Band
      document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
          button.classList.add('rubber-band');
          setTimeout(() => button.classList.remove('rubber-band'), 500);
        });
      });

      // Motion Trail
      let isDragging = false;
      let lastX, lastY;
      playerContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
      });
      document.addEventListener('mousemove', (e) => {
        if (isDragging) {
          const trail = document.createElement('div');
          trail.className = 'motion-trail';
          trail.style.left = `${lastX}px`;
          trail.style.top = `${lastY}px`;
          document.body.appendChild(trail);
          setTimeout(() => trail.remove(), 300);
          lastX = e.clientX;
          lastY = e.clientY;
        }
      });
      document.addEventListener('mouseup', () => {
        isDragging = false;
      });
      document.body.classList.remove('loading');
    });
    
    // ===== WAKE LOCK PARA MANTENER PANTALLA ACTIVA =====

    let wakeLock = null;

    async function enableWakeLock() {
      if (!('wakeLock' in navigator)) return;
      
      try {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => {
          console.log('Wake Lock liberado');
        });
        console.log('Wake Lock activado');
      } catch (e) {
        console.error('Error al activar Wake Lock:', e);
      }
    }

    // Activar al cargar la aplicación
    window.addEventListener('load', () => {
      if (document.visibilityState === 'visible') {
        enableWakeLock();
      }
    });

    // Reactivar cuando el usuario vuelve a la aplicación
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        enableWakeLock();
      }
    });

    // Activar también con cualquier interacción
    document.addEventListener('click', enableWakeLock);
    document.addEventListener('touchstart', enableWakeLock);

    function closeVideoPlayerCompletely() {
      // Obtener referencias a los elementos
      const videoElement = document.getElementById('videoElement');
      const videoContainer = document.getElementById('videoPlayerContainer');
      
      // Pausar y limpiar el video
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.style.visibility = 'hidden';
        videoElement.style.opacity = '0';
        videoElement.style.display = 'none';
        
        // Limpiar la fuente del video para liberar recursos
        videoElement.src = '';
        videoElement.load();
      }
      
      isVideoPlaying = false;
      
      // Ocultar el contenedor del reproductor de video
      if (videoContainer) {
        videoContainer.style.visibility = 'hidden';
        videoContainer.style.opacity = '0';
        videoContainer.classList.remove('visible');
        videoContainer.style.display = 'none';
      }
      
      // Liberar la URL del video si es blob
      if (currentVideoURL && currentVideoURL.startsWith('blob:')) {
        try { 
          URL.revokeObjectURL(currentVideoURL);
        } catch (e) {
          console.error('Error al liberar URL del video:', e);
        }
        currentVideoURL = null;
      }
      
      // Activar el módulo principal
      activateModule('player');
      
      // Restaurar el audio si estaba sonando antes del video
      if (audioWasPlayingBeforeVideo && originalPlaylistFiles && originalPlaylistFiles.length > 0) {
        try {
          // Pequeño retraso para asegurar que el módulo de audio esté listo
          setTimeout(() => {
            if (audioPlayer) {
              audioPlayer.currentTime = audioTimeBeforeVideo;
              playAudio().then(() => {
                showNotification('Audio reanudado automáticamente');
              }).catch(e => {
                console.error('Error al reanudar la reproducción de audio:', e);
              });
            }
          }, 100);
        } catch (e) {
          console.error('Error al reanudar el audio:', e);
        }
      }
      
      // Restablecer los controles de video
      if (videoPauseIcon) videoPauseIcon.style.display = 'none';
      if (videoPlayIcon) videoPlayIcon.style.display = 'block';
      
      // Forzar un redibujado para asegurar que los cambios se apliquen
      if (videoElement) {
        void videoElement.offsetHeight; // Trigger reflow
      }
      
      // Limpiar cualquier notificación anterior
      hideNotification();
    }

    function randomColor() {
      // 10 colores completamente diferentes
      const palette = [
        'rgba(255, 107, 0, 0.7)',    // naranja brillante
        'rgba(64, 224, 208, 0.7)',   // turquesa
        'rgba(255, 20, 147, 0.7)',   // fucsia
        'rgba(255, 215, 0, 0.7)',    // amarillo oro
        'rgba(220, 20, 60, 0.7)',    // rojo carmín
        'rgba(0, 250, 154, 0.7)',    // verde menta
        'rgba(255, 160, 122, 0.7)',  // salmón claro
        'rgba(30, 144, 255, 0.7)',   // azul dodger
        'rgba(128, 0, 128, 0.7)',    // púrpura
        'rgba(255, 228, 181, 0.7)'   // beige claro
      ];
      return palette[Math.floor(Math.random() * palette.length)];
    }
    function setButtonStylesAndRandomColors() {
      const fixedStyles = ['style-hexagonal', 'style-holographic', 'style-3d-elevated'];
      const allButtons = document.querySelectorAll('button');
      allButtons.forEach((button) => {
        fixedStyles.forEach(style => button.classList.add(style));
        button.style.setProperty('--button-bg', randomColor());
        // Limpia cualquier intervalo anterior
        if (button._colorInterval) clearInterval(button._colorInterval);
        // Asigna un intervalo aleatorio (2, 3 o 4 segundos)
        const intervals = [2000, 3000, 4000];
        const interval = intervals[Math.floor(Math.random() * intervals.length)];
        button._colorInterval = setInterval(() => {
          button.style.setProperty('--button-bg', randomColor());
        }, interval);
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setButtonStylesAndRandomColors);
    } else {
      setButtonStylesAndRandomColors();
    }
    const observer = new MutationObserver(setButtonStylesAndRandomColors);
    observer.observe(document.body, { childList: true, subtree: true });
    // SOLUCIÓN: Inicialización correcta al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM Content Loaded - Iniciando aplicación');
      // 1. Inicializa el sistema de módulos, estableciendo el reproductor como activo.
      initializeModules();

      // 2. Ejecuta el resto de las funciones de arranque.
      createParticles();
      updatePlaylistUI();
      updateFavoritesUI();
      setButtonStylesAndRandomColors(); // Asegúrate de llamar a esta función si no lo hacías ya aquí.

      // 3. Finalmente, quita la clase 'loading' del body para mostrar todo.
      document.body.classList.remove('loading');

      console.log('Aplicación inicializada correctamente. Módulo activo: player');
    });
  </script>
</body>
</html>
