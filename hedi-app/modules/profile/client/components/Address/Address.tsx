import { IAddress } from "../../../types/dataTypes";

export const Address = (
  props: Partial<IAddress> & {
    hideAdditionalInfo?: boolean;
    hideStreetAndNumber?: boolean;
  } & React.HTMLAttributes<HTMLElement>
) => {
  const {
    dataKind,
    city,
    postalCode,
    street,
    streetNumber,
    additionalInfo,
    hideStreetAndNumber,
    hideAdditionalInfo,
    ...rest
  } = props;
  // TODO dataKind
  return (
    <address {...rest}>
      {!hideStreetAndNumber && (street || streetNumber) && (
        <>
          <p>
            {street} {streetNumber}
          </p>
          {!hideAdditionalInfo && <p>{additionalInfo}</p>}
        </>
      )}
      <p>
        {postalCode} {city}
      </p>
    </address>
  );
};
