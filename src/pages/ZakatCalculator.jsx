import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPercent, FiCheckCircle } from 'react-icons/fi';
import Layout from '../layouts/Layout';

const Container = styled.div`
  max-width: 500px;
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
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const Label = styled.label`
  font-weight: 600;
  margin-bottom: 4px;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  margin-top: 4px;
`;
const Button = styled.button`
  background: var(--accent-primary);
  color: var(--text-inverse);
  border: none;
  border-radius: 10px;
  padding: 12px 0;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(80,80,180,0.10);
  margin-top: 10px;
`;
const Result = styled.div`
  background: #eaff6b22;
  border-radius: 10px;
  padding: 18px;
  margin-top: 18px;
  color: var(--text-primary);
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ZakatCalculator = () => {
  const [inputs, setInputs] = useState({
    savings: '',
    gold: '',
    investments: '',
    business: '',
    debts: ''
  });
  const [zakat, setZakat] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const s = parseFloat(inputs.savings) || 0;
    const g = parseFloat(inputs.gold) || 0;
    const i = parseFloat(inputs.investments) || 0;
    const b = parseFloat(inputs.business) || 0;
    const d = parseFloat(inputs.debts) || 0;
    const totalAssets = s + g + i + b;
    const netAssets = Math.max(totalAssets - d, 0);
    const zakatDue = netAssets * 0.025;
    setZakat({ totalAssets, netAssets, zakatDue });
    setShowResult(true);
  };

  return (
    <Layout title="Zakat Calculator">
      <Container>
        <Title><FiPercent /> Zakat Calculator</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="savings">Total Savings (cash, bank, etc.)</Label>
            <Input type="number" name="savings" id="savings" value={inputs.savings} onChange={handleChange} min="0" step="0.01" placeholder="0" />
          </div>
          <div>
            <Label htmlFor="gold">Gold/Silver (current value)</Label>
            <Input type="number" name="gold" id="gold" value={inputs.gold} onChange={handleChange} min="0" step="0.01" placeholder="0" />
          </div>
          <div>
            <Label htmlFor="investments">Halal Investments</Label>
            <Input type="number" name="investments" id="investments" value={inputs.investments} onChange={handleChange} min="0" step="0.01" placeholder="0" />
          </div>
          <div>
            <Label htmlFor="business">Business Assets</Label>
            <Input type="number" name="business" id="business" value={inputs.business} onChange={handleChange} min="0" step="0.01" placeholder="0" />
          </div>
          <div>
            <Label htmlFor="debts">Debts (to subtract)</Label>
            <Input type="number" name="debts" id="debts" value={inputs.debts} onChange={handleChange} min="0" step="0.01" placeholder="0" />
          </div>
          <Button type="submit"><FiPercent style={{ marginRight: 8 }} /> Calculate Zakat</Button>
        </Form>
        {showResult && zakat && (
          <Result>
            <div><b>Total Zakatable Assets:</b> ${zakat.netAssets.toFixed(2)}</div>
            <div><b>Zakat Due (2.5%):</b> ${zakat.zakatDue.toFixed(2)}</div>
            <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 6 }}><FiCheckCircle /> Remember: Zakat is obligatory on assets held for one lunar year (hawl).</div>
          </Result>
        )}
      </Container>
    </Layout>
  );
};

export default ZakatCalculator; 