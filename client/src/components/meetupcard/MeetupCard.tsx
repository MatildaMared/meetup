import { Meetup } from "../../models/Meetup";
import styled from "styled-components";

interface MeetupProps {
  meetup: Meetup;
}

const MeetupCard: React.FC<MeetupProps> = ({ meetup }): JSX.Element => {
  return (
    <div>
      {meetup && (
        <StyledCard>
          <Image src={meetup.imgUrl} alt="" />
          <Info>
            <h3>{meetup.title}</h3>
            <small>{meetup.date}</small>
            <h4>Event Info</h4>
            <p>{meetup.description}</p>
          </Info>
        </StyledCard>
      )}
    </div>
  );
};

// function MeetupCard(meetup: Meetup ) {
//   return (
//     <div>
//       {meetup && (
//         <StyledCard>
//           <Image src={meetup.imgUrl} alt="" />
//           <Info>
//             <h3>{meetup.title}</h3>
//             <small>{meetup.date}</small>
//             <h4>Event Info</h4>
//             <p>{meetup.description}</p>
//           </Info>
//         </StyledCard>
//       )}
//     </div>
//   );
// }

export default MeetupCard;

const StyledCard = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");

  font-family: "Roboto", sans-serif;
  display: flex;
  max-width: 60vw;
  padding: 3rem;
  margin: 10px auto;
  flex-direction: column;
  background-color: lightgrey;
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
