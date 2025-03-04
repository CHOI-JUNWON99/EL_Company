import React from "react";
import styled from "styled-components";
import hello from "/business/Hello.png";
import logo from "/elgiup_logo_64x64.png";

// Hero Section
const HeroSection = styled.section`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  background-image: url(${hello});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  user-select: none;

  @media (max-width: 768px) {
    background-image: url("/business/Hello2.png"); /* 768px 이하에서 다른 이미지로 변경 */
    height: 200px;
  }

  @media (max-width: 1560px) {
    height: 300px;
  }

  @media (max-width: 1440px) {
    height: 300px;
  }

  @media (max-width: 1170px) {
    height: 250px;
  }

  @media (max-width: 980px) {
    height: 200px;
  }
`;

// 인사말 섹션
const IntroSection = styled.section`
  background: linear-gradient(to bottom, #f8f8f8, #ffffff);
  padding: 4rem 2rem;
  text-align: center;
  user-select: none;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto;
  }

  .footer-container {
    display: flex;
    align-items: center;
    justify-content: flex-end; /* 우측 정렬 */
    margin-top: 2rem;
    width: 100%; /* 전체 너비 사용 */
    padding-right: 20px; /* 너무 끝으로 가는 것 방지 */
  }

  .logo {
    width: 50px;
    height: auto;
    margin-right: 10px;
  }

  h4 {
    font-weight: bold;
    font-size: 1.2rem;
    color: #222;
  }

  @media (max-width: 1024px) {
    padding: 3rem 1rem;

    h2 {
      font-size: 1.2rem;
      margin-bottom: 0.8rem;
    }

    p {
      font-size: 0.8rem;
    }

    h4 {
      font-size: 1rem;
      margin-top: 1.8rem;
    }
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;

    h2 {
      font-size: 1rem;
    }

    p {
      font-size: 0.7rem;
    }

    h4 {
      font-size: 0.8rem;
      margin-top: 1.6rem;
    }

    .footer-container {
      justify-content: center;
      padding-right: 0;
    }
  }
`;

// 회사 정보 섹션
const CompanyInfoSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
  background-color: #f8f8f8;
  user-select: none;

  table {
    width: 80%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    td,
    th {
      border: 1px solid #ddd;
      padding: 1.2rem;
      text-align: left;
      font-size: 1rem;
    }

    th {
      background-color: #414141;
      color: white;
      font-weight: bold;
    }

    td {
      color: #333;
    }
  }
`;

// 특징 강조 카드 섹션
const FeatureSection = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 4rem 1rem;
  background-color: #fff;
  user-select: none;
  .feature-card {
    width: 320px;
    padding: 2rem;
    background: #fff;
    border-radius: 10px;
    border: 2px solid black;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    text-align: center;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
      transform: translateY(-5px);
      border-color: red;
      box-shadow: 0 4px 8px rgba(255, 0, 0, 0.4);
    }

    h4 {
      color: black;
      margin-bottom: 1rem;
      font-weight: bold;
      border-bottom: 4px solid;
      border-image: linear-gradient(to right, black 50%, red 50%);
      border-image-slice: 1;
    }

    p {
      color: #555;
    }
  }
`;

const CompanyMessage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      {/* 인사말 섹션 추가 */}
      <IntroSection>
        <h2>안녕하십니까?</h2>
        <p>
          저희 (주) 엘기업 홈페이지를 방문해 주신 여러분께 진심으로
          감사드립니다. <br />
          ㈜ 엘기업은 20년 이상의 경험을 바탕으로 현장에 <br />
          최고로 적합한 타워를 제공하기 위해 최선을 다하고 있습니다. <br />
          항상 새로운 도전과 혁신을 통해 고객 만족을 최우선으로 생각하며, <br />
          신뢰와 성장을 함께 이루어가는 파트너가 되겠습니다. <br />
          홈페이지를 통해 저희 회사에 대해 더 깊이 알아가시고,
          <br /> 유용한 정보를 얻어가실 수 있기를 바랍니다.
        </p>
        <p>
          앞으로도 여러분의 기대에 부응할 수 있도록 끊임없이 노력하며, <br />
          함께 성장해 나가는 ㈜ 엘기업이 되겠습니다. <br />
          여러분의 관심과 성원에 진심으로 감사드리며, <br />
          언제나 건강과 행복이 가득하시길 기원합니다.
        </p>
        <div className="footer-container">
          <img src={logo} alt="엘기업 로고" className="logo" />
          <h4>㈜ 엘기업 임직원 일동</h4>
        </div>
      </IntroSection>
      {/* 주요 특징 섹션 */}
      <FeatureSection>
        <div className="feature-card">
          <h4>도심건설 특화</h4>
          <p>20년 이상의 경험과 노하우를 바탕으로 다양한 현장 솔루션 제공</p>
        </div>
        <div className="feature-card">
          <h4>체계적인 지원</h4>
          <p>최적화된 설계 및 신속한 현장 지원 시스템 구축</p>
        </div>
        <div className="feature-card">
          <h4>장비 관리 및 투자</h4>
          <p>철저한 점검과 지속적 재투자로 품질 보장</p>
        </div>
      </FeatureSection>
      <CompanyInfoSection>
        <table>
          <tbody>
            <tr>
              <th>회사명</th>
              <td>주식회사 엘기업 (ELGIUP Co., Ltd.)</td>
            </tr>
            <tr>
              <th>업종</th>
              <td>건설기계임대 및 판매</td>
            </tr>
            <tr>
              <th>설립년도</th>
              <td>1996년</td>
            </tr>
            <tr>
              <th>본사</th>
              <td>경기도 화성시 동탄감배삼로 143, 202동 1810호</td>
            </tr>
            <tr>
              <th>공장</th>
              <td>충북 음성군 원남면 덕정리 396번지 외 7필</td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                Tel: 031-378-6298 <br /> M_Tel: 010-5838-6298
              </td>
            </tr>
            <tr>
              <th>팩스</th>
              <td>031-379-6297</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>elgiup@daum.net</td>
            </tr>
          </tbody>
        </table>
      </CompanyInfoSection>
    </div>
  );
};

export default CompanyMessage;
