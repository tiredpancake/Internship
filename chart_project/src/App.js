
import {StatsTableContainer} from './pages/StatsTableContainer';
import { DataProvider } from './data/datacontext';


function App() {
  return (
    <DataProvider>
      <StatsTableContainer/>
    </DataProvider>
    
  );
}

export default App;
