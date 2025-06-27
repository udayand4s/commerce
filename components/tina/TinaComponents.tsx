"use client";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import Link from "next/link";

const components = {
  img: (props: any) => (
    <Image
      src={props.src}
      alt={props.alt || ""}
      width={800}
      height={600}
      className="rounded-lg shadow-md"
    />
  ),
  a: (props: any) => (
    <Link href={props.href} className="text-blue-600 hover:underline">
      {props.children}
    </Link>
  ),
};

export function TinaRichText({ content }: { content: any }) {
  return <TinaMarkdown content={content} components={components} />;
}

export function TextSection({ data }: { data: any }) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {data.heading && (
          <h2 className="text-3xl font-bold mb-6 text-center">{data.heading}</h2>
        )}
        {data.content && (
          <div className="prose prose-lg mx-auto">
            <TinaRichText content={data.content} />
          </div>
        )}
      </div>
    </section>
  );
}

export function ImageSection({ data }: { data: any }) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {data.heading && (
          <h2 className="text-3xl font-bold mb-6 text-center">{data.heading}</h2>
        )}
        {data.image && (
          <div className="max-w-4xl mx-auto">
            <Image
              src={data.image}
              alt={data.alt || ""}
              width={1200}
              height={800}
              className="rounded-lg shadow-lg w-full"
            />
            {data.caption && (
              <div className="mt-4 text-center text-gray-600">
                <TinaRichText content={data.caption} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function FeaturesSection({ data }: { data: any }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {data.heading && (
          <h2 className="text-4xl font-bold mb-12 text-center">{data.heading}</h2>
        )}
        {data.features && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.features.map((feature: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                {feature.icon && (
                  <div className="mb-4">
                    <Image
                      src={feature.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  </div>
                )}
                {feature.title && (
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                )}
                {feature.description && (
                  <p className="text-gray-600">{feature.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function HeroSection({ data }: { data: any }) {
  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        {data.title && (
          <h1 className="text-5xl font-bold mb-6">{data.title}</h1>
        )}
        {data.subtitle && (
          <p className="text-xl mb-8 max-w-2xl mx-auto">{data.subtitle}</p>
        )}
        {data.ctaText && data.ctaLink && (
          <Link
            href={data.ctaLink}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {data.ctaText}
          </Link>
        )}
      </div>
      {data.image && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={data.image}
            alt=""
            fill
            className="object-cover opacity-20"
          />
        </div>
      )}
    </section>
  );
}