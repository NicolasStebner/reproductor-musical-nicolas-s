import Button from "@mui/material/Button";
import { textChild } from "../../types";
import { IconButton, Link } from "@mui/material";

export function ButtonOutlinedRoundedSmall({
  text,
  backgroundColor,
  textColor,
  startIcon,
}: textChild) {
  return (
    <Button
      size="small"
      startIcon={startIcon}
      sx={{
        borderRadius: "999px",
        borderColor: "transparent",
        backgroundColor: backgroundColor || "var(--smoke-gray)",
        color: textColor || "var(--font-color)",
        fontSize: "0.7rem",
        "&:hover": {
          borderColor: "black",
          color: "black",
        },
      }}
      variant="outlined"
    >
      {text}
    </Button>
  );
}

export function ButtonIconSmall({
  children,
  ariaLabel,
  color,
  backgroundColorHover,
}: any) {
  return (
    <IconButton
      sx={{
        "&:hover": { background: backgroundColorHover || "#303030" },
        maxHeight: "23px",
        maxWidth: "23px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: color || "white",
      }}
      size="small"
      aria-label={ariaLabel}
    >
      {children}
    </IconButton>
  );
}

export function ButtonIcon({ children, ariaLabel }: any) {
  return (
    <IconButton
      sx={{
        "&:hover": { background: "var(--anthracite-gray)" },
        maxHeight: "35px",
        maxWidth: "35px",
        backgroundColor: "var(--smoke-gray)",
      }}
      size="small"
      aria-label={ariaLabel}
    >
      {children}
    </IconButton>
  );
}

export function ButtonWithLink({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
  target?: string;
}) {
  return (
    <Link
      sx={{
        display: "flex",
        gap: "10px",
        color: "var(--font-unselected-color)",
        "&:hover": {
          color: "white",
        },
      }}
      rel="noopener"
      href={link}
      target="_blank"
      underline="none"
    >
      {children}
    </Link>
  );
}
