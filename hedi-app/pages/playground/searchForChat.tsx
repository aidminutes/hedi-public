import { quickSearchAPIUrl } from "@/modules/search/types";
import { useEffect, useState } from "react";

export default function MSGPlayground() {
  const [results, setResults] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (value) {
      fetch(
        quickSearchAPIUrl + `?searchText=${encodeURIComponent(value)}&lang=de`
      )
        .then(res => res.json())
        .then(data => {
          if (data && Array.isArray(data))
            setResults(data.map(resultItem => resultItem.label));
          else setResults([]);
        });
    } else setResults([]);
  }, [value]);

  return (
    <div>
      <h1>Search Profile and Glossary title / name</h1>
      <h4>
        You need to be logged in first. if not logged in:{" "}
        <a href="/de/anmelden">login</a>
      </h4>
      title: <input type="text" onChange={e => setValue(e.target.value)} />
      {results && results.length ? (
        <div>
          results:
          <ul>
            {results.map((item, index) => (
              <li
                key={"item-" + index}
                dangerouslySetInnerHTML={{ __html: item }}></li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
