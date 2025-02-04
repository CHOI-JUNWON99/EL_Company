//RequestForm.jsx
import React, { useState } from "react";
import styled from "styled-components";
import RequestImg from "/business/RequestImg.jpeg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const RequestPageWrapper = styled.div`
  text-align: center;
`;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  user-select: none;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    max-width: 95%;
    align-items: center !important;
    justify-content: center !important;
    margin: 10px auto;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 100%;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  user-select: none;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  @media (max-width: 425px) {
    height: 250px;
  }
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #333;
  }
`;

const InfoBox = styled.div`
  max-width: 400px;
  padding: 2rem;
  background: linear-gradient(135deg, #ffffff, #f9f9f9);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  height: 875px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;

  border-bottom: 4px solid;
  border-image: linear-gradient(to right, black 50%, red 50%);
  border-image-slice: 1;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: #555;
  line-height: 1.6;

  &::before {
    content: "✔";
    font-weight: bold;
    margin-right: 10px;
    background: linear-gradient(to right, black 50%, red 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent; /* For non-WebKit browsers supporting text-fill */
  }
`;

function RequestForm() {
  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [files, setFiles] = useState([]); // 다중 파일 선택 상태
  const [uploading, setUploading] = useState(false);

  const MAX_FILE_COUNT = 3;
  const MAX_TOTAL_SIZE = 3000000; // 3MB

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

    if (selectedFiles.length > MAX_FILE_COUNT) {
      alert(`최대 ${MAX_FILE_COUNT}개의 파일만 선택할 수 있습니다.`);
      e.target.value = ""; // Reset input
      return;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      alert("파일 크기의 총합이 3MB를 초과할 수 없습니다.");
      e.target.value = ""; // Reset input
      return;
    }

    setFiles(selectedFiles); // Update files state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let uploadedFiles = [];

      if (files.length > 0) {
        const storage = getStorage();
        for (const file of files) {
          const folder = file.type.startsWith("image/") ? "images" : "files";
          const storageRef = ref(storage, `${folder}/${file.name}`);
          await uploadBytes(storageRef, file);
          const fileUrl = await getDownloadURL(storageRef);
          uploadedFiles.push(fileUrl);
        }
      }

      const dataToSend = { ...formData, files: uploadedFiles };

      const response = await fetch(
        "https://us-central1-el-giup.cloudfunctions.net/sendEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        alert("견적 요청이 성공적으로 제출되었습니다!");
        setFormData({
          subject: "",
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        setFiles([]); // Reset file input
      } else {
        const errorText = await response.text();
        alert(`견적 요청 제출에 실패했습니다: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("견적 요청 제출에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <RequestPageWrapper>
      <HeroSection style={{ backgroundImage: `url(${RequestImg})` }}>
        <div>
          <h1>Customer Center</h1>
          {/* <h3>고객센터</h3> */}
        </div>
      </HeroSection>
      <ContainerWrapper>
        {/* <InfoBox>
          <InfoTitle>타워크레인 임대 시 참고사항</InfoTitle>
          <InfoList>
            <InfoItem>
              1. 캐드도면이 있어야 더욱 정확합니다. (복공도면, 구조도면,
              건축도면)
            </InfoItem>
            <InfoItem>2. 타워설치 시점 및 임대기간을 알려주세요</InfoItem>
            <InfoItem>3. 담당자 분 명함 혹은 연락처를 꼭 남겨주세요</InfoItem>
          </InfoList>
        </InfoBox> */}
        <Container>
          <form onSubmit={handleSubmit}>
            <InfoTitle>견적 의뢰</InfoTitle>
            <Input
              type="text"
              name="subject"
              placeholder="제목을 입력해주세요."
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요."
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="phone"
              placeholder="휴대폰 번호를 입력해주세요."
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="연락 받으실 이메일 주소를 입력해주세요."
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="내용
              1. 캐드도면이 있어야 더욱 정확합니다. 
              (복공도면, 구조도면,건축도면)            
              2. 타워설치 시점 및 임대기간을 알려주세요.
              3. 담당자 분 명함 혹은 연락처를 꼭 남겨주세요."
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Input type="file" multiple onChange={handleFileChange} />
            <Button type="submit" disabled={uploading}>
              {uploading ? "업로드 중..." : "제출"}
            </Button>
          </form>
        </Container>
      </ContainerWrapper>
    </RequestPageWrapper>
  );
}

export default RequestForm;
