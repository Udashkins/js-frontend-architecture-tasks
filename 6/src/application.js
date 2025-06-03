import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN

export default app = async () => {
  const container = document.querySelector('[data-container="sign-up"]');
  const form = container.querySelector('[data-form="sign-up"]');
  const submitButton = form.querySelector('[type="submit"]');
  const elements = Array.from(form.elements).filter((el) => el.name);

  const state = {
    form: {
      valid: false,
      data: Object.fromEntries(elements.map((el) => [el.name, ''])),
      errors: {},
      processState: 'filling', 
      error: null, 
    },
  };

  const watchedState = onChange(state, (path, value, previousValue) => {
    if (path === 'form.data') {
      const errors = validate(watchedState.form.data);
      watchedState.form.errors = errors;
      watchedState.form.valid = isEmpty(errors);
    }

    if (path === 'form.errors') {
      elements.forEach((element) => {
        const error = watchedState.form.errors[element.name];
        const feedbackElement = element.nextElementSibling;

        if (error) {
          element.classList.add('is-invalid');
          if (feedbackElement) {
              feedbackElement.textContent = error.message;
              feedbackElement.classList.add('invalid-feedback');
          }
        } else {
          element.classList.remove('is-invalid');
          if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
              feedbackElement.textContent = '';
              feedbackElement.classList.remove('invalid-feedback');
          }
        }
      });
    }

    if (path === 'form.valid') {
      submitButton.disabled = !watchedState.form.valid;
    }

    if (path === 'form.processState') {
      switch (watchedState.form.processState) {
        case 'sending':
          submitButton.disabled = true;
          break;
        case 'sent':
          container.innerHTML = 'User Created!';
          break;
          case 'failed':
            submitButton.disabled = false; 
            break;
        case 'filling':
          submitButton.disabled = !watchedState.form.valid;
          break;
        default:
          break;
      }
    }
  });

  form.addEventListener('input', (e) => {
    watchedState.form.data[e.target.name] = e.target.value;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    watchedState.form.processState = 'sending';
    watchedState.form.error = null; 

    try {
      await axios.post(routes.usersPath(), watchedState.form.data);
      watchedState.form.processState = 'sent';
    } catch (error) {
        watchedState.form.error = errorMessages.network.error;
        watchedState.form.processState = 'failed';
        console.error('Form submission error:', error);
    }
  });
};
// END
