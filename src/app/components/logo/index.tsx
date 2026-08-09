import Image from "next/image";
import './index.css'

type LogoProps = {
  size?: "small" | "medium" | "large";
};

export default function Logo({ size = "medium" }: LogoProps) {
  const sizes = {
    small: 32,
    medium: 48,
    large: 80,
  };

  const dimension = sizes[size];

  return (
    <div
      className="logo"
      style={{
        width: dimension,
        height: dimension,
      }}
    >
      <Image
        src="/logo.png"
        alt="Sistema de Lideranças"
        width={dimension}
        height={dimension}
        priority
      />
    </div>
  );
}