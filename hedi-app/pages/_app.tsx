import { FeatureFlagsProvider } from "@/modules/common/client/components";

import { MessagingContextProvider } from "@/modules/messaging/client/context/MessagingContext/MessagingContextProvider";

import { NotificationContextProvider } from "@/modules/pwr/client";
import "core-js/modules/es.array.fill";
import "core-js/modules/es.array.includes";
import "core-js/modules/es.object.values";
import "core-js/modules/es.string.includes";
import "core-js/modules/es.string.trim";
import { SessionProvider } from "next-auth/react";

// HACK using precompiled default carbon css while not customizing styling to speed up build
// switch '...carbon-components.min.css' with '..._app.scss' for applying styles
// import "./_app.scss";
// import "carbon-components/css/carbon-components.min.css";
import { AppProps } from "next/app";
// import "core-js/stable";
import "regenerator-runtime";
import "../src/polyfills/element-closest";
import "../src/polyfills/element-matches";
import "./styles.css";

export default function HEDIApp({ Component, pageProps }: AppProps) {
  return (
    <FeatureFlagsProvider>
      <SessionProvider session={pageProps.session}>
        <NotificationContextProvider>
          <MessagingContextProvider>
            <Component {...pageProps} />
          </MessagingContextProvider>
        </NotificationContextProvider>
      </SessionProvider>
    </FeatureFlagsProvider>
  );
}
