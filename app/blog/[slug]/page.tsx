import { getBlogPost, getBlogPosts } from "lib/tina";
import { notFound } from "next/navigation";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import { TinaRichText } from "components/tina/TinaComponents";
import Image from "next/image";
import type { Metadata } from "next";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post._sys.filename,
  }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const resolvedParams = await params;
  const postData = await getBlogPost(resolvedParams.slug);

  if (!postData) {
    return {
      title: 'Post Not Found',
    };
  }

  const { title, description } = postData.data.post;

  return {
    title,
    description,
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const resolvedParams = await params;
  const postData = await getBlogPost(resolvedParams.slug);

  if (!postData) {
    notFound();
  }

  return <ClientBlogPost data={postData} />;
}

function ClientBlogPost({ data }: { data: any }) {
  const { data: tinaData } = useTina({
    query: data.query,
    variables: data.variables,
    data: data.data,
  });

  const { post } = tinaData;

  return (
    <article className="container mx-auto px-4 py-12" data-tina-field={tinaField(post)}>
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            data-tina-field={tinaField(post, "featuredImage")}
          />
        </div>
      )}

      {/* Post Header */}
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          data-tina-field={tinaField(post, "title")}
        >
          {post.title}
        </h1>
        
        {post.description && (
          <p 
            className="text-xl text-gray-600 mb-6"
            data-tina-field={tinaField(post, "description")}
          >
            {post.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-gray-500 mb-6">
          {post.author && (
            <span data-tina-field={tinaField(post, "author")}>
              By {post.author}
            </span>
          )}
          {post.date && (
            <time 
              dateTime={post.date}
              data-tina-field={tinaField(post, "date")}
            >
              {new Date(post.date).toLocaleDateString()}
            </time>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2" data-tina-field={tinaField(post, "tags")}>
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post Content */}
      {post.body && (
        <div 
          className="prose prose-lg max-w-none"
          data-tina-field={tinaField(post, "body")}
        >
          <TinaRichText content={post.body} />
        </div>
      )}
    </article>
  );
}