import AutoModeIcon from '@mui/icons-material/AutoMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from "@mui/material";
import { ThemeMode } from "../../types/ThemeMode";

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
        <IconButton onClick={handleToggleMode}>
            {renderIcon(mode)}
        </IconButton>
    );
};

export default ModeButton;