import { Link, Typography } from "@mui/material";
import { textChild, textWithLink } from "../../types";

//Artist texts
export function TitleCardArtist({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "1rem",
        display: "block",
        color: "var(--font-color)",
      }}
    >
      {text}
    </Typography>
  );
}

export function SubTitleCardArtist({ text }: textChild) {
  return (
    <Typography
      sx={{ fontSize: "0.875rem", color: "var(--font-unselected-color)" }}
    >
      {text}
    </Typography>
  );
}

//Text normal
export function Subtitle({ text, textColor }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "1rem",
        color: { textColor } || "var(--font-color)",
      }}
    >
      {text}
    </Typography>
  );
}

export function TinyText({ text }: textChild) {
  return (
    <Typography sx={{ fontSize: "0.875rem", color: "var(--font-color)" }}>
      {text}
    </Typography>
  );
}

//Text bolder
export function SubtitleBold({ text }: textChild) {
  return (
    <Typography
      sx={{ fontSize: "1rem", color: "var(--font-color)", fontWeight: "bold" }}
    >
      {text}
    </Typography>
  );
}

//Text with Link to go
export function TextMediumWithLink({ link, text }: textWithLink) {
  return (
    <Link href={link} target="_blank" underline="none" rel="noopener">
      {
        <Typography
          sx={{
            fontSize: "1rem",
            color: "var(--font-secondary-color)",
            "&:hover": {
              textDecoration: "underline",
              color: "var(--spotify-color)",
            },
          }}
        >
          {text}
        </Typography>
      }
    </Link>
  );
}

//Player
export function TitlePlayer({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "0.875rem",
        color: "var(--font-color)",
        fontWeight: "bold",
        "&:hover": {
          cursor: "pointer",
          textDecoration: "underline",
        },
      }}
    >
      {text}
    </Typography>
  );
}
export function SubtitlePlayer({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "0.75rem",
        color: "var(--font-secondary-color)",
        fontWeight: "bold",
        "&:hover": {
          cursor: "pointer",
          color: "var(--font-color)",
          textDecoration: "underline",
        },
      }}
    >
      {text}
    </Typography>
  );
}
// Page of an Artist
export function TitleArtist({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "3rem",
        color: "var(--font-color)",
        fontWeight: "bold",
      }}
    >
      {text}
    </Typography>
  );
}

export function SubtitleArtist({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "1.5rem",
        color: "var(--font-color)",
        fontWeight: "bold",
      }}
    >
      {text}
    </Typography>
  );
}

//album with tracks
export function AlbumTypeText({ text }: textChild) {
  const textCapitalLetter = text
    ? text.charAt(0).toUpperCase() + text.slice(1)
    : "";
  return (
    <Typography
      sx={{
        fontSize: "0.875rem",
        color: "var(--font-color)",
        fontWeight: "bold",
      }}
    >
      {textCapitalLetter}
    </Typography>
  );
}

export function AlbumTitle({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "5rem",
        color: "var(--font-color)",
        fontWeight: "bold",
      }}
    >
      {text}
    </Typography>
  );
}

export function TopArtistTitle({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "2rem",
        color: "var(--font-color)",
        fontWeight: "bold",
      }}
    >
      {text}
    </Typography>
  );
}

export function TopArtistSubtitle({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "0.875rem",
        color: "var(--font-secondary-color)",
        fontWeight: "bold",
      }}
    >
      {text}
    </Typography>
  );
}

export function SearchTitle({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "1.5rem",
        color: "var(--font-color)",
        fontWeight: "bold",
      }}
    >
      {text}
    </Typography>
  );
}

export function SearchTitleSong({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "1rem",
        color: "var(--font-color)",
        fontWeight: "bold",
      }}
    >
      {text}
    </Typography>
  );
}

export function SearchSubtitleSong({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "0.875rem",
        color: "var(--font-secondary-color)",
      }}
    >
      {text}
    </Typography>
  );
}

export function TextHelp({ text }: textChild) {
  return (
    <Typography
      sx={{
        fontSize: "3rem",
        color: "var(--font-color)",
        fontWeight: "bold",
        margin: "0 auto",
      }}
    >
      {text}
    </Typography>
  );
}
