import React from 'react';
import styled from 'styled-components';
import { FiBook, FiCheckCircle, FiXCircle, FiHeart, FiTrendingUp } from 'react-icons/fi';
import Layout from '../layouts/Layout';

const Container = styled.div`
  max-width: 700px;
  margin: 40px auto;
  background: var(--bg-card);
  border-radius: 16px;
  box-shadow: 0 2px 16px 0 rgba(80,80,180,0.06);
  padding: 32px;
  color: var(--text-primary);
  @media (max-width: 600px) {
    padding: 16px;
    margin: 16px;
  }
`;
const Section = styled.section`
  margin-bottom: 32px;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const SubTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Text = styled.p`
  font-size: 1rem;
  margin-bottom: 8px;
  color: var(--text-secondary);
`;

const HalalPractices = () => (
  <Layout title="Halal Money Guide">
    <Container>
      <Title><FiBook /> Best Halal Practices for Money</Title>
      <Section>
        <SubTitle><FiXCircle color="#ef4444" /> Avoid Interest (Riba)</SubTitle>
        <Text>Do not engage in any form of interest-based transactions (loans, savings accounts with interest, etc). Riba is strictly prohibited in Islam.</Text>
      </Section>
      <Section>
        <SubTitle><FiXCircle color="#ef4444" /> No Gambling or Speculation</SubTitle>
        <Text>Avoid all forms of gambling (maisir) and speculative investments. This includes lotteries, betting, and high-risk trading.</Text>
      </Section>
      <Section>
        <SubTitle><FiHeart color="#4ade80" /> Charity (Zakat & Sadaqah)</SubTitle>
        <Text>Give a portion of your wealth to those in need. Zakat is obligatory for eligible Muslims, and sadaqah is highly encouraged.</Text>
      </Section>
      <Section>
        <SubTitle><FiCheckCircle color="#4ade80" /> Ethical Earning</SubTitle>
        <Text>Earn money through honest, ethical, and halal means. Avoid deceit, fraud, and any haram (forbidden) sources of income.</Text>
      </Section>
      <Section>
        <SubTitle><FiTrendingUp color="#7f5fff" /> Halal Investments</SubTitle>
        <Text>Invest only in businesses and funds that are halal. Avoid companies involved in alcohol, pork, gambling, or interest-based finance.</Text>
      </Section>
      <Section>
        <SubTitle><FiXCircle color="#ef4444" /> Avoid Haram Sources</SubTitle>
        <Text>Do not earn or invest in anything prohibited by Islamic law, such as alcohol, pork, adult entertainment, or unethical businesses.</Text>
      </Section>
    </Container>
  </Layout>
);

export default HalalPractices; 