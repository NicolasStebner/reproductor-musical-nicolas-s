import { Box } from "@mui/material";
import { AvatarAlbum } from "../../ui/avatar";
import { TopArtistType } from "../../types";
import { TopArtistSubtitle, TopArtistTitle } from "../../ui/text";

export function TopArtist({ artist, onClicked }: TopArtistType) {
  var artistType = artist.type.charAt(0).toUpperCase() + artist.type.slice(1);
  return (
    <Box
      sx={{
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "var(--smoke-gray)",
        },
        backgroundColor: "var(--hover-color-gray)",
        borderRadius: "10px",
        padding: "5px",
      }}
      onClick={() => onClicked(artist.id)}
    >
      <AvatarAlbum alt={artist.name} src={`${artist.images[0]?.url}`} />
      <TopArtistTitle text={artist.name} />
      <TopArtistSubtitle text={artistType} />
    </Box>
  );
}
