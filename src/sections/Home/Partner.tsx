'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { useSiteData } from '@/context/SiteDataContext';

import Gusto from '@/assets/images/home/partners/logoipsum-414.png';
import Quickbooks from '@/assets/images/home/partners/logoipsum-418.png';
import Xero from '@/assets/images/home/partners/logoipsum-430.png';
import Irs from '@/assets/images/home/partners/logoipsum-432.png';
import Stripe from '@/assets/images/home/partners/logoipsum-435.png';
import ADP from '@/assets/images/home/partners/logoipsum-437.png';

interface PartnerBrand {
  id: string | number;
  name: string;
  logoSrc?: StaticImageData | string;
  category?: string;
}

const defaultPartners: PartnerBrand[] = [
  { id: 'def-1', name: 'Gusto', logoSrc: Gusto, category: 'Payroll Partner' },
  { id: 'def-2', name: 'QuickBooks', logoSrc: Quickbooks, category: 'Accounting ProAdvisor' },
  { id: 'def-3', name: 'Xero', logoSrc: Xero, category: 'Cloud Accounting' },
  { id: 'def-4', name: 'IRS e-File', logoSrc: Irs, category: 'Authorized e-File Provider' },
  { id: 'def-5', name: 'Stripe', logoSrc: Stripe, category: 'Payment Integration' },
  { id: 'def-6', name: 'ADP', logoSrc: ADP, category: 'HR & Payroll' },
];

export default function Partner() {
  const { partners: sitePartners, isLoaded } = useSiteData();

  // Use admin managed partners if available and loaded, otherwise default
  const partners: PartnerBrand[] =
    isLoaded && Array.isArray(sitePartners)
      ? sitePartners
      : (sitePartners?.length ? sitePartners : defaultPartners);

  const count = partners.length;
  if (isLoaded && count === 0) return null;

  const isLoopMode = count > 6;
  const loopDuration = Math.max(20, count * 3.5);

  const renderLogo = (partner: PartnerBrand) => {
    if (!partner.logoSrc) {
      return (
        <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="w-2 h-2 rounded-full bg-[#2D503B] group-hover:scale-125 transition-transform" />
          <span className="font-extrabold text-xs tracking-tight text-[#0B1F3B] font-figtree">
            {partner.name}
          </span>
        </div>
      );
    }

    const isDataOrExternal =
      typeof partner.logoSrc === 'string' &&
      (partner.logoSrc.startsWith('data:') || partner.logoSrc.startsWith('http'));

    if (isDataOrExternal) {
      return (
        <img
          src={partner.logoSrc as string}
          alt={partner.name}
          className="max-h-8 max-w-[100px] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      );
    }

    return (
      <Image
        src={partner.logoSrc}
        alt={partner.name}
        width={110}
        height={32}
        style={{ width: 'auto', height: 'auto', maxHeight: '28px', maxWidth: '96px' }}
        className="object-contain transition-transform duration-300 group-hover:scale-105"
      />
    );
  };

  const renderCard = (partner: PartnerBrand, extraClass = '') => (
    <div
      className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0B1F3B] hover:bg-white transition-all duration-300 group cursor-pointer shadow-2xs hover:shadow-lg ${extraClass}`}
    >
      <div className="h-10 sm:h-12 w-full flex items-center justify-center">
        {renderLogo(partner)}
      </div>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: 'easeOut' as const }}
      className="relative z-20 pt-4 pb-12 max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden"
    >
      <style jsx global>{`
        @keyframes partnerSlideLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .partner-infinite-track {
          display: flex;
          width: max-content;
          gap: 1.25rem;
          animation: partnerSlideLeftToRight var(--loop-duration, 25s) linear infinite;
        }
        .partner-infinite-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="text-center">
        {/* Title */}
        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0B1F3B] font-figtree mb-6 sm:mb-8">
          Strategic Platform &amp; Software Partners
        </p>

        {/* ── MODE 1: Centered Layout (1 to 6 Logos) ── */}
        {!isLoopMode && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 w-full">
            {partners.map((partner, idx) => (
              <motion.div
                key={partner.id ? `${partner.id}-${idx}` : `partner-${idx}`}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={count === 1 ? 'w-[180px] sm:w-[220px]' : 'w-[140px] sm:w-[165px]'}
              >
                {renderCard(partner)}
              </motion.div>
            ))}
          </div>
        )}

        {/* ── MODE 2: Continuous Infinite Loop (More than 6 Logos, Left to Right) ── */}
        {isLoopMode && (
          <div className="relative w-full overflow-hidden py-1">
            {/* Gradient Edge Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Continuous Track */}
            <div
              className="partner-infinite-track"
              style={{ '--loop-duration': `${loopDuration}s` } as React.CSSProperties}
            >
              {/* Duplicated list twice so -50% to 0% creates an infinite loop with zero jump */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="w-[145px] sm:w-[170px] shrink-0"
                >
                  {renderCard(partner)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}