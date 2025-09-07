import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
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
    
    <div className="prose max-w-none p-5">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title || 'Article image'}
          className="mb-8 rounded-lg shadow-md max-w-full h-auto"
        />
      )}

        <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Article;
