import styled from "styled-components";
import Header from "./Header";

const layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header></Header>
      <Centering>{props.children}</Centering>
    </>
  );
};

const Centering = styled.div`
  width: 1280px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default layout;
