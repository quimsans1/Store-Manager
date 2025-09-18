import './ConfirmModal.css';

export default function ConfirmModal({ open, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel' }) {
	if (!open) return null;

	return (
		<div className="modal-backdrop" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="confirm-modal">
					<h3>{title}</h3>
					<p>{message}</p>
					<div className="form-actions">
						<button className="btn" onClick={onClose}>{cancelText}</button>
						<button className="btn danger" onClick={onConfirm}>{confirmText}</button>
					</div>
				</div>
			</div>
		</div>
	);
}
