import React, { useState, useEffect } from "react";
import newsData from "../../../../../tests/DummyJSON/newsdata_sample_news.json";

const MarketNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated] = useState(new Date().toLocaleTimeString("id-ID"));
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Format tanggal
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  // Format waktu
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('id-ID', options);
  };

  // Filter berita berdasarkan sumber
  const filterBySource = (source) => {
    if (source === "all") {
      setFilteredNews(news);
    } else {
      const filtered = news.filter(item => 
        item.source_name.toLowerCase().includes(source.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  // Handle search
  useEffect(() => {
    if (searchQuery) {
      const results = news.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredNews(results);
    } else {
      setFilteredNews(news);
    }
  }, [searchQuery, news]);

  // Load data
  useEffect(() => {
    try {
      // Simulate API loading delay
      setTimeout(() => {
        setNews(newsData);
        setFilteredNews(newsData);
        setLoading(false);
      }, 800);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Berita Pasar Indonesia
            </h1>
            <p className="text-gray-600">
              Update terkini pergerakan pasar saham dan ekonomi Indonesia
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari berita..."
                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => filterBySource("all")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Semua Berita
          </button>
          <button 
            onClick={() => filterBySource("cnbc")}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            CNBC
          </button>
          <button 
            onClick={() => filterBySource("kontan")}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Kontan
          </button>
          <button 
            onClick={() => filterBySource("investor")}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Investor Daily
          </button>
          <button 
            onClick={() => filterBySource("bisnis")}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Bisnis.com
          </button>
        </div>

        {/* Last Updated */}
        <div className="text-sm text-gray-500 mb-6">
          Terakhir diperbarui: {lastUpdated} | Menampilkan {filteredNews.length} berita
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Memuat berita pasar...</p>
          </div>
        )}

        {/* News Grid */}
        {!loading && filteredNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <div
                key={item.article_id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentNode.innerHTML = `
                          <div class="bg-gray-200 border-2 border-dashed w-full h-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed w-full h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded">
                      {item.source_name}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">
                      {formatDate(item.pubDate)}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {formatTime(item.pubDate)}
                    </span>
                  </div>
                  
                  <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem]">
                    {item.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4rem]">
                    {item.description || (item.content ? item.content.substring(0, 200) + "..." : "Tidak ada deskripsi")}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm"
                    >
                      Baca selengkapnya
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      #{item.category || 'Pasar'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNews.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Berita</h3>
            <p className="text-gray-600 mb-6">
              Tidak ditemukan berita yang sesuai dengan filter atau pencarian Anda.
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                filterBySource("all");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tampilkan Semua Berita
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketNews;