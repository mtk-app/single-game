import { useEffect, useState } from 'react';
import './App.css';
import ConfirmModal from '@/Components/ConfirmModal/ConfirmModal';

const allZeros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const emptyStrArr = ['', '', '', '', '', '', '', '', '', ''];
const LOCAL_STORAGE_KEY = 'singleTotal';

function App() {
  const [form, setForm] = useState([...emptyStrArr]);
  const [total, setTotal] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  const handleChange = (idx) => {
    return (e) => {
      setForm((prevForm) => {
        const newState = [...prevForm];
        newState[idx] = e.target.value;
        return newState;
      });
    };
  };

  const getSingleFromLocalStorage = () => {
    const checkTotal = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (checkTotal) {
      return JSON.parse(checkTotal);
    } else {
      return [...allZeros];
    }
  };

  useEffect(() => {
    setTotal(getSingleFromLocalStorage());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTotal = total.map((t, idx) => {
      if (form[idx] > 0) return (t += Number(form[idx]));
      return (t += 0);
    });
    setTotal(newTotal);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTotal));
    setForm([...emptyStrArr]);
  };

  const handleClear = () => {
    setTotal([...allZeros]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setConfirmModal(false)
  };

  return (
    <div className="App">
      <h1>Single Game</h1>
      <form onSubmit={handleSubmit}>
        {form.map((item, idx) => (
          <div className="input-grp" key={idx + 1}>
            <span className="text label">{idx}</span>
            <input type="number" className="text" onChange={handleChange(idx)} value={item} />
          </div>
        ))}
        <button className="app-btn submit">Submit</button>
        <hr />
      </form>
      <h1 style={{ marginTop: '3rem' }}>Total Game</h1>
      <div className="rows-container">
        {total &&
          total.map((item, idx) => (
            <p className="text game-row" key={idx + 1}>
              <span className="single">{idx}</span>
              {' - '}
              <span className="amt">{item}</span>
            </p>
          ))}
      </div>
      <h1>Total - {total && total.reduce((prev, curr) => (prev += curr), 0)}</h1>
      <button className="app-btn clear" onClick={() => setConfirmModal(true)}>
        Clear
      </button>
      {confirmModal && (
        <ConfirmModal
          msg="Confirm clear total game!"
          handleSubmit={handleClear}
          handleCancel={() => setConfirmModal(false)}
          submitBtnTxt="confirm"
        />
      )}
    </div>
  );
}

export default App;
