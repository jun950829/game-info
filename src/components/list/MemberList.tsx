import { useEffect } from "react";
import styled from "styled-components";

const MemberList = (props: { data: any; clickedFunc: Function }) => {
  const UserData = props.data;
  const clickedFunc = props.clickedFunc;

  useEffect(() => {}, [UserData]);

  if (
    UserData !== undefined &&
    UserData.data !== undefined &&
    UserData.data.data !== undefined
  ) {
    return (
      <Layer>
        <Top>우리맴버들</Top>
        <List>
          {UserData.data.data.map((user: any, idx: number) => {
            return (
              <li key={idx} onClick={() => clickedFunc(user.name, idx)}>
                <h1>{user.name}</h1>
              </li>
            );
          })}
        </List>
      </Layer>
    );
  } else {
    return <p>loading...</p>;
  }
};

const Layer = styled.div`
  width: 100%;
  border: 1px solid #000000;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const Top = styled.div`
  width: 100%;
  line-height: 40px;
  height: 40px;
  font-size: 24px;

  text-align: center;
  border-bottom: 1px solid #cccccc;
`;

const List = styled.ul`
  padding: 20px;
  height: 240px;

  li {
    width: 100%;
    line-height: 30px;
    height: 30px;
    text-align: center;
    margin: 6px 0;

    &:after {
      display: block;
      content: "";
      width: 80%;
      margin: 0 auto;
      border-bottom: solid 2px #000000;
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }
    &:hover:after {
      transform: scaleX(1);
    }

    h1 {
      font-size: 18px;
    }
  }
`;

export default MemberList;
