import { Box, Stack } from "@mui/material";
import { ButtonOutlinedRoundedSmall, ButtonWithLink } from "../../ui/button";
import GetAppIcon from "@mui/icons-material/GetApp";
import { AvatarHeader } from "../../ui/avatar";
import { useEffect, useState } from "react";
import { serviceSpotify } from "../../services/service";
import { useAuth } from "../../providers/auth/AuthContext";
import { Subtitle } from "../../ui/text";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export function Header() {
  const { access_token } = useAuth();
  const [letter, setLetter] = useState<string>("?");
  const [photo, setPhoto] = useState<string>("");

  const getUserData = async () => {
    const rta = await serviceSpotify.getUserData(access_token!!);
    console.log(rta);
    setPhoto(rta.images[0].url);
    let letterC = rta.display_name[0];
    setLetter(letterC);
  };

  useEffect(() => {
    getUserData();
  }, [access_token]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "20px",
        padding: "20px 10px",
        backgroundColor: "var(--background-color-header)",
        position: "sticky",
        top: "0",
        left: "0",
        right: "0",
        zIndex: 1,
      }}
    >
      <ButtonWithLink
        link="https://open.spotify.com/download"
        children={
          <ButtonOutlinedRoundedSmall
            startIcon={<GetAppIcon />}
            backgroundColor="var(--coal-black)"
            textColor="white"
            text="Install App"
          />
        }
      ></ButtonWithLink>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        {access_token ? (
          <AvatarHeader
            alt=""
            src={photo}
            text={letter}
            backgroundColor="var(--spotify-color)"
            backgroundColorHover="#9effb6"
          />
        ) : (
          <Link to="/auth" className="link">
            <Box sx={{ display: "flex", gap: 1 }}>
              <AccountBoxIcon sx={{ color: "var(--coal-black)" }} />
              <Subtitle text="Log In" textColor="var(--coal-black)"></Subtitle>
            </Box>
          </Link>
        )}
      </Stack>
    </Box>
  );
}
