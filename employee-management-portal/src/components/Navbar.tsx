import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export const NavbarComponent = () => {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Employee Management Portal</NavbarBrand>
        </Navbar>
    );
};
