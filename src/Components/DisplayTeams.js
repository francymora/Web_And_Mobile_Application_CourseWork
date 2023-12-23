import { Link } from "react-router-dom";

const ShowTeams = (props) => {
    const Data = props.TTeams ?? []; 
    console.log(Data)

    if (Data.length > 0) {
        return (
            Data.map((team,index) => {
                return(
                    <tr>
                        <td>{team.Team}</td>
                        <td>{team["Games Played"]}</td>
                        <td>{team.Win}</td>
                        <td>{team.Draw}</td>
                        <td>{team.Loss}</td>
                        <td>{team["Goals For"]}</td>
                        <td>{team["Goals Against"]}</td>
                        <td>{team.Points}</td>
                        <td>{team.Year}</td>
                        <td>
                            <Link to={"http://localhost:3000/updateData/" + team._id}>Edit</Link>
                        </td>
                        <td>
                            <Link to={"http://localhost:3000/deleteData/" + team._id}>Delete</Link>
                        </td>
                    </tr>
                )
            })
            
              
            
        )
    } else
    return (<h1>No Data returned</h1>)
    
}

function DisplayTeams(props) {
    const Team = props.Team;

    return (
        <div>
            <h3>Teams List</h3>
            <table className="table table-stripped" style={{ marginTop: '10px', borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}>
                <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Games Played</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Loss</th>
                        <th>Goals For</th>
                        <th>Goals Against</th>
                        <th>Points</th>
                        <th>Year</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <ShowTeams TTeams={Team} />
                </tbody>
            </table>
        </div>
    );
}

export default DisplayTeams;
