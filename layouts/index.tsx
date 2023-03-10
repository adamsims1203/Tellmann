import * as components from "components";
import { ArticleHeading, ArticleSidebar, Headings, NewsletterSignup } from "components";
import hydrate from "next-mdx-remote/hydrate";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { FC } from "react";

type LayoutProps = {
  frontMatter: {
    title: string;
    author?: string;
    authorAvatarUrl?: string;
    authorUrl?: string;
    excerpt?: string;
    headings?: Headings;
    image?: string;
    publishedAt?: string;
    readingTime?: {
      minutes: number;
      text: string;
      time: number;
      words: number;
    };
    showHeadings?: 0 | 1 | 2;
    showHeadingsExpanded?: boolean;
    showSubheading?: boolean;
    views?: string;
  };
  slug: string;
};

export const Layout: FC<LayoutProps> = ({
  children,
  slug,
  frontMatter: {
    title,
    author = "",
    authorAvatarUrl,
    publishedAt = Date.now().toString(),
    views,
    readingTime,
    excerpt,
    image,
    headings,
    showHeadings = 0,
    showHeadingsExpanded = false,
    showSubheading = true,
  },
}) => {
  const router = useRouter();
  let canonical = `https://tellmann.co.za/blog/${slug}`;
  if (!slug) {
    canonical = `https://tellmann.co.za${router.pathname}`;
  }

  /* const content = process.env.NODE_ENV === "production"
    ? hydrate(children, { components })
    : children;*/
  const content = hydrate(children, { components });

  return (
    <>
      <>
        <NextSeo
          canonical={canonical}
          description={excerpt}
          openGraph={{
            type: "article",
            article: {
              publishedTime: new Date(publishedAt).toISOString(),
            },
            url: canonical,
            title,
            description: excerpt,
            images: [
              {
                url: `https://tellmann.co.za${image}`,
                alt: title,
              },
            ],
          }}
          title={`${title} – Tellmann`}
        />
        <ArticleJsonLd
          authorName="Tellmann"
          dateModified={new Date(publishedAt).toISOString()}
          datePublished={new Date(publishedAt).toISOString()}
          description={excerpt}
          images={[`https://tellmann.co/za/${image}`]}
          publisherLogo="/favicons/android-icon-192x192.png"
          publisherName="Tellmann"
          title={title}
          url={canonical}
        />
      </>
      <section>
        {/*= =============== CONTENT ================ */}
        <ArticleHeading
          author={author}
          authorAvatarUrl={authorAvatarUrl}
          publishedAt={publishedAt}
          readingTime={readingTime}
          showSubheading={showSubheading}
          title={title}
          views={views}
        />
        <article className="mdx" id="mdx-content">
          {content}
        </article>

        {/*= =============== SIDEBAR ================ */}
        {showHeadings > 0 && headings
          ? <ArticleSidebar
              headings={headings}
              showHeadings={showHeadings}
              showHeadingsExpanded={showHeadingsExpanded}
            />
          : null}

        {/*= =============== NEWSLETTER SIGNUP ================ */}
        <NewsletterSignup />
      </section>
      <style jsx>{`
        section {
          position: relative;
          padding-top: var(--section-y-padding);
          padding-bottom: var(--section-y-padding);
          padding-right: var(--section-x-padding);
          padding-left: var(--section-x-padding);
          max-width: 76.4rem;
          min-height: calc(100vh - 309px);
          display: flex;
          flex-direction: column;
          margin: 0 auto;

          :global(img) {
            max-width: 100%;
            width: 100%;
            height: auto;
            max-height: 100%;
          }
        }
      `}</style>
      <style global jsx>{`
        code {
          padding: 0.1rem 0.6rem;
          border: 1px solid var(--color-remark-code-title-bg);
          border-radius: 0.4rem;
          background: var(--color-code-bg);
          white-space: pre-wrap;
          color: var(--color-code);
        }

        .language-css {
          color: var(--color-header);
        }

        .line {
          border-left: 3px solid transparent;
          border-collapse: collapse;
          max-width: 100%;
          display: flex;
          align-items: flex-start;

          .line {
            border: 0;
          }

          &:hover {
            background-color: rgba(111, 126, 150, 0.07);
          }

          &.line-highlight {
            background: rgba(111, 126, 150, 0.07);
            border-color: var(--color-mdx-link);

            &:hover {
              background-color: rgba(111, 126, 150, 0.1);
            }
          }
        }

        .line-content {
          white-space: pre-wrap;
          display: inline-block;
        }

        .line-number {
          opacity: 0.5;
          display: inline-flex;
          padding: 0 0.8rem;
          user-select: none;
          color: var(--color-header);
          font-size: 1.1rem;
          width: 30px;
          max-width: 30px;
          min-width: 30px;
          @media screen and (min-width: 600px) {
            padding: 0 1.2rem;
            font-size: inherit;
            width: 45px;
            min-width: 45px;
            max-width: 45px;
          }
        }

        .remark-code-title {
          margin-bottom: 0;
          padding: 0.8rem 1.6rem;
          border: 1px solid var(--color-remark-code-title-bg);
          background: var(--color-remark-code-title-bg);
          color: var(--color-header);
          font-family: SFMono-Regular, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 1.5rem;
          margin-left: calc(0px - var(--page-margin, 2.4rem));
          border-radius: 0;
          width: calc(100% + var(--page-margin, 2.4rem) * 2);
          @media screen and (min-width: 600px) {
            width: 100%;
            margin-left: 0;
            border-top-left-radius: 0.4rem;
            border-top-right-radius: 0.4rem;
          }

          + pre {
            margin-top: 0 !important;
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
          }
        }

        pre code {
          padding: 0;
          border: 0;
          background: transparent;
        }

        code[class*="language-"],
        pre[class*="language-"] {
          width: 100%;
          background: none;
          color: var(--color-header);
          font-family: "Fira Code", SFMono-Regular, Consolas, "Liberation Mono", "Courier New",
            monospace;
          word-spacing: normal;
          text-align: left;
          word-wrap: normal;
          word-break: normal;
          tab-size: 4;
          hyphens: none;
          overflow-wrap: normal;
          letter-spacing: -0.03em;
          font-size: 1.3rem;
          line-height: 2.4rem;
          @media screen and (min-width: 600px) {
            letter-spacing: unset;
            font-size: 1.4rem;
            line-height: 2.6rem;
          }
        }

        /* Code blocks */
        pre[class*="language-"] {
          min-width: 100%;
          overflow: auto;
          margin: 2.4rem 0;
          padding-top: 1.6rem;
          padding-bottom: 1.6rem;
          font-size: 1.5rem;
          white-space: nowrap;
          padding-right: 0.5rem;
        }

        :not(pre) > code[class*="language-"],
        pre[class*="language-"] {
          border: 1px solid var(--color-remark-code-title-bg);
          background: var(--color-remark-code-bg);
          border-radius: 0;
          margin-left: calc(0px - var(--page-margin, 2.4rem));
          width: calc(100% + var(--page-margin, 2.4rem) * 2);
          @media screen and (min-width: 600px) {
            width: 100%;
            margin-left: 0;
            border-radius: 0.8rem;
          }
        }

        /* Inline code */
        :not(pre) > code[class*="language-"] {
          padding: 0.1em;
          border-radius: 0.3em;
          white-space: normal;
        }

        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #708090;
        }

        .token.punctuation {
          color: #999;
        }

        .token.namespace {
          opacity: 0.7;
        }

        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #905;
        }

        .token.number {
          color: #0871de;
        }

        .token.tag {
          color: rgb(0, 118, 255);
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: rgb(2, 130, 101);
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
          color: #9a6e3a;
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword {
          color: #109bd6;
        }

        .token.keyword {
          color: rgb(255, 0, 120);
          font-weight: bold;
        }

        .token.function,
        .token.class-name {
          color: #dd4a68;
        }

        .token.function {
          color: rgb(0, 118, 255);
        }

        .token.regex,
        .token.important,
        .token.variable {
          color: #e90;
        }

        .token.variable {
          color: #df4513;
        }

        .token.important,
        .token.bold {
          font-weight: bold;
        }

        .token.italic {
          font-style: italic;
        }

        .token.entity {
          cursor: help;
        }

        .mdx-marker {
          min-width: fit-content;
          display: block;
          margin-right: -1.6rem;
          margin-left: -1.6rem;
          padding-right: 1.6rem;
          padding-left: 1.6rem;
          background-color: var(--color-button);
          box-shadow: inset 3px 0 0 0 #2a69ac;
        }

        .dark-theme {
          :not(pre) > code[class*="language-"] {
            background: #011627;
          }

          .token.attr-name {
            color: rgb(173, 219, 103);
            font-style: italic;
          }

          .token.comment {
            color: rgb(128, 147, 147);
          }

          .token.string,
          .token.url {
            color: rgb(173, 219, 103);
          }

          .token.variable {
            color: rgb(214, 222, 235);
          }

          .token.number {
            color: rgb(247, 140, 108);
          }

          .token.builtin,
          .token.char,
          .token.constant,
          .token.function {
            color: rgb(130, 170, 255);
          }

          .token.punctuation {
            color: rgb(199, 146, 234);
          }

          .token.selector,
          .token.doctype {
            color: rgb(199, 146, 234);
          }

          .token.class-name {
            color: rgb(255, 203, 139);
          }

          .token.tag,
          .token.operator,
          .token.keyword {
            color: #ffa7c4;
          }

          .token.boolean {
            color: rgb(255, 88, 116);
          }

          .token.property {
            color: rgb(128, 203, 196);
          }

          .token.namespace {
            color: rgb(178, 204, 214);
          }
        }
      `}</style>
    </>
  );
};

export default Layout;
