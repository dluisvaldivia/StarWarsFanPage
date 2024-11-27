import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const handleLogin = () => {	
		if (store.isLogged) {actions.logout();} 
		else {Navigate('/login');}}


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
					<Link to="/vehicles">
						<button className="btn btn-info bg-gradient me-2" type="button">Vehicles</button>
					</Link>
					<Link to="/planets">
						<button className="btn btn-info bg-gradient me-2" type="button">Planets</button>
					</Link>
					<Link to="/contacts">
						<button className="btn btn-info bg-gradient me-2" type="button">Contacts</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-info bg-danger me-2" onClick={handleLogin} type="button">
						{store.isLogged ? 'Logout': 'Login'}
						</button>
					</Link>
				</div>
				<div className="dropdown">
					<button className="btn btn-warning dropdown-toggle me-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Favorites ({store.favorites.length})
					</button>
					<ul className="dropdown-menu dropdown-menu-lg-end">
					{store.favorites.length > 0 ? (
                            store.favorites.map((fav, index) => (
                                <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                    {fav.name}
                                    <button className="btn btn-danger btn-sm" onClick={() => actions.removeFromFavorites(fav)}>
                                        Remove
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">No favorites added</li>
                        )}
					</ul>
				</div>
			</div>
		</nav>
	);
};
