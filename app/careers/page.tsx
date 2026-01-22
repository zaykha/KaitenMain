"use client";

import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../providers";

export default function CareersPage() {
  const { t } = useContext(LanguageContext);
  return (
    <PageShell>
      <Container>
        <Hero>
          <LinkBack href="/">← {t("nav.back")}</LinkBack>
          <h1>{t("careers.title")}</h1>
          <p>{t("careers.subtitle")}</p>
        </Hero>

        <Content>
          <Section>
            <h2>{t("careers.who.title")}</h2>
            <p>
              {t("careers.who.text")}
            </p>
          </Section>

          <Section>
            <h2>{t("careers.work.title")}</h2>
            <ul>
              <li>{t("careers.work.item1")}</li>
              <li>{t("careers.work.item2")}</li>
              <li>{t("careers.work.item3")}</li>
            </ul>
          </Section>

          <Section>
            <h2>{t("careers.open.title")}</h2>
            <p>
              {t("careers.open.text")}
            </p>
            <p>{t("careers.open.note")}</p>
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
  border: 1px solid ${({ theme }) => theme.colors.text};
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
