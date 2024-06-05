import { Grid } from "@mui/material";

export function GridAlbumArtists({ children }: any) {
  return (
    <Grid container spacing={"5px"} sx={{ height: "100%" }}>
      {children}
    </Grid>
  );
}
