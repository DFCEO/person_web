import React from 'react';
import Link from 'next/link';
import { getProjects } from '@/lib/mdx';
import Hero3D from '@/components/Hero3D'; // 导入刚才创建的组件

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-mono relative overflow-hidden selection:bg-cyan-200">
      
      {/* 背景网格 */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }}
      ></div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* 顶部状态栏 */}
        <header className="flex flex-col md:flex-row justify-between border-b border-[#ddd] pb-4 mb-16 text-[10px] tracking-widest text-[#999]">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              CORE_SYSTEM: ONLINE
            </span>
            <span>DATA_SOURCE: LOCAL_MDX</span>
          </div>
          <div className="mt-2 md:mt-0 font-bold text-[#666]">
            PROJECT_COUNT: {projects.length}
          </div>
        </header>

        {/* Hero Section - 修改为 Flex/Grid 布局以容纳 3D */}
        <section className="mb-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-block px-2 py-1 bg-[#1a1a1a] text-white text-[10px] mb-4 shadow-sm">
              DYNAMIC_DATABASE // V2.0
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#1a1a1a] mb-6 uppercase">
              Liam Chen<span className="text-cyan-500">.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#555] max-w-2xl leading-relaxed border-l-4 border-cyan-500 pl-6">
              数据驱动的项目归档系统。通过编辑 <code className="bg-gray-200 px-1">/content</code> 文件夹实时更新。
            </p>
          </div>
          
          {/* 3D 渲染区域 */}
          <div className="flex-1 w-full h-[300px] md:h-auto">
             <Hero3D />
          </div>
        </section>

        {/* 动态项目网格 - 保持不变 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Link 
                href={`/projects/${project.slug}`} 
                key={project.slug} 
                className="group block"
              >
                <div className="bg-white border border-[#eee] p-8 shadow-[5px_5px_0px_0px_rgba(224,224,224,1)] hover:shadow-[5px_5px_0px_0px_rgba(6,182,212,1)] transition-all cursor-pointer h-full flex flex-col">
                  <div className="flex justify-between items-start mb-12 text-[#ccc] group-hover:text-cyan-500 transition-colors">
                    <div className="text-[10px] font-bold uppercase">
                      { (project.metadata.category as string) || 'GENERAL_SPEC' }
                    </div>
                    <div className="text-[10px]">{ (project.metadata.date as string) }</div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 group-hover:translate-x-1 transition-transform">
                      { (project.metadata.title as string) }
                    </h3>
                    <p className="text-[#666] text-sm leading-relaxed mb-6">
                      { (project.metadata.description as string) || '暂无项目描述。' }
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    { Array.isArray(project.metadata.tags) && project.metadata.tags.map((tag: string) => (
                      <span key={tag} className="text-[9px] bg-[#f0f0f0] text-[#666] px-2 py-0.5 rounded uppercase font-bold group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-cyan-500 text-xs">VIEW_DETAIL →</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 text-gray-400 font-mono">
              等待数据注入... 请在 /content 目录下创建 .mdx 文件
            </div>
          )}
        </section>

        <footer className="mt-24 pt-8 border-t-2 border-dashed border-[#eee] text-[#999] text-[10px] flex justify-between items-center">
          <span>SOURCE: {process.env.NODE_ENV === 'development' ? 'LOCAL_HOST' : 'PRODUCTION'}</span>
          <span className="italic">DESIGNED BY LIAM CHEN © 2026</span>
        </footer>

      </main>
    </div>
  );
}