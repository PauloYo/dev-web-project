import Logo from './Logo';

function Footer() {
    return (
        <footer className="relative bottom-0 w-full flex flex-col text-center mt-12">
            <Logo size="text-3xl"/>
            <p> ©2025 </p>
            <p> All rights reserved </p>
        </footer>
    );
}

export default Footer;