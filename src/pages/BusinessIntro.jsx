import React from "react";
import styled from "styled-components";
import defaultImage from "../assets/MainPage2.webp";

const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;

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
`;

const TowerIntro = styled.p`
  text-align: center;
  font-size: 0.8rem;
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
  //cursor: pointer;

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

const Ltowers = [
  {
    id: 1,
    name: "L형 타워",
    main_image: defaultImage,
    maxRadius: "20m",
    liftingCapacity: "10톤",
    selfSupportHeight: "30m",
  },
  {
    id: 2,
    name: "L형 타워",
    main_image: defaultImage,
    maxRadius: "15m",
    liftingCapacity: "8톤",
    selfSupportHeight: "25m",
  },
  {
    id: 3,
    name: "L형 타워",
    main_image: defaultImage,
    maxRadius: "18m",
    liftingCapacity: "12톤",
    selfSupportHeight: "35m",
  },
];

const Ttowers = [
  {
    id: 1,
    name: "T형 타워",
    main_image: defaultImage,
    maxRadius: "20m",
    liftingCapacity: "10톤",
    selfSupportHeight: "30m",
  },
  {
    id: 2,
    name: "T형 타워",
    main_image: defaultImage,
    maxRadius: "15m",
    liftingCapacity: "8톤",
    selfSupportHeight: "25m",
  },
  {
    id: 3,
    name: "T형 타워",
    main_image: defaultImage,
    maxRadius: "18m",
    liftingCapacity: "12톤",
    selfSupportHeight: "35m",
  },
];

const BusinessIntro = () => {
  return (
    <Container>
      <HeroSection style={{ backgroundImage: `url(${defaultImage})` }}>
        <h1>사업소개</h1>
      </HeroSection>
      <TowerType>L형 타워</TowerType>
      <TowerIntro>
        작업 공간이 좁은 현장에 적합하며, 붐대가 수직으로 상승하여 <br />
        고층 건물 근처에서도 안전하게 작업 가능합니다.
      </TowerIntro>
      <TowerGrid>
        {Ltowers.map((tower) => (
          <TowerItem key={tower.id}>
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

      <TowerType>T형 타워</TowerType>
      <TowerIntro>
        붐대가 수평으로 회전하여 넓은 작업 반경을 제공하며, <br />
        고층 건설 현장에서 장비와 자재를 효율적으로 운반할 수 있습니다.
      </TowerIntro>
      <TowerGrid>
        {Ttowers.map((tower) => (
          <TowerItem key={tower.id}>
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
    </Container>
  );
};

export default BusinessIntro;
