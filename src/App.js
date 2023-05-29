import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShortUrlForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/short-url/generate', originalUrl);
      setShortUrl(response.data);
    } catch (error) {
      console.error('Error generating short URL:', error);
    }
  };

  const handleRetrieve = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/short-url/original/${shortUrl}`);
      console.log('Original URL:', response.data);
    } catch (error) {
      console.error('Error retrieving original URL:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Short URL Generator</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter the original URL"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleGenerate}>Generate Short URL</button>
          <br />
          <div className="form-group mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter the short URL"
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleRetrieve}>Retrieve Original URL</button>
        </div>
      </div>
    </div>
  );
};

export default ShortUrlForm;
