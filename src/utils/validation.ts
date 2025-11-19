export type SignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: Partial<Record<keyof SignupData, string>>;
};

const emailRegex = /^\S+@\S+\.\S+$/;

export function validateSignupForm(data: SignupData): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Namnet måste vara minst 2 tecken.';
  }

  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = 'Ange en giltig e-postadress.';
  }

  if (!data.password || data.password.length < 8) {
    errors.password = 'Lösenordet måste vara minst 8 tecken.';
  }

  if (!data.confirmPassword || data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Lösenorden matchar inte.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
