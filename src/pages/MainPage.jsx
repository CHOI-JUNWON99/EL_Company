import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainPageImg from "/business/MainPageImg1.webp";
import BusinessMobile from "/business/BusinessMobile.webp";
import HoistingMobile from "/business/HoistingMobile.webp";
import MainImage1_3 from "/business/Main1-3.webp";
import { MdElevator } from "react-icons/md";

const EquipmentCarousel = React.lazy(() =>
  import("../components/EquipmentCarousel.jsx")
);

const MainPageWrapper = styled.div`
  text-align: center;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 800px;
  background-size: cover;
  background-position: center;
  background-image: url(${MainPageImg});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: -2px;

  @media (min-width: 2561px) {
    width: 100%;
    height: 900px;
    background-image: url("/business/MainPageImg.jpg"); /* 고해상도 이미지 */
    //background-position: 0 -180px;
  }

  @media (max-width: 2560px) {
    width: 100%;
    height: 900px;
    //background-position: 0px 1px;
  }

  @media (max-width: 1440px) {
    width: 100%;
    height: 700px;
    //background-position: 0 1px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: 600px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
  }

  @media (max-width: 425px) {
    width: 100%;
    height: 400px;
  }
`;

const HeroText = styled.h4`
  font-size: 1.3rem;
  color: white;
  margin: 0 auto;
  max-width: 800px;
  line-height: 1.5;
  user-select: none;

  @media (min-width: 2561px) {
    font-size: 1.3rem;
    margin-top: 0px;
  }

  @media (max-width: 2560px) {
    font-size: 1.3rem;
    margin-top: 400px;
  }

  @media (max-width: 1700px) {
    font-size: 1.3rem;
    margin-top: 300px;
  }

  @media (max-width: 1440px) {
    font-size: 1rem;
    margin-top: 250px;
  }

  @media (max-width: 1024px) {
    font-size: 0.8rem;
    margin-top: 200px;
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;
    margin-top: 150px;
  }

  @media (max-width: 425px) {
    font-size: 0.5rem;
  }
`;

const ServiceHeroText = styled.h4`
  font-size: 1rem;
  color: #000000;
  user-select: none;
  padding: 5px 10px;
  line-height: 1.2;
  text-align: center;
  user-select: none;

  @media (min-width: 2561px) {
    font-size: 1rem;
  }

  @media (max-width: 2560px) {
    font-size: 1rem;
  }

  @media (max-width: 1440px) {
    font-size: 0.9rem;
  }

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }

  @media (max-width: 425px) {
    font-size: 0.6rem;
  }
`;

const ServicesSection = styled.div`
  padding-top: 2rem;
  background-color: white;

  @media (max-width: 425px) {
    padding-top: 4rem;
  }
`;

const ServiceCardWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 20px 0px 20px;
  cursor: pointer;

  @media (max-width: 1084px) {
    width: 185px;
    height: 185px;
  }

  @media (max-width: 745px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 425px) {
    width: 63px;
    height: 63px;
  }
`;

const ServiceButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #03c75a;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #028841;
  }

  @media (max-width: 1084px) {
    font-size: 0.8rem;
    padding: 5px 10px;
    width: auto;
    min-width: 40px;
    height: auto;
    line-height: 1.2;
    text-align: center;
    bottom: 3px;
    right: 2px;
  }

  @media (max-width: 745px) {
    font-size: 0.5rem;
    padding: 5px 10px;
    width: auto;
    min-width: 40px;
    height: auto;
    line-height: 1.2;
    text-align: center;
    bottom: 3px;
    right: 2px;
  }

  @media (max-width: 425px) {
    font-size: 0.25rem;
    padding: 5px 10px;
    width: auto;
    min-width: 40px;
    height: auto;
    line-height: 1.2;
    text-align: center;
    bottom: 3px;
    right: 2px;
  }
`;

const ServiceHeading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  user-select: none;

  @media (max-width: 425px) {
    font-size: 1.3rem;
  }
`;

const BlogNote = styled.p`
  font-size: 0.8rem;
  color: #555;
  margin-top: 0px;
  user-select: none;

  span {
    color: #03c75a;
    font-weight: bold;
  }
  @media (max-width: 425px) {
    font-size: 0.6rem;
  }
`;

const ShortcutSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem 0;
  gap: 20px;
  position: relative;
  top: -130px;

  @media (max-width: 950px) {
    display: none;
  }
`;

const ShortcutCard = styled.div`
  width: 220px;
  height: 150px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 425px) {
    width: 180px;
    height: 120px;
  }
`;

const ShortcutIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const ShortcutText = styled.p`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  @media (max-width: 425px) {
    font-size: 0.9rem;
  }
`;

const RequestSection = styled.div`
  padding: 3rem 1rem;
  background-color: #f9f9f9;
  text-align: center;
`;

const RequestTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
  user-select: none;

  @media (max-width: 425px) {
    font-size: 1.3rem;
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #555;

  span {
    font-weight: bold;
    color: #2c1919;
  }

  @media (max-width: 425px) {
    font-size: 0.9rem;
  }
`;

const RequestButton = styled.button`
  padding: 1rem 2rem;
  background-color: #3b3b3b;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000000;
  }

  @media (max-width: 425px) {
    font-size: 0.9rem;
    padding: 0.8rem 1.5rem;
  }
`;

function ShortcutCardComponent({ icon, text, onClick }) {
  return (
    <ShortcutCard onClick={onClick}>
      <ShortcutIcon>{icon}</ShortcutIcon>
      <ShortcutText>{text}</ShortcutText>
    </ShortcutCard>
  );
}

function ServiceCard({ text, image, onClick }) {
  return (
    <ServiceCardWrapper $image={image} onClick={onClick}>
      <ServiceButton>{text}</ServiceButton>
    </ServiceCardWrapper>
  );
}

function MainPage() {
  const navigate = useNavigate();

  const navigateToBlog = () => {
    window.open("https://blog.naver.com/el_tower", "_blank");
  };

  const navigateToLTypeTower = () => {
    navigate("/business");
  };
  const navigateToTTypeTower = () => {
    navigate("/business");
  };
  const navigateToLifting = () => {
    navigate("/hoisting");
  };
  const navigateToCaseStudies = () => {
    navigate("/construction");
  };

  const navigateToRequestForm = () => {
    navigate("/request");
  };

  return (
    <MainPageWrapper>
      <HeroSection>
        <HeroText>
          신속한 대응과 안전을 최우선으로 하는 (주)엘기업 입니다.
          <br />
          타워크레인의 수많은 경험과 실적으로 구성된 직원들의 경험을 바탕으로
          <br />
          현장 상황에 알맞은 장비선정 및 타워크레인의 사용에 대한
          <br /> 어려움과 불편함을 해소시켜드립니다.
          <br />
          또한 보다 나은 서비스로 고객만족의 개념으로 신속하고 안전하게 최선을
          다하며
          <br />
          보다 혁신적이고 새로운 기술로 고객 곁에 다가갈 것을 약속드립니다.
        </HeroText>
      </HeroSection>
      <ShortcutSection>
        <ShortcutCardComponent
          icon="🏗️"
          text="L형 타워"
          onClick={navigateToLTypeTower}
        />
        <ShortcutCardComponent
          icon="🏗️"
          text="T형 타워"
          onClick={navigateToTTypeTower}
        />
        <ShortcutCardComponent
          icon={<MdElevator />}
          text="건설용 리프팅"
          onClick={navigateToLifting}
        />
        <ShortcutCardComponent
          icon="📋"
          text="현장 사례"
          onClick={navigateToCaseStudies}
        />
      </ShortcutSection>

      <ServicesSection>
        <ServiceHeading>Our Services</ServiceHeading>
        <ServiceHeroText>
          믿을 수 있는 타워크레인 전문 기업 엘기업이 여러분께 신뢰를 드립니다.
          <br />
          빠르게 변화하는 건설시장에 대응하여
          <br />
          최고의 품질, 보다 나은 서비스를 제공하기 위하여 최선을 다할 것을
          약속드립니다.
        </ServiceHeroText>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <ServiceCard
              text="타워크레인 임대"
              image={BusinessMobile}
              onClick={navigateToBlog}
            />
            <ServiceCard
              text="건설용리프트 임대"
              image={HoistingMobile}
              onClick={navigateToBlog}
            />
            <ServiceCard
              text="출고전 사전 점검"
              image={MainImage1_3}
              onClick={navigateToBlog}
            />
          </div>
        </div>
      </ServicesSection>
      <BlogNote>
        사진 클릭시 <span>EL기업 네이버 블로그</span> 창이 새로 열립니다
      </BlogNote>
      <Suspense fallback={<div>Loading...</div>}>
        <EquipmentCarousel />
      </Suspense>
      <RequestSection>
        <RequestTitle>문의 및 견적 요청</RequestTitle>
        <ContactInfo>
          <ContactItem>
            회사 연락처:
            <br />
            <span>031-378-6298</span>
            <br />
            <span>010-5838-6298</span>
          </ContactItem>
          <ContactItem>
            회사 이메일:
            <br />
            <span>elgiup@daum.net</span>
          </ContactItem>
        </ContactInfo>
        <RequestButton onClick={navigateToRequestForm}>
          견적 의뢰하러 가기
        </RequestButton>
        <h1
          style={{
            fontSize: "0.8rem",
            fontWeight: "bold",

            userSelect: "none",
          }}
        >
          엘기업 - 타워크레인 임대 전문 기업
        </h1>
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: "bold",
            lineHeight: "1.5",
            margin: "0 auto",
          }}
        >
          엘기업은 신속하고 안전한 타워크레인 임대 서비스를 제공합니다.
        </p>
      </RequestSection>
    </MainPageWrapper>
  );
}

export default MainPage;
