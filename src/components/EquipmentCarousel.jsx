import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import CCTL80A from "/business/CCTL80A.webp";
import GHD3520 from "/business/GHD3520.webp";
import GHD4015 from "/business/GHD4015.webp";
import STT133 from "/business/STT133.webp";
import CCTT160 from "/business/CCTT160.webp";
import CCTL120 from "/business/CCTL120.webp";
import CCTL130 from "/business/CCTL130.webp";
import TCT5513 from "/business/TCT5513.webp";
import STL120 from "/business/STL120.webp";

const equipmentData = [
  { id: 1, name: "CCTL80A", image: CCTL80A },
  { id: 2, name: "CCTL120", image: CCTL120 },
  { id: 3, name: "CCTL130", image: CCTL130 },
  { id: 4, name: "GHD4015", image: GHD4015 },
  { id: 5, name: "GHD3520", image: GHD3520 },
  { id: 6, name: "STL120", image: STL120 },
  { id: 7, name: "STT133", image: STT133 },
  { id: 8, name: "CCTT160", image: CCTT160 },
  { id: 9, name: "TCT5513", image: TCT5513 },
];

const CarouselContainer = styled.div`
  width: 900px;
  margin: 0 auto;
  text-align: center;
  margin-top: 8rem;
  margin-bottom: 6rem;
  user-select: none;

  h2 {
    cursor: pointer;
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
    color: #000000;
    line-height: 1.2;
  }

  @media (max-width: 1000px) {
    width: 700px;
  }

  @media (max-width: 800px) {
    width: 500px;
  }
  @media (max-width: 600px) {
    width: 350px;

    p {
      font-size: 0.7rem;
    }
  }
`;

const EquipmentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  h4 {
    font-size: 1rem;
    margin-top: 5px;
    text-align: center;
  }

  @media (max-width: 600px) {
    img {
      width: 75px;
      height: 75px;
    }
    h4 {
      font-size: 0.7rem;
      position: relative;
      left: -10px;
    }
  }
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 2.5px;
    box-sizing: border-box;
  }

  .slick-list {
    margin: 0 -2.5px;
    overflow: hidden;
  }

  .slick-prev,
  .slick-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    cursor: pointer;
    font-size: 30px;
    color: black;
  }

  .slick-prev {
    left: -40px;
  }

  .slick-next {
    right: -40px;
  }

  .slick-prev::before,
  .slick-next::before {
    display: none;
  }

  /* 600px 이하에서 화살표 숨기기 */
  @media (max-width: 600px) {
    .slick-prev,
    .slick-next {
      display: none !important;
    }
  }
`;

const CustomArrow = ({ className, style, onClick, isNext }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    }}
    onClick={onClick}
  >
    {isNext ? <ArrowForwardIos /> : <ArrowBackIos />}
  </div>
);

const EquipmentCarousel = () => {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: isSmallScreen, // 600px 이하일 때 dots 표시
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: isSmallScreen ? null : <CustomArrow isNext={false} />,
    nextArrow: isSmallScreen ? null : <CustomArrow isNext={true} />,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <CarouselContainer>
      <h2 onClick={() => navigate("/business")}>ELGIUP EQUIPMENT</h2>
      <p>주식회사 엘기업의 보유장비를 한 눈에 볼 수 있습니다.</p>
      <StyledSlider {...settings}>
        {equipmentData.map((item) => (
          <EquipmentCard key={item.id} onClick={() => navigate("/business")}>
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
          </EquipmentCard>
        ))}
      </StyledSlider>
    </CarouselContainer>
  );
};

export default EquipmentCarousel;
