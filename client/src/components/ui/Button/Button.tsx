import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "danger" | "inverted";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
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
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
};

export default Button;
