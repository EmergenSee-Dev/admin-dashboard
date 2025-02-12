'use client'

import React, { useState, useRef, useEffect } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import DashboardLayout from '@/components/DashboardLayout';

const New = () => {
  const [text, setText] = useState('# Hello Editor');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<any>(null);
  const router = useRouter();
  const uploadRef = useRef<null | any>(null);
  const page = useSearchParams().get("id");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load saved draft or existing blog post
    const loadDraftOrBlog = async () => {
      const savedData = localStorage.getItem('blogDraft');
      if (savedData) {
        const { title, category, text, body, image } = JSON.parse(savedData);
        setTitle(title || '');
        setText(text || '');
        setBody(body || '');
        setImage(image || '');
      }
      setIsLoaded(true);
      if (page) {
        await getBlog();
      }
    };

    loadDraftOrBlog();
  }, [page]);

  useEffect(() => {
    if (isLoaded) {
      const blogDraft = { title, text, body, image };
      localStorage.setItem('blogDraft', JSON.stringify(blogDraft));
    }
  }, [title, text, body, image, isLoaded]);

  const getBlog = async () => {
    try {
      const res = await axios.get(`https://backend-api-auvp.onrender.com/api/blogs/${page}`);
      if (res.data && res.data.data) {
        const data = res.data.data;
        setTitle(data.title);
        setText(data.content);
        setBody(data.description);
        setImage(data.image);
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result?.toString() || '');
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const validateForm = async () => {
    if (!title.trim()) {
      alert("Title cannot be empty.");
      return;
    }
    // if (!category.trim()) {
    //   alert("Category cannot be empty.");
    //   return;
    // }
    if (!text.trim()) {
      alert("Text cannot be empty.");
      return;
    }
    if (body.length < 1 || body.length > 100) {
      alert("Body must be between 1 and 100 characters.");
      return;
    }
    if (page) {
      await updateBlog();
    } else if (file) {
      await createBlog();
    } else {
      alert("Please upload an image.");
    }
  };

  const createBlog = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", body);
      formData.append("content", text);
      // Append the file object with its name. This assumes `file` is a File object.
      formData.append("image", file);

      await axios.post('https://backend-api-auvp.onrender.com/api/blogs/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false);
      clearLocalStorage();
      router.push('/blog');
    } catch (error) {
      console.error('Error creating blog:', error);
      setLoading(false);
    }
  };


  const updateBlog = async () => {
    setLoading(true);
    try {
      const updatedBlog = {
        title,
        description: body,
        content: text,
      };
      await axios.put(`https://backend-api-auvp.onrender.com/api/blogs/edit/${page}`, updatedBlog);
      setLoading(false);
      clearLocalStorage();
      router.push('/blog');
    } catch (error) {
      console.error('Error updating blog:', error);
      setLoading(false);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('blogDraft');
  };

  return (
    <DashboardLayout>
      <main className='mx-4'>
        <div className='flex my-6 justify-between'>
          <h1 className='text-4xl'>{page ? 'Edit Blog' : 'New Blog'}</h1>
          <button onClick={validateForm} className='bg-[#FFCC00] text-white p-3 w-32 my-auto'>
            {loading ? 'Loading...' : page ? 'Update' : 'Save'}
          </button>
        </div>
        <button onClick={() => uploadRef.current.click()} className='my-3 flex w-32 justify-evenly bg-white border rounded-full p-3'>
          <div className='my-auto'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
            </svg>
          </div>
          <p className='my-auto'>Photo</p>
        </button>
        <input
          type="file"
          className='hidden'
          onChange={(e) => handleFileChange(e)}
          ref={uploadRef}
        />
        {image && <img src={image} alt="Selected" className='w-full h-80 object-cover' />}
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder='Title'
          className='w-full p-3 my-3 text-4xl'
        />

        <div className='my-3'>
          <MdEditor
            modelValue={text}
            onChange={setText}
            language='en-US'
            toolbars={[
              'bold', 'underline', 'italic', 'strikeThrough',
              'title', 'sub', 'sup', 'quote', 'unorderedList',
              'orderedList', 'link', 'code', 'image'
            ]}
          />
        </div>
        <div className='my-3'>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder='Write a brief description'
            className='h-20 p-3 w-full border rounded-md'
          />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default New;
