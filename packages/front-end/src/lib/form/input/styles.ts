import classNames from "classnames";

export const getInputDisabledStyles = (disabled?: boolean) => {
  return {
    "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-500":
      !disabled,
    "opacity-50 cursor-not-allowed": disabled,
  };
};

export const inputBaseStyles = classNames(
  "bg-gray-700",
  "border",
  "border-gray-600",
  "text-white",
  "text-base",
  "rounded-lg",
  "focus:ring-2",
  "focus:ring-indigo-500",
  "focus:border-indigo-500",
  "block",
  "w-full",
  "p-3",
  "dark:bg-gray-700",
  "dark:border-gray-600",
  "dark:placeholder-gray-400",
  "dark:text-white",
  "dark:focus:ring-indigo-500",
  "dark:focus:border-indigo-500"
);

export const inputStyles = inputBaseStyles;
