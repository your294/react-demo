import { useState } from "react";

export interface Validation {
  validator: (value: string) => boolean;
  msg: string;
}

export default function useValidation(
  defaultValue: string,
  validationRules: Validation[]
) {
  const [value, setValue] = useState(defaultValue);
  const [errors, setErrors] = useState<Array<string>>([]);

  const validate = (valueToValidate: string) => {
    const newErrors = validationRules
      .filter((rule) => {
        return !rule.validator(valueToValidate);
      })
      .map((rule) => rule.msg);
    setErrors(newErrors);
    return newErrors;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setValue(newVal);
    validate(newVal);
  };

  return {
    onChange,
    value,
    errors,
    isValid: errors.length === 0,
  };
}
