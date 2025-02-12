import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const MapSection = styled.div`
  position: relative;
  height: 400px;
  user-select: none;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    height: 250px;
  }
  @media (max-width: 570px) {
    height: 200px;
  }
  @media (max-width: 475px) {
    height: 150px;
  }
`;

const InfoSection = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  text-align: left;
  border-radius: 10px;
  margin-top: 0.5rem;
`;

const Heading = styled.h2`
  margin-top: 5rem;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: left;
  background-color: #f9f9f9;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 570px) {
    font-size: 1.4rem;
  }

  @media (max-width: 475px) {
    font-size: 1.2rem;
  }
`;

const InfoText = styled.p`
  font-size: 1.2rem;
  color: #555;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 570px) {
    font-size: 0.8rem;
  }

  @media (max-width: 570px) {
    font-size: 0.7rem;
  }
`;

const Marginbox = styled.div`
  margin-top: 5rem;
  user-select: none;
`;

function CompanyLocation() {
  return (
    <Container>
      <Heading>본사 오시는 길</Heading>
      <MapSection>
        <iframe
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAQSoIloDSbRbnpVai_3HA4NlQWqJ6vr_I&q=37.199056,127.086394"
          allowFullScreen
          loading="lazy"
          title="Seoul Office Location Map"
        ></iframe>
      </MapSection>
      <InfoSection>
        <InfoText>주소: 경기도 화성시 동탄감배삼로 143, 202동 1810호</InfoText>
      </InfoSection>
      <InfoSection>
        <InfoText>대표전화: 031-378-6298</InfoText>
      </InfoSection>
      <InfoSection>
        <InfoText>모바일: 010-5838-6298</InfoText>
      </InfoSection>
      <InfoSection>
        <InfoText>팩스: 031-379-6297</InfoText>
      </InfoSection>

      <Heading>공장 오시는 길</Heading>
      <MapSection>
        <iframe
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAQSoIloDSbRbnpVai_3HA4NlQWqJ6vr_I&q=36.895065,127.625978"
          width="450"
          height="300"
          allowFullScreen
          loading="lazy"
          title="Pyeongtaek Factory Location Map"
          className="mx-auto mb-4"
        ></iframe>
      </MapSection>
      <InfoSection>
        <InfoText>
          주소: 충북 음성군 원남면 덕정리 450-1번지(396필 외 7필)
        </InfoText>
      </InfoSection>
      <Marginbox></Marginbox>
    </Container>
  );
}

export default CompanyLocation;
