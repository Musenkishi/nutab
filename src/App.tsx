import { SettingsProvider } from "./context/SettingsContext"
import Tabscape from "./Tabscape"

const App = () => {
  return (
    <SettingsProvider>
      <Tabscape />
    </SettingsProvider>
  )
}

export default App
