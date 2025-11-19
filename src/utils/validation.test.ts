import { describe, it, expect } from 'vitest';
import { validateSignupForm, type SignupData } from './validation';

function validData(overrides: Partial<SignupData> = {}): SignupData {
  return {
    name: 'Anna',
    email: 'anna@example.com',
    password: 'superhemligt',
    confirmPassword: 'superhemligt',
    ...overrides
  };
}

describe('validateSignupForm', () => {
  it('returnerar isValid=true när alla fält är korrekta', () => {
    const result = validateSignupForm(validData());
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('ger fel om namnet är för kort', () => {
    const result = validateSignupForm(validData({ name: 'A' }));
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBe('Namnet måste vara minst 2 tecken.');
  });

  it('ger fel om e-posten är ogiltig', () => {
    const result = validateSignupForm(validData({ email: 'inte-en-mail' }));
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Ange en giltig e-postadress.');
  });

  it('ger fel om lösenordet är för kort', () => {
    const result = validateSignupForm(validData({ password: '1234567', confirmPassword: '1234567' }));
    expect(result.isValid).toBe(false);
    expect(result.errors.password).toBe('Lösenordet måste vara minst 8 tecken.');
  });

  it('ger fel om lösenorden inte matchar', () => {
    const result = validateSignupForm(
      validData({ password: 'superhemligt', confirmPassword: 'annatlösen' })
    );
    expect(result.isValid).toBe(false);
    expect(result.errors.confirmPassword).toBe('Lösenorden matchar inte.');
  });
});
