import { Avatar } from "@mui/material";
import { AvatarType } from "../../types";

export function AvatarUI({ alt, src }: AvatarType) {
  return <Avatar alt={alt} src={src} sx={{ width: 100, height: 100 }} />;
}

export function AvatarUISquare({ alt, src }: AvatarType) {
  return (
    <Avatar
      variant="square"
      alt={alt}
      src={src}
      sx={{ width: 100, height: 100, borderRadius: "5px" }}
    />
  );
}

export function AvatarHeader({
  alt,
  src,
  text,
  backgroundColor,
  backgroundColorHover,
}: AvatarType) {
  return (
    <Avatar
      alt={alt}
      src={src}
      sx={{
        width: 30,
        height: 30,
        fontSize: "12px",
        backgroundColor: { backgroundColor },
        color: "black",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: backgroundColorHover,
        },
      }}
    >
      {text}
    </Avatar>
  );
}

export function AvatarAlbum({ alt, src }: AvatarType) {
  return (
    <Avatar
      alt={alt}
      src={src}
      variant="square"
      sx={{
        width: 200,
        height: 200,
        fontSize: "12px",
        borderRadius: "5px",
      }}
    ></Avatar>
  );
}
