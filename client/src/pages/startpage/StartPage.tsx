import { useEffect, useState } from "react";
import { getAllMeetups } from "../../services/meetupService";
import Header from "../../components/header/Header";
import styled from "styled-components";
import UpcomingMeetups from "../../components/upcomingmeetups/UpcomingMeetups";
import { Meetup } from "../../models/Meetup";
import AttendingMeetups from "../../components/attendingMeetups/AttendingMeetups";
import AllMeetups from "../../components/allMeetups/AllMeetups";
import CreatedMeetups from "../../components/createdMeetups/CreatedMeetups";
import CategorySorter from "../../components/categorySorter/CategorySorter";

function StartPage() {
  const [meetups, setMeetups] = useState<[] | [Meetup]>([]);
  const [sortedMeetups, setSortedMeetups] = useState<[] | [Meetup]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("upcoming");

  useEffect(() => {
    getMeetups();
  }, []);

  async function getMeetups() {
    const data = await getAllMeetups();
    setMeetups(data.meetups);
    setSortedMeetups(data.meetups);
  }

  return (
    <>
      <Header />
      <Wrapper>
        <UserSelects>
          <SelectWrapper>
            <label htmlFor="activeFilter">Filter: </label>
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
          <CategorySorter meetups={meetups} setMeetups={setSortedMeetups} />
        </UserSelects>
        {activeFilter === "upcoming" && (
          <UpcomingMeetups meetups={sortedMeetups} />
        )}
        {activeFilter === "attending" && (
          <AttendingMeetups meetups={sortedMeetups} />
        )}
        {activeFilter === "my" && <CreatedMeetups meetups={sortedMeetups} />}
        {activeFilter === "all" && <AllMeetups meetups={sortedMeetups} />}
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
  width: fit-content;

  & label {
    margin-right: 0.5rem;
    font-weight: 700;
  }

  & select {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
  }
`;

const UserSelects = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export default StartPage;
