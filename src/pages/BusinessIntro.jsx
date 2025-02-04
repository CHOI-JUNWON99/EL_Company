import React, { useState } from "react";
import styled from "styled-components";
import Business from "/business/Business.webp";
import BusinessMobile from "/business/BusinessMobile.webp";
import CCTL80A from "/business/CCTL80A.webp";
import GHD3520 from "/business/GHD3520.webp";
import GHD4015 from "/business/GHD4015.webp";
import STT133 from "/business/STT133.webp";
import CCTT160 from "/business/CCTT160.webp";
import CCTL120 from "/business/CCTL120.webp";
import CCTL130 from "/business/CCTL130.webp";
import TCT5513 from "/business/TCT5513.webp";
import STL120 from "/business/STL120.webp";

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
  background-image: url(${Business});

  @media (max-width: 950px) {
    background-image: url(${BusinessMobile});
    height: 250px;
  }

  h1 {
    font-size: 2rem;
    font-weight: bold;
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

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const TowerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px auto;
  margin-bottom: 50px;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 0 10px;
    max-width: 90%;
  }
`;

const TowerItem = styled.div`
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
    height: 150px;
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
  max-width: 500px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: -200px;
  margin: 0 auto;
  transform: translateY(0);

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* 비율 유지 */
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

const Ltowers = [
  {
    id: 1,
    name: "CCTL80A",
    main_image: CCTL80A,
    maxRadius: "30M",
    liftingCapacity: "2.9Ton - End 1.9Ton",
    selfSupportHeight: "31.5M",
  },
  {
    id: 2,
    name: "CCTL120",
    main_image: CCTL120,
    maxRadius: "40M",
    liftingCapacity: "2.9Ton - End 1.5Ton",
    selfSupportHeight: "37.5M",
  },
  {
    id: 3,
    name: "CCTL130",
    main_image: CCTL130,
    maxRadius: "45M",
    liftingCapacity: "2.9Ton - End 1.5Ton",
    selfSupportHeight: "37.5M",
  },
  {
    id: 4,
    name: "GHD4015",
    main_image: GHD4015,
    maxRadius: "40M",
    liftingCapacity: "2.9Ton - End 1.5Ton",
    selfSupportHeight: "43.5M",
  },
  {
    id: 5,
    name: "GHD3520",
    main_image: GHD3520,
    maxRadius: "35M",
    liftingCapacity: "2.9Ton - End 2.0Ton",
    selfSupportHeight: "37.5M",
  },
  {
    id: 6,
    name: "STL120",
    main_image: STL120,
    maxRadius: "45M",
    liftingCapacity: "2.9Ton - End 2.1Ton",
    selfSupportHeight: "33M(JIP40-45M), 36M(30-35M)",
  },
];

const Ttowers = [
  {
    id: 1,
    name: "STT133",
    main_image: STT133,
    maxRadius: "55M",
    liftingCapacity: "2.9Ton - End 1.35Ton",
    selfSupportHeight: "43.5M",
  },
  {
    id: 2,
    name: "TCT5513",
    main_image: TCT5513,
    maxRadius: "55M",
    liftingCapacity: "2.9Ton - End 1.3Ton",
    selfSupportHeight: "39.2M",
  },
  {
    id: 3,
    name: "CCTT160",
    main_image: CCTT160,
    maxRadius: "60M",
    liftingCapacity: "2.9Ton - End 1.8Ton",
    selfSupportHeight: "60M",
  },
];

const BusinessIntro = () => {
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
      <TowerType>L형 타워</TowerType>
      <TowerIntro>
        작업 공간이 좁은 현장에 적합하며, 붐대가 수직으로 상승하여 <br />
        고층 건물 근처에서도 안전하게 작업 가능합니다.
      </TowerIntro>
      <TowerGrid>
        {Ltowers.map((tower) => (
          <TowerItem key={tower.id} onClick={() => openModal(tower.main_image)}>
            <img src={tower.main_image} alt={tower.name} />
            <h3>{tower.name}</h3>
            <TowerInfo>
              <p>최대 반경: {tower.maxRadius}</p>
              <p>양중 능력(최대): {tower.liftingCapacity}</p>
              <p>자립 높이: {tower.selfSupportHeight}</p>
            </TowerInfo>
          </TowerItem>
        ))}
      </TowerGrid>

      <TowerType>T형 타워</TowerType>
      <TowerIntro>
        붐대가 수평으로 회전하여 넓은 작업 반경을 제공하며, <br />
        고층 건설 현장에서 장비와 자재를 효율적으로 운반할 수 있습니다.
      </TowerIntro>
      <TowerGrid>
        {Ttowers.map((tower) => (
          <TowerItem key={tower.id} onClick={() => openModal(tower.main_image)}>
            <img src={tower.main_image} alt={tower.name} />
            <h3>{tower.name}</h3>
            <TowerInfo>
              <p>최대 반경: {tower.maxRadius}</p>
              <p>양중 능력: {tower.liftingCapacity}</p>
              <p>자립 높이: {tower.selfSupportHeight}</p>
            </TowerInfo>
          </TowerItem>
        ))}
      </TowerGrid>

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

export default BusinessIntro;
