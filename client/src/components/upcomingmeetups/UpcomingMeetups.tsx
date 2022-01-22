import { useEffect, useContext } from "react";
import { MeetupContext } from "../../context/MeetupContext";
import { getAllMeetups } from "../../services/meetupService";
import styled from "styled-components/macro";

function UpcomingMeetups() {
  const [context, updateContext] = useContext(MeetupContext);
  const allMeetings = context.allMeetups;

  async function getMeetups() {
    const meetups = await getAllMeetups();
    updateContext({ allMeetups: meetups.meetups });
    console.log(meetups.meetups);
    console.log("context: ", allMeetings[0].title);
  }

  useEffect(() => {
    getMeetups();
  }, []);

  return (
    <UpcomingWrapper>
      <h2>Upcoming Meetups</h2>
      <MeetupWrapper>
        {context.allMeetups.length > 0 &&
          context.allMeetups.map((meet: any) => (
            <MeetupCard key={meet.id}>
              <MeetupAvatar src={meet.imgUrl} alt={meet.title} />
              <MeetupInfo>
                <h3>{meet.title}</h3>
                <p>
                  by {meet.ownerId} @ {meet.location} {meet.date}
                </p>
              </MeetupInfo>
            </MeetupCard>
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

const MeetupCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
`;

const MeetupAvatar = styled.img`
  padding: 2rem;
`;

const MeetupInfo = styled.div`
  padding: 0 2rem 1rem 2rem;
`;

export default UpcomingMeetups;
