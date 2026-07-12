import { useState, type FormEvent } from 'react';
import type { kapcsolatForm } from '../../pages/kapcsolat/kapcsolatContent';
import './KapcsolatForm.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type KapcsolatFormProps = {
  config: typeof kapcsolatForm;
};

const emptyValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
  website: '',
};

function validate(values: FormValues, messages: typeof kapcsolatForm.messages): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = messages.required;
  }

  if (!values.email.trim()) {
    errors.email = messages.required;
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = messages.invalidEmail;
  }

  if (!values.message.trim()) {
    errors.message = messages.required;
  }

  return errors;
}

export default function KapcsolatForm({ config }: KapcsolatFormProps) {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const endpoint = config.formspreeEndpoint?.trim();

  function updateField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (submitState !== 'idle') {
      setSubmitState('idle');
      setStatusMessage('');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values, config.messages);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (values.website) {
      return;
    }

    if (!endpoint) {
      setSubmitState('error');
      setStatusMessage(config.messages.notConfigured);
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
          phone: values.phone.trim() || undefined,
          message: values.message.trim(),
          _replyto: values.email.trim(),
          _subject: `Kapcsolatfelvétel — ${config.recipient}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Formspree request failed');
      }

      setValues(emptyValues);
      setErrors({});
      setSubmitState('success');
      setStatusMessage(config.messages.success);
    } catch {
      setSubmitState('error');
      setStatusMessage(config.messages.error);
    }
  }

  return (
    <form className="kapcsolat-form" onSubmit={handleSubmit} noValidate>
      <div className="kapcsolat-form__honeypot" aria-hidden="true">
        <label htmlFor="kapcsolat-website">Ne töltse ki</label>
        <input
          id="kapcsolat-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => updateField('website', event.target.value)}
        />
      </div>

      <label className="kapcsolat-form__field">
        <span>
          {config.fields.name.label}
          <span className="kapcsolat-form__required" aria-hidden="true">
            *
          </span>
        </span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => updateField('name', event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'kapcsolat-name-error' : undefined}
        />
        {errors.name && (
          <span id="kapcsolat-name-error" className="kapcsolat-form__error" role="alert">
            {errors.name}
          </span>
        )}
      </label>

      <label className="kapcsolat-form__field">
        <span>
          {config.fields.email.label}
          <span className="kapcsolat-form__required" aria-hidden="true">
            *
          </span>
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => updateField('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'kapcsolat-email-error' : undefined}
        />
        {errors.email && (
          <span id="kapcsolat-email-error" className="kapcsolat-form__error" role="alert">
            {errors.email}
          </span>
        )}
      </label>

      <label className="kapcsolat-form__field">
        <span>{config.fields.phone.label}</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => updateField('phone', event.target.value)}
        />
      </label>

      <label className="kapcsolat-form__field">
        <span>
          {config.fields.message.label}
          <span className="kapcsolat-form__required" aria-hidden="true">
            *
          </span>
        </span>
        <textarea
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => updateField('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'kapcsolat-message-error' : undefined}
        />
        {errors.message && (
          <span id="kapcsolat-message-error" className="kapcsolat-form__error" role="alert">
            {errors.message}
          </span>
        )}
      </label>

      <button
        type="submit"
        className="kapcsolat-form__submit"
        disabled={submitState === 'submitting'}
      >
        {submitState === 'submitting' ? 'Küldés…' : config.submit}
      </button>

      {statusMessage && (
        <p
          className={`kapcsolat-form__status kapcsolat-form__status--${submitState}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      )}
    </form>
  );
}
