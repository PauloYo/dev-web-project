interface TitleProps {
    text: string;
    size?: string;
}

function Title({ text, size = "text-3xl" }: TitleProps) {
    return (
        <div className="title-container flex items-center justify-center">
            <h1 className={`${size} font-semibold text-white`}>{text}</h1>
        </div>
    );
}

export default Title;