import { Link, LinkProps } from "react-router";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "danger" | "inverted";

type Props = (React.ButtonHTMLAttributes<HTMLButtonElement> | LinkProps) & {
  variant?: Variant;
};

const Button = ({ className, children, variant, ...rest }: Props) => {
  let variantClass;

  if (variant === "primary") {
    variantClass = styles.primary;
  } else if (variant === "secondary") {
    variantClass = styles.secondary;
  } else if (variant === "danger") {
    variantClass = styles.danger;
  } else if (variant === "inverted") {
    variantClass = styles.inverted;
  }

  const buttonClass = [
    styles.button,
    variantClass && variantClass,
    className && className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {(rest as LinkProps).to ? (
        <Link className={buttonClass} {...(rest as LinkProps)}>
          {children}
        </Link>
      ) : (
        <button
          className={buttonClass}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
