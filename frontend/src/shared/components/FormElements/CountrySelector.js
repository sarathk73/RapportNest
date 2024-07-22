import React from 'react';

const countries = [
  { code: '+1', name: 'United States' },
  { code: '+1', name: 'Canada' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+61', name: 'Australia' },
  { code: '+91', name: 'India' },
  { code: '+86', name: 'China' },
  { code: '+81', name: 'Japan' },
  { code: '+49', name: 'Germany' },
  { code: '+33', name: 'France' },
  { code: '+39', name: 'Italy' },
  { code: '+34', name: 'Spain' },
  { code: '+7', name: 'Russia' },
  { code: '+55', name: 'Brazil' },
  { code: '+27', name: 'South Africa' },
  { code: '+234', name: 'Nigeria' },
  { code: '+64', name: 'New Zealand' },
  { code: '+47', name: 'Norway' },
  { code: '+46', name: 'Sweden' },
  { code: '+41', name: 'Switzerland' },
  { code: '+31', name: 'Netherlands' },
  { code: '+32', name: 'Belgium' },
  { code: '+52', name: 'Mexico' },
  { code: '+54', name: 'Argentina' },
  { code: '+61', name: 'Australia' },
  { code: '+20', name: 'Egypt' },
  { code: '+82', name: 'South Korea' },
 
];

const CountrySelector = ({ selectedCountry, onSelectCountry }) => {
  return (
    <select
      value={selectedCountry}
      onChange={(e) => onSelectCountry(e.target.value)}
      className="country-selector"
    >
      <option value="">Select Country</option>
      {countries.map((c) => (
        <option key={c.code} value={c.code}>
          {c.name} ({c.code})
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
