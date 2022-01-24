import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMeetups } from "../../services/meetupService";
import { Meetups } from "../../models/Events"
import styled from "styled-components/macro";

function UpcomingMeetups() {
  const [allMeetups, setAllMeetups] = useState<[] | [Meetups]>([]);
  const [singleMeetup, setSingleMeetup] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getMeetups();
  }, []);

  async function getMeetups() {
    const data = await getAllMeetups();
    setAllMeetups(data.meetups)
  }

  function getSingleEventHandler (id: string) {
    setSingleMeetup(id);
    navigate(`/meetups/${id}`);
  }

  return (
    <UpcomingWrapper>
      <h2>Upcoming Meetups</h2>
      <MeetupWrapper>
        {allMeetups &&
          allMeetups.map((meet: any) => (
            <MeetupCard key={meet.id} onClick={() => getSingleEventHandler(meet.id)}>
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
