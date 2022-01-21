import { useEffect, useState } from "react";
import { Meetups } from "../../models/Events";
import { getAllMeetups } from "../../services/meetupService";
import Header from "../../components/header/Header";

function StartPage() {
  const [allmeetups, setAllMeetups] = useState<null | Meetups>(null);

  async function fetchAllMeetups() {
    const data = await getAllMeetups();
    setAllMeetups(data);
  }

  useEffect(() => {
    fetchAllMeetups();
  }, []);
  console.log(allmeetups);

  return (
    <>
      <Header />
      {/* <ul>{allmeetups ? <li> {allmeetups.title} </li> : null}</ul> */}
    </>
  );
}

export default StartPage;
