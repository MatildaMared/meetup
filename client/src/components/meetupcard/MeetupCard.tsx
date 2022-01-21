import { MeetupContext } from "../../context/MeetupContext";
import { useEffect, useContext } from "react";
import { getSingleMeetup } from "../../services/meetupService";
import styled from "styled-components";

function MeetupCard() {
  const [context, updateContext] = useContext(MeetupContext);

  async function getMeetup(id: string) {
    const meetupInfo = await getSingleMeetup(id);
    updateContext({ singleMeetup: meetupInfo.meetup });
    console.log("hej äntligen har du lite info 🦄");
  }

  useEffect(() => {
    getMeetup(context.singleMeetupId);
  }, []);

  return (
    <div>
      {context.singleMeetup && (
        <StyledCard>
          <Image src={context.singleMeetup.imgUrl} alt="" />
          <Info>
            <h3>{context.singleMeetup.title}</h3>
            <small>{context.singleMeetup.date}</small>
            <h4>Event Info</h4>
            <p>{context.singleMeetup.description}</p>
          </Info>
        </StyledCard>
      )}
    </div>
  );
}

export default MeetupCard;

const StyledCard = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");

  font-family: "Roboto", sans-serif;
  display: flex;
  max-width: 60vw;
  padding: 3rem;
  margin: 10px auto;
  flex-direction: column;
  background-color: #daf4fd;
  border-radius: 5px;

  h3 {
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  small {
    color: darkgrey;
  }

  h4 {
    margin-top: 1.6rem;
  }

  @media (max-width: 640px) {
    max-width: 400px;
  }
`;

const Image = styled.img`
  max-width: 50vw;
  margin: 0 auto;

  @media (max-width: 640px) {
    max-width: 300px;
  }
`;

const Info = styled.div`
  max-width: 50vw;
  margin: 0 auto;
  padding: 1rem;
  background-color: #ffffff;

  @media (max-width: 640px) {
    max-width: 300px;
  }
`;
