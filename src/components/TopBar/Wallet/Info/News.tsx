import { ArticleCard } from "@olympusdao/component-library";
import { FC, Key } from "react";

import { MediumArticles } from "../queries";

export interface OHMNewsProps {
  path?: string;
}

/**
 * Component for Displaying News
 */
const News: FC<OHMNewsProps> = () => {
  const { data, isFetched } = MediumArticles();

  /**
   * Convert a template string into HTML DOM nodes
   * @param  {String} str The template string
   * @return {Node.textContent} The template HTML
   */
  const parseFeedContent = (str: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");

    return doc.body.textContent || "";
  };
  const truncate = (str: string) => {
    return str.length > 400 ? str.substring(0, 397) + "..." : str;
  };
  return (
    <>
      {isFetched &&
        data.items.map(
          (
            article: {
              title: string;
              thumbnail: string;
              content: string;
              link: string | undefined;
              pubDate: string | number | Date;
            },
            index: Key | null | undefined,
          ) => {
            return (
              <ArticleCard
                title={article.title}
                imageSrc={article.thumbnail}
                content={truncate(parseFeedContent(article.content))}
                href={article.link}
                publishDate={new Date(article.pubDate).toString()}
                key={index}
              />
            );
          },
        )}
    </>
  );
};

export default News;