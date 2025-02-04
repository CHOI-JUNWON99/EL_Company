import React from "react";
import styled from "styled-components";
import defaultImage from "../assets/MainPage2.webp";
import HoistingImg from "/business/HoistingImg.webp";
import HoistingMobile from "/business/HoistingMobile.webp";

const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 400px;
  background-size: cover;
  //background-size: auto;
  background-position: center;
  //background-position: 10px -500px;
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

const Hoistinginfo = [
  {
    id: 1,
    name: "호이스팅",
    main_image: defaultImage,
    maxRadius: "20m",
    liftingCapacity: "10톤",
    selfSupportHeight: "30m",
  },
  {
    id: 2,
    name: "호이스팅",
    main_image: defaultImage,
    maxRadius: "15m",
    liftingCapacity: "8톤",
    selfSupportHeight: "25m",
  },
  {
    id: 3,
    name: "호이스팅",
    main_image: defaultImage,
    maxRadius: "18m",
    liftingCapacity: "12톤",
    selfSupportHeight: "35m",
  },
  {
    id: 4,
    name: "호이스팅",
    main_image: defaultImage,
    maxRadius: "20m",
    liftingCapacity: "10톤",
    selfSupportHeight: "30m",
  },
  {
    id: 5,
    name: "호이스팅",
    main_image: defaultImage,
    maxRadius: "15m",
    liftingCapacity: "8톤",
    selfSupportHeight: "25m",
  },
  {
    id: 6,
    name: "호이스팅",
    main_image: defaultImage,
    maxRadius: "18m",
    liftingCapacity: "12톤",
    selfSupportHeight: "35m",
  },
  {
    id: 7,
    name: "호이스팅",
    main_image: defaultImage,
    maxRadius: "20m",
    liftingCapacity: "10톤",
    selfSupportHeight: "30m",
  },
  {
    id: 8,
    name: "호이스팅",
    main_image: defaultImage,
    maxRadius: "15m",
    liftingCapacity: "8톤",
    selfSupportHeight: "25m",
  },
  {
    id: 9,
    name: "호이스팅",
    main_image: defaultImage,
    maxRadius: "18m",
    liftingCapacity: "12톤",
    selfSupportHeight: "35m",
  },
];

const Hoisting = () => {
  return (
    <Container>
      <HeroSection>{/* <h1>사업소개</h1> */}</HeroSection>
      <TowerType>건설용리프팅</TowerType>
      <TowerIntro>
        작업 공간이 좁은 현장에 적합하며, 붐대가 수직으로 상승하여 <br />
        고층 건물 근처에서도 안전하게 작업 가능합니다.
      </TowerIntro>
      <TowerGrid>
        {Hoistinginfo.map((tower) => (
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

export default Hoisting;
