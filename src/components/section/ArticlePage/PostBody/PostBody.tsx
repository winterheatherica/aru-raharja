export default function PostBody({ article, content }: any) {
  const html = content ?? article?.content ?? "";
  if (!html) return null;

  return (
    <div className="post-body mb-8">
      <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
