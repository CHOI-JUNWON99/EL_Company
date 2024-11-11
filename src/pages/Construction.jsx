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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 0 10px;
  }
`;

const ConstructionItem = styled.div`
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

const ConstructionInfo = styled.div`
  margin-top: 10px;

  p {
    margin: 5px 0;
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

const ConstructionList = [
  {
    id: 1,
    projectOverview: "서울 근린생활시설 타워크레인 설치사례",
    main_image: defaultImage,
    fuildGround: "27.5M x 21.6M",
    buildingHeight: "지하 7.5M / 지상 46.25M",
    leasePeriod: "6개월",
    equipmentName: "HIL2826",
    radius: "최대 25M",
    weight: "Max 2.8ton - Tip 2.0ton",
    shortDescription:
      "타워크레인 설치를 건물 내부 엘리베이터 홀에 진행해야 했던 현장입니다. 엘리베이터 홀 사이즈가 2.2m x 1.75m 로 작아 원통형 타입인 HIL2825를 설치했던 현장 사례입니다.",
  },
  {
    id: 2,
    projectOverview: "서울 근린생활시설 타워크레인 설치사례",
    main_image: defaultImage,
    fuildGround: "27.5M x 21.6M",
    buildingHeight: "지하 7.5M / 지상 46.25M",
    leasePeriod: "6개월",
    equipmentName: "HIL2826",
    radius: "최대 25M",
    weight: "Max 2.8ton - Tip 2.0ton",
    shortDescription:
      "타워크레인 설치를 건물 내부 엘리베이터 홀에 진행해야 했던 현장입니다. 엘리베이터 홀 사이즈가 2.2m x 1.75m 로 작아 원통형 타입인 HIL2825를 설치했던 현장 사례입니다.",
  },
  {
    id: 3,
    projectOverview: "서울 근린생활시설 타워크레인 설치사례",
    main_image: defaultImage,
    fuildGround: "27.5M x 21.6M",
    buildingHeight: "지하 7.5M / 지상 46.25M",
    leasePeriod: "6개월",
    equipmentName: "HIL2826",
    radius: "최대 25M",
    weight: "Max 2.8ton - Tip 2.0ton",
    shortDescription:
      "타워크레인 설치를 건물 내부 엘리베이터 홀에 진행해야 했던 현장입니다. 엘리베이터 홀 사이즈가 2.2m x 1.75m 로 작아 원통형 타입인 HIL2825를 설치했던 현장 사례입니다.",
  },
];

const Construction = () => {
  return (
    <Container>
      <HeroSection style={{ backgroundImage: `url(${defaultImage})` }}>
        <h1>주요 공사 실적</h1>
      </HeroSection>
      <ConstructionGrid>
        {ConstructionList.map((el) => (
          <ConstructionItem key={el.id}>
            <img src={el.main_image} alt={el.projectOverview} />
            <FirstInfo>
              <CompanyName>(주)엘기업</CompanyName>
              <CreatedDate>2024.11.11</CreatedDate>
            </FirstInfo>
            <ConstructionInfo>
              <p>프로젝트 개요: {el.projectOverview}</p>
              <p>현장 대지: {el.fuildGround}</p>
              <p>건물 높이: {el.buildingHeight}</p>
              <p>임대 기간: {el.leasePeriod}</p>
              <p>타워크레인 세부사항:</p>
              <p>장비명: {el.equipmentName}</p>
              <p>반경: {el.radius}</p>
              <p>중량: {el.weight}</p>
              <p>{el.shortDescription}</p>
            </ConstructionInfo>
          </ConstructionItem>
        ))}
      </ConstructionGrid>
    </Container>
  );
};

export default Construction;
