import { useState, type FormEvent } from 'react';
import { kapcsolatForm as defaultKapcsolatForm } from '../../pages/kapcsolat/kapcsolatContent';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormMessages = {
  success: string;
  error: string;
  required: string;
  invalidEmail: string;
  notConfigured: string;
};

export type KapcsolatFormConfig = {
  title: string;
  recipient?: string;
  formspreeEndpoint?: string;
  fields?: typeof defaultKapcsolatForm.fields;
  submit?: string;
  messages: FormMessages;
};

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
  config: KapcsolatFormConfig;
};

const emptyValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
  website: '',
};

function validate(values: FormValues, messages: FormMessages): FormErrors {
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
  const fields = config.fields ?? defaultKapcsolatForm.fields;
  const submitLabel = config.submit ?? defaultKapcsolatForm.submit;
  const recipient = config.recipient ?? defaultKapcsolatForm.recipient;
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
          _subject: `Kapcsolatfelvétel — ${recipient}`,
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
    <form onSubmit={handleSubmit} noValidate>
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

      <div className="field">
        <label htmlFor="kapcsolat-nev">
          {fields.name.label} *
        </label>
        <input
          type="text"
          id="kapcsolat-nev"
          name="nev"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => updateField('name', event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'kapcsolat-name-error' : undefined}
        />
        {errors.name && (
          <span id="kapcsolat-name-error" className="field-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="kapcsolat-email">
          E-mail cím *
        </label>
        <input
          type="email"
          id="kapcsolat-email"
          name="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => updateField('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'kapcsolat-email-error' : undefined}
        />
        {errors.email && (
          <span id="kapcsolat-email-error" className="field-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="kapcsolat-uzenet">
          {fields.message.label} *
        </label>
        <textarea
          id="kapcsolat-uzenet"
          name="uzenet"
          rows={5}
          required
          value={values.message}
          onChange={(event) => updateField('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'kapcsolat-message-error' : undefined}
        />
        {errors.message && (
          <span id="kapcsolat-message-error" className="field-error" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <button type="submit" className="btn" disabled={submitState === 'submitting'}>
        {submitState === 'submitting' ? 'Küldés…' : `${submitLabel} →`}
      </button>

      {statusMessage && (
        <p
          className={`form-status form-status--${submitState}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      )}
    </form>
  );
}
