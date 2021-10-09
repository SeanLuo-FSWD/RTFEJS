import { useState } from "react";

export default function FormManager({ initialValues, children }) {
  const [values, setValues] = useState({ ...initialValues });

  return children({
    values,
    setValues,
  });
}
