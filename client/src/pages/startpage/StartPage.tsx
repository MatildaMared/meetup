import { useEffect, useState } from "react";
import { getAllMeetups } from "../../services/meetupService";
import Header from "../../components/header/Header";
import styled from "styled-components";
import UpcomingMeetups from "../../components/upcomingmeetups/UpcomingMeetups";
import { Meetup } from "../../models/Meetup";

function StartPage() {
  const [meetups, setMeetups] = useState<[] | [Meetup]>([]);

  useEffect(() => {
    getMeetups();
  }, []);

  async function getMeetups() {
    const data = await getAllMeetups();
    setMeetups(data.meetups);
  }

  return (
    <StartPageWrapper>
      <Header />
      <UpcomingMeetups meetups={meetups} />
    </StartPageWrapper>
  );
}

const StartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default StartPage;
