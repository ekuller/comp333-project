import React from "react";
// We would like to use a modal (small window) to show details of a task.
import { Nav, NavItem, NavLink } from "reactstrap";

export default class HomePage extends React.Component {
	render() {
		return (
			<div>
				Welcome
				<Nav tabs>
					<NavItem>
						<NavLink active href="#">
							Listen & Rate
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#"> My Ratings </NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#"> Social </NavLink>
					</NavItem>
				</Nav>
			</div>
		);
	}
}
