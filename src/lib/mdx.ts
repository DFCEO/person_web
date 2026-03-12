import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();

export async function getProjects() {
  // 定位到根目录下的 content 文件夹
  const projectsPath = path.join(root, 'content');
  
  // 如果文件夹不存在，创建一个空的，防止系统崩溃
  if (!fs.existsSync(projectsPath)) {
    fs.mkdirSync(projectsPath);
    return [];
  }

  const files = fs.readdirSync(projectsPath);

  // 读取所有 .mdx 文件并解析内容
  const allProjects = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const source = fs.readFileSync(path.join(projectsPath, file), 'utf8');
      const { data, content } = matter(source);

      return {
        metadata: data,
        content,
        slug: file.replace('.mdx', ''),
      };
    });

  return allProjects;
}