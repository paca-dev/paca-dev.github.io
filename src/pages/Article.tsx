import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';
import matter from 'gray-matter';
import blogPostData from '../data/blog.json';

const Article = () => {
  const [content, setContent] = useState('');
  const { slug } = useParams();
  const [frontmatter, setFrontmatter] = useState({});
  const [imageUrl, setImageUrl] = useState()
  const [title, setTitle] = useState()
  const blogPosts = blogPostData;

  useEffect(() => {
    // Scroll to top when component mounts or slug changes
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const metadata = blogPosts.filter(x=>x.slug === slug);
    setImageUrl(metadata[0].image);
    setTitle(metadata[0].title)

    fetch(`/blog/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error(`Article not found ${slug}.md`);
        return res.text();
      })
      .then((text) => {
        const { data, content } = matter(text);
        setFrontmatter(data);
        setContent(content);
      })
      .catch((error) => setContent(`Article not found.`));
  }, [slug]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 prose prose-lg prose-indigo">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title || 'Article image'}
          className="mb-10 rounded-lg shadow-lg max-w-full h-auto"
        />
      )}

      <ReactMarkdown remarkPlugins={[remarkGfm]} >{content}</ReactMarkdown>
    </div>
  );

};

export default Article;
