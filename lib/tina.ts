import { client } from "../tina/__generated__/client";

export const tinaClient = client;

export async function getPageData(filename: string) {
  try {
    const result = await tinaClient.queries.page({
      relativePath: `${filename}.mdx`,
    });
    return result;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export async function getAllPages() {
  try {
    const result = await tinaClient.queries.pageConnection();
    return result.data.pageConnection.edges?.map((edge) => edge?.node) || [];
  } catch (error) {
    console.error("Error fetching all pages:", error);
    return [];
  }
}

export async function getGlobalSettings() {
  try {
    const result = await tinaClient.queries.settings({
      relativePath: "global.json",
    });
    return result.data.settings;
  } catch (error) {
    console.error("Error fetching global settings:", error);
    return null;
  }
}

export async function getBlogPosts() {
  try {
    const result = await tinaClient.queries.postConnection();
    return result.data.postConnection.edges?.map((edge) => edge?.node) || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(filename: string) {
  try {
    const result = await tinaClient.queries.post({
      relativePath: `${filename}.mdx`,
    });
    return result;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}