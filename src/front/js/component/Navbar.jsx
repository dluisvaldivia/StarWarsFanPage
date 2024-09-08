import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	
	return (
		<nav className="navbar bg-gradient bg-dark ">
			<div className="container">
				<Link to="/">
				<img 
        src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG10.png" 
        alt="Star Wars Logo" 
		className="max-size-image"
      />
				</Link>

				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
