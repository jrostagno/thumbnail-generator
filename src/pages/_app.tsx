import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme/theme";
import { Session } from "next-auth";

interface Props extends AppProps {
  pageProps: { session: Session };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
