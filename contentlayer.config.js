import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { remarkCodeHike } from "@code-hike/mdx";
import remarkMdxImages from 'remark-mdx-images'
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const theme = require("shiki/themes/nord.json");

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
  contentType: "mdx",
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [[remarkCodeHike, { theme }], remarkMdxImages],
    esbuildOptions: options => {
      options.loader = {
        ...options.loader,
        '.png': 'dataurl'
      }
      return options;
    }
  },
});
