import { cn } from '@/lib/utils';

export type PixelIconName =
    | 'sword' | 'shield' | 'scroll' | 'chest'
    | 'potion' | 'hat' | 'target' | 'lightning'
    | 'trophy' | 'bubble' | 'map' | 'coins';

interface PixelIconProps {
    name: PixelIconName;
    className?: string;
    size?: number;
}

const map: Record<PixelIconName, { x: number; y: number }> = {
    sword: { x: 0, y: 0 },
    shield: { x: 1, y: 0 },
    scroll: { x: 2, y: 0 },
    chest: { x: 3, y: 0 },
    potion: { x: 0, y: 1 },
    hat: { x: 1, y: 1 },
    target: { x: 2, y: 1 },
    lightning: { x: 3, y: 1 },
    trophy: { x: 0, y: 2 },
    bubble: { x: 1, y: 2 },
    map: { x: 2, y: 2 },
    coins: { x: 3, y: 2 },
};

export function PixelIcon({ name, className, size = 24 }: PixelIconProps) {
    const { x, y } = map[name];

    // Grid is 4 columns x 3 rows
    // background-size should be 400% 300%
    // background-position should be x * (100 / (cols - 1))% y * (100 / (rows - 1))%
    // For 4 cols: 0%, 33.33%, 66.66%, 100%
    // For 3 rows: 0%, 50%, 100%

    const bgX = (x / 3) * 100;
    const bgY = (y / 2) * 100;

    return (
        <div
            className={cn("inline-block pixelated", className)}
            style={{
                width: size,
                height: size,
                backgroundImage: 'url(/pixel-bundle.png)',
                backgroundSize: '400% 300%',
                backgroundPosition: `${bgX}% ${bgY}%`,
                imageRendering: 'pixelated'
            }}
            aria-label={name}
            role="img"
        />
    );
}
