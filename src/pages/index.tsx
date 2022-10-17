import { Button, Typography } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box } from "@mui/system";

const STATUSES = {
  loading: "loading",
  authenticated: "authenticated",
};

export default function Component() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== STATUSES.loading && status === STATUSES.authenticated) {
    router.push("/dashboard");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          color="primary.main"
          textAlign="center"
          fontSize="1.8rem"
          letterSpacing="0.01em"
          component="h5"
        >
          Thumbnail Generator 💅 <br />
          Login with your GitHub account..
        </Typography>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "lightgrey",
          background: "#e0e0e0",
          boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
          borderRadius: "30px",
          color: "gray",
          padding: "50px",
        }}
      >
        <Typography>Login</Typography>
        <Button variant="outlined" onClick={() => signIn()}>
          Sign in <GitHubIcon sx={{ marginLeft: "8px" }} />
        </Button>
      </Box>
    </Box>
  );
}
