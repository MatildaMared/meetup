import { useEffect, useState } from "react";
import { Meetup } from "../../models/Meetup";
import MeetupCardSmall from "../meetupCardSmall/MeetupCardSmall";
import styled from "styled-components";

function AllMeetups(props: { meetups: [] | [Meetup] }) {
  const meetups = props.meetups;
  const [filteredMeetups, setFilteredMeetups] = useState<[] | [Meetup]>([]);

  useEffect(() => {
    if (meetups.length > 0) {
      const filtered = meetups.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });

      setFilteredMeetups(filtered as [] | [Meetup]);
    }
  }, [meetups]);

  return (
    <Wrapper>
      <h2>All meetups</h2>
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

export default AllMeetups;
