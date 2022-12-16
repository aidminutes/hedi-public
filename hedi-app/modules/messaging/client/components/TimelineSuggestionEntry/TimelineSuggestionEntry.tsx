import { requestEntry } from "@/modules/common/client/request/requestEntry";
import { ClickableTile } from "carbon-components-react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { SuggestionEntry } from "../SuggestionEntry";
import { ITimelineSuggestionEntry } from "./types";

export const TimelineSuggestionEntry = (props: ITimelineSuggestionEntry) => {
  const { locale } = useRouter();
  const { route, inTimeline = false } = props;

  // TODO needs rework to use it more abstract
  const { data: entry } = useSWR(
    route ? [route, locale || "de"] : null,
    requestEntry
  );

  if (!entry) return null;
  if (inTimeline) {
    return (
      <Link href={entry.route} passHref>
        <ClickableTile href={entry.route} light={true}>
          <SuggestionEntry
            {...props}
            alternativeClass="timeline"
            element={entry}
            entryType="full"
          />
        </ClickableTile>
      </Link>
    );
  }

  return (
    <SuggestionEntry
      {...props}
      alternativeClass="timeline"
      element={entry}
      entryType="full"
    />
  );
};
