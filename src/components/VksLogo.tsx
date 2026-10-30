import React from 'react';

interface VksLogoProps {
  className?: string;
  showSubtitle?: boolean;
  variant?: 'dark' | 'light';
}

/**
 * Vetor fiel à identidade visual enviada da VKS SOFT:
 * Traços geométricos cápsula (#501BED) formando V, K, S + tipografia espaçada S O F T (#E2E2E2 ou #1B1A1F)
 */
export const VksLogo: React.FC<VksLogoProps> = ({
  className = 'h-10',
  showSubtitle = true,
  variant = 'dark',
}) => {
  const subtitleColor = variant === 'dark' ? '#E2E2E2' : '#1B1A1F';

  return (
    <div className={`inline-flex items-center select-none group ${className}`}>
      <svg
        viewBox={showSubtitle ? '0 0 540 245' : '0 0 540 175'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto overflow-visible"
      >
        <defs>
          {/* userSpaceOnUse: com objectBoundingBox a haste reta do K (largura 0) ficava sem pintura */}
          <linearGradient
            id="vksPrimaryGrad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="540"
            y2="175"
          >
            <stop offset="0%" stopColor="#6230F5" />
            <stop offset="50%" stopColor="#501BED" />
            <stop offset="100%" stopColor="#3E11C4" />
          </linearGradient>
          <filter id="vksGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Letra V */}
        <path
          d="M28 28 L92 142 L156 28"
          stroke="url(#vksPrimaryGrad)"
          strokeWidth="44"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(80,27,237,0.75)]"
        />

        {/* Letra K - Haste Vertical */}
        <path
          d="M230 28 L230 142"
          stroke="url(#vksPrimaryGrad)"
          strokeWidth="44"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(80,27,237,0.75)]"
        />

        {/* Letra K - Chevron */}
        <path
          d="M348 28 L292 85 L348 142"
          stroke="url(#vksPrimaryGrad)"
          strokeWidth="44"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(80,27,237,0.75)]"
        />

        {/* Letra S */}
        <path
          d="M482 26 H436 C410 26 402 44 402 56 C402 72 414 84 438 84 H472 C500 84 514 98 514 115 C514 132 498 144 472 144 H444"
          stroke="url(#vksPrimaryGrad)"
          strokeWidth="40"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(80,27,237,0.75)]"
        />

        {showSubtitle && (
          <g fill={subtitleColor} className="font-sans" style={{ fontSize: '46px', fontWeight: 400 }}>
            <text x="16" y="236">S</text>
            <text x="176" y="236">O</text>
            <text x="342" y="236">F</text>
            <text x="492" y="236">T</text>
          </g>
        )}
      </svg>
    </div>
  );
};
