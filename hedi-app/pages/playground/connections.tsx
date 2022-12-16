import { Button, Grid, Row, TextInput } from "carbon-components-react";
import { useEffect, useState } from "react";
import {
  IConnection,
  insertMidwifeCareConnectionAPIUrl,
  insertOrganisationConnectionAPIUrl,
  myConnectionsAPIUrl,
  transitionConnectionAPIUrl,
} from "@/modules/networking/types";

export default function ConnectionsPlayground() {
  const [myConnections, setMyConnections] = useState<IConnection[]>([]);
  const refreshConnections = () =>
    fetch(myConnectionsAPIUrl)
      .then(resp => resp.json())
      .then(items => setMyConnections(items as IConnection[]));
  useEffect(() => {
    refreshConnections();
  }, []);
  const doAction = (connectionRoute: string, action: string) => {
    fetch(transitionConnectionAPIUrl, {
      method: "POST",
      body: JSON.stringify({
        input: {
          route: connectionRoute,
          action,
        },
        lang: "de",
      }),
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        refreshConnections();
      });
  };

  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const insertConnection = (endpoint: string) => {
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        input: {
          sender,
          recipient,
        },
        lang: "de",
      }),
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        refreshConnections();
      });
  };

  const insertBusinessConnection = () =>
    insertConnection(insertOrganisationConnectionAPIUrl);

  const insertCareConnection = () =>
    insertConnection(insertMidwifeCareConnectionAPIUrl);

  return (
    <div>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <h2>MyConnection</h2>
            <div>
              {myConnections &&
                myConnections.map(conn => (
                  <div>
                    route: {conn.route}
                    <br />
                    type: {conn.type}
                    <br />
                    state: {conn.state.label}
                    <br />
                    valid next actions:{" "}
                    {conn.transitions.map(transition => (
                      <Button
                        id={transition.route}
                        key={transition.route}
                        onClick={() => doAction(conn.route, transition.route)}>
                        {transition.longLabel ?? transition.label}
                      </Button>
                    ))}
                  </div>
                ))}
            </div>
          </Row>
          <Row>
            <h2>Insert Connection</h2>
            <div>
              <TextInput
                id="sender"
                labelText="sender (profile route)"
                onChange={e => setSender(e.target.value)}
              />
              <TextInput
                id="recipient"
                labelText="recipient (profile route)"
                onChange={e => setRecipient(e.target.value)}
              />
              <Button onClick={() => insertBusinessConnection()}>
                insert business connection
              </Button>
              <Button onClick={() => insertCareConnection()}>
                insert care connection
              </Button>
            </div>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
