import Link from 'next/link';

export function PromoBanner() {
  return (
    <div className="promo-banner" role="banner" aria-label="Promotional offer">
      <div className="container promo-banner-inner">
        <span className="promo-tag">April Special</span>
        <p>First month free with any annual plan — limited spots available.</p>
        <Link href="/free-trial" className="promo-link">Claim offer &rarr;</Link>
      </div>
    </div>
  );
}
