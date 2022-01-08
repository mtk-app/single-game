import { useEffect, useState } from 'react';
import './App.css';

const allZeros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function App() {
    const [form, setForm] = useState(['', '', '', '', '', '', '', '', '', '']);
    const [total, setTotal] = useState(null);
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
        const checkTotal = localStorage.getItem('singleTotal');
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
        console.log(newTotal);
        setTotal(newTotal);
        localStorage.setItem('singleTotal', JSON.stringify(newTotal));
        setForm(['', '', '', '', '', '', '', '', '', '']);
    };

    const handleClear = () => {
        setTotal([...allZeros]);
        localStorage.setItem('singleTotal', JSON.stringify([...allZeros]));
    };

    return (
        <div className="App">
            <h1>Single Game</h1>
            <form onSubmit={handleSubmit}>
                {form.map((item, idx) => (
                    <div className='input-grp' key={idx + 1}>
                        <span className='text label'>{idx}</span>
                        <input type="number" className='text' onChange={handleChange(idx)} value={item} />
                    </div>
                ))}
                <button className='submit'>Submit</button>
                <hr />
                <h1 style={{marginTop: '3rem'}}>Total</h1>
                {total && total.map((item, idx) => <div className='text' key={idx + 1}>{`${idx} - ${item}`}</div>)}
                <button className='clear' onClick={handleClear}>Clear</button>
            </form>
        </div>
    );
}

export default App;
