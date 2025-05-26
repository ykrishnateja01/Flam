
import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarksContext = createContext(undefined);

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('hrDashboardBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hrDashboardBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (id) => {
    setBookmarks(prev => [...prev, id]);
  };

  const removeBookmark = (id) => {
    setBookmarks(prev => prev.filter(bookmarkId => bookmarkId !== id));
  };

  const isBookmarked = (id) => {
    return bookmarks.includes(id);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};
