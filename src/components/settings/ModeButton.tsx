import AutoModeIcon from '@mui/icons-material/AutoMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ThemeMode } from "../../types/ThemeMode";
import TooltipIconButton from './TooltipIconButton';

type ModeButtonProps = {
    mode: ThemeMode;
    onChange: (newMode: ThemeMode) => void;
}

const ModeButton: React.FC<ModeButtonProps> = ({ mode, onChange }) => {
    const handleToggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light';
        onChange(newMode);
    };

    const renderIcon = (mode: ThemeMode) => {
        switch (mode) {
            case 'light':
                return <LightModeIcon />;
            case 'dark':
                return <DarkModeIcon />;
            case 'auto':
                return <AutoModeIcon />;
        }
    };

    return (
        <TooltipIconButton
            tooltipTitle={mode}
            icon={renderIcon(mode)}
            onClick={handleToggleMode}
        />
    );
};

export default ModeButton;