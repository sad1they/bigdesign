import './App.css';
import { GlobalStyles, H1 } from '@bigcommerce/big-design';
import TableProducts from './components/table';

function App() {
  return (
    <div> 
      <H1 marginTop="xxLarge">Product list view</H1>
      <GlobalStyles />
      <TableProducts />
    </div>
  );
}

export default App;
