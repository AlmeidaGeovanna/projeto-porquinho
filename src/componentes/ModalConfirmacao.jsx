export default function ModalConfirmacao({
  onConfirmar,
  onCancelar,
  titulo = "Confirmar ação",
  mensagem = "Tem certeza que deseja continuar?",
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar"
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{titulo}</h2>
        <p>{mensagem}</p>

        <div className="modal-botoes">
          <button
            className="btn-cancelar"
            onClick={onCancelar}
          >
            {textoCancelar}
          </button>

          <button
            className="btn-confirmar"
            onClick={onConfirmar}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}