import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Form.module.css';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


 const handleInputChange = event => {
        const { name, value } = event.target;

       switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

   const handleSubmit = e => {
        e.preventDefault();

        onSubmit({ name, number });
        reset();
    };

   const reset = () => {        
       setName('');
       setNumber('');      
    };    

        return (
            <form className={css.form} onSubmit={handleSubmit}>
                <label className={css.label}>
                    Name
                    <input
                        type="text"
                        name="name"
                        className={css.input}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        required
                        value={name}
                        onChange={handleInputChange} />
                </label>
                <label className={css.label}>
                    Number
                    <input
                        type="tel"
                        name="number"
                        className={css.input}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки, и может начинаться с +"
                        required
                        value={number}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit" className={css.button}>
                    Add contact
                </button>
            </form>
        );
    }


Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
