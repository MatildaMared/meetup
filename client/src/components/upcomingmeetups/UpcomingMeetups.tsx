import { useEffect, useContext } from "react";
import { MeetupContext } from "../../context/MeetupContext";
import { getAllMeetups } from "../../services/meetupService";
import styled from "styled-components/macro";

function UpcomingMeetups() {
    const [context, updateContext] = useContext(MeetupContext);
    const allMeetings = context.allMeetups;

    async function getMeetups() {
        const meetups = await getAllMeetups();
        updateContext({ allMeetups: meetups});
      }

    useEffect(() => {
        getMeetups();
    }, []);

  return <UpcomingWrapper>
      <h2>Upcoming Meetups</h2>
      <EventWrapper>
          
      </EventWrapper>
  </UpcomingWrapper>;
}

const UpcomingWrapper = styled.section `
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 3;
`

const EventWrapper = styled.div `
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
`

export default UpcomingMeetups;
