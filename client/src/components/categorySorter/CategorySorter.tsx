import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Meetup } from "../../models/Meetup";

interface Props {
  meetups: Meetup[];
  setMeetups: Function;
}

function CategorySorter(props: Props) {
  const { setMeetups, meetups } = props;
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    // if active category is changed
    if (activeCategory === "all") {
      setMeetups(meetups);
    } else {
      const filtered = meetups.filter(
        (meetup) => meetup.category === activeCategory
      );
      setMeetups(filtered);
    }
  }, [activeCategory, meetups, setMeetups]);

  return (
    <Wrapper>
      <label htmlFor="activeCategory">Category: </label>
      <select
        name="activeCategory"
        id="activeCategory"
        value={activeCategory}
        onChange={(e) => setActiveCategory(e.target.value)}
      >
        <option value="all">All</option>
        <option value="gaming">Gaming</option>
        <option value="programming">Programming</option>
      </select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: fit-content;
  margin-left: 2rem;

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

export default CategorySorter;
