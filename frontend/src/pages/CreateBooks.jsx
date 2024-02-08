import React from 'react'
import { useEffect, useState } from "react";

const CreateBooks = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    yearPublished: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addBook = () => {
    setLoading(true);
    axios
      .post("http://localhost:7000/books/create", formData)
      .then((res) => {
        setBooks([...books, res.data]); // Assuming the response contains the newly added book
        setLoading(false);
        setFormData({
          title: "",
          author: "",
          yearPublished: "",
        });
      })
      .catch((error) => {
        console.error("Error adding book:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="yearPublished">Year Published:</label>
        <input
          type="text"
          id="yearPublished"
          name="yearPublished"
          value={formData.yearPublished}
          onChange={handleChange}
        />
      </div>
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}

export default CreateBooks