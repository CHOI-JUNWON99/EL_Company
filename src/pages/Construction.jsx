import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../components/firebase";
import Loading from "../components/Loading";
import ConstructionImg from "/business/ConstructionImg.png";

const Container = styled.div`
  font-family: Arial, sans-serif;
  user-select: none;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 400px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  @media (max-width: 1100px) {
    height: 250px;
  }

  @media (max-width: 500px) {
    height: 200px;
  }
`;

const ConstructionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px auto;
  margin-bottom: 50px;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    max-width: 90%;
  }
`;

const ConstructionItem = styled.div`
  display: flex;
  height: 650px;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer; /* 클릭 가능하도록 설정 */
  }

  @media (max-width: 330px) {
    font-size: 0.8rem;
  }
`;

const ConstructionInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  p {
    margin: 5px 0;
  }

  .name {
    text-align: center;
  }

  .description {
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    display: flex;
    align-items: center; /* Y축 중앙 정렬 */
    justify-content: center; /* 텍스트가 가로 중앙 정렬되도록 설정 (선택사항) */
  }
`;

const FirstInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const CompanyName = styled.p`
  font-size: 0.8rem;
`;

const CreatedDate = styled.p`
  font-size: 0.8rem;
`;

/* 🔥 추가: 모달 스타일 */
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 1000px;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }

  button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 20px;
    cursor: pointer;
  }
`;

const Construction = () => {
  const [constructionList, setConstructionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null); // 모달 상태 추가

  useEffect(() => {
    const fetchConstructionData = async () => {
      try {
        const q = query(
          collection(db, "constructionProjects"),
          orderBy("created_at", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConstructionList(data);
      } catch (error) {
        console.error("Error fetching construction projects:", error);
        alert("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchConstructionData();
  }, []);

  const openModal = (img) => {
    setModalImage(img);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <HeroSection
        style={{ backgroundImage: `url(${ConstructionImg})` }}
      ></HeroSection>
      <ConstructionGrid>
        {constructionList.map((el) => (
          <ConstructionItem key={el.id}>
            <img
              src={el.main_image}
              alt={el.projectOverview}
              onClick={() => openModal(el.main_image)} // 모달 열기 이벤트
            />
            <FirstInfo>
              <CompanyName>(주)엘기업</CompanyName>
              <CreatedDate>
                {new Date(el.created_at.seconds * 1000).toLocaleDateString()}
              </CreatedDate>
            </FirstInfo>
            <ConstructionInfo>
              <p className="name">{el.projectOverview}</p>
              <p>현장 대지: {el.fuildGround}</p>
              <p>건물 높이: {el.buildingHeight}</p>
              <p>타워크레인 세부사항:</p>
              <p>장비명: {el.equipmentName}</p>
              <p>반경: {el.radius}</p>
              <p>중량: {el.weight}</p>
              <p className="description">{el.shortDescription}</p>
            </ConstructionInfo>
          </ConstructionItem>
        ))}
      </ConstructionGrid>

      {/* 모달 추가 */}
      {modalImage && (
        <Modal onClick={closeModal}>
          <ModalContent>
            <button onClick={closeModal}>&times;</button>
            <img src={modalImage} alt="Construction Image" />
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Construction;
