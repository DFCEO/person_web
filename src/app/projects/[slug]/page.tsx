import { getProjects } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const projects = await getProjects();
  
  // 寻找匹配的项目数据
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound(); // 如果没找到，显示 404
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-mono relative">
      {/* 背景网格保持一致 */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* 返回按钮 */}
        <Link href="/" className="text-cyan-600 hover:text-cyan-500 mb-12 inline-block text-sm">
          ← BACK_TO_INDEX
        </Link>

        {/* 文章头部 - 工业标注风格 */}
        <header className="border-b-4 border-[#1a1a1a] pb-8 mb-12">
          <div className="text-xs text-cyan-500 font-bold mb-2 uppercase tracking-tighter">
            FILE_REF: {project.slug} // {project.metadata.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            {project.metadata.title}
          </h1>
        </header>

        {/* MDX 正文内容渲染 */}
        <article className="prose prose-slate max-w-none 
          prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-black
          prose-code:bg-gray-200 prose-code:px-1 prose-code:rounded
          prose-pre:bg-[#1a1a1a] prose-pre:text-white">
          <MDXRemote source={project.content} />
        </article>

        <footer className="mt-20 pt-8 border-t border-dashed border-gray-300 text-[10px] text-gray-400">
          END_OF_DOCUMENT // SYSTEM_TIME: 2026
        </footer>
      </main>
    </div>
  );
}