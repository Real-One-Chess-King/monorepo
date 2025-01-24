import React from "react";
import classNames from "classnames";

type SubmitButtonProps = {
  disabled: boolean;
  text: string;
};

const SubmitButton = ({ disabled, text }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={disabled}
    className={classNames(
      "px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold",
      {
        "hover:bg-indigo-500": !disabled,
        "bg-indigo-300 cursor-not-allowed": disabled,
      }
    )}
  >
    {text}
  </button>
);

export default SubmitButton;
