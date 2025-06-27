import { getPageData } from "lib/tina";
import { notFound } from "next/navigation";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import { TinaRichText, TextSection, ImageSection, FeaturesSection, HeroSection } from "components/tina/TinaComponents";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const filename = resolvedParams.slug?.join('/') || 'home';
  const pageData = await getPageData(filename);

  if (!pageData) {
    return {
      title: 'Page Not Found',
    };
  }

  const { title, description, seo } = pageData.data.page;

  return {
    title: seo?.title || title,
    description: seo?.description || description,
  };
}

export default async function CMSPage({ params }: PageProps) {
  const resolvedParams = await params;
  const filename = resolvedParams.slug?.join('/') || 'home';
  const pageData = await getPageData(filename);

  if (!pageData) {
    notFound();
  }

  return <ClientPage data={pageData} filename={filename} />;
}

function ClientPage({ data, filename }: { data: any; filename: string }) {
  const { data: tinaData } = useTina({
    query: data.query,
    variables: data.variables,
    data: data.data,
  });

  const { page } = tinaData;

  return (
    <div data-tina-field={tinaField(page)}>
      {/* Hero Section */}
      {page.hero && (
        <div data-tina-field={tinaField(page, "hero")}>
          <HeroSection data={page.hero} />
        </div>
      )}

      {/* Page Title */}
      {page.title && !page.hero && (
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 
              className="text-4xl font-bold text-center"
              data-tina-field={tinaField(page, "title")}
            >
              {page.title}
            </h1>
            {page.description && (
              <p 
                className="text-xl text-gray-600 text-center mt-4 max-w-2xl mx-auto"
                data-tina-field={tinaField(page, "description")}
              >
                {page.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Sections */}
      {page.sections && (
        <div data-tina-field={tinaField(page, "sections")}>
          {page.sections.map((section: any, index: number) => {
            const sectionField = tinaField(page.sections, index);
            
            switch (section._template) {
              case "textSection":
                return (
                  <div key={index} data-tina-field={sectionField}>
                    <TextSection data={section} />
                  </div>
                );
              case "imageSection":
                return (
                  <div key={index} data-tina-field={sectionField}>
                    <ImageSection data={section} />
                  </div>
                );
              case "featuresSection":
                return (
                  <div key={index} data-tina-field={sectionField}>
                    <FeaturesSection data={section} />
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      )}

      {/* Main Body Content */}
      {page.body && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div 
              className="prose prose-lg mx-auto"
              data-tina-field={tinaField(page, "body")}
            >
              <TinaRichText content={page.body} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}