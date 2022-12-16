import Head from "next/head";
import { Column, Grid, Row, Button } from "carbon-components-react";
import { CustomToggletip } from "@/modules/common/client/components";
import { IButtonComponent } from "@/modules/components";
import { UserAvatarFilledAlt16 } from "@carbon/icons-react";

export default function ToggletipPlayground() {
  const button: IButtonComponent = {
    buttonKind: "ghost",
    text: "Benutzerkonto",
    kind: "Button",
    usage: "",
  };

  return (
    <div>
      <Head>
        <title>Toggletip</title>
      </Head>
      <main
        style={{
          padding: "50px",
          backgroundColor: "#ecf0ff",
          height: "100vh",
        }}>
        <Grid>
          <Row>
            <h1>Toggletip</h1>
          </Row>
          <Row>
            <Column>
              <CustomToggletip
                label={"Benutzerkonto"}
                icon={UserAvatarFilledAlt16}>
                <p>
                  Jetzt bei HEDI anmelden für viele Vorteile. Für Schwangere,
                  Hebammen, Ärzt:innen und Beratende:
                </p>
                <ul>
                  <li>Vernetzung</li>
                  <li>Hebammen- & Kontaktsuche</li>
                  <li>datenschutzsicherer Messanger</li>
                </ul>
                <Button>Einloggen</Button>
              </CustomToggletip>
            </Column>
          </Row>
          <Row>
            <p>Hier steht noch was</p>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
