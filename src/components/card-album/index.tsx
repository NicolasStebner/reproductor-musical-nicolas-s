import { Box, Card, CardContent } from "@mui/material";
import { AvatarUISquare } from "../../ui/avatar";
import { SubTitleCardArtist, TitleCardArtist } from "../../ui/text";
import { CardAlbumType } from "../../types";

const MAX_CONTENIDO = 20;

export function CardAlbum({ image, title, description }: CardAlbumType) {
  const titleTruncated =
    title.length > MAX_CONTENIDO
      ? title.substring(0, MAX_CONTENIDO) + "..."
      : title;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        borderColor: "transparent",
        backgroundColor: "transparent",
        "&:hover": {
          bgcolor: "var(--hover-color-gray)",
          cursor: "pointer",
        },
      }}
      variant="outlined"
    >
      <AvatarUISquare alt={"a"} src={image} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <CardContent sx={{ padding: "0px" }}>
          <TitleCardArtist text={titleTruncated} />
        </CardContent>
        <SubTitleCardArtist text={description} />
      </Box>
    </Card>
  );
}
