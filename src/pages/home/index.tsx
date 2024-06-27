import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import NicolasPNG from "../../assets/nicolas.jpg";

export function Home() {
  return (
    <Box>
      <Box fontSize="2xl" fontWeight="bold">
        <Typography
          variant="h3"
          textAlign={"center"}
          color={"var(--spotify-color)"}
        >
          SPOTIFY REMOTE CONTROL
        </Typography>
      </Box>

      <Box mt={4} fontSize="xl">
        <Typography variant="h4" color={"var(--spotify-color)"}>
          Sobre el Proyecto
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          Spotify Remote Control es una aplicación diseñada para proporcionar
          control remoto sobre la música que se está reproduciendo en tu
          dispositivo. Ofrece funcionalidades como cambiar de canción, ajustar
          el volumen y más. Además, permite buscar artistas, álbumes y otras
          categorías de contenido.
        </Typography>
      </Box>

      <Box mt={4} fontSize="xl" fontWeight="semibold">
        <Typography variant="h4" color={"var(--spotify-color)"}>
          Objetivos
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          El objetivo principal de este proyecto es aprovechar la API WEB de
          Spotify. A través de diversos endpoints, podemos realizar
          modificaciones en la reproducción de música y obtener información
          relevante, mejorando así la experiencia del usuario.
        </Typography>
      </Box>

      <Box mt={4} fontSize="xl" fontWeight="semibold">
        <Typography variant="h4" color={"var(--spotify-color)"}>
          Herramientas
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          Las tecnologías utilizadas en el desarrollo de esta aplicación
          incluyen
          <FrameworkRedirect href="https://es.react.dev" text="React" />
          <Box display={"inline"} marginLeft={"3px"}>
            ,
          </Box>
          <FrameworkRedirect
            href="https://www.typescriptlang.org"
            text="TypeScript"
          />
          <Box display={"inline"} marginLeft={"3px"}>
            y
          </Box>
          <FrameworkRedirect href="https://v2.chakra-ui.com" text="ChakraUI." />
        </Typography>
      </Box>

      <Box mt={4} fontSize="xl" fontWeight="semibold">
        <Typography variant="h4" color={"var(--spotify-color)"}>
          Desarrollador
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          <ProfileCard
            photo={NicolasPNG}
            name="Nicolas Stebner"
            role="Dev. FullStack"
            portfolio="https://nicolasalejandrostebner.vercel.app"
            linkedIn="https://www.linkedIn.com/in/nicolas-stebner/"
          />
        </Typography>
      </Box>
    </Box>
  );
}

type ProfileCardType = {
  photo: string;
  name: string;
  role: string;
  portfolio: string;
  linkedIn: string;
};

function ProfileCard({
  photo,
  name,
  role,
  portfolio,
  linkedIn,
}: ProfileCardType) {
  return (
    <Box
      sx={{
        minWidth: 260,
        maxWidth: 260,
        width: "100%",
        boxShadow: 24,
        borderRadius: "8px",
        p: 3,
        textAlign: "center",
        margin: "0 auto",
        mb: "100px",
      }}
    >
      <Avatar
        sx={{ width: 56, height: 56, mb: 2, margin: "0 auto" }}
        src={photo}
      />
      <Typography variant="h5">{name}</Typography>
      <Typography variant="h6">{role}</Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          fullWidth
          size="small"
          component="a"
          target="_blank"
          href={portfolio}
          sx={{
            color: "white",
            borderRadius: "50px",
            backgroundColor: "#2b3137",
            "&:hover": {
              boxShadow:
                "0px 1px 25px -5px rgba(132, 138, 142, 0.48), 0 10px 10px -5px rgba(132, 138, 142, 0.48)",
              backgroundColor: "#24292e",
            },
            "&:focus": {
              backgroundColor: "#24292e",
            },
          }}
        >
          Portfolio
        </Button>
        <Button
          fullWidth
          size="small"
          component="a"
          target="_blank"
          href={linkedIn}
          sx={{
            borderRadius: "50px",
            backgroundColor: "var(--linkedin-color)",
            color: "white",
            "&:hover": {
              boxShadow:
                "0px 1px 25px -5px rgba(66, 153, 225, 0.48), 0 10px 10px -5px rgba(66, 153, 225, 0.43)",
              backgroundColor: "var(--linkedin-color)",
            },
            "&:focus": {
              backgroundColor: "var(--linkedin-color)",
            },
          }}
        >
          LinkedIn
        </Button>
      </Stack>
    </Box>
  );
}

type FrameworkRedirectType = {
  href: string;
  text: string;
};
function FrameworkRedirect({ href, text }: FrameworkRedirectType) {
  return (
    <Typography
      variant="subtitle1"
      component="a"
      target="_blank"
      href={href}
      ml={"3px"}
      sx={{
        color: "white",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      {text}
    </Typography>
  );
}
