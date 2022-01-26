import { useEffect, useState } from "react";
import { Meetup } from "../../models/Meetup";
import MeetupCardSmall from "../meetupCardSmall/MeetupCardSmall";
import styled from "styled-components";

function UpcomingMeetups(props: { meetups: [] | [Meetup] }) {
  const meetups = props.meetups;
  const [upcomingMeetups, setUpcomingMeetups] = useState<[] | [Meetup]>([]);

  useEffect(() => {
    if (meetups.length > 0) {
      // remove all meetups that have already passed
      const removedPassedMeetups = meetups.filter((meetup) => {
        const meetupDate = new Date(meetup.date);
        const currentDate = new Date();
        return meetupDate > currentDate;
      });

      const filtered = removedPassedMeetups.sort((meetupA, meetupB) => {
        return Number(new Date(meetupA.date)) - Number(new Date(meetupB.date));
      });

      setUpcomingMeetups(filtered as [] | [Meetup]);
    }
  }, [meetups]);

  return (
    <UpcomingWrapper>
      <h2>Upcoming Meetups</h2>
      <MeetupWrapper>
        {upcomingMeetups &&
          upcomingMeetups.map((meetup: Meetup) => (
            <MeetupCardSmall key={meetup.id} meetup={meetup} />
          ))}
      </MeetupWrapper>
    </UpcomingWrapper>
  );
}

const UpcomingWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 3;
`;

const MeetupWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export default UpcomingMeetups;
