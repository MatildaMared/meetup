// import { useEffect, useState } from "react";
// import { Meetups } from "../../models/Events";
// import { getAllMeetups } from "../../services/meetupService";
import Header from "../../components/header/Header";
import styled from "styled-components";
import UpcomingMeetups from "../../components/upcomingmeetups/UpcomingMeetups";

function StartPage() {
  // const [allmeetups, setAllMeetups] = useState<null | Meetups>(null);

  // async function fetchAllMeetups() {
  //   const data = await getAllMeetups();
  //   setAllMeetups(data);
  // }

  // useEffect(() => {
  //   fetchAllMeetups();
  // }, []);

  return (
    <StartPageWrapper>
      <Header />
      <UpcomingMeetups />
    </StartPageWrapper>
  );
}

const StartPageWrapper = styled.div `
  display: flex;
  flex-direction: column;
` 

export default StartPage;
