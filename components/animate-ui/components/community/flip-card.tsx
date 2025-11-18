'use client';

import { Button } from '@/components/ui/button';
import { easeOut, motion } from 'motion/react';
import * as React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export interface FlipCardData {
  name: string;
  username: string;
  image: string;
  bio: string;
  stats: {
    following: number;
    followers: number;
    posts?: number;
  };
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  productId?: string; // Optional: for product cards
  features?: string[]; // Optional: for product features
  desc?: string; // Optional: product description
  specifications?: Record<string, string>; // Optional: product specifications
}

interface FlipCardProps {
  data: FlipCardData;
}

const flipTransition = {
  duration: 0.5,
  ease: easeOut,
};

export function FlipCard({ data }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isUsingTouch, setIsUsingTouch] = React.useState(false);

  const touchStartTime = React.useRef(0);
  const touchStartPos = React.useRef({ x: 0, y: 0 });
  const lastInteractionType = React.useRef<'touch' | 'mouse'>('mouse');

  // Detect if user is actually using touch (not just device capability)
  React.useEffect(() => {
    const handleTouchStart = () => {
      setIsUsingTouch(true);
      lastInteractionType.current = 'touch';
    };
    
    const handleMouseMove = () => {
      if (lastInteractionType.current === 'mouse') {
        setIsUsingTouch(false);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // For non-touch interactions, hover handles the flip
    // But we don't prevent the click if needed
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    lastInteractionType.current = 'touch';
    touchStartTime.current = Date.now();
    const touch = e.touches[0];
    if (touch) {
      touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    lastInteractionType.current = 'touch';
    // Only flip if it's a single tap (not a swipe or multi-touch)
    if (e.touches.length === 0 && e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      const touchDuration = Date.now() - touchStartTime.current;
      const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);
      
      // Only flip if it's a tap (quick, small movement) not a swipe
      if (touchDuration < 300 && deltaX < 10 && deltaY < 10) {
        // Check if the tap was on the card itself (not on interactive elements)
        const target = e.target as HTMLElement;
        if (target.tagName !== 'A' && target.tagName !== 'BUTTON' && !target.closest('a')) {
          e.preventDefault();
          e.stopPropagation();
          setIsFlipped((prev) => !prev);
        }
      }
    }
  };

  const handleMouseEnter = () => {
    lastInteractionType.current = 'mouse';
    if (!isUsingTouch) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isUsingTouch) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      className={`relative ${
        data.productId
          ? 'w-full h-[400px]'
          : 'mt-2 w-40 h-60 md:w-60 md:h-80 mx-auto'
      } perspective-1000 cursor-pointer`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        touchAction: 'manipulation', // Prevents double-tap zoom
        WebkitTapHighlightColor: 'transparent', // Removes tap highlight on iOS
      }}
    >
      {/* FRONT: Product Image + Name with Gradient or Profile */}
      <motion.div
        className={`absolute inset-0 backface-hidden ${
          data.productId
            ? 'rounded-2xl overflow-hidden flex flex-col items-center justify-center'
            : 'rounded-md border-2 border-foreground/20 px-4 py-6 flex flex-col items-center justify-center bg-gradient-to-br from-muted via-background to-muted text-center'
        }`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        initial={{ rotateY: 0 }}
        transition={flipTransition}
        style={{
          transformStyle: 'preserve-3d',
          ...(data.productId
            ? {
                background:
                  'linear-gradient(180deg, oklch(1 0 0) 0%, oklch(0.99 0.002 100) 50%, oklch(1 0 0) 100%)',
                border: '1px solid oklch(0.90 0.008 100)',
                boxShadow:
                  '0 16px 40px -24px oklch(0.45 0.15 220 / 0.35)',
              }
            : {}),
        }}
      >
        {data.productId ? (
          <>
            {/* Description badge */}
            {data.desc && (
              <div
                className="absolute top-5 left-6 flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full"
                style={{
                  background:
                    'linear-gradient(135deg, oklch(0.45 0.15 220 / 0.15), transparent)',
                  color: 'oklch(0.35 0.02 230)',
                  border: '1px solid oklch(0.80 0.01 200 / 0.6)',
                  boxShadow:
                    '0 4px 12px -6px oklch(0.45 0.15 220 / 0.4)',
                }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: 'oklch(0.50 0.15 220)' }}
                ></span>
                <span className="truncate max-w-[180px]">
                  {data.desc}
                </span>
              </div>
            )}
            {/* Image Container */}
            <div
              className="flex-1 w-full flex items-center justify-center p-6 relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, oklch(0.99 0.002 100) 0%, oklch(0.97 0.008 220) 100%)',
              }}
            >
              {/* Decorative gradient overlay */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    'radial-gradient(circle at center, oklch(0.50 0.15 220 / 0.1) 0%, transparent 70%)',
                }}
              ></div>
              <img
                src={data.image}
                alt={data.name}
                className="relative z-10 max-w-full max-h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Name with Gradient Background */}
            <div className="px-6 pb-6 w-full relative z-10" style={{
                background:
                  'linear-gradient(135deg, oklch(0.99 0.002 100) 0%, oklch(0.97 0.008 220) 100%)',
              }}>
              <div
                className="relative rounded-xl px-6 py-4 overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, oklch(0.45 0.15 220) 0%, oklch(0.55 0.15 160) 100%)',
                  border: '1px solid oklch(0.45 0.15 220 / 0.45)',
                  boxShadow:
                    '0 12px 30px -20px oklch(0.45 0.15 220 / 0.9), inset 0 1px 0 0 oklch(1 0 0 / 0.25)',
                }}
              >
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 opacity-40 rounded-xl"
                  style={{
                    background:
                      'linear-gradient(135deg, transparent 0%, oklch(1 0 0 / 0.25) 50%, transparent 100%)',
                    animation: 'shimmer 3s infinite',
                  }}
                ></div>
                {/* Inner glow */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    boxShadow:
                      'inset 0 0 20px 0 oklch(0.50 0.15 220 / 0.35)',
                  }}
                ></div>
                <h3 className="relative text-xl font-bold text-center text-white tracking-wide drop-shadow-[0_6px_18px_rgba(9,71,121,0.35)] uppercase">
                  {data.name}
                </h3>
              </div>
            </div>
          </>
        ) : (
          <>
            <img
              src={data.image}
              alt={data.name}
              className="size-20 md:size-24 rounded-full object-cover mb-4 border-2"
            />
            <h2 className="text-lg font-bold text-foreground">
              {data.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              @{data.username}
            </p>
          </>
        )}
      </motion.div>

      {/* BACK: Product Details/Features or Bio + Stats + Socials */}
      <motion.div
        className={`absolute inset-0 backface-hidden ${
          data.productId
            ? 'rounded-2xl p-6 flex flex-col justify-between'
            : 'rounded-md border-2 border-foreground/20 px-4 py-6 flex flex-col justify-between items-center gap-y-4 bg-gradient-to-tr from-muted via-background to-muted'
        }`}
        animate={{ rotateY: isFlipped ? 0 : 180 }}
        initial={{ rotateY: 180 }}
        transition={flipTransition}
        style={{
          transformStyle: 'preserve-3d',
          ...(data.productId
            ? {
                background:
                  'linear-gradient(180deg, oklch(0.99 0.01 210) 0%, oklch(0.98 0.008 85) 45%, oklch(1 0 0) 100%)',
                border: '1px solid oklch(0.50 0.15 220)',
                boxShadow:
                  '0 24px 40px -20px oklch(0.45 0.15 220 / 0.35)',
              }
            : {}),
        }}
      >
        {data.productId ? (
          <>
            {/* Description */}
            <div>
              {(data.desc || data.bio) && (
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: 'oklch(0.40 0.01 240)' }}
                >
                  {data.desc || data.bio}
                </p>
              )}

              {/* Key Features */}
              {data.features && data.features.length > 0 && (
                <div className="mb-4">
                  <h4
                    className="text-xs font-semibold mb-2 uppercase tracking-wide"
                    style={{ color: 'oklch(0.45 0.15 220)' }}
                  >
                    Key Features
                  </h4>
                  <ul className="space-y-1.5">
                    {data.features.slice(0, 4).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-xs"
                        style={{ color: 'oklch(0.35 0.01 240)' }}
                      >
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                          style={{
                            background: 'oklch(0.50 0.15 220)',
                          }}
                        ></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {data.specifications && Object.keys(data.specifications).length > 0 && (
                <div className="mb-4">
                  <h4
                    className="text-xs font-semibold mb-2 uppercase tracking-wide"
                    style={{ color: 'oklch(0.45 0.15 220)' }}
                  >
                    Specifications
                  </h4>
                  <div className="space-y-1.5">
                    {Object.entries(data.specifications)
                      .slice(0, 4)
                      .map(([key, value], index) => (
                        <div
                          key={index}
                          className="flex justify-between items-start gap-2 text-xs"
                          style={{ color: 'oklch(0.35 0.01 240)' }}
                        >
                          <span className="font-medium shrink-0">{key}:</span>
                          <span className="text-right" style={{ color: 'oklch(0.40 0.01 240)' }}>
                            {value}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* View Details Link */}
            {data.productId && (
              <Link
                href={`/products/${data.productId}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 glow-primary-hover relative overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, oklch(0.45 0.15 220), oklch(0.55 0.15 160))',
                  color: 'white',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px 0 oklch(0.45 0.15 220 / 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                View Details
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}
          </>
        ) : (
          <>
            <p className="text-xs md:text-sm text-muted-foreground text-center">
              {data.bio}
            </p>

            <div className="px-6 flex items-center justify-between w-full">
              <div>
                <p className="text-base font-bold">
                  {data.stats.following}
                </p>
                <p className="text-xs text-muted-foreground">
                  Following
                </p>
              </div>
              <div>
                <p className="text-base font-bold">
                  {data.stats.followers}
                </p>
                <p className="text-xs text-muted-foreground">
                  Followers
                </p>
              </div>
              {data.stats.posts && (
                <div>
                  <p className="text-base font-bold">
                    {data.stats.posts}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Posts
                  </p>
                </div>
              )}
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center justify-center gap-4">
              {data.socialLinks?.linkedin && (
                <a
                  href={data.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {data.socialLinks?.github && (
                <a
                  href={data.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <Github size={20} />
                </a>
              )}
              {data.socialLinks?.twitter && (
                <a
                  href={data.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <Twitter size={20} />
                </a>
              )}
            </div>

            <Button>Follow</Button>
          </>
        )}
      </motion.div>
    </div>
  );
}
