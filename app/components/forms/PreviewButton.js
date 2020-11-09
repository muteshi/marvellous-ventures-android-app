import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function PreviewButton({ title, icon }) {
  const { values } = useFormikContext();
  return (
    <AppButton
      color="secondary"
      title={title}
      onPress={console.log(values)}
      icon={icon}
    />
  );
}

export default PreviewButton;
