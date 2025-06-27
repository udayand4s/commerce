import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return `/`;
            }
            return `/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              {
                type: "string",
                name: "title",
                label: "SEO Title",
              },
              {
                type: "string",
                name: "description",
                label: "SEO Description",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Hero Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Hero Subtitle",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "image",
                label: "Hero Image",
              },
              {
                type: "string",
                name: "ctaText",
                label: "CTA Button Text",
              },
              {
                type: "string",
                name: "ctaLink",
                label: "CTA Button Link",
              },
            ],
          },
          {
            type: "object",
            name: "sections",
            label: "Content Sections",
            list: true,
            templates: [
              {
                name: "textSection",
                label: "Text Section",
                fields: [
                  {
                    type: "string",
                    name: "heading",
                    label: "Heading",
                  },
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Content",
                    isBody: true,
                  },
                ],
              },
              {
                name: "imageSection",
                label: "Image Section",
                fields: [
                  {
                    type: "string",
                    name: "heading",
                    label: "Heading",
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Image",
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                  },
                  {
                    type: "rich-text",
                    name: "caption",
                    label: "Caption",
                  },
                ],
              },
              {
                name: "featuresSection",
                label: "Features Section",
                fields: [
                  {
                    type: "string",
                    name: "heading",
                    label: "Section Heading",
                  },
                  {
                    type: "object",
                    name: "features",
                    label: "Features",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "title",
                        label: "Feature Title",
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Feature Description",
                        ui: {
                          component: "textarea",
                        },
                      },
                      {
                        type: "image",
                        name: "icon",
                        label: "Feature Icon",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "mdx",
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "settings",
        label: "Global Settings",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Site Name",
            required: true,
          },
          {
            type: "string",
            name: "siteDescription",
            label: "Site Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "navigation",
            label: "Navigation",
            fields: [
              {
                type: "object",
                name: "main",
                label: "Main Navigation",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              {
                type: "string",
                name: "copyright",
                label: "Copyright Text",
              },
              {
                type: "object",
                name: "links",
                label: "Footer Links",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});