import styled from "styled-components";

const MemberList = (props: { data: any; clickedFunc: Function }) => {
  const UserData = props.data;
  const clickedFunc = props.clickedFunc;
  if (
    UserData !== undefined &&
    UserData.data !== undefined &&
    UserData.data.data !== undefined
  ) {
    return (
      <List>
        {UserData.data.data.map((user: any, idx: number) => {
          return (
            <li key={idx} onClick={() => clickedFunc(user.name, idx)}>
              <h1>{user.name}</h1>
            </li>
          );
        })}
      </List>
    );
  } else {
    return <p>loading...</p>;
  }
};

const List = styled.ul`
  width: 20%;
  padding: 20px;
  border: 1px solid #000000;
  border-radius: 4px;

  li {
    width: 100%;
    height: 40px;
    text-align: center;
    margin: 12px 0;

    &:hover {
      border-bottom: 1px solid #000000;
    }

    h1 {
      font-size: 24px;
    }
  }
`;

export default MemberList;
