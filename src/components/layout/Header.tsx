import styled from "styled-components";
import Image from "next/image";

const Header = () => {
  return (
    <HeaderLayer>
      <Image src="/lost_ark_logo.webp" alt="logo" width={200} height={60} />
      {/* <h1>욱이가 적룡포를 쓰니 카멘의 허리가 휘었다</h1> */}
      <h1>건슬은 뒤졌다</h1>
    </HeaderLayer>
  );
};

const HeaderLayer = styled.div`
  width: 100%;
  padding: 10px;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #1d94f5;

  h1 {
    font-size: 38px;
    color: #ffffff;
  }
`;

export default Header;
