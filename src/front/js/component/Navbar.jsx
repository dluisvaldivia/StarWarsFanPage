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

				<div className="">
					<Link to="/characters">
						<button className="btn btn-info bg-gradient me-2" type="button">Characters</button>
					</Link>
					<Link to="/films">
						<button className="btn btn-info bg-gradient me-2" type="button">Films</button>
					</Link>
					<Link to="/planets">
						<button className="btn btn-info bg-gradient me-2" type="button">Planets</button>
					</Link>
					<Link to="/contacts">
						<button className="btn btn-info bg-gradient me-2" type="button">Contacts</button>
					</Link>
					<Link to="/">
						<button className="btn btn-info bg-gradient" type="button">Favourites</button>
					</Link>


				</div>
			</div>
		</nav>
	);
};
