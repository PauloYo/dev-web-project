interface LogoProps {
  size?: string;
}

function Logo({ size = "text-4xl"}: LogoProps) {
  return (
    <div className={`${size} select-none`}>
      <span className="font-light">MY <span className="font-bold">GAME</span> LIST</span>
    </div>
  );
}

export default Logo;