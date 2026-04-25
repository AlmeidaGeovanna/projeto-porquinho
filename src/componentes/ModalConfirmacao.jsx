export default function ModalConfirmacao({ onConfirmar, onCancelar }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Excluir transação</h2>
        <p>Essa transação será excluída permanentemente.</p>

        <div className="modal-botoes">
          <button className="btn-cancelar" onClick={onCancelar}>
            Cancelar
          </button>

          <button className="btn-confirmar" onClick={onConfirmar}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}