import Logo from './Logo';

function Footer() {
    return (
        <footer className="absolute bottom-0 w-full flex flex-col text-center">
            <Logo />
            <p> ©2025 </p>
            <p> All rights reserved </p>
        </footer>
    );
}

export default Footer;