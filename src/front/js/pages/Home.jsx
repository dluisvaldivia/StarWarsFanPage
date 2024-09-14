import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container bg-light">
			<img className="d-block mx-auto mt-2" src="https://i.blogs.es/1da08b/1366_2000-9-/1366_2000.jpeg"/>
		</div>
	);
};
