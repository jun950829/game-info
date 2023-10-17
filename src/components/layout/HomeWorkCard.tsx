import styled from "styled-components";
import { raids, raidsLevel } from "src/constants/raids";
import { raidKeys } from "src/types/types";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";

const HomeWorkCard = (props: {
  HomeWorkUnitData: any;
  idx: number;
  changeHomeWorkData: Function;
  counter: number;
  setCounter: Function;
}) => {
  const HomeWorkUnitData = props.HomeWorkUnitData;
  const idx = props.idx;
  const changeHomeWorkData = props.changeHomeWorkData;
  const counter = props.counter;
  const setCounter = props.setCounter;

  const raidsList = Object.keys(raids) as raidKeys[];
  const queryClient = useQueryClient();

  const { mutate: updateMutation } = useMutation(
    (UnitData: any) =>
      axios
        .create({
          baseURL: process.env.BASE_URL,
        })
        .post("/api/lostark/updatehomeworks", {
          id: UnitData.id,
          karman_h: UnitData["karman_h"],
          karman_n: UnitData["karman_n"],
          tower_h: UnitData["tower_h"],
          tower_n: UnitData["tower_n"],
          illiakan_h: UnitData["illiakan_h"],
          illiakan_n: UnitData["illiakan_n"],
          kayangel_h: UnitData["kayangel_h"],
          kayangel_n: UnitData["kayangel_n"],
          abrelshud_h: UnitData["abrelshud_h"],
          abrelshud_n: UnitData["abrelshud_n"],
          kouku_n: UnitData["kouku_n"],
        })
        .then((response) => {
          response.data;
        })
        .catch((error) => {
          // console.log(error);
          throw error;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("reservationListData");
      },
      onError: (error) => {
        console.log("updateMutation error", error);
        queryClient.invalidateQueries("reservationListData");
      },
    }
  );

  const setHomeWorkData = () => {};

  return (
    <Card>
      <Top>
        <p>아이디 : {HomeWorkUnitData.name}</p>
        <p>최고레벨 : {HomeWorkUnitData.level}</p>
        <p>직업 : {HomeWorkUnitData.job}</p>
      </Top>
      <Bottom>
        {raidsList.map((raidName: raidKeys, i: number) => {
          if (
            checkLevel(
              raidName,
              Number(HomeWorkUnitData.level.replaceAll(",", ""))
            )
          ) {
            return (
              <InputLine key={i}>
                <p>{raids[raidName]}</p>
                <input
                  type="checkbox"
                  id={raids[raidName]}
                  checked={HomeWorkUnitData[raidName]}
                  onChange={async (e) => {
                    changeHomeWorkData(idx, raidName);
                    setCounter(counter + 1);

                    await updateMutation(HomeWorkUnitData);
                  }}
                />
              </InputLine>
            );
          }
        })}
      </Bottom>
    </Card>
  );
};

const checkLevel = (raidName: raidKeys, level: number) => {
  if (level >= raidsLevel[raidName]) return true;
};

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
