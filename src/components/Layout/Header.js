import './Header.css';
import { useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';

export const Header = () => {
    useEffect(() => {
        function toggleMobileNavbar(event) {
            event.preventDefault();
        
            var mobileNavbar = document.querySelector('.mobile-navbar');
            mobileNavbar.classList.toggle('show');
        }

        const menuIcon = document.getElementById('menu-icon');
        if (menuIcon) {
            menuIcon.addEventListener('click', toggleMobileNavbar);
        }

        // cleanup if no longer needed
        return () => {
            if (menuIcon) {
                menuIcon.removeEventListener('click', toggleMobileNavbar);
            }
        };
    }, []);
    return (
        <header className="header">
        <a href="/" className="logo">ImproveHub</a>
    
        <i className='bx bx-menu-alt-right' id='menu-icon'></i>
    
        <nav className="navbar">
            <a href="/">Home</a>
            <a href="#about">About</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
    
            <div className="btn-box registration">
            <button href="/account/signin" className="btn registration">Sign In</button>
            <button href="/account/signup" className="btn registration">Sign Up</button>
            </div>
        </nav>
    
        <nav className="mobile-navbar">
            <a href="/">Home</a>
            <a href="#about">About</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
            <div className="mobile-btn-box registration">
            <button href="/account/signin" className="btn registration">Sign In</button>
            <button href="/account/signup" className="btn registration">Sign Up</button>
            </div>
        </nav>
        </header>
    );
};