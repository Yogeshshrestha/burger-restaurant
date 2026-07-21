import React from 'react';

interface BurgerSvgProps {
  layerId: string;
  width?: number | string;
  className?: string;
  hovered?: boolean;
}

export const BurgerSvg: React.FC<BurgerSvgProps> = ({
  layerId,
  width = '100%',
  className = '',
  hovered = false,
}) => {
  // Common visual filters
  const filterId = `dropshadow-${layerId}`;
  const glowId = `glow-${layerId}`;

  // Render different layers dynamically based on the layerId
  switch (layerId) {
    case 'bun_top':
      return (
        <svg
          viewBox="0 0 500 160"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="brioche-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E69C5C" />
              <stop offset="15%" stopColor="#C97B3A" />
              <stop offset="60%" stopColor="#9C521E" />
              <stop offset="100%" stopColor="#733309" />
            </linearGradient>
            <linearGradient id="shine-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Main Bun Shape */}
          <path
            d="M 25 120 C 25 20, 475 20, 475 120 C 475 140, 460 145, 420 145 C 340 145, 160 145, 80 145 C 40 145, 25 140, 25 120 Z"
            fill="url(#brioche-grad)"
            filter={`url(#${filterId})`}
          />

          {/* Toasted Edge Border (Bottom highlight) */}
          <path
            d="M 25 120 C 35 135, 465 135, 475 120 C 465 145, 35 145, 25 120 Z"
            fill="#542304"
            opacity="0.7"
          />

          {/* Glossy Reflection Highlight */}
          <path
            d="M 50 80 C 100 40, 400 40, 450 80 C 410 50, 90 50, 50 80 Z"
            fill="url(#shine-grad)"
          />

          {/* Sesame Seeds */}
          <g fill="#FFFDEB" opacity="0.95">
            {/* Group of sesame seeds placed dynamically */}
            <path d="M 120 60 C 117 60, 115 63, 115 65 C 115 67, 118 70, 120 70 C 122 70, 125 67, 125 65 C 125 63, 122 60, 120 60 Z" transform="rotate(-15 120 65)" />
            <path d="M 170 45 C 167 45, 165 48, 165 50 C 165 52, 168 55, 170 55 C 172 55, 175 52, 175 50 C 175 48, 172 45, 170 45 Z" transform="rotate(30 170 50)" />
            <path d="M 220 38 C 217 38, 215 41, 215 43 C 215 45, 218 48, 220 48 C 222 48, 225 45, 225 43 C 225 41, 222 38, 220 38 Z" transform="rotate(-5 220 43)" />
            <path d="M 280 35 C 277 35, 275 38, 275 40 C 275 42, 278 45, 280 45 C 282 45, 285 42, 285 40 C 285 38, 282 35, 280 35 Z" transform="rotate(10 280 40)" />
            <path d="M 330 42 C 327 42, 325 45, 325 47 C 325 49, 328 52, 330 52 C 332 52, 335 49, 335 47 C 335 45, 332 42, 330 42 Z" transform="rotate(-25 330 47)" />
            <path d="M 380 55 C 377 55, 375 58, 375 60 C 375 62, 378 65, 380 65 C 382 65, 385 62, 385 60 C 385 58, 382 55, 380 55 Z" transform="rotate(20 380 60)" />
            
            {/* Lower row */}
            <path d="M 95 95 C 92 95, 90 98, 90 100 C 90 102, 93 105, 95 105 C 97 105, 100 102, 100 100 C 100 98, 97 95, 95 95 Z" transform="rotate(-40 95 100)" />
            <path d="M 145 80 C 142 80, 140 83, 140 85 C 140 87, 143 90, 145 90 C 147 90, 150 87, 150 85 C 150 83, 147 80, 145 80 Z" transform="rotate(15 145 85)" />
            <path d="M 200 70 C 197 70, 195 73, 195 75 C 195 77, 198 80, 200 80 C 202 80, 205 77, 205 75 C 205 73, 202 70, 200 70 Z" transform="rotate(-10 200 75)" />
            <path d="M 255 65 C 252 65, 250 68, 250 70 C 250 72, 253 75, 255 75 C 257 75, 260 72, 260 70 C 260 68, 257 65, 255 65 Z" transform="rotate(5 255 70)" />
            <path d="M 305 72 C 302 72, 300 75, 300 77 C 300 79, 303 82, 305 82 C 307 82, 310 79, 310 77 C 310 75, 307 72, 305 72 Z" transform="rotate(-15 305 77)" />
            <path d="M 360 85 C 357 85, 355 88, 355 90 C 355 92, 358 95, 360 95 C 362 95, 365 92, 365 90 C 365 88, 362 85, 360 85 Z" transform="rotate(35 360 90)" />
            <path d="M 410 100 C 407 100, 405 103, 405 105 C 405 107, 408 110, 410 110 C 412 110, 415 107, 415 105 C 415 103, 412 100, 410 100 Z" transform="rotate(-5 410 105)" />
          </g>
        </svg>
      );

    case 'patty':
      return (
        <svg
          viewBox="0 0 500 110"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="patty-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4F3025" />
              <stop offset="40%" stopColor="#3C2117" />
              <stop offset="75%" stopColor="#2F180F" />
              <stop offset="100%" stopColor="#1E0F0A" />
            </linearGradient>
            <linearGradient id="char-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A0D08" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#150A06" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0B0503" stopOpacity="1" />
              <stop offset="75%" stopColor="#150A06" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1A0D08" stopOpacity="0.8" />
            </linearGradient>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Organic Thick Patty Shape (Uneven hand-formed edges) */}
          <path
            d="M 15 50 C 15 35, 55 33, 100 31 C 180 27, 320 27, 400 31 C 445 33, 485 35, 485 50 C 485 75, 465 95, 415 98 C 340 102, 160 102, 85 98 C 35 95, 15 75, 15 50 Z"
            fill="url(#patty-grad)"
            filter={`url(#${filterId})`}
          />

          {/* Grill Marks */}
          <g stroke="#1A0A05" strokeWidth="6" strokeLinecap="round" opacity="0.85">
            <line x1="120" y1="36" x2="100" y2="92" />
            <line x1="180" y1="33" x2="160" y2="95" />
            <line x1="240" y1="31" x2="220" y2="96" />
            <line x1="300" y1="31" x2="280" y2="96" />
            <line x1="360" y1="33" x2="340" y2="95" />
            <line x1="420" y1="36" x2="400" y2="92" />
          </g>

          {/* Glistening Juicy Highlights */}
          <path
            d="M 45 44 C 75 42, 135 41, 165 42 C 180 43, 140 46, 110 47 C 75 48, 50 47, 45 44 Z"
            fill="#FFF"
            opacity="0.25"
          />
          <path
            d="M 280 40 C 310 39, 380 40, 420 42 C 380 44, 320 44, 280 42 C 275 41, 275 40, 280 40 Z"
            fill="#FFF"
            opacity="0.2"
          />

          {/* Charred Outer Edge Texture details */}
          <path
            d="M 15 50 C 13 60, 22 75, 55 80 C 45 70, 25 55, 15 50 Z"
            fill="url(#char-grad)"
          />
          <path
            d="M 485 50 C 487 60, 478 75, 445 80 C 455 70, 475 55, 485 50 Z"
            fill="url(#char-grad)"
          />
        </svg>
      );

    case 'cheese':
      return (
        <svg
          viewBox="0 0 500 110"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="cheese-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="40%" stopColor="#FFB703" />
              <stop offset="100%" stopColor="#E07A5F" />
            </linearGradient>
            <filter id={filterId} x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="4" floodColor="#000" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Melted Cheddar Square corners dripping down */}
          <path
            d="M 10 30 
               C 10 30, 40 32, 80 34 
               C 110 35, 120 55, 130 85 
               C 133 92, 142 92, 145 85 
               C 155 60, 160 36, 190 36 
               C 220 36, 230 45, 235 60 
               C 240 75, 245 105, 255 105 
               C 265 105, 270 70, 275 60 
               C 285 40, 310 37, 340 37 
               C 380 37, 390 55, 400 95 
               C 403 103, 412 103, 415 95 
               C 425 55, 435 34, 490 30
               C 470 55, 440 60, 435 70
               C 420 100, 370 100, 350 45
               C 320 40, 290 45, 280 50
               C 260 100, 220 100, 200 45
               C 180 40, 110 42, 90 75
               C 70 105, 30 105, 10 30 Z"
            fill="url(#cheese-grad)"
            filter={`url(#${filterId})`}
          />

          {/* Glistening Melt Highlight */}
          <path
            d="M 125 70 C 127 75, 131 75, 133 70 C 131 50, 121 40, 110 36 C 115 42, 122 55, 125 70 Z"
            fill="#FFF"
            opacity="0.4"
          />
          <path
            d="M 243 80 C 245 88, 250 88, 252 80 C 248 60, 241 48, 230 40 C 235 46, 241 62, 243 80 Z"
            fill="#FFF"
            opacity="0.4"
          />
          <path
            d="M 393 75 C 395 85, 399 85, 401 75 C 398 55, 388 45, 375 39 C 380 44, 390 58, 393 75 Z"
            fill="#FFF"
            opacity="0.4"
          />
        </svg>
      );

    case 'lettuce':
      return (
        <svg
          viewBox="0 0 500 120"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="lettuce-main" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9EF01A" />
              <stop offset="50%" stopColor="#70E000" />
              <stop offset="100%" stopColor="#38B000" />
            </linearGradient>
            <linearGradient id="lettuce-dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38B000" />
              <stop offset="100%" stopColor="#007200" />
            </linearGradient>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background Lettuce (Darker Fold) */}
          <path
            d="M 30 70 C 5 60, 20 20, 55 35 C 90 20, 130 25, 150 45 C 190 20, 240 20, 270 45 C 310 15, 370 20, 390 50 C 430 20, 480 30, 470 70 C 450 90, 420 95, 380 85 C 320 100, 180 100, 120 85 C 80 95, 50 90, 30 70 Z"
            fill="url(#lettuce-dark)"
            opacity="0.9"
          />

          {/* Foreground Crisp Lettuce (Brighter Wavy Leaves) */}
          <path
            d="M 40 65 
               C 10 55, 30 15, 70 30 
               C 110 10, 150 15, 175 40 
               C 215 15, 265 15, 290 40 
               C 330 10, 385 15, 410 45 
               C 450 20, 485 35, 460 75 
               C 440 90, 410 85, 370 75 
               C 310 95, 190 95, 130 75 
               C 90 85, 60 80, 40 65 Z"
            fill="url(#lettuce-main)"
            filter={`url(#${filterId})`}
          />

          {/* Leaf Ribs and Veins */}
          <g stroke="#CCFF33" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6">
            {/* Left Leaf details */}
            <path d="M 80 45 Q 100 55 120 65" />
            <path d="M 90 50 Q 85 62 82 70" />
            <path d="M 105 57 Q 115 50 125 45" />

            {/* Middle Leaf details */}
            <path d="M 230 40 Q 240 58 250 75" />
            <path d="M 235 48 Q 215 48 200 45" />
            <path d="M 242 58 Q 275 58 290 55" />

            {/* Right Leaf details */}
            <path d="M 380 45 Q 360 55 340 65" />
            <path d="M 370 50 Q 375 62 378 70" />
            <path d="M 355 57 Q 345 50 335 45" />
          </g>

          {/* Curly Edge Highlights */}
          <path d="M 35 50 C 30 35, 55 25, 70 35" fill="none" stroke="#E2F9A1" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <path d="M 145 30 C 160 20, 180 25, 185 40" fill="none" stroke="#E2F9A1" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <path d="M 265 30 C 280 20, 300 25, 305 40" fill="none" stroke="#E2F9A1" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <path d="M 420 35 C 440 25, 465 35, 460 55" fill="none" stroke="#E2F9A1" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'tomato':
      return (
        <svg
          viewBox="0 0 500 100"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="tomato-outer" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF4D4D" />
              <stop offset="60%" stopColor="#D90429" />
              <stop offset="100%" stopColor="#90001C" />
            </linearGradient>
            <linearGradient id="tomato-inner" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF5C5C" />
              <stop offset="100%" stopColor="#EF233C" />
            </linearGradient>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Render Two Tomato Slices Overlapping */}
          
          {/* LEFT SLICE */}
          <g transform="translate(-20, 0)" filter={`url(#${filterId})`}>
            {/* Outer Rim */}
            <ellipse cx="170" cy="50" rx="120" ry="40" fill="url(#tomato-outer)" />
            {/* Meat/Flesh */}
            <ellipse cx="170" cy="50" rx="105" ry="32" fill="url(#tomato-inner)" />
            
            {/* Inner Seed Chambers */}
            <path d="M 100 50 C 100 40, 120 32, 135 32 C 145 32, 140 45, 125 48 C 110 50, 100 50, 100 50 Z" fill="#90001C" opacity="0.8" />
            <path d="M 240 50 C 240 40, 220 32, 205 32 C 195 32, 200 45, 215 48 C 230 50, 240 50, 240 50 Z" fill="#90001C" opacity="0.8" />
            <path d="M 170 24 C 180 24, 185 36, 180 43 C 175 48, 165 48, 160 43 C 155 36, 160 24, 170 24 Z" fill="#90001C" opacity="0.8" />
            <path d="M 170 76 C 180 76, 185 64, 180 57 C 175 52, 165 52, 160 57 C 155 64, 160 76, 170 76 Z" fill="#90001C" opacity="0.8" />

            {/* Seeds (Yellowish Dots) */}
            <circle cx="118" cy="40" r="3.5" fill="#FFE169" />
            <circle cx="128" cy="42" r="3" fill="#FFE169" />
            <circle cx="222" cy="40" r="3.5" fill="#FFE169" />
            <circle cx="212" cy="42" r="3" fill="#FFE169" />
            <circle cx="170" cy="32" r="3" fill="#FFE169" />
            <circle cx="170" cy="68" r="3" fill="#FFE169" />

            {/* Wet highlights */}
            <ellipse cx="140" cy="24" rx="20" ry="4" fill="#FFF" opacity="0.25" transform="rotate(-10 140 24)" />
          </g>

          {/* RIGHT SLICE */}
          <g transform="translate(150, 5)" filter={`url(#${filterId})`}>
            {/* Outer Rim */}
            <ellipse cx="170" cy="45" rx="120" ry="40" fill="url(#tomato-outer)" />
            {/* Meat/Flesh */}
            <ellipse cx="170" cy="45" rx="105" ry="32" fill="url(#tomato-inner)" />
            
            {/* Inner Seed Chambers */}
            <path d="M 100 45 C 100 35, 120 27, 135 27 C 145 27, 140 40, 125 43 C 110 45, 100 45, 100 45 Z" fill="#90001C" opacity="0.8" />
            <path d="M 240 45 C 240 35, 220 27, 205 27 C 195 27, 200 40, 215 43 C 230 45, 240 45, 240 45 Z" fill="#90001C" opacity="0.8" />
            <path d="M 170 19 C 180 19, 185 31, 180 38 C 175 43, 165 43, 160 38 C 155 31, 160 19, 170 19 Z" fill="#90001C" opacity="0.8" />
            <path d="M 170 71 C 180 71, 185 59, 180 52 C 175 47, 165 47, 160 52 C 155 59, 160 71, 170 71 Z" fill="#90001C" opacity="0.8" />

            {/* Seeds (Yellowish Dots) */}
            <circle cx="118" cy="35" r="3.5" fill="#FFE169" />
            <circle cx="128" cy="37" r="3" fill="#FFE169" />
            <circle cx="222" cy="35" r="3.5" fill="#FFE169" />
            <circle cx="212" cy="37" r="3" fill="#FFE169" />
            <circle cx="170" cy="27" r="3" fill="#FFE169" />
            <circle cx="170" cy="63" r="3" fill="#FFE169" />

            {/* Wet highlights */}
            <ellipse cx="140" cy="19" rx="20" ry="4" fill="#FFF" opacity="0.25" transform="rotate(-10 140 19)" />
          </g>
        </svg>
      );

    case 'onion':
      return (
        <svg
          viewBox="0 0 500 90"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Three Red Onion Rings interlocking */}
          
          {/* RING 1 (Left) */}
          <g transform="translate(10, 10) rotate(-10 140 35)" filter={`url(#${filterId})`}>
            {/* Outer purple ring */}
            <ellipse cx="140" cy="35" rx="90" ry="28" fill="none" stroke="#7209B7" strokeWidth="11" />
            {/* Inner white-pink highlight ring */}
            <ellipse cx="140" cy="35" rx="84" ry="22" fill="none" stroke="#F72585" strokeWidth="3" />
            <ellipse cx="140" cy="35" rx="80" ry="18" fill="none" stroke="#FFF" strokeWidth="2.5" opacity="0.8" />
          </g>

          {/* RING 2 (Middle) */}
          <g transform="translate(110, 0) rotate(5 140 35)" filter={`url(#${filterId})`}>
            <ellipse cx="140" cy="35" rx="95" ry="30" fill="none" stroke="#7209B7" strokeWidth="11" />
            <ellipse cx="140" cy="35" rx="89" ry="24" fill="none" stroke="#F72585" strokeWidth="3" />
            <ellipse cx="140" cy="35" rx="85" ry="20" fill="none" stroke="#FFF" strokeWidth="2.5" opacity="0.8" />
          </g>

          {/* RING 3 (Right) */}
          <g transform="translate(210, 8) rotate(12 140 35)" filter={`url(#${filterId})`}>
            <ellipse cx="140" cy="35" rx="85" ry="26" fill="none" stroke="#7209B7" strokeWidth="11" />
            <ellipse cx="140" cy="35" rx="79" ry="20" fill="none" stroke="#F72585" strokeWidth="3" />
            <ellipse cx="140" cy="35" rx="75" ry="16" fill="none" stroke="#FFF" strokeWidth="2.5" opacity="0.8" />
          </g>
        </svg>
      );

    case 'pickles':
      return (
        <svg
          viewBox="0 0 500 80"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="pickle-rim" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2D4A22" />
              <stop offset="100%" stopColor="#1A3310" />
            </linearGradient>
            <linearGradient id="pickle-flesh" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7F9F3D" />
              <stop offset="100%" stopColor="#4F7122" />
            </linearGradient>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Three sliced pickles with ribbed pattern */}
          
          {/* PICKLE 1 */}
          <g transform="translate(40, 5) rotate(-15 100 35)" filter={`url(#${filterId})`}>
            <ellipse cx="100" cy="35" rx="65" ry="25" fill="url(#pickle-rim)" />
            <ellipse cx="100" cy="35" rx="57" ry="19" fill="url(#pickle-flesh)" />
            {/* Ribbed lines (corrugated cut) */}
            <g stroke="#2D4A22" strokeWidth="2" opacity="0.35">
              <line x1="60" y1="20" x2="140" y2="20" />
              <line x1="50" y1="26" x2="150" y2="26" />
              <line x1="45" y1="32" x2="155" y2="32" />
              <line x1="45" y1="38" x2="155" y2="38" />
              <line x1="50" y1="44" x2="150" y2="44" />
              <line x1="60" y1="50" x2="140" y2="50" />
            </g>
            {/* Seeds core */}
            <ellipse cx="100" cy="35" rx="35" ry="10" fill="none" stroke="#2D4A22" strokeWidth="2.5" strokeDasharray="3,6" opacity="0.5" />
          </g>

          {/* PICKLE 2 */}
          <g transform="translate(190, 0) rotate(10 100 35)" filter={`url(#${filterId})`}>
            <ellipse cx="100" cy="35" rx="70" ry="26" fill="url(#pickle-rim)" />
            <ellipse cx="100" cy="35" rx="62" ry="20" fill="url(#pickle-flesh)" />
            <g stroke="#2D4A22" strokeWidth="2" opacity="0.35">
              <line x1="60" y1="20" x2="140" y2="20" />
              <line x1="50" y1="26" x2="150" y2="26" />
              <line x1="45" y1="32" x2="155" y2="32" />
              <line x1="45" y1="38" x2="155" y2="38" />
              <line x1="50" y1="44" x2="150" y2="44" />
              <line x1="60" y1="50" x2="140" y2="50" />
            </g>
            <ellipse cx="100" cy="35" rx="38" ry="11" fill="none" stroke="#2D4A22" strokeWidth="2.5" strokeDasharray="3,6" opacity="0.5" />
          </g>

          {/* PICKLE 3 */}
          <g transform="translate(320, 10) rotate(-5 100 35)" filter={`url(#${filterId})`}>
            <ellipse cx="100" cy="35" rx="60" ry="24" fill="url(#pickle-rim)" />
            <ellipse cx="100" cy="35" rx="52" ry="18" fill="url(#pickle-flesh)" />
            <g stroke="#2D4A22" strokeWidth="2" opacity="0.35">
              <line x1="60" y1="20" x2="140" y2="20" />
              <line x1="50" y1="26" x2="150" y2="26" />
              <line x1="45" y1="32" x2="155" y2="32" />
              <line x1="45" y1="38" x2="155" y2="38" />
              <line x1="50" y1="44" x2="150" y2="44" />
              <line x1="60" y1="50" x2="140" y2="50" />
            </g>
            <ellipse cx="100" cy="35" rx="32" ry="9" fill="none" stroke="#2D4A22" strokeWidth="2.5" strokeDasharray="3,6" opacity="0.5" />
          </g>
        </svg>
      );

    case 'sauce':
      return (
        <svg
          viewBox="0 0 500 80"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="sauce-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA69E" />
              <stop offset="40%" stopColor="#FF686B" />
              <stop offset="100%" stopColor="#A81D1D" />
            </linearGradient>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Dripping Special Orange-Red Sauce Splatters */}
          <path
            d="M 50 30 
               Q 90 40 120 30 
               Q 140 55 150 65 
               Q 155 70 160 60 
               Q 180 35 220 32 
               Q 240 50 250 75 
               Q 255 80 260 70 
               Q 280 30 330 30 
               Q 345 55 350 60 
               Q 355 65 360 55 
               Q 390 35 450 30
               C 420 40, 390 45, 375 50
               C 365 55, 360 52, 358 45
               C 340 38, 290 38, 275 48
               C 265 55, 260 52, 258 45
               C 230 38, 180 38, 165 52
               C 155 60, 150 55, 148 45
               C 110 38, 70 38, 50 30 Z"
            fill="url(#sauce-grad)"
            filter={`url(#${filterId})`}
          />

          {/* Glistening spots */}
          <circle cx="151" cy="55" r="3" fill="#FFF" opacity="0.45" />
          <circle cx="251" cy="62" r="3.5" fill="#FFF" opacity="0.45" />
          <circle cx="351" cy="52" r="2.5" fill="#FFF" opacity="0.45" />
        </svg>
      );

    case 'bun_bottom':
      return (
        <svg
          viewBox="0 0 500 100"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="bun-bottom-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E69C5C" />
              <stop offset="30%" stopColor="#C97B3A" />
              <stop offset="100%" stopColor="#8A4214" />
            </linearGradient>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#000" floodOpacity="0.55" />
            </filter>
          </defs>

          {/* Bun Bottom Shape */}
          <path
            d="M 30 30 C 30 15, 470 15, 470 30 C 470 65, 440 90, 390 90 C 310 90, 190 90, 110 90 C 60 90, 30 65, 30 30 Z"
            fill="url(#bun-bottom-grad)"
            filter={`url(#${filterId})`}
          />

          {/* Grilled/Toasted Inner Ring (Flat face viewed at an angle) */}
          <ellipse cx="250" cy="28" rx="218" ry="12" fill="#542304" opacity="0.6" />
          <ellipse cx="250" cy="28" rx="215" ry="10" fill="#D4A373" opacity="0.25" />
        </svg>
      );

    case 'bacon':
      return (
        <svg
          viewBox="0 0 500 80"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="bacon-meat" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#541312" />
              <stop offset="20%" stopColor="#80231E" />
              <stop offset="40%" stopColor="#D9A88F" /> {/* Marble fat */}
              <stop offset="50%" stopColor="#80231E" />
              <stop offset="80%" stopColor="#541312" />
              <stop offset="100%" stopColor="#300707" />
            </linearGradient>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Two crispy wavy bacon strips intersecting */}
          
          {/* STRIP 1 */}
          <g filter={`url(#${filterId})`}>
            <path
              d="M 30 45 
                 Q 80 15 130 45 
                 Q 180 75 230 45 
                 Q 280 15 330 45 
                 Q 380 75 430 45 
                 L 440 55
                 Q 390 85 340 55 
                 Q 290 25 240 55 
                 Q 190 85 140 55 
                 Q 90 25 40 55 Z"
              fill="url(#bacon-meat)"
            />
          </g>

          {/* STRIP 2 */}
          <g transform="translate(20, -10) rotate(10 250 40)" filter={`url(#${filterId})`}>
            <path
              d="M 30 45 
                 Q 80 15 130 45 
                 Q 180 75 230 45 
                 Q 280 15 330 45 
                 Q 380 75 430 45 
                 L 440 55
                 Q 390 85 340 55 
                 Q 290 25 240 55 
                 Q 190 85 140 55 
                 Q 90 25 40 55 Z"
              fill="url(#bacon-meat)"
              opacity="0.95"
            />
          </g>
        </svg>
      );

    case 'mushroom':
      return (
        <svg
          viewBox="0 0 500 80"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="mush-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A89486" />
              <stop offset="50%" stopColor="#8E7C70" />
              <stop offset="100%" stopColor="#5E5047" />
            </linearGradient>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Group of sauteed mushrooms */}
          <g filter={`url(#${filterId})`}>
            {/* Mushroom 1 */}
            <path d="M 80 40 C 80 20, 130 20, 130 40 C 130 45, 120 50, 105 50 C 105 65, 95 65, 95 50 C 85 50, 80 45, 80 40 Z" fill="url(#mush-grad)" transform="rotate(-20 105 40)" />
            {/* Mushroom 2 */}
            <path d="M 210 35 C 210 15, 260 15, 260 35 C 260 40, 250 45, 235 45 C 235 60, 225 60, 225 45 C 215 45, 210 40, 210 35 Z" fill="url(#mush-grad)" transform="rotate(15 235 35)" />
            {/* Mushroom 3 */}
            <path d="M 340 45 C 340 25, 390 25, 390 45 C 390 50, 380 55, 365 55 C 365 70, 355 70, 355 55 C 345 55, 340 50, 340 45 Z" fill="url(#mush-grad)" transform="rotate(-5 365 45)" />
          </g>
        </svg>
      );

    case 'jalapenos':
      return (
        <svg
          viewBox="0 0 500 70"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Pickled Jalapeño Rings */}
          <g filter={`url(#${filterId})`}>
            {/* Ring 1 */}
            <g transform="translate(60, 10) rotate(-15 50 25)">
              <ellipse cx="50" cy="25" rx="45" ry="18" fill="#3D7A25" />
              <ellipse cx="50" cy="25" rx="28" ry="11" fill="#181310" /> {/* Transparent hole with background */}
              <ellipse cx="50" cy="25" rx="28" ry="11" fill="#88C057" fillOpacity="0.3" />
              {/* Seeds */}
              <circle cx="35" cy="22" r="3" fill="#FFE169" />
              <circle cx="65" cy="26" r="2.5" fill="#FFE169" />
              <circle cx="50" cy="18" r="2" fill="#FFE169" />
            </g>

            {/* Ring 2 */}
            <g transform="translate(190, 5) rotate(10 50 25)">
              <ellipse cx="50" cy="25" rx="48" ry="20" fill="#3D7A25" />
              <ellipse cx="50" cy="25" rx="30" ry="12" fill="#181310" />
              <ellipse cx="50" cy="25" rx="30" ry="12" fill="#88C057" fillOpacity="0.3" />
              <circle cx="32" cy="21" r="3" fill="#FFE169" />
              <circle cx="68" cy="25" r="2.5" fill="#FFE169" />
              <circle cx="48" cy="17" r="2.5" fill="#FFE169" />
            </g>

            {/* Ring 3 */}
            <g transform="translate(320, 12) rotate(-5 50 25)">
              <ellipse cx="50" cy="25" rx="42" ry="17" fill="#3D7A25" />
              <ellipse cx="50" cy="25" rx="26" ry="10" fill="#181310" />
              <ellipse cx="50" cy="25" rx="26" ry="10" fill="#88C057" fillOpacity="0.3" />
              <circle cx="38" cy="23" r="3" fill="#FFE169" />
              <circle cx="62" cy="21" r="2.5" fill="#FFE169" />
            </g>
          </g>
        </svg>
      );

    case 'egg':
      return (
        <svg
          viewBox="0 0 500 110"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="yolk-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD166" />
              <stop offset="40%" stopColor="#FFB703" />
              <stop offset="100%" stopColor="#FB8500" />
            </linearGradient>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Glistening Sunny-Side-Up Egg */}
          <g filter={`url(#${filterId})`}>
            {/* Egg White (Irregular wavy flat shape) */}
            <path
              d="M 50 50 
                 C 50 30, 100 25, 170 20 
                 C 250 15, 340 15, 410 30 
                 C 460 40, 470 65, 440 85 
                 C 400 100, 260 105, 160 95 
                 C 90 90, 50 75, 50 50 Z"
              fill="#F4F1DE"
            />
            {/* Crisp Crispy Brown Edges */}
            <path
              d="M 420 32 C 450 42, 465 58, 445 78 C 455 64, 440 45, 420 32 Z"
              fill="#C18C5D"
              opacity="0.6"
            />
            <path
              d="M 60 72 C 45 60, 52 42, 75 32 C 58 42, 50 60, 60 72 Z"
              fill="#C18C5D"
              opacity="0.6"
            />

            {/* Glowing Golden Liquid Yolk */}
            <ellipse cx="250" cy="50" rx="65" ry="32" fill="url(#yolk-grad)" />

            {/* Yolk High Glisten */}
            <ellipse cx="225" cy="40" rx="18" ry="7" fill="#FFF" opacity="0.5" transform="rotate(-15 225 40)" />
          </g>
        </svg>
      );

    case 'onion_rings':
      return (
        <svg
          viewBox="0 0 500 85"
          width={width}
          className={`${className} transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="ring-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E6A15C" />
              <stop offset="60%" stopColor="#C97526" />
              <stop offset="100%" stopColor="#8A4A0B" />
            </linearGradient>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Crispy Golden-Brown Fried Onion Rings */}
          <g filter={`url(#${filterId})`}>
            {/* Ring 1 (Left) */}
            <g transform="translate(60, 10) rotate(-15 70 30)">
              <ellipse cx="70" cy="30" rx="60" ry="22" fill="none" stroke="url(#ring-grad)" strokeWidth="16" />
              <ellipse cx="70" cy="30" rx="60" ry="22" fill="none" stroke="#FFE3A8" strokeWidth="2.5" opacity="0.3" />
            </g>

            {/* Ring 2 (Right) */}
            <g transform="translate(210, 5) rotate(15 75 30)">
              <ellipse cx="75" cy="30" rx="65" ry="24" fill="none" stroke="url(#ring-grad)" strokeWidth="16" />
              <ellipse cx="75" cy="30" rx="65" ry="24" fill="none" stroke="#FFE3A8" strokeWidth="2.5" opacity="0.3" />
            </g>
          </g>
        </svg>
      );

    default:
      return null;
  }
};
