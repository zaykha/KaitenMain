"use client";

import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  Globe,
  Mail,
  MapPin,
  Moon,
  Package,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  SunMedium,
  Truck,
  Wrench
} from "lucide-react";
import { LanguageContext, ThemeToggleContext } from "./providers";
import { LANGUAGES } from "./i18n";

function trackClick(label: string) {
  // Placeholder analytics hook
  console.info(`trackClick:${label}`);
}

export default function Page() {
  const { themeName, toggleTheme } = useContext(ThemeToggleContext);
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [showToast, setShowToast] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const heroBusinesses = [
    {
      key: "mart",
      logo: "/KTMartIsometric.png",
      features: [
        { icon: ShoppingBag, label: "bullet1" },
        { icon: Search, label: "bullet2" },
        { icon: MapPin, label: "bullet3" },
        { icon: Package, label: "chip1" }
      ]
    },
    {
      key: "living",
      logo: "/KTLivingIsometric.png",
      features: [
        { icon: Building2, label: "bullet1" },
        { icon: CalendarDays, label: "bullet2" },
        { icon: ShieldCheck, label: "bullet3" },
        { icon: Search, label: "chip1" }
      ]
    },
    {
      key: "homecare",
      logo: "/KTHCIsometric.png",
      features: [
        { icon: Wrench, label: "chip1" },
        { icon: Truck, label: "chip2" },
        { icon: Sparkles, label: "chip3" },
        { icon: ShieldCheck, label: "bullet1" }
      ]
    }
  ] as const;

  useEffect(() => {
    if (isHeroPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rotation = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroBusinesses.length);
    }, 5000);

    return () => window.clearInterval(rotation);
  }, [isHeroPaused, heroBusinesses.length]);

  useEffect(() => {
    if (!isLanguageOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isLanguageOpen]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate]")
    );
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const inViewport = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    elements.forEach((el) => {
      if (inViewport(el)) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackClick("contact-submit");
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 3200);
    event.currentTarget.reset();
  };

  return (
    <PageShell>
      <TextureBackground />
      <TopBar>
        <TopBarInner>
          <Brand>
            <BrandLogo
              src="/KZLogo.png"
              alt="Kaiten"
              width={28}
              height={28}
              priority
            />
            <BrandWordmark>{t("brand.name")}</BrandWordmark>
          </Brand>
          <TopActions>
            <IconToggle
              type="button"
              aria-label={t("nav.theme")}
              aria-pressed={themeName === "dark"}
              onClick={() => {
                trackClick("theme-toggle");
                toggleTheme();
              }}
            >
              {themeName === "light" ? <SunMedium size={18} /> : <Moon size={18} />}
            </IconToggle>
            <LanguageMenu ref={languageMenuRef}>
              <LanguageButton
                type="button"
                aria-label={t("nav.language")}
                aria-haspopup="listbox"
                aria-expanded={isLanguageOpen}
                onClick={() => setIsLanguageOpen((open) => !open)}
              >
                <Globe size={17} />
                <span>{LANGUAGES.find((lang) => lang.code === language)?.label}</span>
                <ChevronDown size={16} aria-hidden="true" />
              </LanguageButton>
              {isLanguageOpen && (
                <LanguagePopover role="listbox" aria-label={t("nav.language")}>
                  {LANGUAGES.map((lang) => (
                    <LanguageOption
                      key={lang.code}
                      type="button"
                      role="option"
                      aria-selected={language === lang.code}
                      $active={language === lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageOpen(false);
                        trackClick(`language-${lang.code}`);
                      }}
                    >
                      <LanguageCode>{lang.code}</LanguageCode>
                      <span>{lang.label}</span>
                      {language === lang.code && <Check size={16} />}
                    </LanguageOption>
                  ))}
                </LanguagePopover>
              )}
            </LanguageMenu>
          </TopActions>
        </TopBarInner>
      </TopBar>

      <Main id="top">
        <HeroSection id="businesses">
          <HeroCarousel
            role="region"
            aria-roledescription="carousel"
            aria-label="Kaiten businesses"
            onMouseEnter={() => setIsHeroPaused(true)}
            onMouseLeave={(event) => {
              if (!event.currentTarget.contains(document.activeElement)) {
                setIsHeroPaused(false);
              }
            }}
            onFocus={() => setIsHeroPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsHeroPaused(false);
              }
            }}
          >
            <HeroTrack $active={activeHeroSlide}>
              {heroBusinesses.map((business, index) => {
                const isActive = index === activeHeroSlide;
                const title = t(`landing.${business.key}.title`);

                return (
                  <HeroSlide
                    key={business.key}
                    aria-hidden={!isActive}
                  >
                    <HeroSlideInner>
                      <HeroContent>
                        <BusinessIdentity>
                          <BusinessLogo src={business.logo} alt="" />
                          <span>{title}</span>
                        </BusinessIdentity>
                        <HeroTitle>{t(`landing.${business.key}.heroTitle`)}</HeroTitle>
                        <HeroCopy>{t(`landing.${business.key}.heroCopy`)}</HeroCopy>
                        <HeroFeatureGrid>
                          {business.features.map((feature) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <HeroFeatureCard key={feature.label}>
                                <FeatureIcon size={27} strokeWidth={1.8} />
                                <span>{t(`landing.${business.key}.${feature.label}`)}</span>
                              </HeroFeatureCard>
                            );
                          })}
                        </HeroFeatureGrid>
                        <HeroActions>
                          <HeroAction
                            href="#company"
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => trackClick(`${business.key}-hero-company`)}
                          >
                            {t("company.link")}
                            <ChevronRight size={18} />
                          </HeroAction>
                          <HeroAction
                            $secondary
                            href="#contact"
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => trackClick(`${business.key}-hero-contact`)}
                          >
                            <Phone size={17} />
                            {t("footer.contact")}
                          </HeroAction>
                        </HeroActions>
                      </HeroContent>
                      <HeroVisual aria-hidden="true">
                        <HeroIsometric src={business.logo} alt="" />
                      </HeroVisual>
                    </HeroSlideInner>
                  </HeroSlide>
                );
              })}
            </HeroTrack>

            <CarouselControls>
              <CarouselArrow
                type="button"
                aria-label="Previous business"
                onClick={() =>
                  setActiveHeroSlide(
                    (current) => (current - 1 + heroBusinesses.length) % heroBusinesses.length
                  )
                }
              >
                <ChevronLeft size={20} />
              </CarouselArrow>
              <CarouselDots role="group" aria-label="Choose a Kaiten business">
                {heroBusinesses.map((business, index) => (
                  <CarouselDot
                    key={business.key}
                    type="button"
                    $active={index === activeHeroSlide}
                    aria-label={t(`landing.${business.key}.title`)}
                    aria-current={index === activeHeroSlide ? "true" : undefined}
                    onClick={() => {
                      setActiveHeroSlide(index);
                      trackClick(`${business.key}-hero-control`);
                    }}
                  />
                ))}
              </CarouselDots>
              <CarouselArrow
                type="button"
                aria-label="Next business"
                onClick={() =>
                  setActiveHeroSlide((current) => (current + 1) % heroBusinesses.length)
                }
              >
                <ChevronRight size={20} />
              </CarouselArrow>
            </CarouselControls>
            <CarouselAnnouncement aria-live="polite">
              {t(`landing.${heroBusinesses[activeHeroSlide].key}.title`)}
            </CarouselAnnouncement>
          </HeroCarousel>
        </HeroSection>

        <Section data-animate>
          <Container>
            <TrustStrip data-animate>
              <TrustItem>
                <Check size={18} />
                {t("trust.transparent")}
              </TrustItem>
              <TrustItem>
                <MapPin size={18} />
                {t("trust.local")}
              </TrustItem>
              <TrustItem>
                <Clock size={18} />
                {t("trust.scheduling")}
              </TrustItem>
              <TrustItem>
                <Sparkles size={18} />
                {t("trust.secure")}
              </TrustItem>
            </TrustStrip>
          </Container>
        </Section>

        <Section id="company" data-animate>
          <Container>
            <SectionHeader>
              <h2>{t("company.heading")}</h2>
              <p>
                {t("company.subheading")}
              </p>
              <TextLink href="/about">{t("company.link")}</TextLink>
            </SectionHeader>
            <CompanyGrid data-animate>
              <CompanyCard>
                <h3>{t("company.mission.title")}</h3>
                <p>
                  {t("company.mission.text")}
                </p>
              </CompanyCard>
              <CompanyCard id="csr">
                <h3>{t("company.csr.title")}</h3>
                <p>
                  {t("company.csr.text")}
                </p>
                <MiniList>
                  <li>{t("company.csr.item1")}</li>
                  <li>{t("company.csr.item2")}</li>
                  <li>{t("company.csr.item3")}</li>
                </MiniList>
                <TextLink href="/csr">{t("company.csr.link")}</TextLink>
              </CompanyCard>
              <CompanyCard id="careers">
                <h3>{t("company.careers.title")}</h3>
                <p>
                  {t("company.careers.text")}
                </p>
                <LinkRow>
                  <TextLink href="/careers">{t("company.careers.link")}</TextLink>
                  <TextLink href="/press">{t("company.press.link")}</TextLink>
                </LinkRow>
              </CompanyCard>
            </CompanyGrid>
          </Container>
        </Section>

        <Section id="policies" data-animate>
          <Container>
            <SectionHeader>
              <h2>{t("policies.heading")}</h2>
              <p>
                {t("policies.subheading")}
              </p>
            </SectionHeader>
            <PolicyGrid data-animate>
              <PolicyCard id="terms">
                <h3>{t("policies.terms.title")}</h3>
                <p>
                  {t("policies.terms.text")}
                </p>
                <TextLink href="/terms">{t("policies.terms.link")}</TextLink>
              </PolicyCard>
              <PolicyCard id="privacy">
                <h3>{t("policies.privacy.title")}</h3>
                <p>
                  {t("policies.privacy.text")}
                </p>
                <TextLink href="/privacy">{t("policies.privacy.link")}</TextLink>
              </PolicyCard>
              <PolicyCard id="support">
                <h3>{t("policies.support.title")}</h3>
                <p>
                  {t("policies.support.text")}
                </p>
                <TextLink href="#support">{t("policies.support.link")}</TextLink>
              </PolicyCard>
            </PolicyGrid>
          </Container>
        </Section>

        <Section id="press" data-animate>
          <Container>
            <SectionHeader>
              <h2>{t("press.heading")}</h2>
              <p>
                {t("press.subheading")}
              </p>
            </SectionHeader>
            <PolicyGrid data-animate>
              <PolicyCard>
                <h3>{t("press.card1.title")}</h3>
                <p>{t("press.card1.text")}</p>
                <TextLink href="/press">{t("press.card1.link")}</TextLink>
              </PolicyCard>
              <PolicyCard>
                <h3>{t("press.card2.title")}</h3>
                <p>{t("press.card2.text")}</p>
                <TextLink href="/security">{t("press.card2.link")}</TextLink>
              </PolicyCard>
              <PolicyCard>
                <h3>{t("press.card3.title")}</h3>
                <p>{t("press.card3.text")}</p>
                <TextLink href="/community-standards">{t("press.card3.link")}</TextLink>
              </PolicyCard>
            </PolicyGrid>
          </Container>
        </Section>

        <Section id="contact" data-animate>
          <Container>
            <ContactCard>
              <div>
                <h2>{t("contact.heading")}</h2>
                <p>
                  {t("contact.subheading")}
                </p>
                <ContactHighlights>
                  <span>
                    <MapPin size={16} /> {t("contact.coverage")}
                  </span>
                  <span>
                    <Phone size={16} /> {t("contact.phone1")}
                  </span>
                  <span>
                    <Phone size={16} /> {t("contact.phone2")}
                  </span>
                  <span>
                    <MapPin size={16} /> {t("contact.address")}
                  </span>
                </ContactHighlights>
              </div>
              <ContactForm onSubmit={handleSubmit}>
                <label>
                  {t("form.email")}
                  <Input type="email" name="email" required />
                </label>
                <label>
                  {t("form.message")}
                  <Textarea name="message" rows={4} required />
                </label>
                <PixelButton type="submit">{t("form.submit")}</PixelButton>
              </ContactForm>
            </ContactCard>
          </Container>
        </Section>
      </Main>

      <Footer>
        <Container>
          <FooterGrid>
            <div>
              <Brand>
                <BrandLogo src="/KZLogo.png" alt="Kaiten" width={28} height={28} />
                <BrandWordmark>{t("brand.name")}</BrandWordmark>
              </Brand>
              <FooterCopy>
                {t("footer.copy")}
              </FooterCopy>
              <FooterSocial>
                <a
                  href="https://www.facebook.com/kaitenstu"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook size={18} />
                </a>
              </FooterSocial>
            </div>
            <FooterLinks>
              <div>
                <h4>{t("footer.products")}</h4>
                <a href="#businesses" onClick={() => setActiveHeroSlide(0)}>
                  {t("footer.products.mart")}
                </a>
                <a href="#businesses" onClick={() => setActiveHeroSlide(1)}>
                  {t("footer.products.living")}
                </a>
                <a href="#businesses" onClick={() => setActiveHeroSlide(2)}>
                  {t("footer.products.homecare")}
                </a>
              </div>
              <div>
                <h4>{t("footer.company")}</h4>
                <a href="/about">{t("footer.company.about")}</a>
                <a href="/careers">{t("footer.company.careers")}</a>
                <a href="/press">{t("footer.company.press")}</a>
                <a href="/csr">{t("footer.company.csr")}</a>
              </div>
              <div>
                <h4>{t("footer.policies")}</h4>
                <a href="/terms">{t("footer.policies.terms")}</a>
                <a href="/privacy">{t("footer.policies.privacy")}</a>
                <a href="/community-standards">{t("footer.policies.community")}</a>
                <a href="/security">{t("footer.policies.security")}</a>
              </div>
              <div>
                <h4>{t("footer.resources")}</h4>
                <a href="#contact">{t("footer.contact")}</a>
                <a href="/press">{t("footer.resources.press")}</a>
              </div>
            </FooterLinks>
          </FooterGrid>
          <FooterBottom>
            {t("footer.bottom")} · <a href="/terms">{t("footer.policies.terms")}</a> ·
            <a href="/privacy">{t("footer.policies.privacy")}</a> ·
            <a href="#contact">{t("footer.contact")}</a>
          </FooterBottom>
        </Container>
      </Footer>

      {showToast && (
        <Toast role="status" aria-live="polite">
          {t("toast.success")}
        </Toast>
      )}
    </PageShell>
  );
}

const PageShell = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
`;

const TextureBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  background: ${({ theme }) => theme.colors.paper};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: -20% 0 0 0;
    background:
      radial-gradient(circle at 10% 20%, rgba(59, 79, 155, 0.18), transparent 45%),
      radial-gradient(circle at 80% 0%, rgba(36, 53, 111, 0.2), transparent 40%),
      radial-gradient(circle at 30% 80%, rgba(36, 53, 111, 0.16), transparent 42%);
    opacity: 0.9;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(12, 18, 36, 0.06) 1px, transparent 1px),
      linear-gradient(rgba(12, 18, 36, 0.06) 1px, transparent 1px),
      repeating-linear-gradient(45deg, rgba(12, 18, 36, 0.03), rgba(12, 18, 36, 0.03) 8px, transparent 8px, transparent 16px);
    background-size: 24px 24px, 24px 24px, 120px 120px;
    mix-blend-mode: multiply;
    opacity: 0.6;
  }
`;

const Main = styled.main`
  position: relative;
  z-index: 1;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    scroll-snap-type: y proximity;
  }
`;

const Container = styled.div`
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 20px;
`;

const Section = styled.section`
  padding: 44px 0;
  opacity: 0;
  transform: translateY(18px) translateX(-10px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &[data-animate].is-visible {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 90px 0;
  }
`;

const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(12px);
  background: ${({ theme }) => theme.colors.surface}cc;
  border-bottom: 2px solid ${({ theme }) => theme.colors.outline};
  box-shadow: ${({ theme }) => theme.shadows.pixel};
`;

const TopBarInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  gap: 12px;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BrandLogo = styled(Image)`
  border-radius: 6px;
`;

const BrandWordmark = styled.span`
  font-family: var(--font-outfit), sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
`;

const TopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 10px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.pixel};
  cursor: pointer;
  transition: transform 0.2s ease;
  font-family: var(--font-inter), system-ui, sans-serif;

  &:active {
    transform: translate(2px, 2px);
  }
`;

const TextLink = styled.a`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-inter), system-ui, sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

const LanguageMenu = styled.div`
  position: relative;
`;

const LanguageButton = styled.button`
  min-width: 148px;
  min-height: 42px;
  padding: 9px 12px;
  border: 1px solid ${({ theme }) => theme.colors.outline};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 5px 16px rgba(12, 18, 36, 0.1);
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;

  span {
    flex: 1;
  }

  svg:last-child {
    transition: transform 0.2s ease;
  }

  &[aria-expanded="true"] svg:last-child {
    transform: rotate(180deg);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-width: 50px;

    span {
      display: none;
    }
  }
`;

const LanguagePopover = styled.div`
  position: absolute;
  z-index: 30;
  top: calc(100% + 10px);
  right: 0;
  width: 230px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.outline};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 18px 48px rgba(8, 13, 31, 0.22);
  animation: language-menu-in 0.18s ease-out;

  @keyframes language-menu-in {
    from {
      opacity: 0;
      transform: translateY(-6px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const LanguageOption = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 9px 10px;
  border: 0;
  border-radius: 10px;
  background: ${({ $active, theme }) =>
    $active ? `${theme.colors.primary}18` : "transparent"};
  color: ${({ theme }) => theme.colors.text};
  display: grid;
  grid-template-columns: 34px 1fr 18px;
  align-items: center;
  gap: 8px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}12`};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LanguageCode = styled.span`
  padding: 3px 5px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
`;

const HeroSection = styled.section`
  position: relative;
  height: calc(100svh - 70px);
  min-height: 880px;
  overflow: hidden;
  scroll-snap-align: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 650px;
  }
`;

const HeroCarousel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const HeroTrack = styled.div<{ $active: number }>`
  display: flex;
  width: 300%;
  height: 100%;
  transform: translate3d(${({ $active }) => $active * -33.333333}%, 0, 0);
  transition: transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const HeroSlide = styled.article`
  position: relative;
  flex: 0 0 33.333333%;
  width: 33.333333%;
  height: 100%;
  overflow: hidden;
  --hero-accent: ${({ theme }) => theme.colors.primary};
  --hero-soft: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) =>
    theme.name === "dark"
      ? "linear-gradient(120deg, #0f1630 0%, #121a33 60%, #1b274f 100%)"
      : "linear-gradient(120deg, #ffffff 0%, #f8f9fc 60%, #e8ebf6 100%)"};

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  &::before {
    width: min(55vw, 760px);
    aspect-ratio: 1;
    top: -45%;
    right: -10%;
    background: ${({ theme }) =>
      theme.name === "dark" ? "rgba(122, 144, 230, 0.08)" : "rgba(255, 255, 255, 0.52)"};
    filter: blur(2px);
  }

  &::after {
    width: min(52vw, 780px);
    height: 300px;
    right: -8%;
    bottom: -225px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: ${({ theme }) => (theme.name === "dark" ? 0.16 : 0.72)};
  }
`;

const HeroSlideInner = styled.div`
  position: relative;
  z-index: 1;
  width: min(1200px, 100%);
  height: 100%;
  margin: 0 auto;
  padding: 28px 20px 96px;
  display: grid;
  align-items: center;
  align-content: center;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1.1fr);
    gap: clamp(46px, 7vw, 100px);
    padding: 48px 32px 100px;
  }
`;

const HeroContent = styled.div`
  max-width: 590px;
`;

const BusinessIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  width: fit-content;
  margin-bottom: 20px;
  color: var(--hero-accent);
  font-family: var(--font-outfit), sans-serif;
  font-weight: 800;
  font-size: 0.78rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;

  img {
    width: 26px;
    height: 26px;
    object-fit: contain;
    padding: 3px;
    border-radius: 7px;
    background: ${({ theme }) => theme.colors.surface};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 24px;
  }
`;

const BusinessLogo = styled.img``;

const HeroTitle = styled.h1`
  max-width: 680px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(2.3rem, 4.6vw, 4.8rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  text-wrap: balance;
`;

const HeroCopy = styled.p`
  max-width: 590px;
  margin: 14px 0 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: clamp(1rem, 1.5vw, 1.16rem);
  line-height: 1.65;
`;

const HeroFeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 22px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const HeroFeatureCard = styled.div`
  min-height: 98px;
  padding: 14px 10px;
  border: 1px solid ${({ theme }) => theme.colors.outline};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: var(--hero-accent);
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.74rem;
    font-weight: 750;
    line-height: 1.3;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
`;

const HeroAction = styled.a<{ $secondary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 12px 17px;
  border: 1px solid ${({ $secondary, theme }) =>
    $secondary ? theme.colors.outline : theme.colors.primary};
  border-radius: 10px;
  background: ${({ $secondary, theme }) =>
    $secondary ? theme.colors.surface : theme.colors.primary};
  color: ${({ $secondary, theme }) =>
    $secondary
      ? theme.colors.text
      : theme.name === "dark"
        ? theme.colors.paper
        : "#ffffff"};
  box-shadow: ${({ $secondary }) => ($secondary ? "none" : "0 8px 20px rgba(31, 27, 74, 0.2)")};
  font-weight: 750;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(31, 27, 74, 0.2);
  }

  &:focus-visible {
    outline: 2px solid var(--hero-accent);
    outline-offset: 4px;
  }
`;

const HeroVisual = styled.div`
  position: relative;
  align-self: center;
  width: 100%;
  min-width: 0;
  transform: rotate(1.5deg);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 620px;
    margin: 0 auto;
  }
`;

const HeroIsometric = styled.img`
  position: relative;
  display: block;
  width: min(52vw, 250px);
  aspect-ratio: 1;
  margin: 0 auto;
  object-fit: contain;
  filter: drop-shadow(16px 20px 0 color-mix(in srgb, var(--hero-accent) 24%, transparent))
    drop-shadow(0 28px 42px rgba(24, 29, 58, 0.2));

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(100%, 560px);
  }
`;

const CarouselControls = styled.div`
  position: absolute;
  z-index: 4;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.colors.outline};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  backdrop-filter: blur(12px);
`;

const CarouselDots = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const CarouselArrow = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.outline};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.paper};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`;

const CarouselDot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "28px" : "9px")};
  height: 9px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.outline};
  cursor: pointer;
  transition: width 0.25s ease, background 0.25s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const CarouselAnnouncement = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const SectionHeader = styled.div`
  margin-bottom: 32px;

  p {
    max-width: 580px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;


const buttonStyles = css<{ variant?: "primary" | "secondary" | "ghost" | "text" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.pixel};
  cursor: pointer;
  transition: transform 0.2s ease;
  font-weight: 600;
  text-align: center;

  ${({ variant, theme }) =>
    variant === "secondary" &&
    css`
      background: ${theme.colors.surface};
      color: ${theme.colors.primary};
    `}

  ${({ variant, theme }) =>
    variant === "ghost" &&
    css`
      background: transparent;
      color: ${theme.colors.primary};
    `}

  ${({ variant, theme }) =>
    (!variant || variant === "primary") &&
    css`
      background: ${theme.colors.gradient};
      color: ${theme.name === "dark" ? theme.colors.text : theme.colors.surface};
    `}

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translate(2px, 2px);
  }
`;

const PixelButton = styled.button<{ variant?: "primary" | "secondary" | "ghost" }>`
  ${buttonStyles}
`;

const Chip = styled.span<{ $tone?: "primary" | "accent" }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  border: 1px solid
    ${({ theme }) =>
      theme.name === "dark" ? theme.colors.outline : theme.colors.text};
  background: ${({ theme, $tone }) => {
    if (theme.name === "dark") {
      return theme.colors.surface;
    }
    return $tone === "accent" ? theme.colors.accent : theme.colors.primary;
  }};
  color: ${({ theme }) =>
    theme.name === "dark" ? theme.colors.text : theme.colors.surface};
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 16px 0 20px;
`;

const TrustStrip = styled.div`
  display: grid;
  gap: 12px;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.pixel};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }

  &[data-animate] > * {
    opacity: 0;
    transform: translateY(10px) translateX(-8px);
    transition: opacity 0.45s ease, transform 0.45s ease;
  }

  &[data-animate].is-visible > * {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }

  &[data-animate].is-visible > *:nth-child(1) {
    transition-delay: 0.05s;
  }
  &[data-animate].is-visible > *:nth-child(2) {
    transition-delay: 0.1s;
  }
  &[data-animate].is-visible > *:nth-child(3) {
    transition-delay: 0.15s;
  }
  &[data-animate].is-visible > *:nth-child(4) {
    transition-delay: 0.2s;
  }
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
`;

const CompanyGrid = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  &[data-animate] > * {
    opacity: 0;
    transform: translateY(14px) translateX(-10px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  &[data-animate].is-visible > * {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }

  &[data-animate].is-visible > *:nth-child(1) {
    transition-delay: 0.05s;
  }
  &[data-animate].is-visible > *:nth-child(2) {
    transition-delay: 0.12s;
  }
  &[data-animate].is-visible > *:nth-child(3) {
    transition-delay: 0.2s;
  }
`;

const CompanyCard = styled.div`
  padding: 24px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.pixel};
`;

const MiniList = styled.ul`
  padding-left: 18px;
  margin: 12px 0 0;

  li {
    margin-bottom: 6px;
  }
`;

const LinkRow = styled.div`
  display: flex;
  gap: 16px;
`;

const PolicyGrid = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  &[data-animate] > * {
    opacity: 0;
    transform: translateY(14px) translateX(10px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  &[data-animate].is-visible > * {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }

  &[data-animate].is-visible > *:nth-child(1) {
    transition-delay: 0.05s;
  }
  &[data-animate].is-visible > *:nth-child(2) {
    transition-delay: 0.12s;
  }
  &[data-animate].is-visible > *:nth-child(3) {
    transition-delay: 0.2s;
  }
`;

const PolicyCard = styled.div`
  padding: 24px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.pixel};
`;

const ContactCard = styled.div`
  padding: 32px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.pixel};
  display: grid;
  gap: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.1fr 0.9fr;
  }
`;

const ContactHighlights = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.colors.muted};

  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.text};
`;

const Textarea = styled.textarea`
  padding: 10px 12px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
`;

const Footer = styled.footer`
  padding: 70px 0 40px;
  border-top: 2px solid ${({ theme }) => theme.colors.outline};
  background: ${({ theme }) =>
    theme.name === "dark" ? theme.colors.paper : theme.colors.primaryDark};
  color: ${({ theme }) =>
    theme.name === "dark" ? theme.colors.text : theme.colors.surface};
  position: relative;
  z-index: 1;
  box-shadow: inset 0 16px 40px rgba(0, 0, 0, 0.22);
`;

const FooterGrid = styled.div`
  display: grid;
  gap: 32px;
  align-items: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.3fr 2.7fr;
  }
`;

const FooterCopy = styled.p`
  color: ${({ theme }) =>
    theme.name === "dark" ? theme.colors.muted : "rgba(248, 249, 252, 0.7)"};
  max-width: 360px;
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    color: ${({ theme }) =>
      theme.name === "dark" ? theme.colors.text : "rgba(248, 249, 252, 0.85)"};
  }
`;

const FooterLinks = styled.div`
  display: grid;
  gap: 24px;

  h4 {
    margin-bottom: 8px;
    color: ${({ theme }) =>
      theme.name === "dark" ? theme.colors.text : theme.colors.surface};
  }

  a {
    display: block;
    margin-bottom: 8px;
    color: ${({ theme }) =>
      theme.name === "dark" ? theme.colors.muted : "rgba(248, 249, 252, 0.72)"};
  }

  a:hover {
    text-decoration: underline;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterBottom = styled.div`
  margin-top: 32px;
  color: ${({ theme }) =>
    theme.name === "dark" ? theme.colors.muted : "rgba(248, 249, 252, 0.65)"};
  font-size: 0.85rem;
  border-top: 1px solid
    ${({ theme }) =>
      theme.name === "dark" ? theme.colors.outline : "rgba(248, 249, 252, 0.12)"};
  padding-top: 16px;

  a {
    color: inherit;
  }
`;

const Toast = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 14px 18px;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.pixel};
  font-weight: 600;
  z-index: 20;
`;
