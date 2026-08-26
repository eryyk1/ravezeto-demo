import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { palyazatokForm } from './palyazatokContent';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const emptyValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  website: '',
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const { messages } = palyazatokForm;

  if (!values.name.trim()) errors.name = messages.required;
  if (!values.email.trim()) {
    errors.email = messages.required;
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = messages.invalidEmail;
  }
  if (!values.phone.trim()) errors.phone = messages.required;
  if (!values.company.trim()) errors.company = messages.required;

  return errors;
}

export default function PalyazatokForm() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const endpoint = palyazatokForm.formspreeEndpoint?.trim();

  function updateField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (!endpoint) {
      setSubmitState('error');
      setStatusMessage(palyazatokForm.messages.notConfigured);
      return;
    }

    setSubmitState('submitting');
    setStatusMessage('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          company: values.company.trim(),
          message: values.message.trim(),
          _subject: 'Pályázatok – kapcsolatfelvétel',
          _gotcha: values.website,
        }),
      });

      if (!response.ok) throw new Error('submit failed');

      setSubmitState('success');
      setStatusMessage(palyazatokForm.messages.success);
      setValues(emptyValues);
      setErrors({});
    } catch {
      setSubmitState('error');
      setStatusMessage(palyazatokForm.messages.error);
    }
  }

  return (
    <div className="form">
      <h2>{palyazatokForm.title}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="palyazat-nev">Kapcsolattartó neve *</label>
          <input
            type="text"
            id="palyazat-nev"
            name="nev"
            value={values.name}
            onChange={(event) => updateField('name', event.target.value)}
            required
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="palyazat-email">Email cím *</label>
          <input
            type="email"
            id="palyazat-email"
            name="email"
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            required
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor="palyazat-telefon">Telefonszám *</label>
          <input
            type="tel"
            id="palyazat-telefon"
            name="telefon"
            value={values.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            required
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
        <div className="field">
          <label htmlFor="palyazat-ceg">Cég neve *</label>
          <input
            type="text"
            id="palyazat-ceg"
            name="ceg"
            value={values.company}
            onChange={(event) => updateField('company', event.target.value)}
            required
          />
          {errors.company && <span className="field-error">{errors.company}</span>}
        </div>
        <div className="field">
          <label htmlFor="palyazat-uzenet">További információt szeretnék</label>
          <textarea
            id="palyazat-uzenet"
            name="uzenet"
            rows={4}
            value={values.message}
            onChange={(event) => updateField('message', event.target.value)}
          />
        </div>
        <input
          type="text"
          name="website"
          value={values.website}
          onChange={(event) => updateField('website', event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="kapcsolat-form__honeypot"
          aria-hidden="true"
        />
        <button className="btn" type="submit" disabled={submitState === 'submitting'}>
          {palyazatokForm.submit}
        </button>
        {statusMessage && (
          <p
            className={`form-status form-status--${submitState === 'success' ? 'success' : 'error'}`}
            role="status"
          >
            {statusMessage}
          </p>
        )}
        <p className="privacy">
          {palyazatokForm.privacyText}{' '}
          <Link to={palyazatokForm.privacyLink}>{palyazatokForm.privacyLinkLabel}</Link>
        </p>
      </form>
    </div>
  );
}
