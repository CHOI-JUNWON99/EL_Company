import React from "react";
import { Container } from "@mui/material";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: black;
  color: white;
  padding: 1rem;
  position: relative;
`;

const FooterText = styled.p`
  text-align: center;
  position: relative;
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
          Tel: 031-378-6298 | M_Tel: 010-7529-9258 | Fax: 031-379-6297 | Email:
          ELGIUP@DAUM.NET | 사업자등록번호: 138-81-59163
        </FooterText>
        <FooterText>
          본사: 경기도 화성시 동탄감배산로 143, 202동 1810호 | 공장 : '충북
          음성군 원남면 덕정리 450-1번지(396필 외 7필)
        </FooterText>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
