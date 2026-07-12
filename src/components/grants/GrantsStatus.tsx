import './GrantsStatus.css';

type GrantsStatusProps = {
  message: string;
};

export default function GrantsStatus({ message }: GrantsStatusProps) {
  return (
    <div className="grants-status" role="status">
      <span className="grants-status__label">Aktuális helyzet</span>
      <p className="grants-status__text">{message}</p>
    </div>
  );
}
