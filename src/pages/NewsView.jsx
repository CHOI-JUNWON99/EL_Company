import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  increment,
} from "firebase/firestore";
import { db } from "../components/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const NewsContainer = styled.div`
  width: 100%;
  max-width: 1150px;
  margin: 20px auto;
  padding: 25px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
`;

const NewsInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 100%;
  font-size: 17px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1130px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 24px;
  color: #000;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #ffffff;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    background-color: #dddddd;
  }
`;

const NewsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [likes, setLikes] = useState(0);
  const [resolvedContent, setResolvedContent] = useState("");
  // const [fileLinks, setFileLinks] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const docRef = doc(db, "noticeBoard", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // // 첨부 파일 다운로드 URL 생성
          // const fileUrls = await resolveFileUrls(data.files || []);
          // setFileLinks(fileUrls);

          // Markdown 콘텐츠 내 이미지 URL 변환
          const transformedContent = await resolveImageUrls(data.content);

          setNews({ ...data, views: data.views + 1 });
          setResolvedContent(transformedContent);
          setLikes(data.likes);

          // Firestore 조회수 증가
          await updateDoc(docRef, { views: increment(1) });
        } else {
          alert("게시물을 찾을 수 없습니다.");
          navigate("/NewsList");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id, navigate]);

  // // `files` 폴더에서 파일 다운로드 URL 생성
  // const resolveFileUrls = async (files) => {
  //   const storage = getStorage();
  //   console.log("Uploaded files list:", files); // 디버깅용 파일 목록 출력

  //   if (!Array.isArray(files)) {
  //     console.warn("Invalid files format:", files); // 비정상적인 파일 포맷 경고
  //     return [];
  //   }

  //   const fileUrls = await Promise.all(
  //     files.map(async (fileName) => {
  //       try {
  //         console.log("Fetching file:", fileName); // 각 파일 이름 로그
  //         const storageRef = ref(storage, `files/${fileName}`);
  //         const downloadUrl = await getDownloadURL(storageRef);
  //         console.log("Resolved file URL:", downloadUrl); // 성공적으로 가져온 URL 로그
  //         return downloadUrl;
  //       } catch (error) {
  //         console.warn(
  //           `Error fetching file URL for ${fileName}:`,
  //           error.message
  //         );
  //         return null;
  //       }
  //     })
  //   );

  //   return fileUrls.filter((url) => url); // 유효한 URL만 반환
  // };

  const resolveImageUrls = async (content) => {
    const storage = getStorage();
    const imageRegex = /!\[.*?\]\((.*?)\)/g; // Markdown 이미지 패턴
    let match;
    let updatedContent = content;

    while ((match = imageRegex.exec(content)) !== null) {
      const blobUrl = match[1]; // Markdown 이미지 URL 추출
      try {
        let fileName = decodeURIComponent(
          blobUrl.split("/").pop().split("?")[0]
        );

        // 중복된 'images/' 경로를 제거
        if (fileName.startsWith("images/")) {
          fileName = fileName.replace("images/", "");
        }

        // Firebase Storage에서 정확한 경로 설정
        const storageRef = ref(storage, `images/${fileName}`);
        const downloadUrl = await getDownloadURL(storageRef);

        // Blob URL을 Firebase Storage URL로 대체
        updatedContent = updatedContent.replace(match[1], downloadUrl);
      } catch (error) {
        console.warn(`Error resolving URL for ${blobUrl}:`, error.message);
        // 이미지 변환 실패 시 태그 자체 제거
        updatedContent = updatedContent.replace(match[0], "");
      }
    }

    return updatedContent;
  };

  const handleLike = async () => {
    try {
      const docRef = doc(db, "noticeBoard", id);
      await updateDoc(docRef, { likes: increment(1) });
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDelete = async () => {
    const passwordPrompt = prompt("비밀번호를 입력하세요:");
    if (passwordPrompt === news.password) {
      try {
        const docRef = doc(db, "noticeBoard", id);
        await deleteDoc(docRef);
        alert("게시물이 삭제되었습니다.");
        navigate("/NewsList");
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("삭제 중 문제가 발생했습니다.");
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <NewsContainer>
      {news ? (
        <>
          <Title>{news.title}</Title>
          <NewsInfoBox>
            <p>작성자: {news.author}</p>
            <p>
              작성일:{" "}
              {new Date(news.created_at.seconds * 1000).toLocaleString()}
            </p>
            <p>조회수: {news.views}</p>
            <p>추천수: {likes}</p>
          </NewsInfoBox>
          {/* <NewsInfoBox>
            {fileLinks.length > 0 && (
              <div>
                <h4>첨부 파일</h4>
                <ul>
                  {fileLinks.map((fileUrl, index) => (
                    <li key={index}>
                      <a href={fileUrl} download>
                        {`파일 ${index + 1}`}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </NewsInfoBox> */}
          <Content>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => {
                  if (!props.src) return null; // 유효하지 않은 URL은 렌더링하지 않음
                  return (
                    <img
                      {...props}
                      alt="markdown image"
                      style={{
                        display: "block",
                        margin: "10px auto",
                        maxWidth: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  );
                },
                p: ({ children }) => {
                  if (Array.isArray(children)) {
                    const filteredChildren = children.filter(
                      (child) =>
                        typeof child !== "string" ||
                        !child.startsWith("![image](")
                    );
                    return <p>{filteredChildren}</p>;
                  }
                  return <p>{children}</p>;
                },
              }}
            >
              {resolvedContent}
            </ReactMarkdown>
          </Content>
          <ButtonContainer>
            <StyledButton as={Link} to="/NewsList">
              목록보기
            </StyledButton>
            <StyledButton onClick={handleLike}>추천</StyledButton>
            {/* <StyledButton>수정</StyledButton> */}
            <StyledButton onClick={handleDelete}>삭제</StyledButton>
          </ButtonContainer>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </NewsContainer>
  );
};

export default NewsView;
