import { IScoreItem } from "@/modules/search/types";

interface IDebugInfoProps {
  showDebugInfo?: boolean;
  debugInfo?: Record<string, IScoreItem>;
}
export const DebugInfo: React.FC<IDebugInfoProps> = props => {
  const { showDebugInfo, debugInfo, children } = props;
  const array: any[] = [];
  if (debugInfo) {
    for (const [key, value] of Object.entries(debugInfo)) {
      array.push([key, value.score]);
    }
  }



  const summe = sumupDebugScores(debugInfo);
  array.push(["Total Score", summe]);

  return (
    <>
      {showDebugInfo && debugInfo !== undefined && (
        <div>
          {/* <pre>{JSON.stringify(debugInfo).replace(/,/g, " ".repeat(4))}</pre> */}
          <ul className="hedi--debug--info">
            {array.map(e => (
              <li>
                <span>
                  {e[0] === "Total Score" ? <strong>{e[0]}</strong> : e[0]}
                </span>
                <span>
                  {e[0] === "Total Score" ? <strong>{e[1]}</strong> : e[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {children}
    </>
  );
};

export function sumupDebugScores(obj: any) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el].score);
    }
  }
  return sum;
}