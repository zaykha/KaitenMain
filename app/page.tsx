"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import {
  Check,
  Clock,
  Facebook,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sparkles,
  SunMedium
} from "lucide-react";
import { LanguageContext, ThemeToggleContext } from "./providers";
import { LANGUAGES } from "./i18n";

const ROUTES = {
  mart: "https://kaiten-mart.vercel.app/",
  living: "https://kaiten-living.vercel.app/",
  homecare: "https://kaiten-homecare.vercel.app/"
};

function trackClick(label: string) {
  // Placeholder analytics hook
  console.info(`trackClick:${label}`);
}

export default function Page() {
  const { themeName, toggleTheme } = useContext(ThemeToggleContext);
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [showToast, setShowToast] = useState(false);

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
            <BrandWordmark>Kaiten</BrandWordmark>
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
            <LanguageSelectWrap>
              <Globe size={16} />
              <LanguageSelect
                aria-label={t("nav.language")}
                value={language}
                onChange={(event) => {
                  setLanguage(event.target.value as typeof language);
                  trackClick("language-toggle");
                }}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </LanguageSelect>
            </LanguageSelectWrap>
          </TopActions>
        </TopBarInner>
      </TopBar>

      <Main id="top">
        <HeroSection data-animate>
          <Container>
            <HeroGrid>
              <div>
                <Eyebrow>{t("landing.heroEyebrow")}</Eyebrow>
                <HeroTitle>{t("landing.heroTitle")}</HeroTitle>
                <HeroCopy>
                  {t("landing.heroCopy")}
                </HeroCopy>
              </div>
              <HeroStack>
              <HeroCardLink
                $offset="front"
                data-front="true"
                href={ROUTES.mart}
                onClick={() => trackClick("mart-hero-card")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HeroCard>
                  <HeroCardOverlay className="hero-overlay" />
                  <HeroCardCorner className="hero-corner">
                    <ExternalLink size={16} />
                    <HeroCornerLogo src="/KTMartIsometric.png" alt="Kaiten Mart" />
                  </HeroCardCorner>
                  <HeroCardPreview>
                    <HeroCardImage
                      src="/KTMartPreview.png"
                        alt="Kaiten Mart preview"
                      />
                    </HeroCardPreview>
                    <HeroCardBody>
                      <HeroCardTitle>
                        <span>{t("landing.mart.title")}</span>
                        <HeroCardPill>{t("landing.mart.pill")}</HeroCardPill>
                      </HeroCardTitle>
                      <HeroCardText>{t("landing.mart.desc")}</HeroCardText>
                      <HeroCardList>
                        <li>{t("landing.mart.bullet1")}</li>
                        <li>{t("landing.mart.bullet2")}</li>
                        <li>{t("landing.mart.bullet3")}</li>
                      </HeroCardList>
                      <HeroCardChips>
                        <span>{t("landing.mart.chip1")}</span>
                        <span>{t("landing.mart.chip2")}</span>
                        <span>{t("landing.mart.chip3")}</span>
                      </HeroCardChips>
                    </HeroCardBody>
                  </HeroCard>
                </HeroCardLink>
              <HeroCardLink
                $offset="mid"
                href={ROUTES.living}
                onClick={() => trackClick("living-hero-card")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HeroCard>
                  <HeroCardOverlay className="hero-overlay" />
                  <HeroCardCorner className="hero-corner">
                    <ExternalLink size={16} />
                    <HeroCornerLogo src="/KTLivingIsometric.png" alt="Kaiten Living" />
                  </HeroCardCorner>
                  <HeroCardPreview>
                    <HeroCardImage
                      src="/KTLivingPreview.png"
                        alt="Kaiten Living preview"
                      />
                    </HeroCardPreview>
                    <HeroCardBody>
                      <HeroCardTitle>
                        <span>{t("landing.living.title")}</span>
                        <HeroCardPill>{t("landing.living.pill")}</HeroCardPill>
                      </HeroCardTitle>
                      <HeroCardText>{t("landing.living.desc")}</HeroCardText>
                      <HeroCardList>
                        <li>{t("landing.living.bullet1")}</li>
                        <li>{t("landing.living.bullet2")}</li>
                        <li>{t("landing.living.bullet3")}</li>
                      </HeroCardList>
                      <HeroCardChips>
                        <span>{t("landing.living.chip1")}</span>
                        <span>{t("landing.living.chip2")}</span>
                      </HeroCardChips>
                    </HeroCardBody>
                  </HeroCard>
                </HeroCardLink>
              <HeroCardLink
                $offset="back"
                href={ROUTES.homecare}
                onClick={() => trackClick("homecare-hero-card")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HeroCard>
                  <HeroCardOverlay className="hero-overlay" />
                  <HeroCardCorner className="hero-corner">
                    <ExternalLink size={16} />
                    <HeroCornerLogo src="/KTHCIsometric.png" alt="Kaiten HomeCare" />
                  </HeroCardCorner>
                  <HeroCardPreview>
                    <HeroCardImage
                      src="/KTHomeCarePreview.png"
                        alt="Kaiten HomeCare preview"
                      />
                    </HeroCardPreview>
                    <HeroCardBody>
                      <HeroCardTitle>
                        <span>{t("landing.homecare.title")}</span>
                        <HeroCardPill>{t("landing.homecare.pill")}</HeroCardPill>
                      </HeroCardTitle>
                      <HeroCardText>{t("landing.homecare.desc")}</HeroCardText>
                      <HeroCardList>
                        <li>{t("landing.homecare.bullet1")}</li>
                        <li>{t("landing.homecare.bullet2")}</li>
                        <li>{t("landing.homecare.bullet3")}</li>
                      </HeroCardList>
                      <HeroCardChips>
                        <span>{t("landing.homecare.chip1")}</span>
                        <span>{t("landing.homecare.chip2")}</span>
                        <span>{t("landing.homecare.chip3")}</span>
                      </HeroCardChips>
                    </HeroCardBody>
                  </HeroCard>
                </HeroCardLink>
              </HeroStack>
            </HeroGrid>
          </Container>
        </HeroSection>

        <Section id="how-it-works" data-animate>
          <Container>
            <SectionHeader>
              <h2>{t("how.heading")}</h2>
              <p>{t("how.subheading")}</p>
            </SectionHeader>
            <Stepper data-animate>
              <StepCard>
                <StepNumber>1</StepNumber>
                <h3>{t("how.step1.title")}</h3>
                <p>{t("how.step1.text")}</p>
              </StepCard>
              <StepCard>
                <StepNumber>2</StepNumber>
                <h3>{t("how.step2.title")}</h3>
                <p>{t("how.step2.text")}</p>
              </StepCard>
              <StepCard>
                <StepNumber>3</StepNumber>
                <h3>{t("how.step3.title")}</h3>
                <p>{t("how.step3.text")}</p>
              </StepCard>
            </Stepper>
          </Container>
        </Section>

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
                <BrandWordmark>Kaiten</BrandWordmark>
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
                <a href={ROUTES.mart}>{t("footer.products.mart")}</a>
                <a href={ROUTES.living}>{t("footer.products.living")}</a>
                <a href={ROUTES.homecare}>{t("footer.products.homecare")}</a>
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
                <a href="#how-it-works">{t("footer.resources.how")}</a>
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

const LanguageSelectWrap = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 6px 10px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.pixel};
`;

const LanguageSelect = styled.select`
  border: none;
  background: transparent;
  color: inherit;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.8rem;
  outline: none;
  cursor: pointer;
`;

const HeroSection = styled.section`
  padding: 54px 0 40px;
  opacity: 0;
  transform: translateY(18px) translateX(12px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  scroll-snap-align: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: calc(100vh - 72px);
    display: flex;
    align-items: center;
  }

  &.is-visible {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
`;

const HeroGrid = styled.div`
  display: grid;
  gap: 32px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 0.8fr 1.2fr;
    align-items: center;
  }
`;

const Eyebrow = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 8px;
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.85rem, 4vw, 3.2rem);
`;

const HeroCopy = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  max-width: 420px;
  font-size: 0.95rem;
`;

const HeroStack = styled.div`
  position: relative;
  width: min(620px, 100%);
  height: auto;
  margin: 0 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 520px;
    display: block;
    gap: 0;
  }

  a .hero-overlay {
    opacity: 0.55;
  }

  a .hero-corner {
    opacity: 1;
    transform: translateY(0);
  }

  a[data-front=\"true\"] .hero-overlay {
    opacity: 0;
  }

  a[data-front=\"true\"] .hero-corner {
    opacity: 0;
    transform: translateY(-4px);
  }

  &:hover a .hero-overlay {
    opacity: 0.55;
  }

  &:hover a .hero-corner {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover a:hover .hero-overlay {
    opacity: 0;
  }

  &:hover a:hover .hero-corner {
    opacity: 0;
    transform: translateY(-4px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    a .hero-overlay,
    a .hero-corner {
      opacity: 0;
      transform: none;
    }
  }
`;

const HeroCardLink = styled.a<{ $offset: "front" | "mid" | "back" }>`
  display: block;
  width: 100%;
  height: auto;
  color: inherit;
  transition: transform 0.3s ease, z-index 0s ease;
  --offset-x: 0px;
  --offset-y: 0px;
  transform: translate(0, 0);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: absolute;
    top: 0;
    left: 0;
    width: min(340px, 100%);
    height: 470px;
    transform: translate(var(--offset-x), var(--offset-y));
  }
  ${({ $offset }) =>
    $offset === "front" &&
    css`
      --offset-x: 0px;
      --offset-y: 0px;
      z-index: 3;
    `}

  ${({ $offset }) =>
    $offset === "mid" &&
    css`
      --offset-x: 110px;
      --offset-y: 0px;
      z-index: 2;
    `}

  ${({ $offset }) =>
    $offset === "back" &&
    css`
      --offset-x: 220px;
      --offset-y: 0px;
      z-index: 1;
    `}

  &:hover {
    z-index: 4;
    transform: translate(var(--offset-x), calc(var(--offset-y) - 8px)) scale(1.02);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 6px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &:hover {
      transform: none;
    }
  }
`;

const HeroCard = styled.div`
  position: relative;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.pixel};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: absolute;
    inset: 0;
  }
`;

const HeroCardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(12, 18, 36, 0.62);
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 3;
  pointer-events: none;
`;

const HeroCardCorner = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 48px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.outline};
  background: ${({ theme }) => theme.colors.surface};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 4;
  pointer-events: none;
`;

const HeroCornerLogo = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
`;

const HeroCardPreview = styled.div`
  position: relative;
  height: 230px;
  background: ${({ theme }) => theme.colors.primaryDark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outline};
`;

const HeroCardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroCardBody = styled.div`
  padding: 16px 18px 18px;
  background: ${({ theme }) => theme.colors.paper};
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const HeroCardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  margin-bottom: 8px;
`;

const HeroCardPill = styled.span`
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.7rem;
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.colors.outline};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

const HeroCardText = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
  font-size: 0.9rem;
`;

const HeroCardList = styled.ul`
  margin: 0;
  padding-left: 16px;
  color: ${({ theme }) => theme.colors.muted};

  li {
    margin-bottom: 4px;
  }
`;

const HeroCardChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    border-radius: 999px;
    padding: 3px 8px;
    font-size: 0.65rem;
    font-weight: 600;
    border: 1px solid ${({ theme }) => theme.colors.outline};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
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

const Stepper = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  &[data-animate] > * {
    opacity: 0;
    transform: translateY(14px) translateX(12px);
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

const StepCard = styled.div`
  padding: 24px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.pixel};
`;

const StepNumber = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) =>
    theme.name === "dark" ? theme.colors.primaryDark : theme.colors.surface};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: 12px;
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
