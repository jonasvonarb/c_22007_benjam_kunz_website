import { marked } from "marked";

import React from "react";

const getTagBySlug = (slug, list) => {
  const _tag = Object.values(list).find(
    (item) => item["schema:identifier"] === slug
  );
  return _tag;
};

const getSlugByTag = (tag, list) => {
  let slug = list[tag]["schema:identifier"] || tag;
  return slug;
};

const truncate = (str, length) => {
  if (!str) return;
  if (str.length > length) {
    return str.slice(0, length) + "...";
  } else return str;
};

const arrayToTree = (list, parent = 0) => {
  return list
    .filter((item) => {
      return item.parent === parent && item["arcotex:tag_category"] == "Tag";
    })
    .map((child) => {
      return { ...child, children: arrayToTree(list, child["@id"]) };
    });
};

const markdownToHtml = (source) => {
  if (!source) return;

  var renderer = new marked.Renderer();

  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  renderer.link = function (href, title, text) {
    let host = window.location.host.replace("www.", "");
    var pathArray = href.split("/");
    let targetHost = pathArray?.[2]?.replace("www.", "");

    let target = targetHost !== host ? "_blank" : "_self";
    return `<a target="${target}" rel="noreferrer"
 href="${href}" title="${title || text}" class="link">${text}</a>`;
  };

  return marked(source, { renderer: renderer });
};

const markdownToJSX = (source, { className }) => {
  if (!source) return;
  var renderer = new marked.Renderer();

  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  renderer.link = function (href, title, text) {
    let host = window.location.host.replace("www.", "");
    var pathArray = href.split("/");
    let targetHost = pathArray[2].replace("www.", "");

    let target = targetHost !== host ? "_blank" : "_self";
    return `<a target="${target}" rel="noreferrer"
 href="${href}" title="${
      title || text
    }" class="link">${text}<span>&#8594;</span></a>`;
  };
  const markdown = marked(source, { renderer: renderer });

  return (
    <div
      className={className || "none"}
      dangerouslySetInnerHTML={{ __html: markdown }}
    ></div>
  );
};

export {
  getTagBySlug,
  getSlugByTag,
  truncate,
  arrayToTree,
  markdownToHtml,
  markdownToJSX,
};
