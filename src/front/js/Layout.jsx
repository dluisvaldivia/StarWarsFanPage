import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
// Custome components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custome Page / views
import { Home } from "./pages/Home.jsx";
import { Contacts } from "./pages/Contacts.jsx";
import { ContactForm } from "./pages/ContactForm.jsx";
import { EditContact } from "./pages/EditContact.jsx";
import { Characters } from "./pages/Characters.jsx";
import { Vehicles } from "./pages/Vehicles.jsx";
import { Planets } from "./pages/Planets.jsx";
import { Login } from "./pages/Login.jsx"
import { SignUp } from "./pages/SignUp.jsx"
import { Private } from "./pages/Private.jsx"

const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />                  
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Contacts />} path="/contacts" />
                        <Route element={<ContactForm />} path="/contact-form" />
                        <Route element={<EditContact />} path="/edit-contact" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<Vehicles />} path="/vehicles" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Private />} path="/private"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
