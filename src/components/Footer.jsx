import React from "react";
import { Container } from "@mui/material";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #3d3d3d;
  color: white;
  padding: 1rem;
  position: relative;
`;

const FooterText = styled.p`
  text-align: center;
  position: relative;

  @media (max-width: 425px) {
    font-size: 0.5rem;
  }
`;

const AdminLink = styled.div`
  position: absolute;
  right: 0;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <FooterText>
          Tel: 031-378-6298 | M_Tel: 010-5838-6298 | Fax: 031-379-6297 | Email:
          elgiup@daum.net | 사업자등록번호: 138-81-59163
        </FooterText>
        <FooterText>
          본사: 경기도 화성시 동탄감배산로 143, 202동 1810호 | 공장 : 충북
          음성군 원남면 덕정리 396번지 외 7필
        </FooterText>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
