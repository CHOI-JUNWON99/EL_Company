import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 20px;
`;

const MenuItem = styled.li`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Language = styled.div`
  cursor: pointer;
`;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <Logo>회사로고 & 회사명</Logo>
      <Menu>
        <MenuItem onClick={() => navigate("/")}>메인 홈</MenuItem>
        {/* 정확한 경로로 이동 */}
        <MenuItem onClick={() => navigate("/business")}>사업분야</MenuItem>
        <MenuItem onClick={() => navigate("/construction")}>공사실적</MenuItem>
        <MenuItem>견적의뢰</MenuItem>
        <MenuItem>공지사항</MenuItem>
      </Menu>
      <Language>EN | 中文 | 한국어</Language>
    </NavbarContainer>
  );
};

export default Navbar;
