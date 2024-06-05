import { Box, Grid, Stack } from "@mui/material";
import { Subtitle, SubtitleBold } from "../../ui/text";
import { TextMediumWithLink } from "../../ui/text";
import Divider from "@mui/material/Divider";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { ButtonIcon, ButtonWithLink } from "../../ui/button";

export function Footer() {
  return (
    <Stack spacing={5} sx={{ marginBottom: "50px" }}>
      <Stack
        direction={"row"}
        spacing={"25px"}
        sx={{ width: "100%", justifyContent: "space-between" }}
      >
        <Grid
          container
          spacing={2}
          sx={{ maxHeight: "100vh", paddingX: "5px", overflow: "auto" }}
        >
          <Grid item xs={2.5}>
            <Stack spacing={"5px"}>
              <SubtitleBold text="Company"></SubtitleBold>
              <TextMediumWithLink
                link="https://www.spotify.com/ar/about-us/contact/"
                text="About"
              />
              <TextMediumWithLink
                link="https://www.lifeatspotify.com/"
                text="Jobs"
              />
              <TextMediumWithLink
                link="https://newsroom.spotify.com"
                text="For the Record"
              />
            </Stack>
          </Grid>
          <Grid item xs={2.5}>
            <Stack spacing={"5px"}>
              <SubtitleBold text="Communities"></SubtitleBold>
              <TextMediumWithLink
                link="https://artists.spotify.com/"
                text="For Artists"
              />
              <TextMediumWithLink
                link="https://developer.spotify.com/"
                text="Developers"
              />
              <TextMediumWithLink
                link="https://ads.spotify.com/"
                text="Advertising"
              />
              <TextMediumWithLink
                link="https://investors.spotify.com/"
                text="Investors"
              />
              <TextMediumWithLink
                link="https://spotifyforvendors.com/"
                text="Vendors"
              />
            </Stack>
          </Grid>
          <Grid item xs={2.5}>
            <Stack spacing={"5px"}>
              <SubtitleBold text="Useful Links"></SubtitleBold>
              <TextMediumWithLink
                link="https://support.spotify.com/"
                text="Support"
              />
              <TextMediumWithLink
                link="https://www.spotify.com/ar/download/"
                text="Free Mobile App"
              />
            </Stack>
          </Grid>
          <Grid item xs={2.5}>
            <Stack spacing={"5px"}>
              <SubtitleBold text="Spotify Plans"></SubtitleBold>
              <TextMediumWithLink
                link="https://www.spotify.com/ar/premium/?ref=spotifycom_footer_premium_individual"
                text="Premium Individual"
              />
              <TextMediumWithLink
                link="https://www.spotify.com/ar/duo/?ref=spotifycom_footer_premium_duo"
                text="Premium Duo"
              />
              <TextMediumWithLink
                link="https://www.spotify.com/ar/family/?ref=spotifycom_footer_premium_family"
                text="Premium Family"
              />
              <TextMediumWithLink
                link="https://www.spotify.com/ar/student/?ref=spotifycom_footer_premium_student"
                text="Premium Student"
              />
              <TextMediumWithLink
                link="https://www.spotify.com/ar/free/?ref=spotifycom_footer_free"
                text="Spotify Free"
              />
            </Stack>
          </Grid>
          {/* <Grid item xs={0}></Grid> */}
          <Grid item xs={2}>
            <Box
              sx={{ display: "flex", gap: "7px", justifyContent: "flex-end" }}
            >
              <ButtonWithLink
                children={
                  <ButtonIcon ariaLabel="Instagram">
                    <InstagramIcon sx={{ color: "white" }} />
                  </ButtonIcon>
                }
                link="https://instagram.com/spotify"
              ></ButtonWithLink>
              <ButtonWithLink
                children={
                  <ButtonIcon ariaLabel="X">
                    <XIcon sx={{ color: "white" }} />
                  </ButtonIcon>
                }
                link="https://twitter.com/spotify"
              ></ButtonWithLink>
              <ButtonWithLink
                children={
                  <ButtonIcon ariaLabel="Facebook">
                    <FacebookIcon sx={{ color: "white" }} />
                  </ButtonIcon>
                }
                link="https://www.facebook.com/Spotify"
              ></ButtonWithLink>
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Divider sx={{ backgroundColor: "var(--smoke-gray)" }} />
      <Stack
        direction={"row"}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Stack direction={"row"} spacing={3}>
          <TextMediumWithLink
            link="https://www.spotify.com/ar/legal/"
            text="Legal"
          />
          <TextMediumWithLink
            link="https://www.spotify.com/ar/safetyandprivacy/"
            text="Safety & Privacy Center"
          />
          <TextMediumWithLink
            link="https://www.spotify.com/ar/legal/privacy-policy/"
            text="Privacy Policy"
          />
          <TextMediumWithLink
            link="https://www.spotify.com/ar/legal/cookies-policy/"
            text="Cookies"
          />
          <TextMediumWithLink
            link="https://www.spotify.com/ar/legal/privacy-policy/#s3"
            text="About Ads"
          />
          <TextMediumWithLink
            link="https://www.spotify.com/ar/accessibility/"
            text="Accesibility"
          />
        </Stack>
        <Stack direction={"row"} spacing={0.5}>
          <CopyrightIcon sx={{ color: "var(--font-secondary-color)" }} />
          <Subtitle
            text={new Date().getFullYear() + " Spotify AB"}
            textColor="var(--font-secondary-color)"
          ></Subtitle>
        </Stack>
      </Stack>
    </Stack>
  );
}
