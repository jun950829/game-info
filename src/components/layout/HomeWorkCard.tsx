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
            <Left>
                <p>아이디 : {HomeWorkUnitData.name}</p>
                <p>최고레벨 : {HomeWorkUnitData.level}</p>
                <p>직업 : {HomeWorkUnitData.job}</p>
            </Left>
            <Right>
                {raidsList.map((raidName : raidKeys) => {
                    return (<>
                        <InputLine>
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
            </Right>
        </Card>
    )
}

export default HomeWorkCard;

const Card = styled.div`
  border: 1px solid #000000;
  padding: 20px;
  border-radius: 4px;

  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Left = styled.div`
    width: 45%;
`;

const Right = styled.div`
    width: 45%;
`;

const InputLine = styled.div`
    width: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;