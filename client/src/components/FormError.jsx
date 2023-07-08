import React from "react";

const FormError = ({error}) =>
  error && <p className="text-red-500 self-start">{error.message}</p>;

export default FormError;
