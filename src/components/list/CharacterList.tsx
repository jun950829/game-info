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
        .get(`/api/lostark/getinfo/${enCodedId}/`)
        .then((response) => response.data)
        .catch((error) => {
          console.log(error);
          throw error;
        });
      return data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    setIsLoading(true);
    console.log("qkRnla");
  }, [props]);

  useEffect(() => {
    if (
      isLoading === true &&
      CharacterData.data !== undefined &&
      CharacterData.data.data !== undefined
    ) {
      console.log(CharacterData.data.data);
      console.log(six_picked_characters);
      const result = CharacterData.data.data.reduce(
        (prev: Character[], cur: Character) => {
          if (six_picked_characters.includes(cur.CharacterName)) {
            prev = [...prev, cur];
          }
          return prev;
        },
        [] as Character[]
      );
      setMyList(result);
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div>
      내가왔다.
      {JSON.stringify(myList)}
    </div>
  );
};

export default CharacterList;
