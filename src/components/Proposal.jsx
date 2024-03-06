import { useEffect } from "react";
import { useState } from "react"


const Proposal = () => {
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/nusa-api/proposals", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                setProposals(data.data);
                console.log(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <h1>proposal</h1>
            {proposals.map((proposal, index) => (
                <p key={index}>{proposal.proposal_titles}</p>
            ))}
        </div>
    )
}

export default Proposal