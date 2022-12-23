// 'use strict';
import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const form = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';

initPage();

const onFormInput = evt => {
  const { name, value } = evt.target;
  let saveData = load(LOCALE_STORAGE_KEY);
  saveData = saveData ? saveData : {};
  saveData[name] = value;
  save(LOCALE_STORAGE_KEY, saveData);
};
const throttledOnFormInput = throttle(onFormInput, 500);

form.addEventListener('input', throttledOnFormInput);

function initPage() {
  const saveData = load(LOCALE_STORAGE_KEY);
  if (!saveData) {
    return;
  }
  Object.entries(saveData).forEach(([name, value]) => {
    form.elements[name].value = value;
  });
}

const handleSubmit = evt => {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.currentTarget;
  console.log({ email: email.value, message: message.value });
  evt.currentTarget.reset();
  remove(LOCALE_STORAGE_KEY);
};

form.addEventListener('submit', handleSubmit);
