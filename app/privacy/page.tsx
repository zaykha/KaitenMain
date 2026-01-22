"use client";

import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../providers";

export default function PrivacyPage() {
  const { t } = useContext(LanguageContext);
  return (
    <PageShell>
      <Container>
        <Hero>
          <LinkBack href="/">← {t("nav.back")}</LinkBack>
          <h1>{t("privacy.title")}</h1>
          <p>{t("privacy.effective")}</p>
        </Hero>

        <Content>
          <Section>
            <h2>{t("privacy.overview.title")}</h2>
            <p>
              {t("privacy.overview.text")}
            </p>
          </Section>

          <Section>
            <h2>{t("privacy.collect.title")}</h2>
            <ul>
              <li>{t("privacy.collect.item1")}</li>
              <li>{t("privacy.collect.item2")}</li>
              <li>{t("privacy.collect.item3")}</li>
            </ul>
          </Section>

          <Section>
            <h2>{t("privacy.use.title")}</h2>
            <p>
              {t("privacy.use.text")}
            </p>
          </Section>

          <Section>
            <h2>{t("privacy.share.title")}</h2>
            <p>
              {t("privacy.share.text")}
            </p>
          </Section>

          <Section>
            <h2>{t("privacy.cookies.title")}</h2>
            <p>
              {t("privacy.cookies.text")}
            </p>
          </Section>

          <Section>
            <h2>{t("privacy.retention.title")}</h2>
            <p>
              {t("privacy.retention.text")}
            </p>
          </Section>

          <Section>
            <h2>{t("privacy.rights.title")}</h2>
            <p>
              {t("privacy.rights.text")}
            </p>
          </Section>

          <Section>
            <h2>{t("privacy.children.title")}</h2>
            <p>
              {t("privacy.children.text")}
            </p>
          </Section>

          <Section>
            <h2>{t("privacy.contact.title")}</h2>
            <p>
              {t("privacy.contact.text")}
            </p>
          </Section>
        </Content>
      </Container>
    </PageShell>
  );
}

const PageShell = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.text};
  padding: 80px 0;
`;

const Container = styled.div`
  width: min(860px, 100%);
  margin: 0 auto;
  padding: 0 20px;
`;

const Hero = styled.header`
  margin-bottom: 40px;

  h1 {
    margin-bottom: 8px;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const LinkBack = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  h2 {
    margin-bottom: 8px;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
  }

  ul {
    margin: 8px 0 0;
    padding-left: 18px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;
