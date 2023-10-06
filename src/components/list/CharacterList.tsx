import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

type Character = {
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
};

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
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const CharacterData = useQuery({
    queryKey: ["getUserData", props.selectedName],
    queryFn: async () => {
      const data = await axios
        .get(`/api/lostark/getinfo/${enCodedId}`)
        .then((response) => {
          if (response.data !== undefined || response.data.data != undefined) {
            const result = response.data.data.reduce(
              (prev: Character[], cur: Character) => {
                if (six_picked_characters.includes(cur.CharacterName)) {
                  prev = [...prev, cur];
                }
                return prev;
              },
              [] as Character[]
            );
            setMyList(result);
            return response.data;
          } else {
            return response.data;
          }
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

  return (
    <ListLayer>
      {myList.length > 0 ? (
        myList.map((data, idx) => {
          return (
            <Card key={idx}>
              <p>서버 : {data.ServerName}</p>
              <p>아이디 : {data.CharacterName}</p>
              <p>최고레벨 : {data.ItemMaxLevel}</p>
              <p>직업 : {data.CharacterClassName}</p>
            </Card>
          );
        })
      ) : (
        <>No Characters...</>
      )}
    </ListLayer>
  );
};

const ListLayer = styled.div`
  width: 75%;
  padding: 20px;
`;

const Card = styled.div`
  border: 1px solid #000000;
  padding: 20px;
  border-radius: 4px;
`;

export default CharacterList;
