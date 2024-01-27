import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { XMLParser } from "fast-xml-parser";
import { PodcastRSSFeed } from "~/types/rssFeed";

export const useRssParser = routeLoader$(async ({ error }) => {
  const res = await fetch("https://feeds.buzzsprout.com/1887121.rss");
  if (!res.ok) {
    throw error(404, "Page not found");
  }

  const xml = await res.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
  });
  const json = parser.parse(xml);
  try {
    const rssFeed = PodcastRSSFeed.parse(json);
    return rssFeed;
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
    throw error(404, "Page not found");
  }
});

export default component$(() => {
  const rssFeed = useRssParser();

  // RenderContent component uses the `content` prop to render
  // the page, specified by the API Key, at the current URL path.
  return (
    <>
      <div>{rssFeed.value.rss.channel.title}</div>
      <div>{rssFeed.value.rss.channel.description}</div>
      <div>{rssFeed.value.rss.channel.link}</div>
      <img
        src={rssFeed.value.rss.channel.image.url}
        alt={rssFeed.value.rss.channel.image.title}
        width={500}
        height={500}
      />
      {rssFeed.value.rss.channel.item.map((item) => {
        return (
          <div key={item.guid.toString()}>
            <div>{item.title}</div>
            <div dangerouslySetInnerHTML={item.description}></div>
            <div>{item.link}</div>
            <div>{item["itunes:image"] && item["itunes:image"]["@_href"]}</div>
            <div>{item.enclosure["@_url"]}</div>
          </div>
        );
      })}
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const rssFeed = resolveValue(useRssParser);
  return {
    title: rssFeed.rss.channel.title,
  };
};
