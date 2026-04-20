import Link from 'next/link';
import { site } from '@/lib/site-data';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>{site.name}</h3>
          <p>{site.subtitle}</p>
        </div>
        <div>
          <h4>Visit</h4>
          <p>{site.address}</p>
          <p>{site.phone}</p>
          <p>{site.email}</p>
        </div>
        <div>
          <h4>Hours</h4>
          {site.hours.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div>
          <h4>Quick Links</h4>
          <p><Link href="/classes">Classes</Link></p>
          <p><Link href="/pricing">Pricing</Link></p>
          <p><Link href="/free-trial">Free Trial</Link></p>
          <p><Link href="/portal">Member Portal</Link></p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Demo domain: {site.domain}</span>
        <span>Powered by Pulse integration demo</span>
      </div>
    </footer>
  );
}
