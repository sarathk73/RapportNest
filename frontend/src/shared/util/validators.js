const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_PHONE = 'PHONE';
const VALIDATOR_TYPE_MATCH = 'MATCH';
const VALIDATOR_TYPE_STRING = 'STRING';
const VALIDATOR_TYPE_AGE = 'AGE';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val
});
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_PHONE = () => ({ type: VALIDATOR_TYPE_PHONE });
export const VALIDATOR_MATCH = val => ({ type: VALIDATOR_TYPE_MATCH, val: val });
export const VALIDATOR_STRING = () => ({ type: VALIDATOR_TYPE_STRING });
export const VALIDATOR_AGE = (minAge, maxAge) => ({
  type: VALIDATOR_TYPE_AGE,
  minAge: minAge,
  maxAge: maxAge
});


export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_PHONE) {
      if (Array.isArray(value)) {
        for (const phoneNumber of value) {
          isValid = isValid && /^[0-9]{10}$/.test(phoneNumber.trim());
        }
      } else {
        isValid = isValid && /^[0-9]{10}$/.test(value.trim());
      }
    }
    if (validator.type === VALIDATOR_TYPE_MATCH) {
      isValid = isValid && value === validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_STRING) {
      isValid = isValid && /^[a-zA-Z\s]+$/.test(value.trim());
    }
    if (validator.type === VALIDATOR_TYPE_AGE) {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      isValid = isValid && age >= validator.minAge && age <= validator.maxAge;
    }
  }
  return isValid;
};
