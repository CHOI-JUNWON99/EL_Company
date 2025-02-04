import React, { useState, useRef } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../components/firebase";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FileInput = styled.input`
  margin: 10px 0 10px 2px;
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid #ddd;

    button {
      background: #ff6666;
      border: none;
      border-radius: 5px;
      color: white;
      padding: 5px 10px;
      cursor: pointer;

      &:hover {
        background: #ff4d4d;
      }
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
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

const ContentPreview = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NewsAdd = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const handlePaste = async (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          // 이미지 URL 미리보기용
          const imageUrl = URL.createObjectURL(file);
          setImages((prevImages) => [...prevImages, file]); // Blob 데이터를 저장
          const cursorPosition = textareaRef.current.selectionStart;
          const textBeforeCursor = content.substring(0, cursorPosition);
          const textAfterCursor = content.substring(cursorPosition);
          setContent(
            `${textBeforeCursor}\n![image](${imageUrl})\n${textAfterCursor}`
          );
        }
      }
    }
  };

  // const handleFileChange = (e) => {
  //   const selectedFiles = Array.from(e.target.files);

  //   // Check total file size
  //   const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
  //   if (
  //     totalSize + files.reduce((acc, file) => acc + file.size, 0) >
  //     30 * 1024 * 1024
  //   ) {
  //     alert("총 파일 크기가 30MB를 초과할 수 없습니다.");
  //     return;
  //   }

  //   // Add new files, ensuring no duplicates
  //   const newFiles = selectedFiles.filter(
  //     (newFile) => !files.some((file) => file.name === newFile.name)
  //   );

  //   if (files.length + newFiles.length > 5) {
  //     alert("최대 5개의 파일만 업로드할 수 있습니다.");
  //     return;
  //   }

  //   setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  // };

  // const removeFile = (fileName) => {
  //   setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  // };

  const handleAddNews = async () => {
    if (!title || !author || !password || !content) {
      alert("모든 필드를 작성해 주세요.");
      return;
    }

    try {
      const imageUrls = await Promise.all(
        images.map(async (image, index) => {
          const storageRef = ref(storage, `images/${Date.now()}_${image.name}`);
          await uploadBytes(storageRef, image); // Blob 데이터를 업로드
          return getDownloadURL(storageRef); // 업로드된 파일의 URL 가져오기
        })
      );

      // const fileUrls = await Promise.all(
      //   files.map(async (file) => {
      //     const storageRef = ref(storage, `files/${Date.now()}_${file.name}`);
      //     await uploadBytes(storageRef, file);
      //     return getDownloadURL(storageRef);
      //   })
      // );

      // const allUrls = [...imageUrls, ...fileUrls];
      const mainImage = imageUrls.length > 0 ? imageUrls[0] : "";
      await addDoc(collection(db, "noticeBoard"), {
        title,
        author,
        password,
        content: content.replace(/blob:.*?\)/g, `![image](${mainImage})`),
        main_image: mainImage,
        images: imageUrls,
        created_at: Timestamp.fromDate(new Date()),
        likes: 0,
        views: 0,
        preview: content.slice(0, 100),
        updated_at: Timestamp.fromDate(new Date()),
      });

      alert("뉴스가 성공적으로 추가되었습니다.");
      navigate("/NewsList");
    } catch (error) {
      console.error("Error adding news:", error);
      alert("뉴스 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // const uploadImage = async (file) => {
  //   const storage = getStorage();
  //   const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
  //   try {
  //     await uploadBytes(storageRef, file); // 업로드
  //     const url = await getDownloadURL(storageRef); // URL 가져오기
  //     console.log("Uploaded Image URL:", url); // 확인용
  //     return url;
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     return "";
  //   }
  // };

  return (
    <Container>
      <h2>뉴스 추가하기</h2>
      <TitleInput
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TitleInput
        type="text"
        placeholder="작성자"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        // autoComplete="user-name"
      />
      <TitleInput
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // autoComplete="current-password"
      />
      {/* <FileInput
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <FileList>
        {files.map((file) => (
          <li key={file.name}>
            {file.name}
            <button onClick={() => removeFile(file.name)}>삭제</button>
          </li>
        ))}
      </FileList> */}
      <TextArea
        placeholder="내용 (이미지 첨부 시 첫번째 이미지가 메인 이미지로 설정됩니다.)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onPaste={handlePaste}
        ref={textareaRef}
      />
      <ContentPreview>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </ContentPreview>
      <ButtonContainer>
        <StyledButton onClick={handleAddNews}>저장</StyledButton>
        <StyledButton as={Link} to="/NewsList">
          취소
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
};

export default NewsAdd;
