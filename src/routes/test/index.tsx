import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { XMLParser } from "fast-xml-parser";

export const useRssParser = routeLoader$(async ({ error }) => {
  const res = await fetch("https://anchor.fm/s/f01f6814/podcast/rss");
  if (!res.ok) {
    throw error(404, "Page not found");
  }

  const xml = await res.text();
  const parser = new XMLParser();
  const json = parser.parse(xml);

  return json;
});

export default component$(() => {
  const json = useRssParser();

  // RenderContent component uses the `content` prop to render
  // the page, specified by the API Key, at the current URL path.
  return (
    <>
      <div>{json.value.rss.channel.title}</div>;
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const json = resolveValue(useRssParser);
  return {
    title: json.rss.channel.title,
  };
};
