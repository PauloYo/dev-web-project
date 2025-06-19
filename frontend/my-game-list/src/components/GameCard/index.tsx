import './index.css';

type GameCardProps = {
    width?: string | number;
    height?: string | number;
};

function GameCard({ width = '300px', height = '400px' }: GameCardProps) {
    return (
        <div
            className='card-box flex items-center justify-center'
            style={{ width, height }}
        >
            
        </div>
    );
}

export default GameCard;