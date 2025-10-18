
import {StatsTableContainer} from './Components/StatsTableContainer/StatsTableContainer';
import { DataProvider } from './data/datacontext';


function App() {
  return (
    <DataProvider>
      <StatsTableContainer/>
    </DataProvider>
  );
}

export default App;
