import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { SubTitleCardArtist, TitleCardArtist } from "../../ui/text";
import { AvatarUI } from "../../ui/avatar";
import { CardCompType } from "../../types";

const MAX_CONTENIDO = 10;

export function CardComp({ avatar, title, subtitle }: CardCompType) {
  const titleTruncated =
    title.length > MAX_CONTENIDO
      ? title.substring(0, MAX_CONTENIDO) + "..."
      : title;
  const subtitleTruncated =
    subtitle.length > MAX_CONTENIDO
      ? subtitle.substring(0, MAX_CONTENIDO) + "..."
      : subtitle.charAt(0).toUpperCase() + subtitle.slice(1);

  // const [hovered, setHovered] = React.useState(false);

  // const handleMouseEnter = () => {
  //   setHovered(false);
  // };

  // const handleMouseLeave = () => {
  //   setHovered(false);
  // };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
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
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <AvatarUI alt={avatar.alt} src={avatar.src} />
      {/* {hovered
              ?
                <Box 
                  sx={{
                    position:"relative",
                    bottom: "120px; left: 80px;",
                    // transform: 'translateX(-50%)',
                    // transition: 'bottom 0.3s ease-in-out',
                  }}
                  >
                    <PlayCircleLarge/>
                </Box>
              :
                <Box/>} */}
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
        <SubTitleCardArtist text={subtitleTruncated} />
      </Box>
    </Card>
  );
}
