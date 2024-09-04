import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand">Authentication System</span>
				</Link>
				<div className="ml-auto">
					{
						store.token ? (
							<>
								<Link to="/private" className="btn btn-primary me-2">Private</Link>
								<button className="btn btn-primary" onClick={() => {
									actions.logout()
									navigate("/")
								}}>Logout</button>
							</>
						) : (
							<Link to="/login" className="btn btn-primary">Login</Link>
						)
					}
				</div>
			</div>
		</nav>
	);
};
