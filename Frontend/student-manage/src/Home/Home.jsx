import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import Slider from "./Slider"
import Feature from "./Feature"
import Footer from "./Footer"
import Cards from "./Cards"
import SecurityRoles from "./SecurityRoles"

export default function Home() {

    const [users, setUsers] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:8080/users");
            console.log(result.data);
            setUsers(result.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id)=>{
        const result= await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers()
    }

    return (

        <>

        <Slider />
        <SecurityRoles />
        <Cards />
        <Feature />
        <Footer />






  

        </>
    );
}