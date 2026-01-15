import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/pages/BlogPostClient";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/content";
import { generateSEO, generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return generateSEO({
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    canonical: `/blog/${post.slug}`,
    ogImage: post.coverImage || "/NexGenAds_meta.jpg",
    ogType: "article",
    author: post.author,
    publishedTime: post.publishDate,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Generate structured data
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    author: post.author,
    publishDate: post.publishDate,
    image: post.coverImage,
    url: `https://nexgenads.space/blog/${post.slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
