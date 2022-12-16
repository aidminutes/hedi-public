import React, { useState } from "react";
import { ISearchMidwifeScoreMultiplier } from "../../../types";
import { Row, Column, NumberInput } from "carbon-components-react";

export const DebugScoreMultiplierInput: React.FC<{
  onChange?: (multiplier: ISearchMidwifeScoreMultiplier) => void;
}> = props => {
  const [multiplier, setMultiplier] = useState<ISearchMidwifeScoreMultiplier>({
    availability: 0.33,
    distance: 0.25,
    languages: 0.5,
    services: 0.75,
    careTypes: 1,
  });

  const { onChange } = props;

  const handleChange = (
    value: number,
    key: keyof ISearchMidwifeScoreMultiplier
  ) => {
    if (value) {
      setMultiplier(prev => {
        const newState = { ...prev };
        newState[key] = value;
        if (onChange) onChange(newState);
        return newState;
      });
    }
  };
  return (
    <Row>
      <Column>
        <NumberInput
          id="careTypes"
          label="CareTypes"
          value={1}
          step={0.1}
          min={0}
          onChange={(e, d, v) =>
            handleChange(typeof v === "number" ? v : parseFloat(v), "careTypes")
          }
        />
      </Column>
      <Column>
        <NumberInput
          id="availability"
          label="Availability"
          value={1}
          step={0.1}
          min={0}
          onChange={(e, d, v) =>
            handleChange(
              typeof v === "number" ? v : parseFloat(v),
              "availability"
            )
          }
        />
      </Column>
      <Column>
        <NumberInput
          id="distance"
          label="Distance"
          value={1}
          step={0.1}
          min={0}
          onChange={(e, d, v) =>
            handleChange(typeof v === "number" ? v : parseFloat(v), "distance")
          }
        />
      </Column>
      <Column>
        <NumberInput
          id="languages"
          label="Language"
          value={1}
          step={0.1}
          min={0}
          onChange={(e, d, v) =>
            handleChange(typeof v === "number" ? v : parseFloat(v), "languages")
          }
        />
      </Column>
      <Column>
        <NumberInput
          id="services"
          label="Service"
          value={1}
          step={0.1}
          min={0}
          onChange={(e, d, v) =>
            handleChange(typeof v === "number" ? v : parseFloat(v), "services")
          }
        />
      </Column>
    </Row>
  );
};
