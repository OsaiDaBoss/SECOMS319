// Author: Osaid Samman
// ISU Netid : oasamman@iastate.edu
// Date : March 24, 2023

export function UserCard(props) {
    
    return <div>
        <h1>{props.name}</h1>
        <p>💲{props.amount}</p>
        <p>{props.married ? 'Married' : 'Single'}</p>
        <u1>
            <li>{props.address.street}</li>
            <li>{props.address.city}</li>
            <li>{props.address.state}</li>
        </u1>

    </div>
}

const UserCard = ({ name, amount, married, points, address }) => {
    return (
      <div className="user-card">
        <h1>{name}</h1>
        <p>💲{amount}</p>
        <p>{married ? "Married" : "Single"}</p>
        <ul>
      
            <li><p>Street: {address.street}</p></li>
            <li><p>City: {address.city}</p></li>
            <li><p>State: {address.state}</p></li>
        </ul>
      </div>
    );
  };
  
  export default UserCard;
  