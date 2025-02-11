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
  //background-position: center;
  /* background-position: 0 -100px; */
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

  @media (max-width: 800px) {
    height: 250px;
  }

  @media (max-width: 640px) {
    height: 250px;
  }

  @media (max-width: 500px) {
    height: 200px;
  }

  @media (max-width: 400px) {
    height: 160px;
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
    max-width: 90%;
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
  //cursor: pointer;

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

const Construction = () => {
  const [constructionList, setConstructionList] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <img src={el.main_image} alt={el.projectOverview} />
            <FirstInfo>
              <CompanyName>(주)엘기업</CompanyName>
              <CreatedDate>
                {new Date(el.created_at.seconds * 1000).toLocaleDateString()}
              </CreatedDate>
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
