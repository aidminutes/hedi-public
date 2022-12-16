export const ValidationSummary = ({
  validationErrors,
}: {
  validationErrors: { [key: string]: string | string[] };
}) => {
  return (
    <div className="">
      <ul>
        {Object.keys(validationErrors).map(item => {
          const value = validationErrors[item];
          if (Array.isArray(value))
            return value.map(elem => (
              <li key={item}>
                {elem}
                <span> </span>
                {item}
              </li>
            ));
          else
            return (
              <li key={item}>
                {validationErrors[item]}
                <span> </span>
                {item}
              </li>
            );
        })}
      </ul>
    </div>
  );
};
