import { useEffect, useState } from "react";
import { getAllMeetups } from "../../services/meetupService";
import Header from "../../components/header/Header";
import styled from "styled-components";
import UpcomingMeetups from "../../components/upcomingmeetups/UpcomingMeetups";
import { Meetup } from "../../models/Meetup";
import AttendingMeetups from "../../components/attendingMeetups/AttendingMeetups";
import MyMeetups from "../../components/myMeetups/MyMeetups";
import AllMeetups from "../../components/allMeetups/AllMeetups";

function StartPage() {
  const [meetups, setMeetups] = useState<[] | [Meetup]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("upcoming");

  useEffect(() => {
    getMeetups();
  }, []);

  async function getMeetups() {
    const data = await getAllMeetups();
    setMeetups(data.meetups);
  }

  return (
    <>
      <Header />
      <Wrapper>
        <SelectWrapper>
          <label htmlFor="activeFilter">Select Filter</label>
          <select
            name="activeFilter"
            id="activeFilter"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <option value="upcoming">Upcoming Meetups</option>
            <option value="attending">Meetups that I'm attending</option>
            <option value="my">My Meetups</option>
            <option value="all">All Meetups</option>
          </select>
        </SelectWrapper>
        {activeFilter === "upcoming" && <UpcomingMeetups meetups={meetups} />}
        {activeFilter === "attending" && <AttendingMeetups meetups={meetups} />}
        {activeFilter === "my" && <MyMeetups meetups={meetups} />}
        {activeFilter === "all" && <AllMeetups meetups={meetups} />}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 0.5rem;
`;

const SelectWrapper = styled.div`
  margin: 0 auto;
  width: fit-content;
  margin-bottom: 1rem;

  & label {
    margin-right: 0.5rem;
    font-weight: 700;
  }

  & select {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
  }
`;

export default StartPage;
