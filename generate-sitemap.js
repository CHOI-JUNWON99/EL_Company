import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

const websiteURL = "https://www.elgiup.co.kr";

async function generateSitemap() {
  const links = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/business", changefreq: "weekly", priority: 0.8 },
    { url: "/hoisting", changefreq: "weekly", priority: 0.8 },
    { url: "/construction", changefreq: "monthly", priority: 0.6 },
    { url: "/request", changefreq: "monthly", priority: 0.6 },
    { url: "/newslist", changefreq: "monthly", priority: 0.6 },
  ];

  const stream = new SitemapStream({ hostname: websiteURL });
  const writeStream = createWriteStream("dist/sitemap.xml");

  await pipelineAsync(stream, writeStream);

  links.forEach((link) => stream.write(link));
  stream.end();

  console.log("✅ Sitemap 생성 완료!");
}

generateSitemap().catch(console.error);
