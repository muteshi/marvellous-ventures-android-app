import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ title, icon }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      color="secondary"
      title={title}
      onPress={handleSubmit}
      icon={icon}
    />
  );
}

export default SubmitButton;
