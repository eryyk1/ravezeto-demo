type ReorderControlsProps = {
  onMoveUp: () => void;
  onMoveDown: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
};

export default function ReorderControls({
  onMoveUp,
  onMoveDown,
  disableUp = false,
  disableDown = false,
}: ReorderControlsProps) {
  return (
    <div className="admin-reorder">
      <button
        type="button"
        className="admin-btn admin-btn--sm admin-btn--ghost"
        aria-label="Fel"
        disabled={disableUp}
        onClick={onMoveUp}
      >
        ↑
      </button>
      <button
        type="button"
        className="admin-btn admin-btn--sm admin-btn--ghost"
        aria-label="Le"
        disabled={disableDown}
        onClick={onMoveDown}
      >
        ↓
      </button>
    </div>
  );
}
