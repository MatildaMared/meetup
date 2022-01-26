import { useEffect, useState } from "react";
import { Meetup } from "../../models/Meetup";
import MeetupCardSmall from "../meetupCardSmall/MeetupCardSmall";
import styled from "styled-components";
import { getUserFromLocalStorage } from "../../services/localStorageService";

function MyMeetups(props: { meetups: [] | [Meetup] }) {
  const meetups = props.meetups;
  const [filteredMeetups, setFilteredMeetups] = useState<[] | [Meetup]>([]);
  const user = getUserFromLocalStorage();
  const userId = user?.id;

  useEffect(() => {
    if (meetups.length > 0) {
      // filter meetups that user is hosting
      const filtered = meetups.filter((meetup) => {
        return meetup.ownerId === userId;
      });

      setFilteredMeetups(filtered as [] | [Meetup]);
    }
  }, [meetups]);

  return (
    <Wrapper>
      <h2>Meetups I'm hosting</h2>
      <MeetupWrapper>
        {filteredMeetups &&
          filteredMeetups.map((meetup: Meetup) => (
            <MeetupCardSmall key={meetup.id} meetup={meetup} />
          ))}
      </MeetupWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 3;
`;

const MeetupWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export default MyMeetups;
