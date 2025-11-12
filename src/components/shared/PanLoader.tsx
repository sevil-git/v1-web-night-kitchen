
interface PanLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PanLoader({ size = 'md', className = '' }: PanLoaderProps) {
  return (
    <div className={`pan-loader pan-loader-${size} ${className}`}>
      <div className="loader"></div>
      <div className="pan-container">
        <div className="pan"></div>
        <div className="handle"></div>
      </div>
      <div className="shadow"></div>
    </div>
  );
}
