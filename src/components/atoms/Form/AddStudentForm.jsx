import { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

function AddStudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    name: '',
    score: ''
  });

  const [errors, setErrors] = useState({});

  // 🔹 Валідація
  const validate = (values) => {
    const errors = {};

    if (!values.name.trim()) {
      errors.name = "Ім'я є обов'язковим";
    } else if (values.name.trim().length < 2) {
      errors.name = "Мінімум 2 символи";
    }

    if (values.score === '') {
      errors.score = "Введіть бал";
    } else if (
      isNaN(values.score) ||
      Number(values.score) < 0 ||
      Number(values.score) > 100
    ) {
      errors.score = "Бал 0–100";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...formData, [name]: value };
    setFormData(updated);

    setErrors(validate(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length === 0) {
      onAddStudent({
        id: Date.now(),
        name: formData.name.trim(),
        faculty: 'IT',
        grades: [Number(formData.score)],
        scholarship: false
      });

      setFormData({ name: '', score: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Прізвище та ім'я"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Введіть ПІ"
      />
      {errors.name && (
        <p style={{ color: 'red' }}>{errors.name}</p>
      )}

      <Input
        type="number"
        label="Бал студента"
        name="score"
        value={formData.score}
        onChange={handleChange}
        placeholder="0-100"
      />
      {errors.score && (
        <p style={{ color: 'red' }}>{errors.score}</p>
      )}

      <Button
        type="submit"
        variant="primary"
      >
        Додати студента
      </Button>
    </form>
  );
}

export default AddStudentForm;