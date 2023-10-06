import styled from "styled-components";
import { raids } from "src/constants/raids";
import { raidKeys } from "src/types/types";

const HomeWorkCard = (props: {
  HomeWorkUnitData: any
  idx: number
  changeHomeWorkData: Function
  counter: number
  setCounter: Function
}) => {

  const HomeWorkUnitData = props.HomeWorkUnitData;
  const idx = props.idx;
  const changeHomeWorkData = props.changeHomeWorkData;
  const counter = props.counter;
  const setCounter = props.setCounter;

  const raidsList = Object.keys(raids) as raidKeys[];

  return (
    <Card>
      <Top>
        <p>아이디 : {HomeWorkUnitData.name}</p>
        <p>최고레벨 : {HomeWorkUnitData.level}</p>
        <p>직업 : {HomeWorkUnitData.job}</p>
      </Top>
      <Bottom>
        {raidsList.map((raidName: raidKeys, i:number) => {
          return (<>
            <InputLine key={i}>
              <p>{raids[raidName]}</p>
              <input
                type="checkbox"
                id={raids[raidName]}
                checked={HomeWorkUnitData[raidName]}
                onChange={(e) => {
                  changeHomeWorkData(idx, raidName);
                  setCounter(counter + 1);
                }}
              />
            </InputLine>
          </>
          )
        })}
      </Bottom>
    </Card>
  )
}

export default HomeWorkCard;

const Card = styled.div`
  width: 100%;
  border: 1px solid #000000;
  padding: 20px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Top = styled.div`
    width: 100%;
    border-bottom: 1px solid #cccccc;

    p {
      margin: 2px;
    }
`;

const Bottom = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const InputLine = styled.div`
    width: 150px;
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;