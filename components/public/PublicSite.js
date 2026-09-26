"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PageExtras from "@/components/PageExtras";
import BodyText from "@/components/BodyText";
import NewsletterForm from "@/components/NewsletterForm";
import { orderProducts, orderScents } from "@/lib/catalog.mjs";
import { launchDate } from "@/lib/presentation";
import { signupContent } from "@/lib/signup-content";
import PublicPage from "./PublicPages";
import { CampaignAction } from "./PublicElements";
import JournalOrnament, {
  JournalComposition,
  PageMargins,
} from "./JournalOrnament";

const navigation = [
  ["/products", "Collection", "products"],
  ["/scents", "Scents", "scents"],
  ["/about", "About", "about"],
];
const secondaryNavigation = [
  ["/contact", "Contact", "contact"],
  ["/faq", "FAQ", "faq"],
  ["/kickstarter", "Campaign & rewards", "kickstarter"],
];

function read(data = {}) {
  const site = data.site || {},
    settings = site.settings || {};
  const products = orderProducts(data.products || []),
    scents = orderScents(data.scents || []);
  return {
    ...data,
    site,
    settings,
    page: data.page || {},
    products,
    scents,
    families: scents.map((scent) => ({
      scent,
      products: products.filter(
        (product) => product.scent?.slug === scent.slug,
      ),
    })),
    rewards: site.rewards || [],
    item: data.item || {},
    related: data.related || [],
    faqs: data.faqs || [],
    campaign: settings.kickstarterUrl || "/kickstarter",
    date: launchDate(settings.kickstarterLaunchDate),
  };
}

function Brand({ settings = {} }) {
  const name = settings.brandName || "Dagger & Bone Apothecary";
  return (
    <Link className="site-brand" href="/" aria-label={`${name} home`}>
      <span className="brand-lockup">
        <span>
          {name === "Dagger & Bone Apothecary" ? (
            <>
              Dagger <em>&</em> Bone
            </>
          ) : (
            name
          )}
        </span>
        {name === "Dagger & Bone Apothecary" && <small>Apothecary</small>}
      </span>
    </Link>
  );
}

function Nav({ d, label = "Main navigation", items = navigation }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label}>
      {items
        .filter(([, , key]) => !d.site.pages || d.site.pages[key])
        .map(([href, text]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              pathname === href ||
              (href !== "/" && pathname?.startsWith(href + "/"))
                ? "page"
                : undefined
            }
          >
            {text}
          </Link>
        ))}
    </nav>
  );
}

function Header({ d }) {
  const menu = useRef(null),
    toggle = useRef(null);
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Brand settings={d.settings} />
        <div className="desktop-navigation">
          <Nav d={d} />
        </div>
        <CampaignAction d={d} className="header-action" />
        <details
          ref={menu}
          className="mobile-menu"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              menu.current.open = false;
              toggle.current.focus();
            }
          }}
        >
          <summary ref={toggle}>
            Menu <span aria-hidden="true">+</span>
          </summary>
          <div
            onClick={(event) => {
              if (event.target.closest("a")) menu.current.open = false;
            }}
          >
            <Nav
              d={d}
              label="Mobile navigation"
              items={[...navigation, ...secondaryNavigation.slice(0, 2)]}
            />
          </div>
        </details>
      </div>
    </header>
  );
}

function OfflineNotice({ info }) {
  if (!info) return null;
  const date = new Date(info.capturedAt);
  const label = Number.isNaN(date.getTime())
    ? "an earlier date"
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
  return (
    <aside className="offline-notice" role="status">
      <strong>Saved version</strong>
      <span>
        The live site content is unavailable. You’re viewing a saved copy from{" "}
        <time dateTime={info.capturedAt}>{label}</time>, which may not include
        the latest updates. Forms need the service to be back online.
      </span>
    </aside>
  );
}

function Footer({ d, kind }) {
  const signup = signupContent(d.site);
  return (
    <footer className="site-footer">
      <JournalOrnament motif="ribbon" className="footer-penwork" />
      <div className="footer-inner">
        {!["signup", "unsubscribe", "unavailable", "error"].includes(kind) && (
          <section className="footer-signup">
            <JournalComposition
              variant="footer-mark"
              className="footer-journal"
            />
            <div>
              <h2>{signup.title}</h2>
              <p>{signup.intro}</p>
            </div>
            <div>
              <NewsletterForm visibleLabel />
              <BodyText className="signup-context" text={signup.body} />
            </div>
          </section>
        )}
        <div className="footer-main">
          <div>
            <Brand settings={d.settings} />
            <p>
              {d.settings.tagline || "Men's hair, skin, and body care."}
              <br />
              Based in St. Augustine, Florida.
            </p>
          </div>
          <div>
            <span>Explore</span>
            <Nav d={d} label="Footer navigation" />
          </div>
          <div>
            <span>Information</span>
            <Nav d={d} label="Information" items={secondaryNavigation} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function PublicSite({ kind, data = {}, reset }) {
  const d = read(data),
    effectiveKind = data.unavailable ? "unavailable" : kind;
  return (
    <div className="public-site">
      <Header d={d} />
      <OfflineNotice info={data.snapshotInfo} />
      <main id="main" tabIndex={-1} className="site-main">
        <PageMargins kind={effectiveKind} detail={d.item.slug} />
        <PublicPage kind={effectiveKind} d={d} reset={reset} />
        <PageExtras page={d.page} />
      </main>
      <Footer d={d} kind={effectiveKind} />
    </div>
  );
}
