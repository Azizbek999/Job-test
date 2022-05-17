import { useState } from "react"
import "./People.css"

const People = ({ people }) => {
    console.log(people);
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function getColor(people) {
        if (people.gender == "male") {
            return "main-user make-blue"
        } else {
            return "main-user make-red"
        }
    }

    return (
        <div className={getColor(people)}>
            <div className="user" >
                <img src="{people.photo}" alt="Avatar" />
                <div className="status">
                    <h2>{people.name}</h2>
                    <h3>
                        age: {getAge(people.birthDate)} years
                    </h3>
                </div>
            </div>
        </div>
    )
}


export default People