import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

// 스타일링: Navbar 컨테이너
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  position: relative;
  z-index: 100;
  user-select: none;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 40px;
  position: absolute; /* 절대 위치 지정 */
  left: 50%; /* 화면의 중간으로 이동 */
  transform: translateX(-50%); /* 가운데 정렬 보정 */
  top: 50%; /* 로고와 회사명이 가운데에 있을 경우를 대비 */
  transform: translate(-50%, -50%); /* 좌우 및 상하 모두 중앙 정렬 */

  @media (max-width: 1350px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  cursor: pointer;
  position: relative;
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  font-weight: bold;
  &:hover {
    text-decoration: none;
  }

  &:hover > ul {
    display: block;
  }

  & > span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: -20px;
  background-color: white;
  list-style: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  z-index: 50;
  margin: 0;
  padding: 0;
  li {
    padding: 10px 20px;
    white-space: nowrap;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

// 로고 스타일
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;

  img {
    width: 180px;
    margin-right: 10px;
  }
`;

// 메뉴 햄버거 스타일
const Hamburger = styled.div`
  display: none;

  @media (max-width: 1350px) {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

// 사이드바 스타일
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) =>
    props.open ? "0" : "-100%"}; /* 오른쪽 끝에서 슬라이드 */
  height: 100%;
  width: 250px;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  user-select: none;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;

    li {
      padding: 10px 20px;
      font-size: 1.2rem;
      font-weight: bold;
      color: #333;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
`;

// 사이드바 오버레이 스타일
const SidebarOverlay = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 오버레이 */
  z-index: 999;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    company: false,
    business: false,
  });
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };
  return (
    <>
      <NavbarContainer>
        <Logo onClick={() => navigate("/")}>
          <img src="/business/Logo.webp" alt="Company Logo" />
        </Logo>
        <Menu>
          <MenuItem onClick={() => navigate("/")}>메인</MenuItem>
          <MenuItem>
            회사소개
            <DropdownMenu>
              <li onClick={() => navigate("/company")}>인사말</li>
              <li onClick={() => navigate("/location")}>오시는 길</li>
            </DropdownMenu>
          </MenuItem>
          <MenuItem>
            사업분야
            <DropdownMenu>
              <li onClick={() => navigate("/business")}>타워크레인</li>
              <li onClick={() => navigate("/hoisting")}>건설용리프트</li>
            </DropdownMenu>
          </MenuItem>
          <MenuItem onClick={() => navigate("/construction")}>
            현장사례
          </MenuItem>
          <MenuItem onClick={() => navigate("/request")}>견적의뢰</MenuItem>
          <MenuItem onClick={() => navigate("/newslist")}>공지사항</MenuItem>
        </Menu>
        <Hamburger onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </Hamburger>
      </NavbarContainer>

      {/* 사이드바 오버레이 */}
      <SidebarOverlay open={sidebarOpen} onClick={closeSidebar} />

      {/* 사이드바 */}
      <Sidebar open={sidebarOpen}>
        <ul>
          <li onClick={() => navigate("/")}>메인</li>
          <li onClick={() => toggleDropdown("company")}>
            회사소개 {dropdownOpen.company ? "-" : "+"}
            {dropdownOpen.company && (
              <ul>
                <li onClick={() => navigate("/company")}>인사말</li>
                <li onClick={() => navigate("/location")}>오시는 길</li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleDropdown("business")}>
            사업분야 {dropdownOpen.business ? "-" : "+"}
            {dropdownOpen.business && (
              <ul>
                <li onClick={() => navigate("/business")}>타워크레인</li>
                <li onClick={() => navigate("/hoisting")}>건설용 리프팅</li>
              </ul>
            )}
          </li>
          <li onClick={() => navigate("/construction")}>현장사례</li>
          <li onClick={() => navigate("/request")}>견적의뢰</li>
          <li onClick={() => navigate("/newslist")}>공지사항</li>
        </ul>
      </Sidebar>
    </>
  );
};

export default Navbar;
