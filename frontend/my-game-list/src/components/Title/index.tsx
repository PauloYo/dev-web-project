interface TitleProps {
    text?: string;
    size?: string;
}

function Title({ text = "My Game List", size = "text-3xl" }: TitleProps) {
    return (
        <div className="title-container flex items-center justify-center h-[100px]">
            <h1 className={`${size} font-bold text-white`}>{text}</h1>
        </div>
    );
}

export default Title;