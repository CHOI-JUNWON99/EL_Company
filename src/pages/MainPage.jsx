import React from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MainPageImage from "../assets/MainPage2.webp";
import ServiceImage from "../assets/MainPage2.webp";

const MainPageWrapper = styled.div`
  text-align: center;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 1000px;
  background-size: cover;
  background-position: center;
  background-image: url(${MainPageImage});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HeroText = styled.h4`
  font-size: 1.5rem;
  margin-top: 1rem;
  color: black;
`;

const ServicesSection = styled.div`
  padding: 10rem 0;
  background-color: white;
`;

const ServiceCardWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-image: url(${ServiceImage});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
`;

const ServiceButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const LocationsSection = styled.section`
  padding: 2.5rem 0;
`;

const LocationHeading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const LocationWrapper = styled.div`
  margin-bottom: 2rem;
  font-size: 1rem;
  padding: 2rem; /* 지도 사이에 padding 추가 */
  background-color: #f9f9f9; /* 배경색 추가 (선택 사항) */
  border-radius: 10px; /* 둥근 모서리 (선택 사항) */
`;

const ServiceHeading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

function ServiceCard({ text, onClick }) {
  return (
    <ServiceCardWrapper onClick={onClick}>
      <ServiceButton>{text}</ServiceButton>
    </ServiceCardWrapper>
  );
}

function MainPage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <MainPageWrapper>
      <HeroSection>
        <HeroText>
          신속한 대응과 안전을 최우선으로 하는 (주)엘기업 입니다.
          <br />
          타워크레인의 수많은 경험과 실적으로 구성된 직원들의 경험을 바탕으로
          <br />
          현장 상황에 알맞은 장비선정 및 타워크레인의 사용에 대한 어려움과
          불편함을 해소시켜드립니다.
          <br />
          또한 보다 나은 서비스로 고객만족의 개념으로 신속하고 안전하게 최선을
          다하며
          <br />
          보다 혁신적이고 새로운 기술로 고객 곁에 다가갈 것을 약속드립니다.
        </HeroText>
      </HeroSection>
      <ServicesSection>
        <ServiceHeading>Our Services</ServiceHeading>
        <HeroText>
          믿을 수 있는 타워크레인 전문 기업 엘기업이 여러분께 신뢰를 드립니다.
          <br />
          빠르게 변화하는 건설시장에 대응하여
          <br />
          최고의 품질, 보다 나은 서비스를 제공하기 위하여 최선을 다할 것을
          약속드립니다.
        </HeroText>
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
              onClick={() => handleNavigation("/")}
            />
            <ServiceCard
              text="건설용리프트 임대"
              onClick={() => handleNavigation("/")}
            />
            <ServiceCard
              text="모니터링 시스템"
              onClick={() => handleNavigation("/")}
            />
            <ServiceCard
              text="스마트 안전기기"
              onClick={() => handleNavigation("/")}
            />
          </div>
        </div>
      </ServicesSection>
      <LocationsSection>
        <LocationHeading>Our Locations</LocationHeading>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <LocationWrapper>
              <div className="text-xl font-semibold mb-2">본사</div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.054271062003!2d127.08632511290881!3d37.198940372019784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b45c9678cc3a9%3A0x1306c04576be5b55!2z6rK96riw64-EIO2ZlOyEseyLnCDrj5ntg4TqsJDrsLDsgrDroZwgMTQz!5e0!3m2!1sko!2skr!4v1729534638544!5m2!1sko!2skr"
                width="450"
                height="300"
                allowFullScreen=""
                loading="lazy"
                title="Seoul Office Location Map"
                className="mx-auto mb-4"
              ></iframe>
              <p>"경기도 화성시 동탄감배삼로 143, 202동 1810호"</p>
              <p>T. 031-378-6298</p>
              <p>M. 010-7529-9258</p>
              <p>F. 031-379-6297</p>
            </LocationWrapper>
          </Grid>
          <Grid item>
            <LocationWrapper>
              <div className="text-xl font-semibold mb-2">공장</div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4512.476644214021!2d127.62597832455846!3d36.895064738088394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3564c0191742705b%3A0xdc0d4fe640aa043!2z7Lap7LKt67aB64-EIOydjOyEseq1sCDsm5DrgqjrqbQg642V7KCV66asIDQ1MC0x!5e0!3m2!1sko!2skr!4v1729573756198!5m2!1sko!2skr"
                width="450"
                height="300"
                allowFullScreen=""
                loading="lazy"
                title="Pyeongtaek Factory Location Map"
                className="mx-auto mb-4"
              ></iframe>
              <p>"충북 음성군 원남면 덕정리 450-1번지(396필 외 7필)</p>
              <p>T. 031-378-6298</p>
              <p>ㅤ</p>
              <p>ㅤ</p>
            </LocationWrapper>
          </Grid>
        </Grid>
      </LocationsSection>
    </MainPageWrapper>
  );
}

export default MainPage;
