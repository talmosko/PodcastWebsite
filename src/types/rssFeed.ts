import { z } from "zod";

const Guid = z.union([
  z.object({
    "@_isPermaLink": z.string(),
    "#text": z.string(),
  }),
  z.string(),
]);

const Enclosure = z.union([
  z.object({
    "@_url": z.string(),
    "@_length": z.string(),
    "@_type": z.string(),
  }),
  z.string(),
]);

const ItunesImage = z.union([
  z.object({
    "@_href": z.string(),
  }),
  z.string(),
]);

const ItunesCategory = z.union([
  z.object({
    "@_text": z.string(),
  }),
  z.string(),
]);

const ItunesOwner = z.object({
  "itunes:name": z.string(),
  "itunes:email": z.string(),
});

const AtomLink = z.union([
  z.object({
    "@_href": z.string(),
    "@_rel": z.string(),
    "@_type": z.optional(z.string()),
  }),
  z.string(),
]);

const Image = z.object({
  url: z.string(),
  title: z.string(),
  link: z.string(),
});

const Item = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  guid: Guid,
  "dc:creator": z.string(),
  pubDate: z.string(),
  enclosure: Enclosure,
  "itunes:summary": z.string(),
  "itunes:explicit": z.string(),
  "itunes:duration": z.string(),
  "itunes:image": ItunesImage,
  "itunes:episodeType": z.string(),
  "itunes:season": z
    .union([z.string(), z.number().transform((n) => n.toString())])
    .optional(),
  "itunes:episode": z
    .union([z.string(), z.number().transform((n) => n.toString())])
    .optional(),
});

const Channel = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  image: Image,
  generator: z.string(),
  lastBuildDate: z.string(),
  "atom:link": z.array(AtomLink),
  author: z.string(),
  copyright: z.string(),
  language: z.string(),
  "itunes:author": z.string(),
  "itunes:summary": z.string(),
  "itunes:type": z.string(),
  "itunes:owner": ItunesOwner,
  "itunes:explicit": z.string(),
  "itunes:category": ItunesCategory,
  "itunes:image": ItunesImage,
  item: z.array(Item),
});

const PodcastRSSFeed = z.object({
  rss: z.object({
    channel: Channel,
  }),
});

export { PodcastRSSFeed };
