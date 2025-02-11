import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NewsImg from "/business/NewsImg.png";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../components/firebase";
import Loading from "../components/Loading";
import { FaPen } from "react-icons/fa";
import defaultImage from "/business/Logo.webp";

const NewsContainer = styled.div``;

const HeroSection = styled.section`
  width: 100%;
  height: 400px;
  background-image: url(${NewsImg});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  margin-bottom: 30px;
  user-select: none;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const SearchAndAdd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const SearchInput = styled.input`
  width: 1110px;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-right: 10px;
  margin-left: 10px;
`;

const AddNewsButton = styled.button`
  padding: 10px 10px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 60px;
  height: 40px;
  margin-right: 10px;

  &:hover {
    background-color: #333;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px auto;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NewsItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  cursor: pointer;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    white-space: nowrap; /* 한 줄 텍스트 유지 */
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 보여줄 텍스트 줄 수 */
    -webkit-box-orient: vertical;
  }
`;

const NewsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;

  button {
    margin: 0 5px;
    padding: 10px 20px;
    border: none;
    background-color: #ddd;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #bbb;
    }

    &.active {
      background-color: #bbb;
    }
  }
`;

function NewsList() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "noticeBoard"),
          orderBy("created_at", "desc")
        );
        const querySnapshot = await getDocs(q);
        const newsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNews(newsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        alert("뉴스를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredNews = news.filter((article) => {
    const normalizedSearchTerm = searchTerm
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
    const normalizedTitle = article.title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
    return normalizedTitle.includes(normalizedSearchTerm);
  });

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddNewsClick = () => navigate("/newsadd");

  const handleNewsClick = (id) => navigate(`/news/${id}`);

  if (loading) {
    return <Loading />;
  }

  const getPreviewText = (content) => {
    const imageRegex = /!\[image\]\((.*?)\)/g;
    let preview = content.replace(imageRegex, "");
    if (preview.length > 100) {
      preview = preview.slice(0, 100) + "...";
    }
    return preview;
  };

  return (
    <NewsContainer>
      <HeroSection></HeroSection>

      <SearchAndAdd>
        <SearchInput
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={handleSearch}
        />
        <AddNewsButton onClick={handleAddNewsClick}>
          {" "}
          <FaPen />
        </AddNewsButton>
      </SearchAndAdd>

      <NewsGrid>
        {currentNews.map((article) => (
          <NewsItem
            key={article.id}
            onClick={() => handleNewsClick(article.id)}
          >
            <img src={article.main_image || defaultImage} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{getPreviewText(article.content)}...</p>
            <NewsInfo>
              <p>추천수: {article.likes}</p>
              <p>작성자: {article.author}</p>
            </NewsInfo>
            <NewsInfo>
              <p>조회수: {article.views}</p>
              <p>
                작성일:{" "}
                {new Date(article.created_at.seconds * 1000).toLocaleString()}
              </p>
            </NewsInfo>
          </NewsItem>
        ))}
      </NewsGrid>

      <Pagination>
        {[...Array(Math.ceil(filteredNews.length / newsPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={currentPage === number + 1 ? "active" : ""}
            >
              {number + 1}
            </button>
          )
        )}
      </Pagination>
    </NewsContainer>
  );
}

export default NewsList;
