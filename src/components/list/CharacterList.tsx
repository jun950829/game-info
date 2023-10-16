import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import HomeWorkCard from "../layout/HomeWorkCard";

// type Character = {
//   ServerName: string;
//   CharacterName: string;
//   CharacterLevel: number;
//   CharacterClassName: string;
//   ItemAvgLevel: string;
//   ItemMaxLevel: string;
// };

type Character = {
  id: number;
  name: string;
  whose: string;
  uuid: number;
  level: string;
  job: string;
  karman_h: boolean;
  karman_n: boolean;
  tower_h: boolean;
  tower_n: boolean;
  illiakan_h: boolean;
  illiakan_n: boolean;
  kayangel_h: boolean;
  kayangel_n: boolean;
  abrelshud_h: boolean;
  abrelshud_n: boolean;
  kouku_n: boolean;
};

type Keys =
  | "karman_h"
  | "karman_n"
  | "tower_h"
  | "tower_n"
  | "illiakan_h"
  | "illiakan_n"
  | "kayangel_h"
  | "kayangel_n"
  | "abrelshud_h"
  | "abrelshud_n"
  | "kouku_n";

let homeWorkList: Character[] = [];

const CharacterList = (props: {
  UserData: any;
  selectedName: string;
  selectedIdx: number;
}) => {
  const UserData = props.UserData.data.data;
  const selectedUser = UserData[props.selectedIdx];
  const six_picked_characters = [
    selectedUser.character1,
    selectedUser.character2,
    selectedUser.character3,
    selectedUser.character4,
    selectedUser.character5,
    selectedUser.character6,
  ];
  const enCodedId = encodeURIComponent(selectedUser.character1);

  const [myList, setMyList] = useState<Character[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const changeHomeWorkList = (idx: number, key: Keys) => {
    homeWorkList[idx][key] = !homeWorkList[idx][key];
  };

  const CharacterData = useQuery({
    queryKey: ["getUserData", props.selectedName],
    queryFn: async () => {
      const data = await axios
        .get(`/api/lostark/gethomeworks`)
        .then((response) => {
          setMyList(response.data.data);
          homeWorkList = response.data.data;
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });

      return data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log("mylist update");

    setMyList(homeWorkList);
  }, [counter]);

  return (
    <Layer>
      <ListLayer>
        {myList.length > 0 ? (
          myList.map((data, idx) => {
            return (
              <HomeWorkCard
                key={idx}
                HomeWorkUnitData={data}
                idx={idx}
                changeHomeWorkData={changeHomeWorkList}
                counter={counter}
                setCounter={setCounter}
              />
            );
          })
        ) : (
          <>No Characters...</>
        )}
      </ListLayer>
      {myList.length > 0 ? <SaveButton>저장</SaveButton> : <></>}
    </Layer>
  );
};

const Layer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const ListLayer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const SaveButton = styled.button`
  width: 20%;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  font-size: 18px;
  background-color: #1d94f5;
  color: #ffffff;
  border-radius: 4px;

  cursor: pointer;
`;

export default CharacterList;
