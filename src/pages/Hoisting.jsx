import React, { useState } from "react";
import styled from "styled-components";
import singleImage from "/business/singleHoisting.png";
import twinImage from "/business/twinHoisting.png";
import HoistingImg from "/business/HoistingImg.webp";
import HoistingMobile from "/business/HoistingMobile.webp";

const Container = styled.div`
  font-family: Arial, sans-serif;
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
  background-image: url(${HoistingImg});

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  @media (max-width: 950px) {
    background-image: url(${HoistingMobile});
    background-position: 0px 0.1px;
    height: 250px;
  }
`;

const TowerType = styled.div`
  margin-top: 50px;
  font-size: 3rem;
  text-align: center;
  text-decoration-line: underline;
  text-decoration-color: beige;
  text-decoration-style: solid;
  text-decoration-thickness: 10px;
  user-select: none;
`;

const TowerIntro = styled.p`
  text-align: center;
  font-size: 0.8rem;
  user-select: none;

  @media (max-width: 425px) {
    font-size: 0.6rem;
  }
`;

const TowerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 기본적으로 2개씩 */
  gap: 20px;
  margin: 20px auto;
  margin-bottom: 50px;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  align-items: center;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr; /* 1000px 이하에서는 한 개씩 */
    max-width: 90%;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 0 10px;
    max-width: 90%;
  }
`;

const TowerItem = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  cursor: pointer;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const TowerInfo = styled.div`
  margin-top: 10px;

  p {
    margin: 5px 0;
  }
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

    @media (max-width: 768px) {
      max-width: 200px;
      max-height: 400px;
    }
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

const Hoistinginfo = [
  {
    id: 1,
    name: "싱글타입 리프트",
    description: "현장에서 일반적으로 사용하는 리프트입니다.",
    main_image: singleImage,
  },
  {
    id: 2,
    name: "트윈타입 리프트",
    description: "하나의 수직 마스트에 양쪽으로 리프트가 움직이는 타입입니다.",
    main_image: twinImage,
  },
];

const Hoisting = () => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => {
    setModalImage(img);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <Container>
      <HeroSection>{/* <h1>사업소개</h1> */}</HeroSection>
      <TowerType>건설용리프팅</TowerType>
      <TowerIntro>
        동력을 사용하여 가이드 레일을 따라 <br />
        상하로 움직이는 운반구를 매달아 화물을 운반 할 수 있는 설비 또는 이와
        <br />
        유사한 구조 및 성능을 가지는 것으로 건설현장에서 사용됩니다.
      </TowerIntro>
      <TowerGrid>
        {Hoistinginfo.map((tower) => (
          <TowerItem key={tower.id} onClick={() => openModal(tower.main_image)}>
            <img src={tower.main_image} alt={tower.name} />
            <h3>{tower.name}</h3>
            <p>{tower.description}</p>
          </TowerItem>
        ))}
      </TowerGrid>

      {/* 모달 추가 */}
      {modalImage && (
        <Modal onClick={closeModal}>
          <ModalContent>
            <button onClick={closeModal}>&times;</button>
            <img src={modalImage} alt="Modal Tower" />
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Hoisting;
